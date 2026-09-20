import type { DataRecord } from '@valley/plugin-sdk/types'
import type { DatasetRecord, DatasetTransactionOperation, DatasetWhere, NoteInputProps } from '@valley/plugin-sdk'
import { asColor, asString, asTime, isRecord } from '@valley/plugin-sdk/normalize'
import { isAllowedExternalUrl, normalizeRelPathOpt, parseAppOpenUrl } from '@valley/plugin-sdk/paths'
import { canonicalGroupName, normalizeGroups } from '@valley/plugin-sdk/groups'
import { React, api, captureTodoScope, type TodoRuntimeScope } from './runtime'
import { isTodoListRecord, readCompletionSummaries, type TodoListRecord } from './completionHistory'
import { uiText } from './localization'
import { effectiveStatus, parseTodoStatus, patchForStatus } from './statuses'
import type { TodoPriority, TodoRecord, TodoSession, TodoStatus, TodoStatusChange } from './types'

const TASKS_DATASET = 'todo.tasks'
const TAGS_DATASET = 'todo.task_tags'
const LINKS_DATASET = 'todo.task_links'
const ATTACHMENTS_DATASET = 'todo.task_attachments'
const SESSIONS_DATASET = 'todo.focus_sessions'
const STATUS_HISTORY_DATASET = 'todo.status_history'
const CALENDAR_DATASETS = [TASKS_DATASET, TAGS_DATASET, LINKS_DATASET, ATTACHMENTS_DATASET]
const ALL_DATASETS = [...CALENDAR_DATASETS, SESSIONS_DATASET, STATUS_HISTORY_DATASET]
const LIST_DATASETS = [...CALENDAR_DATASETS, STATUS_HISTORY_DATASET]

function subscribeDatasets(datasets: string[], listener: () => void): () => void {
  const scope = captureTodoScope()
  const disposers = datasets.map((dataset) => scope.api.data.dataset(dataset).subscribe(listener))
  const dispose = (): void => disposers.forEach((off) => off())
  const detach = scope.onDispose(dispose)
  return () => { detach(); dispose() }
}

export function onChanged(listener: () => void): () => void { return subscribeDatasets(ALL_DATASETS, listener) }

export function onTodoListChanged(listener: () => void): () => void { return subscribeDatasets(LIST_DATASETS, listener) }

export function onCalendarItemsChanged(listener: () => void): () => void {
  const disposers = CALENDAR_DATASETS.map((dataset) => api.data.dataset(dataset).subscribe(listener))
  return () => disposers.forEach((dispose) => dispose())
}

// ── value coercion ──────────────────────────────────────────────────────────

const PRIORITIES: TodoPriority[] = ['normal', 'low', 'medium', 'high']

function asBool(value: unknown): boolean {
  return value === true
}
function asPriority(value: unknown): TodoPriority {
  return typeof value === 'string' && (PRIORITIES as string[]).includes(value)
    ? (value as TodoPriority)
    : 'normal'
}
function asMinutes(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) return Math.round(value)
  return undefined
}
function normalizeHistory(value: unknown): TodoSession[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((entry): entry is Record<string, unknown> => isRecord(entry))
    .map((entry) => ({
      startedAt: asString(entry.startedAt),
      endedAt: asString(entry.endedAt),
      activeMinutes: asMinutes(entry.activeMinutes) ?? 0,
      pauseMinutes: asMinutes(entry.pauseMinutes) ?? 0
    }))
    .filter((entry) => entry.startedAt && entry.endedAt)
}

function normalizeStatusHistory(value: unknown): TodoStatusChange[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((entry): entry is Record<string, unknown> => isRecord(entry))
    .map((entry) => ({
      from: parseTodoStatus(entry.from),
      to: parseTodoStatus(entry.to),
      changedAt: asString(entry.changedAt)
    }))
    .filter((entry): entry is TodoStatusChange => !!entry.from && !!entry.to && !!entry.changedAt && entry.from !== entry.to)
}

/**
 * A reminder is local wall-clock, `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM` — anything
 * else (a full ISO instant a hand-edit or an older build left behind) is dropped
 * rather than half-parsed into the wrong hour.
 */
function asRemindAt(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const s = value.trim()
  return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(s) ? s : undefined
}

