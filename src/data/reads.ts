import type { DataRecord } from '@valley/plugin-sdk/types'
import type { DatasetRecord, DatasetWhere } from '@valley/plugin-sdk'
import type { DocumentRevision, RecordsAppendPayload, RecordsDeletePayload, RecordsUpdatePayload, RecordsUpdateResult } from '../domain/rpc'
import { canonicalGroupName, normalizeGroups } from '@valley/plugin-sdk/groups'
import { React, api, captureTodoScope, type TodoRuntimeScope } from '../runtime'
import { isTodoListRecord, readCompletionSummaries, type TodoListRecord } from '../domain/completion'
import { uiText } from '../localization'
import { allStatuses, patchForStatus } from '../state/statusStore'
import type { TodoRecord, TodoStatus, TodoStatusChange } from '../types'
import { hydrateTodos, normalizeStatusHistory, type TodoRelations } from '../domain/records'
export { normalizeTodoRecord, normalizeTodoUrl } from '../domain/records'

import { ATTACHMENTS_DATASET, changedTaskIds, LINKS_DATASET, queryAll, SESSIONS_DATASET, STATUS_HISTORY_DATASET, TAGS_DATASET, TASKS_DATASET } from '../domain/datasets'
const CALENDAR_DATASETS = [TASKS_DATASET, TAGS_DATASET, LINKS_DATASET, ATTACHMENTS_DATASET]
const ALL_DATASETS = [...CALENDAR_DATASETS, SESSIONS_DATASET, STATUS_HISTORY_DATASET]
// The list reads its completion time from the task row; every status-history write updates that row in the same transaction.
const LIST_DATASETS = CALENDAR_DATASETS

/** One call per microtask however many of the datasets one write touched; none after the caller unsubscribes. */
function subscribeDatasets(datasets: string[], listener: () => void): () => void {
  const scope = captureTodoScope()
  let live = true
  let queued = false
  const notify = (): void => {
    if (queued) return
    queued = true
    queueMicrotask(() => { queued = false; if (live) listener() })
  }
  const disposers = datasets.map((dataset) => scope.api.data.dataset(dataset).subscribe(notify))
  const dispose = (): void => { live = false; disposers.forEach((off) => off()) }
  const detach = scope.onDispose(dispose)
  return () => { detach(); dispose() }
}

export function onChanged(listener: () => void): () => void { return subscribeDatasets(ALL_DATASETS, listener) }

export function onTodoListChanged(listener: () => void): () => void { return subscribeDatasets(LIST_DATASETS, listener) }

export function onCalendarItemsChanged(listener: () => void): () => void {
  const disposers = CALENDAR_DATASETS.map((dataset) => api.data.dataset(dataset).subscribe(listener))
  return () => disposers.forEach((dispose) => dispose())
}

function allRows(dataset: string, where?: DatasetWhere, scope = captureTodoScope(), from?: string): Promise<DatasetRecord[]> {
  return queryAll(scope.api, dataset, { where, cursor: from }, scope.assertActive)
}

const isLimitExceeded = (error: unknown): boolean => !!error && typeof error === 'object' && 'code' in error && error.code === 'limit-exceeded'

/**
 * Every page of several dataset queries, read together: each round is one host
 * snapshot (one round trip, one consistent read) of the next page of every query
 * that has one. A round the host refuses as too large is read query by query.
 */
async function allRowsTogether(reads: { dataset: string; where?: DatasetWhere }[], scope: TodoRuntimeScope): Promise<DatasetRecord[][]> {
  const rows = reads.map((): DatasetRecord[] => [])
  let pending = reads.map((read, index) => ({ ...read, index, cursor: undefined as string | undefined }))
  while (pending.length) {
    scope.assertActive()
    const requests = pending.map((read) => ({ operation: 'query' as const, dataset: read.dataset, query: { where: read.where, limit: 1000, cursor: read.cursor } }))
    let pages: { rows: DatasetRecord[]; cursor?: string }[]
    try {
      pages = (await scope.api.data.snapshot(requests)).values as typeof pages
    } catch (error) {
      if (!isLimitExceeded(error)) throw error
      const rest = await Promise.allSettled(pending.map((read) => allRows(read.dataset, read.where, scope, read.cursor)))
      rest.forEach((result, position) => {
        if (result.status === 'rejected') throw result.reason
        rows[pending[position].index].push(...result.value)
      })
      break
    }
    scope.assertActive()
    pending = pending.flatMap((read, position) => {
      rows[read.index].push(...pages[position].rows)
      const cursor = pages[position].cursor
      return cursor ? [{ ...read, cursor }] : []
    })
  }
  return rows
}

