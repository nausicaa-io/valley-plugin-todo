import type { DatasetRecord, DatasetWhere, ValleyPluginApi } from '@valley/plugin-sdk'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { normalizeGroups } from '@valley/plugin-sdk/groups'
import { effectiveStatus } from './statuses'
import { forWrite, hydrateTodos, normalizeTodoRecord, relationDeletes, relationWrites, taskRow, type TodoRelations } from './records'
import type { TodoRecord } from './types'

type OwnerApi = Pick<ValleyPluginApi, 'data' | 'pluginId'> & { settings?: Pick<ValleyPluginApi['settings'], 'get'> } & { documents: Pick<ValleyPluginApi['documents'], 'read' | 'update'> }
type Revision = { expectedRevision: number; vaultGeneration: number }
export type TodoEventSink = (event: string, payload: { record: TodoRecord; previous?: TodoRecord }) => Promise<void>

function validateReminders(record: { reminderOffsets?: number[]; reminderTime?: string }): void {
  const offsets = record.reminderOffsets
  if (offsets !== undefined && (!Array.isArray(offsets) || offsets.length > 16 || offsets.some(value => !Number.isInteger(value) || value < 0 || value > 10080) || new Set(offsets).size !== offsets.length)) throw new Error('Invalid reminder offsets')
  if (record.reminderTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(record.reminderTime)) throw new Error('Invalid reminder time')
}

export function createTodoDomain(owner: OwnerApi, publish: TodoEventSink = async () => {}) {
  let active = true
  let pending: Promise<unknown> = Promise.resolve()
  const committedEvent = async (emit: TodoEventSink, event: string, payload: Parameters<TodoEventSink>[1]) => {
    try { await emit(event, payload) }
    catch (error) { throw Object.assign(error instanceof Error ? error : new Error(String(error)), { outcomeUnknown: true, committed: true }) }
  }
  const assertActive = () => { if (!active) throw new Error('To-Do service is stopped.') }
  const serialize = <T>(operation: () => Promise<T>): Promise<T> => {
    const result = pending.catch(() => {}).then(() => { assertActive(); return operation() })
    pending = result
    return result
  }
  const rows = async (api: OwnerApi, dataset: string, where?: DatasetWhere): Promise<DatasetRecord[]> => {
    const records: DatasetRecord[] = []
    let cursor: string | undefined
    do {
      assertActive()
      const page = await api.data.dataset(dataset).query({ where, limit: 1000, cursor })
      records.push(...page.rows)
      cursor = page.cursor
    } while (cursor)
    assertActive()
    return records
  }
  const relations = async (api: OwnerApi, id?: string, tags = true): Promise<TodoRelations> => {
    const where = id ? { taskId: id } : undefined
    const [tagRows, links, attachments, sessions, statusHistory] = await Promise.all([
      tags ? rows(api, 'todo.task_tags', where) : [], rows(api, 'todo.task_links', where),
      rows(api, 'todo.task_attachments', where), rows(api, 'todo.focus_sessions', where), rows(api, 'todo.status_history', where)
    ])
    return { tags: tagRows, links, attachments, sessions, statusHistory }
  }
  const read = async (api: OwnerApi, id?: string): Promise<TodoRecord[]> => {
    const [records, related] = await Promise.all([rows(api, 'todo.tasks', id ? { id } : undefined), relations(api, id)])
    return hydrateTodos(records, related, normalizeGroups([]))
  }
  const content = (record: TodoRecord) => JSON.stringify({ ...record, updatedAt: undefined, reminderFiredAt: undefined })
  const update = async (api: OwnerApi, id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: Revision, emit = publish) => {
    validateReminders(record)
    const ref = { pluginId: owner.pluginId, sourceId: 'tasks', itemId: id }
    const baseline = await api.documents.read(ref)
    const current = (await read(api, id))[0]
    if (!baseline || !current || (expectedUpdatedAt !== undefined && current.updatedAt !== expectedUpdatedAt)) return { ok: false }
    if (!record.title?.trim()) throw new Error('A task title cannot be empty.')
    const from = effectiveStatus(current)
    const next = normalizeTodoRecord({ ...record, id, history: record.history === undefined ? current.history : record.history } as unknown as DataRecord)
    const to = effectiveStatus(next)
    const statusHistory = [...(current.statusHistory ?? [])]
    if (from !== to) statusHistory.push({ from, to, changedAt: new Date().toISOString() })
    next.statusHistory = statusHistory.length ? statusHistory : undefined
    const persisted = forWrite(next)
    const related = await relations(api, id, false)
    const row = taskRow(persisted)
    delete row.id
    delete row.note
    assertActive()
    const committed = await api.documents.update(ref, {
      expectedRevision: documentRevision?.expectedRevision ?? baseline.revision,
      vaultGeneration: documentRevision?.vaultGeneration ?? baseline.vaultGeneration,
      body: persisted.note, explicitTags: persisted.tags ?? [],
      operations: [
        { dataset: 'todo.tasks', operation: 'update', key: { id }, values: row },
        ...relationDeletes(id, related), ...relationWrites(persisted, false)
      ]
    })
    if (content(current) !== content(persisted)) {
      await committedEvent(emit, 'task.updated', { record: persisted, previous: current })
      if (from !== 'completed' && to === 'completed') await committedEvent(emit, 'task.completed', { record: persisted, previous: current })
    }
    return { ok: true, record: persisted, documentRevision: { expectedRevision: committed.revision, vaultGeneration: committed.vaultGeneration } }
  }
  return {
    list: (api = owner) => read(api),
    get: async (id: string, api = owner) => (await read(api, id))[0] ?? null,
    append: (record: TodoRecord, api = owner, emit = publish) => serialize(async () => {
      validateReminders(record)
      if (!record.id || !record.title?.trim()) throw new Error('Expected a task id and title.')
      const next = forWrite(normalizeTodoRecord(record as unknown as DataRecord))
      if (next.startTime && next.reminderOffsets === undefined && !next.remindAt) next.reminderOffsets = Array.isArray(owner.settings?.get().reminderOffsets) ? [...owner.settings!.get().reminderOffsets as number[]] : [10]
      await api.data.transaction([{ dataset: 'todo.tasks', operation: 'insert', values: taskRow(next) }, ...relationWrites(next)])
      await committedEvent(emit, 'task.created', { record: next })
      return true
    }),
    update: (id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: Revision, api = owner, emit = publish) =>
      serialize(() => update(api, id, record, expectedUpdatedAt, documentRevision, emit)),
    patch: (id: string, values: Partial<TodoRecord> | ((current: TodoRecord) => Partial<TodoRecord>), api = owner, emit = publish) => serialize(async () => {
      const current = (await read(api, id))[0]
      if (!current) throw new Error('The task no longer exists.')
      const patch = typeof values === 'function' ? values(current) : values
      const result = await update(api, id, { ...current, ...patch, updatedAt: new Date().toISOString() }, current.updatedAt, undefined, emit)
      if (!result.ok || !result.record) throw new Error('The task changed before it could be saved.')
      return result.record
    }),
    remove: (id: string, api = owner) => serialize(async () => (await api.data.dataset('todo.tasks').delete({ id })).affected > 0),
    dispose: async () => { active = false; await pending.catch(() => {}) }
  }
}
