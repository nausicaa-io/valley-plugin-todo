import type { TodoRecord, TodoStatus } from '../types'
import { groupKey } from './groups'
import { addDays } from './dates'
import { completionTimestamp, localDayOfTimestamp } from './sections'
import { effectiveStatus } from './statusModel'
import { matchesViewScope, serializeView, type TodoView } from './views'

export interface ListFacts {
  total: number
  open: number
  completed: number
  overdue: number
  dueToday: number
  next7: number
  noDate: number
  flagged: number
  withReminder: number
  priority: { high: number; medium: number; low: number }
  statuses: Map<TodoStatus, number>
  groups: Map<string, { name: string; count: number }>
  ungrouped: number
  tags: Map<string, { name: string; count: number }>
  estimatedMinutes: number
  hasEstimate: boolean
  nextDue: { title: string; date: string } | null
  lastCompleted: string | null
  lastChange: string | null
  oldest: string | null
  newest: string | null
}

const EMPTY_DUE = '￿'

/**
 * Every fact the Info tab shows, for the tasks a view covers, in one walk over the
 * loaded list. The open/completed split is not part of the scope: a list's
 * Completed count is its finished tasks, so the scope is `matchesViewScope`.
 */
export function computeListFacts(todos: readonly TodoRecord[], view: TodoView, today: string): ListFacts {
  const facts: ListFacts = {
    total: 0, open: 0, completed: 0, overdue: 0, dueToday: 0, next7: 0, noDate: 0, flagged: 0, withReminder: 0,
    priority: { high: 0, medium: 0, low: 0 }, statuses: new Map(), groups: new Map(), ungrouped: 0, tags: new Map(),
    estimatedMinutes: 0, hasEstimate: false, nextDue: null, lastCompleted: null, lastChange: null, oldest: null, newest: null
  }
  const weekAhead = addDays(today, 7)
  let nextKey = EMPTY_DUE
  let lastCompletedStamp = ''
  let lastChangeStamp = ''
  let oldestStamp = ''
  let newestStamp = ''
  for (const todo of todos) {
    if (!matchesViewScope(todo, view, today)) continue
    facts.total++
    const status = effectiveStatus(todo)
    facts.statuses.set(status, (facts.statuses.get(status) ?? 0) + 1)
    if (todo.group) {
      const key = groupKey(todo.group)
      const entry = facts.groups.get(key)
      if (entry) entry.count++
      else facts.groups.set(key, { name: todo.group, count: 1 })
    } else facts.ungrouped++
    for (const raw of todo.tags ?? []) {
      const name = raw.replace(/^#/, '')
      if (!name) continue
      const key = name.toLowerCase()
      const entry = facts.tags.get(key)
      if (entry) entry.count++
      else facts.tags.set(key, { name, count: 1 })
    }
    if (typeof todo.estimatedMinutes === 'number' && todo.estimatedMinutes > 0) {
      facts.estimatedMinutes += todo.estimatedMinutes
      facts.hasEstimate = true
    }
    if (todo.updatedAt && todo.updatedAt > lastChangeStamp) lastChangeStamp = todo.updatedAt
    if (todo.createdAt) {
      if (!oldestStamp || todo.createdAt < oldestStamp) oldestStamp = todo.createdAt
      if (todo.createdAt > newestStamp) newestStamp = todo.createdAt
    }
    if (todo.completed) {
      facts.completed++
      const stamp = completionTimestamp(todo)
      if (stamp > lastCompletedStamp) lastCompletedStamp = stamp
      continue
    }
    facts.open++
    if (todo.flagged) facts.flagged++
    if (todo.remindAt || todo.reminderTime || todo.reminderOffsets?.length) facts.withReminder++
    if (todo.priority === 'high' || todo.priority === 'medium' || todo.priority === 'low') facts.priority[todo.priority]++
    const due = todo.dueDate?.slice(0, 10) ?? ''
    if (!due) { facts.noDate++; continue }
    if (due < today) facts.overdue++
    else {
      if (due === today) facts.dueToday++
      else if (due <= weekAhead) facts.next7++
      const key = `${due} ${todo.startTime || '24:00'}`
      if (key < nextKey) { nextKey = key; facts.nextDue = { title: todo.title, date: due } }
    }
  }
  facts.lastCompleted = lastCompletedStamp ? localDayOfTimestamp(lastCompletedStamp) : null
  facts.lastChange = lastChangeStamp ? localDayOfTimestamp(lastChangeStamp) : null
  facts.oldest = oldestStamp ? localDayOfTimestamp(oldestStamp) : null
  facts.newest = newestStamp ? localDayOfTimestamp(newestStamp) : null
  return facts
}

const MEMO_VIEWS = 6
let memo: { todos: readonly TodoRecord[]; today: string; byView: Map<string, ListFacts> } | null = null

/** {@link computeListFacts}, kept per view for the current (list, day), so unrelated refreshes and the other surfaces cost nothing. */
export function listFacts(todos: readonly TodoRecord[], view: TodoView, today: string): ListFacts {
  if (!memo || memo.todos !== todos || memo.today !== today) memo = { todos, today, byView: new Map() }
  const key = serializeView(view)
  const hit = memo.byView.get(key)
  if (hit) return hit
  const facts = computeListFacts(todos, view, today)
  if (memo.byView.size >= MEMO_VIEWS) memo.byView.delete(memo.byView.keys().next().value as string)
  memo.byView.set(key, facts)
  return facts
}
