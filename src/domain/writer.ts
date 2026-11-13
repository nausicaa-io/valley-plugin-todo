import type { DatasetRecord, DatasetWhere, ValleyPluginApi } from '@valley/plugin-sdk'
import { normalizeGroups } from '@valley/plugin-sdk/groups'
import { effectiveStatus, STATUS_SETTINGS_KEY } from '../model/statusModel'
import { completionSources, recordCompletion } from './completion'
import { forWrite, hydrateTodos, normalizeTodoRecord, relationChanges, relationWrites, taskRow, type TodoRelations } from './records'
import type { TodoRecord } from '../types'
import { ATTACHMENTS_DATASET, LINKS_DATASET, queryAll, SESSIONS_DATASET, STATUS_HISTORY_DATASET, TAGS_DATASET, TASKS_DATASET } from './datasets'
import { isClockTime, validReminderOffsets } from './validation'
import type { DocumentRevision } from './rpc'

type OwnerApi = Pick<ValleyPluginApi, 'data' | 'pluginId'> & { settings?: Pick<ValleyPluginApi['settings'], 'get'> } & { documents: Pick<ValleyPluginApi['documents'], 'read' | 'update'> }
type Revision = DocumentRevision
export type TodoUpdateOptions = { exactStatusHistory?: boolean }
export type TodoEventSink = (event: string, payload: { record: TodoRecord; previous?: TodoRecord }) => Promise<void>

function validateReminders(record: { reminderOffsets?: number[]; reminderTime?: string }): void {
  const offsets = record.reminderOffsets
  if (offsets !== undefined && !validReminderOffsets(offsets)) throw new Error('Invalid reminder offsets')
  if (record.reminderTime && !isClockTime(record.reminderTime)) throw new Error('Invalid reminder time')
}