async function readTodoRows(scope: TodoRuntimeScope, includeHistory: boolean, taskId?: string | string[]): Promise<{ tasks: DatasetRecord[]; relations: TodoRelations }> {
  const ids = !taskId ? undefined : typeof taskId === 'string' ? taskId : { in: taskId }
  const where = ids === undefined ? undefined : { taskId: ids }
  const datasets = [LINKS_DATASET, ATTACHMENTS_DATASET, ...(includeHistory ? [SESSIONS_DATASET, STATUS_HISTORY_DATASET] : [])]
  const [tasks, tags, links, attachments, sessions = [], statusHistory = []] = await allRowsTogether([
    { dataset: TASKS_DATASET, where: ids === undefined ? undefined : { id: ids } },
    { dataset: TAGS_DATASET, where },
    ...datasets.map((dataset) => ({ dataset, where }))
  ], scope)
  scope.assertActive()
  return { tasks, relations: { tags, links, attachments, sessions, statusHistory } }
}

async function readTodos(scope: TodoRuntimeScope, includeHistory: boolean, taskId?: string | string[]): Promise<TodoRecord[]> {
  const { tasks, relations } = await readTodoRows(scope, includeHistory, taskId)
  return hydrateTodos(tasks, relations, normalizeGroups(scope.api.getState().groups))
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
    const ids = changedTaskIds(event, dataset)
    if (!ids) { created.full = true; created.dirty.clear(); return }
    for (const id of ids) created.dirty.add(id)
    if (created.dirty.size > LIST_PARTIAL_LIMIT) { created.full = true; created.dirty.clear() }
  }))
  scope.onDispose(() => { offs.forEach((off) => off()); listCaches.delete(scope) })
  listCaches.set(scope, created)
  cache = created
  return cache
}

const completionReady = new WeakMap<TodoRuntimeScope, Promise<boolean>>()

/** Whether the backend has filled `completedAt` for every saved task; asked once per runtime, again after a failure. */
function completionBackfilled(scope: TodoRuntimeScope): Promise<boolean> {
  let ready = completionReady.get(scope)
  if (!ready) {
    const asked = scope.api.backend.call<boolean>('records.completionReady').then((value) => value === true, () => false)
    void asked.then((value) => { if (!value && completionReady.get(scope) === asked) completionReady.delete(scope) })
    completionReady.set(scope, asked)
    ready = asked
  }
  return ready
}

/**
 * List records with their completion time from the task row (`completedAt`).
 * Until the backend reports the one-time backfill finished, tasks still without
 * one fall back to reading their status history, so the result never depends on
 * how far the backfill got.
 */
async function readListRecords(scope: TodoRuntimeScope, backfilled: boolean, ids?: string[]): Promise<TodoListRecord[]> {
  const todos: TodoRecord[] = []
  const completions = new Map<string, string>()
  const groups = normalizeGroups(scope.api.getState().groups)
  for (let offset = 0; offset < (ids?.length ?? 1); offset += 100) {
    const { tasks, relations } = await readTodoRows(scope, false, ids?.slice(offset, offset + 100))
    for (const row of tasks) if (typeof row.completedAt === 'string' && row.completedAt) completions.set(String(row.id), row.completedAt)
    todos.push(...hydrateTodos(tasks, relations, groups))
  }
  const missing = backfilled ? [] : todos.filter((todo) => !completions.has(todo.id)).map((todo) => todo.id)
  const summaries = missing.length ? await readCompletionSummaries(scope.api, missing, scope.assertActive, () => allStatuses()) : new Map<string, { changedAt: string }>()
  return todos.map((todo) => {
    const changedAt = completions.get(todo.id)
    return { ...todo, historyLoaded: false, completionSummary: changedAt ? { changedAt } : summaries.get(todo.id) ?? null }
  })
}