/** Only explicitly supported web/app links; vault files use the separate path field. */
export function normalizeTodoUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const s = value.trim()
  if (!s) return undefined
  if (parseAppOpenUrl(s)) return s
  return isAllowedExternalUrl(s) ? s : undefined
}

/** The link list, de-duplicated and restricted to the shared safe-scheme policy. */
function normalizeUrls(value: unknown): string[] | undefined {
  const raw = Array.isArray(value) ? value : []
  const urls = [
    ...new Set(
      raw.map((entry) => normalizeTodoUrl(entry)).filter((entry): entry is string => !!entry)
    )
  ]
  return urls.length ? urls : undefined
}

/** Vault-relative attachment paths, de-duplicated; escapes and empties dropped. */
function normalizeAttachments(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const paths = [
    ...new Set(
      value
        .map((entry) => normalizeRelPathOpt(entry))
        .filter((entry): entry is string => !!entry)
    )
  ]
  return paths.length ? paths : undefined
}

/**
 * A place: a required label plus an optional fix. Coordinates are kept only as a
 * pair — half a position is worse than none, because it maps to the equator.
 */
function normalizeLocation(value: unknown): TodoRecord['location'] {
  if (!isRecord(value)) return undefined
  const name = asString(value.name).trim()
  if (!name) return undefined
  const lng = Number(value.lng)
  const lat = Number(value.lat)
  const fixed = Number.isFinite(lng) && Number.isFinite(lat) && Math.abs(lng) <= 180 && Math.abs(lat) <= 90
  return fixed ? { name, lng, lat } : { name }
}

export function normalizeTodoRecord(record: DataRecord): TodoRecord {
  const now = new Date().toISOString()
  const id = asString(record.id, `todo_${Date.now().toString(36)}`)
  const createdAt = asString(record.createdAt, now)
  const history = normalizeHistory(record.history)
  const statusHistory = normalizeStatusHistory(record.statusHistory)
  const status = parseTodoStatus(record.status)
  return {
    id,
    title: asString(record.title).trim(),
    completed: asBool(record.completed) || status === 'completed' || status === 'canceled',
    priority: asPriority(record.priority),
    dueDate: asString(record.dueDate),
    startTime: asTime(record.startTime),
    endTime: asTime(record.endTime),
    color: asColor(record.color),
    note: asString(record.note),
    tags: Array.isArray(record.tags)
      ? record.tags.filter((t): t is string => typeof t === 'string' && !!t.trim()).map((t) => t.trim())
      : [],
    estimatedMinutes: asMinutes(record.estimatedMinutes),
    actualMinutes: asMinutes(record.actualMinutes),
    history: history.length ? history : undefined,
    statusHistory: statusHistory.length ? statusHistory : undefined,
    status,
    filePath: normalizeRelPathOpt(record.filePath),
    group: asString(record.group).trim() || undefined,
    flagged: asBool(record.flagged) || undefined,
    // Self-parenting is the one cycle cheap enough to reject here; longer ones
    // need the whole file, so `buildTodoTree` breaks those.
    parentId: (() => {
      const parent = asString(record.parentId).trim()
      return parent && parent !== id ? parent : undefined
    })(),
    urls: normalizeUrls(record.urls),
    attachments: normalizeAttachments(record.attachments),
    location: normalizeLocation(record.location),
    remindAt: asRemindAt(record.remindAt),
    reminderFiredAt: asString(record.reminderFiredAt) || undefined,
    createdAt,
    updatedAt: asString(record.updatedAt, createdAt)
  }
}

/** Drop empty optional fields so persisted records stay tidy. */
function forWrite(record: TodoRecord): TodoRecord {
  return {
    ...record,
    filePath: normalizeRelPathOpt(record.filePath),
    urls: normalizeUrls(record.urls),
    attachments: normalizeAttachments(record.attachments)
  }
}

