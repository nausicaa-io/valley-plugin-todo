import type { DatasetTransactionOperation } from '@valley/plugin-sdk'
import type { MockValleyApi } from '@valley/plugin-testkit'

export interface IoCounts {
  /** Host round trips the plugin starts, by kind (`dataset.query`, `documents.update`, `rpc`, …). */
  calls: Record<string, number>
  /** Dataset rows read, by dataset. */
  rowsRead: Record<string, number>
  /** Rows the committed operations write, by `dataset.operation` (host-added tag and timestamp writes included). */
  rowsWritten: Record<string, number>
}

const short = (dataset: string): string => dataset.replace(/^todo\./, '')
const bump = (counts: Record<string, number>, key: string, by = 1): void => { if (by) counts[key] = (counts[key] ?? 0) + by }
const rowCount = (operation: DatasetTransactionOperation): number => {
  if (operation.operation === 'update-many') return operation.updates?.length ?? 0
  if (operation.operation === 'delete-many') return operation.keys?.length ?? 0
  return Array.isArray(operation.values) ? operation.values.length : 1
}

/** Count what the plugin asks of the mock host: calls, rows read and rows written. */
export function countIo(mock: MockValleyApi) {
  let counts: IoCounts = { calls: {}, rowsRead: {}, rowsWritten: {} }
  let nested = 0
  const written = (operations: DatasetTransactionOperation[]): void => {
    for (const operation of operations) bump(counts.rowsWritten, `${short(operation.dataset)}.${operation.operation}`, rowCount(operation))
  }
  const data = mock.api.data
  const transaction = data.transaction.bind(data)
  data.transaction = (async (operations, options) => {
    if (!nested) bump(counts.calls, 'data.transaction')
    written(operations as DatasetTransactionOperation[])
    return transaction(operations, options)
  }) as typeof data.transaction
  const dataset = data.dataset.bind(data)
  data.dataset = ((id: string) => {
    const handle = dataset(id)
    const name = short(id)
    const single = (operation: DatasetTransactionOperation['operation']) => (...args: unknown[]) => {
      bump(counts.calls, `dataset.${operation}`)
      const [first, second] = args
      written([operation === 'update' || operation === 'delete' ? { dataset: id, operation, key: first as never, values: second as never } : { dataset: id, operation, values: first as never }])
    }
    return {
      ...handle,
      query: async (query) => {
        bump(counts.calls, 'dataset.query')
        const page = await handle.query(query)
        bump(counts.rowsRead, name, page.rows.length)
        return page
      },
      read: async (key) => { bump(counts.calls, 'dataset.read'); bump(counts.rowsRead, name); return handle.read(key) },
      aggregate: async (request) => { bump(counts.calls, 'dataset.aggregate'); return handle.aggregate(request) },
      count: async (where) => { bump(counts.calls, 'dataset.count'); return handle.count(where) },
      insert: async (values, options) => { single('insert')(values); nested++; try { return await handle.insert(values, options) } finally { nested-- } },
      upsert: async (values, options) => { single('upsert')(values); nested++; try { return await handle.upsert(values, options) } finally { nested-- } },
      update: async (key, values, options) => { single('update')(key, values); nested++; try { return await handle.update(key, values, options) } finally { nested-- } },
      delete: async (key, options) => { single('delete')(key); nested++; try { return await handle.delete(key, options) } finally { nested-- } }
    }
  }) as typeof data.dataset
  const documents = mock.api.documents
  const read = documents.read.bind(documents)
  const update = documents.update.bind(documents)
  documents.read = (async (ref) => { bump(counts.calls, 'documents.read'); return read(ref) }) as typeof documents.read
  documents.update = (async (ref, change) => {
    bump(counts.calls, 'documents.update')
    nested++
    try { return await update(ref, change) } finally { nested-- }
  }) as typeof documents.update
  const call = mock.api.backend.call
  mock.api.backend.call = (async (method: string, payload?: unknown) => {
    bump(counts.calls, `rpc.${method}`)
    return call(method, payload)
  }) as typeof mock.api.backend.call
  const settings = mock.api.settings
  const set = settings.set.bind(settings)
  settings.set = (async (key, value) => { bump(counts.calls, 'settings.set'); return set(key, value) }) as typeof settings.set
  const total = (values: Record<string, number>): number => Object.values(values).reduce((sum, value) => sum + value, 0)
  return {
    get counts(): IoCounts { return counts },
    reset: (): void => { counts = { calls: {}, rowsRead: {}, rowsWritten: {} } },
    totals: () => ({ calls: total(counts.calls), rowsRead: total(counts.rowsRead), rowsWritten: total(counts.rowsWritten) })
  }
}
