import type { DatasetKey } from '@valley/plugin-sdk'
import type { MockValleyApi } from '@valley/plugin-testkit'
import CONFIG from '../config.json'

type Operation = { dataset: string; key?: Record<string, unknown>; values?: Record<string, unknown> }

const qualify = (dataset: string): string => dataset.includes('.') ? dataset : `todo.${dataset}`
const primaryKeys = new Map(CONFIG.datasets.map((dataset) => [`todo.${dataset.id}`, dataset.primaryKey as string[]]))
const relations = [...primaryKeys.keys()].filter((dataset) => dataset !== 'todo.tasks')

/**
 * Give the mock's dataset change events the keys the host attaches to them
 * (the testkit emits keyless events). A task change also names that task in
 * every relation dataset, as the host's cascade does.
 */
export function keyDatasetChanges(mock: MockValleyApi): void {
  const current = new Map<string, Record<string, unknown>[]>()
  const add = (dataset: string, key: Record<string, unknown>): void => {
    const keys = current.get(dataset) ?? []
    keys.push(key)
    current.set(dataset, keys)
  }
  const note = (operations: Operation[]): void => {
    for (const operation of operations) {
      const dataset = qualify(operation.dataset)
      const fields = primaryKeys.get(dataset) ?? []
      const key = operation.key ?? Object.fromEntries(fields.map((field) => [field, operation.values?.[field]]))
      add(dataset, key)
      if (dataset === 'todo.tasks' && typeof key.id === 'string') for (const relation of relations) add(relation, { taskId: key.id })
    }
  }
  const during = async <T>(operations: Operation[], run: () => Promise<T>): Promise<T> => {
    current.clear()
    note(operations)
    try { return await run() } finally { current.clear() }
  }
  const data = mock.api.data
  const transaction = data.transaction.bind(data)
  data.transaction = ((operations, options) => during(operations as Operation[], () => transaction(operations, options))) as typeof data.transaction
  const documents = mock.api.documents
  const update = documents.update.bind(documents)
  documents.update = ((ref, change) => during([{ dataset: 'todo.tasks', key: { id: ref.itemId } }, ...((change.operations ?? []) as Operation[])], () => update(ref, change))) as typeof documents.update
  const dataset = data.dataset.bind(data)
  data.dataset = ((id: string) => {
    const handle = dataset(id)
    const name = qualify(id)
    return {
      ...handle,
      delete: (key, options) => during([{ dataset: name, key }], () => handle.delete(key, options)),
      subscribe: (listener) => handle.subscribe((event) => listener(current.size && event ? { ...event, keys: current.get(name) as DatasetKey[] | undefined } : event))
    }
  }) as typeof data.dataset
}