function taskRow(record: TodoRecord): DatasetRecord {
  return {
    id: record.id,
    title: record.title,
    completed: record.completed,
    priority: record.priority,
    dueDate: record.dueDate,
    startTime: record.startTime ?? null,
    endTime: record.endTime ?? null,
    color: record.color ?? null,
    note: record.note,
    estimatedMinutes: record.estimatedMinutes ?? null,
    actualMinutes: record.actualMinutes ?? null,
    status: record.status ?? null,
    filePath: record.filePath ?? null,
    group: record.group ?? null,
    flagged: record.flagged ?? null,
    parentId: record.parentId ?? null,
    location: record.location ?? null,
    remindAt: record.remindAt ?? null,
    reminderFiredAt: record.reminderFiredAt ?? null,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  }
}

async function allRows(dataset: string, where?: DatasetWhere, scope = captureTodoScope()): Promise<DatasetRecord[]> {
  const rows: DatasetRecord[] = []
  let cursor: string | undefined
  do {
    scope.assertActive()
    const page = await scope.api.data.dataset(dataset).query({ where, limit: 1000, cursor })
    scope.assertActive()
    rows.push(...page.rows)
    cursor = page.cursor
  } while (cursor)
  return rows
}

interface TodoRelations {
  tags: DatasetRecord[]
  links: DatasetRecord[]
  attachments: DatasetRecord[]
  sessions: DatasetRecord[]
  statusHistory: DatasetRecord[]
}

async function todoRelations(taskId?: string, includeHistory = true, includeTags = true, scope = captureTodoScope()): Promise<TodoRelations> {
  const where = taskId ? { taskId } : undefined
  const results = await Promise.allSettled([
    includeTags ? allRows(TAGS_DATASET, where, scope) : [],
    allRows(LINKS_DATASET, where, scope),
    allRows(ATTACHMENTS_DATASET, where, scope),
    includeHistory ? allRows(SESSIONS_DATASET, where, scope) : [],
    includeHistory ? allRows(STATUS_HISTORY_DATASET, where, scope) : []
  ])
  const [tags, links, attachments, sessions, statusHistory] = results.map((result) => {
    if (result.status === 'rejected') throw result.reason
    return result.value
  })
  return { tags, links, attachments, sessions, statusHistory }
}

function relationWrites(record: TodoRecord, includeTags = true): DatasetTransactionOperation[] {
  return [
    ...(includeTags ? record.tags.map((tag) => ({
      dataset: TAGS_DATASET,
      operation: 'insert' as const,
      values: { taskId: record.id, tag }
    })) : []),
    ...(record.urls ?? []).map((url, position) => ({
      dataset: LINKS_DATASET,
      operation: 'insert' as const,
      values: { taskId: record.id, position, url }
    })),
    ...(record.attachments ?? []).map((path, position) => ({
      dataset: ATTACHMENTS_DATASET,
      operation: 'insert' as const,
      values: { taskId: record.id, position, path }
    })),
    ...(record.history ?? []).map((session, position) => ({
      dataset: SESSIONS_DATASET,
      operation: 'insert' as const,
      values: { taskId: record.id, position, ...session }
    })),
    ...(record.statusHistory ?? []).map((entry, position) => ({
      dataset: STATUS_HISTORY_DATASET,
      operation: 'insert' as const,
      values: { taskId: record.id, position, ...entry }
    }))
  ]
}

function relationDeletes(taskId: string, relations: TodoRelations): DatasetTransactionOperation[] {
  return [
    ...relations.tags.map((row) => ({ dataset: TAGS_DATASET, operation: 'delete' as const, key: { taskId, tag: String(row.tag) } })),
    ...relations.links.map((row) => ({ dataset: LINKS_DATASET, operation: 'delete' as const, key: { taskId, position: Number(row.position) } })),
    ...relations.attachments.map((row) => ({ dataset: ATTACHMENTS_DATASET, operation: 'delete' as const, key: { taskId, position: Number(row.position) } })),
    ...relations.sessions.map((row) => ({ dataset: SESSIONS_DATASET, operation: 'delete' as const, key: { taskId, position: Number(row.position) } })),
    ...relations.statusHistory.map((row) => ({ dataset: STATUS_HISTORY_DATASET, operation: 'delete' as const, key: { taskId, position: Number(row.position) } }))
  ]
}