/**
 * The task list. The first read loads every task; afterwards a change that names
 * its tasks re-reads only those and merges them, so a write costs the same at
 * 20 tasks as at 2,000. Unkeyed changes, large batches and group renames read
 * the whole list again.
 */
export function loadTodoList(scope = captureTodoScope()): Promise<TodoListRecord[]> {
  try { scope.assertActive() } catch (error) { return Promise.reject(error) }
  // Asked before the read starts, so the backfill's own writes never count as a change during it.
  return completionBackfilled(scope).then((backfilled) => listRead(scope, backfilled))
}

function listRead(scope: TodoRuntimeScope, backfilled: boolean): Promise<TodoListRecord[]> {
  const cache = todoListCache(scope)
  return coalescedRead(scope, 'list', LIST_DATASETS, '', async () => {
    const groups = JSON.stringify(normalizeGroups(scope.api.getState().groups))
    if (cache.full || !cache.value || cache.groups !== groups) {
      cache.full = false
      cache.dirty.clear()
      try {
        cache.value = await readListRecords(scope, backfilled)
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
      changed = await readListRecords(scope, backfilled, ids)
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

export type { DocumentRevision } from '../domain/rpc'

export async function rawAppend(record: TodoRecord): Promise<boolean> {
  try { return await api.backend.call<boolean>('records.append', { record } satisfies RecordsAppendPayload) } catch { return false }
}

async function callUpdateResult(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision, exactStatusHistory = false): Promise<RecordsUpdateResult | null> {
  try {
    const result = await api.backend.call<RecordsUpdateResult>('records.update', { id, record, expectedUpdatedAt, documentRevision, ...(exactStatusHistory ? { exactStatusHistory } : {}) } satisfies RecordsUpdatePayload)
    if (result.ok && documentRevision && result.documentRevision) Object.assign(documentRevision, result.documentRevision)
    return result.ok ? result : null
  } catch { return null }
}

async function callUpdate(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision, exactStatusHistory = false): Promise<TodoRecord | null> {
  const result = await callUpdateResult(id, record, expectedUpdatedAt, documentRevision, exactStatusHistory)
  return result ? result.record ?? record : null
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
  try { return await api.backend.call<boolean>('records.delete', { id } satisfies RecordsDeletePayload) } catch { return false }
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

/**
 * Save an edit and register its undo. The undo snapshot is the record the owner
 * replaced, returned by `records.update`, with its group spelled as the list
 * spells it; a list record's omitted focus sessions are the owner's to keep.
 */
export async function updateTodo(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision): Promise<boolean> {
  if (!id || !record.title.trim()) return false
  const listed = isTodoListRecord(record)
  const sent = listed ? { ...record } : record
  if (listed) {
    delete (sent as Partial<TodoListRecord>).historyLoaded
    delete (sent as Partial<TodoListRecord>).completionSummary
  }
  const result = await callUpdateResult(id, sent, expectedUpdatedAt, documentRevision)
  const previous = result?.previous
  // As the list would have read it: groups in their configured spelling, a task without a title not at all.
  const prev = previous?.title ? { ...previous, group: canonicalGroupName(previous.group, normalizeGroups(api.getState().groups)) ?? previous.group } : null
  const next = listed ? { ...sent, history: record.history === undefined ? prev?.history : record.history } : record
  const ok = result !== null
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
/** Ask, then delete. Resolves whether the task was deleted (false on Cancel). */
export async function confirmDeleteTodo(
  todo: Pick<TodoRecord, 'id' | 'title'>,
  remove: (id: string) => Promise<void>
): Promise<boolean> {
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
  if (choice !== 'delete') return false
  await remove(todo.id)
  return true
}

/** Set a todo's focus-lifecycle status, rewriting only its record. */
export async function setTodoStatus(id: string, status: TodoStatus): Promise<boolean> {
  const current = await loadTodo(id)
  if (!current) return false
  return updateTodo(id, { ...current, ...patchForStatus(status), updatedAt: new Date().toISOString() })
}