export function createTodoDomain(owner: OwnerApi, publish: TodoEventSink = async () => {}) {
  let active = true
  let pending: Promise<unknown> = Promise.resolve()
  const committedEvent = async (emit: TodoEventSink, event: string, payload: Parameters<TodoEventSink>[1]) => {
    try { await emit(event, payload) }
    catch (error) { throw Object.assign(error instanceof Error ? error : new Error(String(error)), { outcomeUnknown: true, committed: true }) }
  }
  const assertActive = () => { if (!active) throw new Error('To-Do service is stopped.') }
  /** The `completedAt` column a record stores, kept in step with its status history on every write. */
  const completedAt = (record: TodoRecord): string | null => recordCompletion(record.statusHistory, completionSources(owner.settings?.get()[STATUS_SETTINGS_KEY]))
  const serialize = <T>(operation: () => Promise<T>): Promise<T> => {
    const result = pending.catch(() => {}).then(() => { assertActive(); return operation() })
    pending = result
    return result
  }
  const rows = (api: OwnerApi, dataset: string, where?: DatasetWhere): Promise<DatasetRecord[]> => queryAll(api, dataset, { where }, assertActive)
  const relations = async (api: OwnerApi, id?: string | string[]): Promise<TodoRelations> => {
    const where = id === undefined ? undefined : { taskId: typeof id === 'string' ? id : { in: id } }
    const [tagRows, links, attachments, sessions, statusHistory] = await Promise.all([
      rows(api, TAGS_DATASET, where), rows(api, LINKS_DATASET, where),
      rows(api, ATTACHMENTS_DATASET, where), rows(api, SESSIONS_DATASET, where), rows(api, STATUS_HISTORY_DATASET, where)
    ])
    return { tags: tagRows, links, attachments, sessions, statusHistory }
  }
  const readRows = async (api: OwnerApi, id?: string | string[]) => {
    const where = id === undefined ? undefined : { id: typeof id === 'string' ? id : { in: id } }
    const [records, related] = await Promise.all([rows(api, TASKS_DATASET, where), relations(api, id)])
    return { todos: hydrateTodos(records, related, normalizeGroups([])), related }
  }
  const read = async (api: OwnerApi, id?: string | string[]): Promise<TodoRecord[]> => (await readRows(api, id)).todos
  const readMany = async (api: OwnerApi, ids: string[]): Promise<TodoRecord[]> => {
    const unique = [...new Set(ids)]
    const records: TodoRecord[] = []
    for (let offset = 0; offset < unique.length; offset += 100) records.push(...await read(api, unique.slice(offset, offset + 100)))
    return records
  }
  /** The document baseline, then the task and its stored relations, read once per write. */
  const load = async (api: OwnerApi, id: string) => {
    const ref = { pluginId: owner.pluginId, sourceId: 'tasks', itemId: id }
    const baseline = await api.documents.read(ref)
    const { todos, related } = await readRows(api, id)
    return { ref, baseline, current: todos[0] as TodoRecord | undefined, related }
  }
  const content = (record: TodoRecord) => JSON.stringify({ ...record, updatedAt: undefined, reminderFiredAt: undefined })
  const update = async (api: OwnerApi, id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: Revision, emit = publish, options: TodoUpdateOptions = {}, loaded?: Awaited<ReturnType<typeof load>>) => {
    validateReminders(record)
    const { ref, baseline, current, related } = loaded ?? await load(api, id)
    if (!baseline || !current || (expectedUpdatedAt !== undefined && current.updatedAt !== expectedUpdatedAt)) return { ok: false }
    if (!record.title?.trim()) throw new Error('A task title cannot be empty.')
    const from = effectiveStatus(current)
    const next = normalizeTodoRecord({ ...record, id, history: record.history === undefined ? current.history : record.history })
    const to = effectiveStatus(next)
    const statusHistory = options.exactStatusHistory ? [...(next.statusHistory ?? [])] : [...(current.statusHistory ?? [])]
    if (!options.exactStatusHistory && from !== to) statusHistory.push({ from, to, changedAt: new Date().toISOString() })
    next.statusHistory = statusHistory.length ? statusHistory : undefined
    const persisted = forWrite(next)
    const row: DatasetRecord = { ...taskRow(persisted), completedAt: completedAt(persisted) }
    delete row.id
    delete row.note
    assertActive()
    const committed = await api.documents.update(ref, {
      expectedRevision: documentRevision?.expectedRevision ?? baseline.revision,
      realmGeneration: documentRevision?.realmGeneration ?? baseline.realmGeneration,
      body: persisted.note, explicitTags: persisted.tags ?? [],
      operations: [
        { dataset: TASKS_DATASET, operation: 'update', key: { id }, values: row },
        ...relationChanges(persisted, related)
      ]
    })
    if (content(current) !== content(persisted)) {
      await committedEvent(emit, 'task.updated', { record: persisted, previous: current })
      if (from !== 'completed' && to === 'completed') await committedEvent(emit, 'task.completed', { record: persisted, previous: current })
    }
    return { ok: true, record: persisted, previous: current, documentRevision: { expectedRevision: committed.revision, realmGeneration: committed.realmGeneration } }
  }
  return {
    list: (api = owner) => read(api),
    get: async (id: string, api = owner) => (await read(api, id))[0] ?? null,
    getMany: (ids: string[], api = owner) => readMany(api, ids),
    append: (record: TodoRecord, api = owner, emit = publish) => serialize(async () => {
      validateReminders(record)
      if (!record.id || !record.title?.trim()) throw new Error('Expected a task id and title.')
      const next = forWrite(normalizeTodoRecord(record))
      if (next.startTime && next.reminderOffsets === undefined && !next.remindAt) next.reminderOffsets = Array.isArray(owner.settings?.get().reminderOffsets) ? [...owner.settings!.get().reminderOffsets as number[]] : [10]
      assertActive()
      await api.data.transaction([{ dataset: TASKS_DATASET, operation: 'insert', values: { ...taskRow(next), completedAt: completedAt(next) } }, ...relationWrites(next)])
      await committedEvent(emit, 'task.created', { record: next })
      return true
    }),
    update: (id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: Revision, api = owner, emit = publish, options: TodoUpdateOptions = {}) =>
      serialize(() => update(api, id, record, expectedUpdatedAt, documentRevision, emit, options)),
    patch: (id: string, values: Partial<TodoRecord> | ((current: TodoRecord) => Partial<TodoRecord>), api = owner, emit = publish) => serialize(async () => {
      const loaded = await load(api, id)
      const current = loaded.current
      if (!current) throw new Error('The task no longer exists.')
      const patch = typeof values === 'function' ? values(current) : values
      const result = await update(api, id, { ...current, ...patch, updatedAt: new Date().toISOString() }, current.updatedAt, undefined, emit, {}, loaded)
      if (!result.ok || !result.record) throw new Error('The task changed before it could be saved.')
      return result.record
    }),
    remove: (id: string, api = owner, expectedUpdatedAt?: string) => serialize(async () => {
      const dataset = api.data.dataset(TASKS_DATASET)
      const current = await dataset.read({ id })
      if (!current.value || (expectedUpdatedAt !== undefined && current.value.updatedAt !== expectedUpdatedAt)) return false
      try {
        return (await dataset.delete({ id }, { expected: [{ dataset: TASKS_DATASET, key: { id }, revision: current.revision }] })).affected > 0
      } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'conflict' && !('outcomeUnknown' in error && error.outcomeUnknown === true)) return false
        throw error
      }
    }),
    /** Run an operation between writes: no task write starts or finishes while it runs. */
    exclusive: <T>(operation: () => Promise<T>): Promise<T> => serialize(operation),
    dispose: async () => { active = false; await pending.catch(() => {}) }
  }
}