async function readTodos(scope: TodoRuntimeScope, includeHistory: boolean, taskId?: string): Promise<TodoRecord[]> {
  const [tasksResult, relationsResult] = await Promise.allSettled([allRows(TASKS_DATASET, taskId ? { id: taskId } : undefined, scope), todoRelations(taskId, includeHistory, true, scope)])
  if (tasksResult.status === 'rejected') throw tasksResult.reason
  if (relationsResult.status === 'rejected') throw relationsResult.reason
  scope.assertActive()
  return hydrateTodos(tasksResult.value, relationsResult.value, normalizeGroups(scope.api.getState().groups))
}

function hydrateTodos(raw: DatasetRecord[], relations: TodoRelations, groups: ReturnType<typeof normalizeGroups>): TodoRecord[] {
  const byTask = (rows: DatasetRecord[], ordered = false): Map<unknown, DatasetRecord[]> => {
    const index = new Map<unknown, DatasetRecord[]>()
    for (const row of rows) {
      const entries = index.get(row.taskId)
      if (entries) entries.push(row)
      else index.set(row.taskId, [row])
    }
    if (ordered) for (const entries of index.values()) entries.sort((a, b) => Number(a.position) - Number(b.position))
    return index
  }
  const tags = byTask(relations.tags)
  const links = byTask(relations.links, true)
  const attachments = byTask(relations.attachments, true)
  const sessions = byTask(relations.sessions, true)
  const statusHistory = byTask(relations.statusHistory, true)
  return raw
    .map((record) => normalizeTodoRecord({
      ...record,
      tags: (tags.get(record.id) ?? []).map((row) => row.tag),
      urls: (links.get(record.id) ?? []).map((row) => row.url),
      attachments: (attachments.get(record.id) ?? []).map((row) => row.path),
      history: sessions.get(record.id) ?? [],
      statusHistory: statusHistory.get(record.id) ?? []
    } as DataRecord))
    .map((todo) => ({
      ...todo,
      group: canonicalGroupName(todo.group, groups) ?? todo.group
    }))
    .filter((todo) => todo.title)
}

interface TodoReadState {
  revision: number
  pending: Map<string, Promise<unknown>>
}

const reads = new WeakMap<TodoRuntimeScope, Map<string, TodoReadState>>()

function coalescedRead<T>(scope: TodoRuntimeScope, kind: string, datasets: string[], key: string, read: () => Promise<T>): Promise<T> {
  try { scope.assertActive() } catch (error) { return Promise.reject(error) }
  let states = reads.get(scope)
  if (!states) { states = new Map(); reads.set(scope, states) }
  let state = states.get(kind)
  if (!state) {
    state = { revision: 0, pending: new Map() }
    const owner = state
    const offs = datasets.map((dataset) => scope.api.data.dataset(dataset).subscribe(() => { owner.revision++ }))
    scope.onDispose(() => { offs.forEach((off) => off()); states.clear() })
    states.set(kind, state)
  }
  let pending = state.pending.get(key)
  if (!pending) {
    pending = (async () => {
      await Promise.resolve()
      for (;;) {
        scope.assertActive()
        const revision = state.revision
        const todos = await read()
        scope.assertActive()
        if (revision === state.revision) return todos
      }
    })().finally(() => { state.pending.delete(key) })
    state.pending.set(key, pending)
  }
  return pending as Promise<T>
}

function loadTodoProjection(includeHistory: boolean, taskId?: string): Promise<TodoRecord[]> {
  const scope = captureTodoScope()
  return coalescedRead(scope, includeHistory ? 'full' : 'calendar', includeHistory ? ALL_DATASETS : CALENDAR_DATASETS, taskId ?? '', () => readTodos(scope, includeHistory, taskId))
}

export function loadTodoList(scope = captureTodoScope()): Promise<TodoListRecord[]> {
  return coalescedRead(scope, 'list', LIST_DATASETS, '', async () => {
    const todos = await readTodos(scope, false)
    const summaries = await readCompletionSummaries(scope.api, todos.map((todo) => todo.id), scope.assertActive)
    return todos.map((todo) => ({ ...todo, historyLoaded: false, completionSummary: summaries.get(todo.id) ?? null }))
  })
}

interface SelectedHistoryReader {
  scope: TodoRuntimeScope
  users: number
  key: string
}

const selectedReaders = new WeakMap<TodoRuntimeScope, Map<string, SelectedHistoryReader>>()
let selectionSequence = 0

