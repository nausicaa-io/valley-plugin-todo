import { normalizeGroups } from '@valley/plugin-sdk/groups'
import { captureTodoScope, type TodoRuntimeScope } from '../runtime'
import { readCompletionSummaries, type TodoListRecord } from '../domain/completion'
import { allStatuses } from '../state/statusStore'
import type { TodoRecord } from '../types'
import { hydrateTodos } from '../domain/records'
import { changedTaskIds } from '../domain/datasets'
import { LIST_DATASETS, coalescedRead, readTodoRows } from './reads'

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
