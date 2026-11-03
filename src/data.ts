import type { DataRecord } from '@valley/plugin-sdk/types'
import type { DatasetRecord, DatasetWhere, NoteInputProps } from '@valley/plugin-sdk'
import { normalizeGroups } from '@valley/plugin-sdk/groups'
import { React, api, captureTodoScope, type TodoRuntimeScope } from './runtime'
import { isTodoListRecord, readCompletionSummaries, type TodoListRecord } from './completionHistory'
import { uiText } from './localization'
import { patchForStatus } from './statuses'
import type { TodoRecord, TodoSession, TodoStatus, TodoStatusChange } from './types'
import { hydrateTodos, normalizeHistory, normalizeStatusHistory, type TodoRelations } from './records'
export { normalizeTodoRecord, normalizeTodoUrl } from './records'

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

async function todoRelations(taskId?: string | string[], includeHistory = true, includeTags = true, scope = captureTodoScope()): Promise<TodoRelations> {
  const where = !taskId ? undefined : { taskId: typeof taskId === 'string' ? taskId : { in: taskId } }
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

async function readTodos(scope: TodoRuntimeScope, includeHistory: boolean, taskId?: string | string[]): Promise<TodoRecord[]> {
  const where = !taskId ? undefined : { id: typeof taskId === 'string' ? taskId : { in: taskId } }
  const [tasksResult, relationsResult] = await Promise.allSettled([allRows(TASKS_DATASET, where, scope), todoRelations(taskId, includeHistory, true, scope)])
  if (tasksResult.status === 'rejected') throw tasksResult.reason
  if (relationsResult.status === 'rejected') throw relationsResult.reason
  scope.assertActive()
  return hydrateTodos(tasksResult.value, relationsResult.value, normalizeGroups(scope.api.getState().groups))
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

const LIST_PARTIAL_LIMIT = 200

/** Task ids a To-Do dataset change names, or null when it names none (the list must be read again in full). */
export function changedTodoIds(event: { dataset?: string; keys?: unknown }, dataset: string): string[] | null {
  const keys = event.keys
  if (!Array.isArray(keys) || !keys.length || keys.length > LIST_PARTIAL_LIMIT) return null
  const field = dataset === TASKS_DATASET ? 'id' : 'taskId'
  const ids: string[] = []
  for (const key of keys) {
    const id = (key as Record<string, unknown> | null)?.[field]
    if (typeof id !== 'string' || !id) return null
    ids.push(id)
  }
  return ids
}

interface TodoListCache {
  value?: TodoListRecord[]
  groups?: string
  dirty: Set<string>
  full: boolean
}

const listCaches = new WeakMap<TodoRuntimeScope, TodoListCache>()

function todoListCache(scope: TodoRuntimeScope): TodoListCache {
  let cache = listCaches.get(scope)
  if (cache) return cache
  const created: TodoListCache = { dirty: new Set(), full: true }
  const offs = LIST_DATASETS.map((dataset) => scope.api.data.dataset(dataset).subscribe((event) => {
    if (created.full) return
    const ids = event ? changedTodoIds(event, dataset) : null
    if (!ids) { created.full = true; created.dirty.clear(); return }
    for (const id of ids) created.dirty.add(id)
    if (created.dirty.size > LIST_PARTIAL_LIMIT) { created.full = true; created.dirty.clear() }
  }))
  scope.onDispose(() => { offs.forEach((off) => off()); listCaches.delete(scope) })
  listCaches.set(scope, created)
  cache = created
  return cache
}

async function readListRecords(scope: TodoRuntimeScope, ids?: string[]): Promise<TodoListRecord[]> {
  let todos: TodoRecord[]
  if (!ids) todos = await readTodos(scope, false)
  else {
    todos = []
    for (let offset = 0; offset < ids.length; offset += 100) todos.push(...await readTodos(scope, false, ids.slice(offset, offset + 100)))
  }
  const summaries = await readCompletionSummaries(scope.api, todos.map((todo) => todo.id), scope.assertActive)
  return todos.map((todo) => ({ ...todo, historyLoaded: false, completionSummary: summaries.get(todo.id) ?? null }))
}

/**
 * The task list. The first read loads every task; afterwards a change that names
 * its tasks re-reads only those and merges them, so a write costs the same at
 * 20 tasks as at 2,000. Unkeyed changes, large batches and group renames read
 * the whole list again.
 */
export function loadTodoList(scope = captureTodoScope()): Promise<TodoListRecord[]> {
  const cache = todoListCache(scope)
  return coalescedRead(scope, 'list', LIST_DATASETS, '', async () => {
    const groups = JSON.stringify(normalizeGroups(scope.api.getState().groups))
    if (cache.full || !cache.value || cache.groups !== groups) {
      cache.full = false
      cache.dirty.clear()
      try {
        cache.value = await readListRecords(scope)
        cache.groups = groups
      } catch (error) {
        cache.full = true
        throw error
      }
      return cache.value
    }
    if (!cache.dirty.size) return cache.value
    const ids = [...cache.dirty]
    cache.dirty.clear()
    let changed: TodoListRecord[]
    try {
      changed = await readListRecords(scope, ids)
    } catch (error) {
      for (const id of ids) cache.dirty.add(id)
      throw error
    }
    const byId = new Map(changed.map((todo) => [todo.id, todo]))
    const touched = new Set(ids)
    const next: TodoListRecord[] = []
    for (const todo of cache.value) {
      if (!touched.has(todo.id)) next.push(todo)
      else {
        const updated = byId.get(todo.id)
        if (updated) { next.push(updated); byId.delete(todo.id) }
      }
    }
    next.push(...byId.values())
    cache.value = next
    return next
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
      where: { and: [{ dueDate: { gte: startDate } }, { dueDate: { lt: `${endDate}\uffff` } }] },
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

export type DocumentRevision = Parameters<NonNullable<NoteInputProps['onRevisionChange']>>[0]

export async function rawAppend(record: TodoRecord): Promise<boolean> {
  try { return await api.backend.call<boolean>('records.append', { record }) } catch { return false }
}

async function callUpdate(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision, exactStatusHistory = false): Promise<TodoRecord | null> {
  try {
    const result = await api.backend.call<{ ok: boolean; record?: TodoRecord; documentRevision?: DocumentRevision }>('records.update', { id, record, expectedUpdatedAt, documentRevision, ...(exactStatusHistory ? { exactStatusHistory } : {}) })
    if (result.ok && documentRevision && result.documentRevision) Object.assign(documentRevision, result.documentRevision)
    return result.ok ? result.record ?? record : null
  } catch { return null }
}

export async function rawUpdate(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision): Promise<boolean> {
  return (await callUpdate(id, record, expectedUpdatedAt, documentRevision)) !== null
}

/** Update and return the record as committed, including the status transition the owner appended. */
export function rawUpdateCommitted(id: string, record: TodoRecord, expectedUpdatedAt?: string): Promise<TodoRecord | null> {
  return callUpdate(id, record, expectedUpdatedAt)
}

/** Write back an exact earlier snapshot (undo/redo of a command), keeping its status history instead of logging a new transition. */
export async function rawRestore(id: string, record: TodoRecord): Promise<boolean> {
  return (await callUpdate(id, record, undefined, undefined, true)) !== null
}

export async function rawDelete(id: string): Promise<boolean> {
  try { return await api.backend.call<boolean>('records.delete', { id }) } catch { return false }
}

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