function acquireSelectedHistory(scope: TodoRuntimeScope, id: string): { reader: SelectedHistoryReader; release(): void } {
  let readers = selectedReaders.get(scope)
  if (!readers) { readers = new Map(); selectedReaders.set(scope, readers) }
  let reader = readers.get(id)
  if (!reader) {
    const created: SelectedHistoryReader = {
      users: 0,
      key: String(++selectionSequence),
      scope: { ...scope, assertActive: () => {
        scope.assertActive()
        if (!created.users) throw new Error('To-Do selection disposed')
      } }
    }
    reader = created
    readers.set(id, reader)
  }
  reader.users++
  const captured = reader
  let active = true
  return { reader, release: () => {
    if (!active) return
    active = false
    captured.users--
    if (!captured.users) readers.delete(id)
  } }
}

function selectedStatusHistory(scope: TodoRuntimeScope, id: string, reader: SelectedHistoryReader): Promise<TodoStatusChange[]> {
  return coalescedRead(scope, 'statusHistory', [STATUS_HISTORY_DATASET], reader.key, async () => {
    const rows = await allRows(STATUS_HISTORY_DATASET, { taskId: id }, reader.scope)
    rows.sort((a, b) => Number(a.position) - Number(b.position))
    return normalizeStatusHistory(rows)
  })
}

export function useTodoStatusHistory(id: string): TodoStatusChange[] {
  const scope = captureTodoScope()
  const [value, setValue] = React.useState<{ scope: TodoRuntimeScope; id: string; history: TodoStatusChange[] } | null>(null)
  React.useEffect(() => {
    const { reader, release } = acquireSelectedHistory(scope, id)
    let generation = 0
    let disposed = false
    const reload = (): void => {
      const revision = ++generation
      void selectedStatusHistory(scope, id, reader).then((history) => {
        if (!disposed && revision === generation) setValue({ scope, id, history })
      }).catch(() => {})
    }
    const off = scope.api.data.dataset(STATUS_HISTORY_DATASET).subscribe((event) => {
      if (!event.keys || event.keys.some((key) => key.taskId === id)) reload()
    })
    const dispose = (): void => { disposed = true; off(); release() }
    const detach = scope.onDispose(dispose)
    reload()
    return () => { detach(); dispose() }
  }, [id, scope])
  return value?.id === id && value.scope === scope ? value.history : []
}

export function loadTodos(): Promise<TodoRecord[]> {
  return loadTodoProjection(true)
}

export async function loadTodo(id: string): Promise<TodoRecord | null> {
  if (!id) return null
  return (await loadTodoProjection(true, id))[0] ?? null
}

export function loadCalendarTodoPage(startDate: string, endDate: string, limit: number, cursor?: string): Promise<{ todos: TodoRecord[]; cursor?: string }> {
  const scope = captureTodoScope()
  return coalescedRead(scope, 'calendarPage', CALENDAR_DATASETS, JSON.stringify([startDate, endDate, limit, cursor]), async () => {
    scope.assertActive()
    const page = await scope.api.data.dataset(TASKS_DATASET).query({
      where: { dueDate: { gte: startDate, lt: `${endDate}\uffff` } },
      orderBy: [{ field: 'dueDate', direction: 'asc' }, { field: 'id', direction: 'asc' }],
      limit,
      cursor
    })
    scope.assertActive()
    const related = async (dataset: string): Promise<DatasetRecord[]> => {
      const rows: DatasetRecord[] = []
      for (let offset = 0; offset < page.rows.length; offset += 100) {
        rows.push(...await allRows(dataset, { taskId: { in: page.rows.slice(offset, offset + 100).map(row => String(row.id)) } }, scope))
      }
      return rows
    }
    const results = await Promise.allSettled([related(TAGS_DATASET), related(LINKS_DATASET), related(ATTACHMENTS_DATASET)])
    const [tags, links, attachments] = results.map(result => {
      if (result.status === 'rejected') throw result.reason
      return result.value
    })
    scope.assertActive()
    return { todos: hydrateTodos(page.rows, { tags, links, attachments, sessions: [], statusHistory: [] }, normalizeGroups(scope.api.getState().groups)), ...(page.cursor ? { cursor: page.cursor } : {}) }
  })
}

