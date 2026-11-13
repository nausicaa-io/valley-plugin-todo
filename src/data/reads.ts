import type { DatasetRecord, DatasetWhere } from '@valley/plugin-sdk'
import type { DocumentRevision } from '../domain/rpc'
import { normalizeGroups } from '@valley/plugin-sdk/groups'
import { React, api, captureTodoScope, type TodoRuntimeScope } from '../runtime'
import type { TodoRecord, TodoStatusChange } from '../types'
import { hydrateTodos, normalizeStatusHistory, type TodoRelations } from '../domain/records'
import { ATTACHMENTS_DATASET, LINKS_DATASET, queryAll, SESSIONS_DATASET, STATUS_HISTORY_DATASET, TAGS_DATASET, TASKS_DATASET } from '../domain/datasets'

const CALENDAR_DATASETS = [TASKS_DATASET, TAGS_DATASET, LINKS_DATASET, ATTACHMENTS_DATASET]
const ALL_DATASETS = [...CALENDAR_DATASETS, SESSIONS_DATASET, STATUS_HISTORY_DATASET]
// The list reads its completion time from the task row; every status-history write updates that row in the same transaction.
export const LIST_DATASETS = CALENDAR_DATASETS

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

export async function readTodoRows(scope: TodoRuntimeScope, includeHistory: boolean, taskId?: string | string[]): Promise<{ tasks: DatasetRecord[]; relations: TodoRelations }> {
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

export function coalescedRead<T>(scope: TodoRuntimeScope, kind: string, datasets: string[], key: string, read: () => Promise<T>): Promise<T> {
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