// Raw record IO — no change event, no undo registration. The exported CRUD
// wraps these; undo/redo closures call them directly to avoid re-registering.
// Bus write commands (`commands.ts`) also use these and return a `revert` op, so
// the command bus owns the single undo registration (never double-registered).
async function rawAppendData(record: TodoRecord): Promise<boolean> {
  const next = forWrite(record)
  try {
    await api.data.transaction([
      { dataset: TASKS_DATASET, operation: 'insert', values: taskRow(next) },
      ...relationWrites(next)
    ])
    return true
  } catch {
    return false
  }
}
export type DocumentRevision = Parameters<NonNullable<NoteInputProps['onRevisionChange']>>[0]

async function rawUpdateData(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision): Promise<boolean> {
  try {
    const ref = { pluginId: api.pluginId, sourceId: 'tasks', itemId: id }
    const baseline = await api.documents.read(ref)
    if (!baseline) return false
    const current = await loadTodo(id)
    if (!current || (expectedUpdatedAt !== undefined && current.updatedAt !== expectedUpdatedAt)) return false
    let next = { ...record, id, history: isTodoListRecord(record) && record.history === undefined ? current.history : record.history }
    const from = effectiveStatus(current)
    const to = effectiveStatus(next)
    const statusHistory = [...(current.statusHistory ?? [])]
    if (from !== to) statusHistory.push({ from, to, changedAt: new Date().toISOString() })
    next = { ...next, statusHistory: statusHistory.length ? statusHistory : undefined }
    const persisted = forWrite(next)
    const relations = await todoRelations(id, true, false)
    const row = taskRow(persisted)
    delete row.id
    delete row.note
    const committed = await api.documents.update(ref, {
      expectedRevision: documentRevision?.expectedRevision ?? baseline.revision,
      vaultGeneration: documentRevision?.vaultGeneration ?? baseline.vaultGeneration,
      body: persisted.note,
      explicitTags: persisted.tags ?? [],
      operations: [
        { dataset: TASKS_DATASET, operation: 'update', key: { id }, values: row },
        ...relationDeletes(id, relations),
        ...relationWrites(persisted, false)
      ]
    })
    if (documentRevision) Object.assign(documentRevision, { expectedRevision: committed.revision, vaultGeneration: committed.vaultGeneration })
    return true
  } catch {
    return false
  }
}
async function rawDeleteData(id: string): Promise<boolean> {
  try {
    return (await api.data.dataset(TASKS_DATASET).delete({ id })).affected > 0
  } catch {
    return false
  }
}

export const rawAppend = rawAppendData
export const rawUpdate = rawUpdateData
export const rawDelete = rawDeleteData

export async function appendTodo(record: TodoRecord): Promise<boolean> {
  if (!record.id || !record.title.trim()) return false
  const ok = await rawAppend(record)
  if (ok) {
    api.undo.push({
      label: uiText('todo.undo.add', { title: record.title.trim() }),
      undo: async () => ({ ok: await rawDelete(record.id) }),
      redo: async () => ({ ok: await rawAppend(record) })
    })
  }
  return ok
}

export async function updateTodo(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision): Promise<boolean> {
  if (!id || !record.title.trim()) return false
  const prev = await loadTodo(id)
  const next = isTodoListRecord(record) ? { ...record, history: record.history === undefined ? prev?.history : record.history } : record
  if (isTodoListRecord(next)) {
    delete (next as Partial<TodoListRecord>).historyLoaded
    delete (next as Partial<TodoListRecord>).completionSummary
  }
  const ok = await rawUpdate(id, next, expectedUpdatedAt, documentRevision)
  if (ok && prev) {
    api.undo.push({
      label: uiText('todo.undo.edit', { title: prev.title }),
      undo: async () => ({ ok: await rawUpdate(id, prev) }),
      redo: async () => ({ ok: await rawUpdate(id, next) })
    })
  }
  return ok
}

export async function deleteTodo(id: string): Promise<boolean> {
  const prev = await loadTodo(id)
  const ok = await rawDelete(id)
  if (ok && prev) {
    api.undo.push({
      label: uiText('todo.undo.delete', { title: prev.title }),
      undo: async () => ({ ok: await rawAppend(prev) }),
      redo: async () => ({ ok: await rawDelete(id) })
    })
  }
  return ok
}

/** Delete a subtree as one undoable mutation. IDs should be deepest-first. */
export async function deleteTodoSubtree(ids: string[], title: string): Promise<boolean> {
  const uniqueIds = [...new Set(ids)]
  if (!uniqueIds.length) return false
  const previous = (await loadTodos()).filter((todo) => uniqueIds.includes(todo.id))
  if (previous.length !== uniqueIds.length) return false

  const deleted: TodoRecord[] = []
  for (const id of uniqueIds) {
    if (!(await rawDelete(id))) {
      for (const todo of deleted.reverse()) await rawAppend(todo)
      return false
    }
    const todo = previous.find((candidate) => candidate.id === id)
    if (todo) deleted.push(todo)
  }

  api.undo.push({
    label: uiText('todo.undo.delete', { title }),
    undo: async () => {
      for (const todo of previous) {
        if (!(await rawAppend(todo))) return { ok: false }
      }
      return { ok: true }
    },
    redo: async () => {
      for (const id of uniqueIds) {
        if (!(await rawDelete(id))) return { ok: false }
      }
      return { ok: true }
    }
  })
  return true
}

/**
 * Ask before deleting, then delete through `remove` (the controller's optimistic
 * path). One helper because two surfaces offer the action — a row's ⋯ menu and
 * the detail modal's footer — and they must raise the same dialog.
 */
export async function confirmDeleteTodo(
  todo: Pick<TodoRecord, 'id' | 'title'>,
  remove: (id: string) => Promise<void>
): Promise<void> {
  const choice = await api.ui.confirm({
    title: uiText('todo.delete.title'),
    message: React.createElement(
      'span',
      null,
      React.createElement('strong', null, todo.title),
      ` ${uiText('todo.delete.message')}`
    ),
    actions: [
      { label: uiText('auto.77dfd2135f4d'), value: 'cancel', variant: 'ghost' },
      { label: uiText('auto.f6fdbe48dc54'), value: 'delete', variant: 'danger' }
    ]
  })
  if (choice === 'delete') await remove(todo.id)
}

/**
 * Bank a finished focus session onto a todo: push the session into `history`,
 * add its active time (not pause/idle) onto `actualMinutes`, optionally mark the
 * todo complete, then rewrite only that todo's record. Every other record —
 * including malformed lines the app didn't author — is preserved by the host's
 * serialized atomic update path.
 */
export async function logTodoSession(
  id: string,
  session: TodoSession,
  opts?: { complete?: boolean }
): Promise<boolean> {
  const current = await loadTodo(id)
  if (!current) return false
  const banked = normalizeHistory([session])
  if (!banked.length) return false
  const next: TodoRecord = {
    ...current,
    history: [...(current.history ?? []), banked[0]],
    actualMinutes: (current.actualMinutes ?? 0) + banked[0].activeMinutes,
    completed: opts?.complete ? true : current.completed,
    // Banking time is bookkeeping, not a state change: only an explicit
    // `complete` moves the status. (It used to stamp the retired `suspended`,
    // which silently overwrote whatever the user had chosen.)
    status: opts?.complete ? 'completed' : current.status,
    updatedAt: new Date().toISOString()
  }
  return updateTodo(id, next)
}

/**
 * Stamp a reminder as delivered. Goes through the *raw* path on purpose: a
 * reminder firing is the app's own bookkeeping, not a user edit, so it must not
 * land on the ⌘Z stack — undoing it would silently re-arm the alarm. Returns
 * false when the todo is gone or was already stamped, which is what makes the
 * caller's "stamp, then notify" order fire exactly once.
 */
export async function setReminderFired(id: string): Promise<boolean> {
  const current = await loadTodo(id)
  if (!current || current.reminderFiredAt) return false
  const now = new Date().toISOString()
  return rawUpdate(id, { ...current, reminderFiredAt: now, updatedAt: now })
}

/** Set a todo's focus-lifecycle status, rewriting only its record. */
export async function setTodoStatus(id: string, status: TodoStatus): Promise<boolean> {
  const current = await loadTodo(id)
  if (!current) return false
  return updateTodo(id, { ...current, ...patchForStatus(status), updatedAt: new Date().toISOString() })
}
