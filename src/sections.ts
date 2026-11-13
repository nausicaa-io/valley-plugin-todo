import type { TodoPriority, TodoRecord } from './types'
import { byPriorityThenName, byStartTimeThenPriority, compareByName } from './sort'
import { parseLocalDate, startOfWeek } from '@valley/plugin-sdk/dateGrid'
import { addDays, isoDay } from './dates'
import { isTodoListRecord } from './completionHistory'

/**
 * Pure logic behind the main-workspace To-Do page: section bucketing, header
 * stats and the quick-add token parser. Kept free of React/api so it is
 * unit-testable.
 */

export type TodoSectionId = 'overdue' | 'today' | 'upcoming' | 'someday' | 'completed'

export const SECTION_ORDER: TodoSectionId[] = ['overdue', 'today', 'upcoming', 'someday', 'completed']

/** i18n keys, resolved per render — a label read at module scope freezes at the
 *  language of first import. */
export const SECTION_LABEL_KEYS: Record<TodoSectionId, string> = {
  overdue: 'todo.due.overdue',
  today: 'todo.due.today',
  upcoming: 'todo.section.upcoming',
  someday: 'todo.section.someday',
  completed: 'todo.view.completed'
}

/** Local `YYYY-MM-DD` for "today" (calendar day, not UTC). */
export const todayIso = (now: Date = new Date()): string => isoDay(now)

/**
 * Bucket todos into the page sections relative to `today`:
 * completed → Completed; a due date before today → Overdue; today → Today;
 * later → Upcoming; no due date → Someday. Sections come back internally
 * sorted: overdue/upcoming by due date (most urgent first), today by start
 * time then priority, someday by priority then name, completed by `updatedAt`
 * (most recently touched first).
 */
export function bucketTodos(
  todos: TodoRecord[],
  today: string = todayIso()
): Record<TodoSectionId, TodoRecord[]> {
  const out: Record<TodoSectionId, TodoRecord[]> = {
    overdue: [],
    today: [],
    upcoming: [],
    someday: [],
    completed: []
  }
  for (const todo of todos) {
    if (todo.completed) {
      out.completed.push(todo)
      continue
    }
    const due = todo.dueDate?.slice(0, 10) ?? ''
    if (!due) out.someday.push(todo)
    else if (due < today) out.overdue.push(todo)
    else if (due === today) out.today.push(todo)
    else out.upcoming.push(todo)
  }
  const byDue = (a: TodoRecord, b: TodoRecord): number =>
    a.dueDate.localeCompare(b.dueDate) || byStartTimeThenPriority(a, b)
  out.overdue.sort(byDue)
  out.upcoming.sort(byDue)
  out.today.sort(byStartTimeThenPriority)
  out.someday.sort(byPriorityThenName)
  out.completed.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || compareByName(a, b))
  return out
}

export type DateBreakdown = 'monthly' | 'weekly' | 'daily'

export interface PanelDateSection {
  /** `''` for undated, otherwise a day, week-start day, or month. */
  key: string
  kind: 'none' | DateBreakdown
  todos: TodoRecord[]
}

export function completionTimestamp(todo: TodoRecord): string {
  if (isTodoListRecord(todo)) return todo.completionSummary?.changedAt || todo.updatedAt || todo.createdAt
  const transition = [...(todo.statusHistory ?? [])]
    .reverse()
    .find((change) => change.to === 'completed' || change.to === 'canceled')
  return transition?.changedAt || todo.updatedAt || todo.createdAt
}

export function localDayOfTimestamp(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value.slice(0, 10) : todayIso(date)
}

export function completionTimelineSections(todos: TodoRecord[]): PanelDateSection[] {
  // Each timestamp walks the status history, so compute it once per task
  // rather than twice per comparison.
  const stamps = new Map(todos.map((todo) => [todo, completionTimestamp(todo)]))
  const ordered = [...todos].sort((a, b) =>
    stamps.get(b)!.localeCompare(stamps.get(a)!) || compareByName(a, b)
  )
  const buckets = new Map<string, TodoRecord[]>()
  for (const todo of ordered) {
    const day = localDayOfTimestamp(stamps.get(todo)!)
    const bucket = buckets.get(day)
    if (bucket) bucket.push(todo)
    else buckets.set(day, [todo])
  }
  return [...buckets.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, list]) => ({ key, kind: 'daily', todos: list }))
}

/**
 * Date sections for narrow To-Do panels. Input order is retained inside each
 * bucket so a user's selected sort remains authoritative.
 */
export function panelDateSections(
  todos: TodoRecord[],
  mode: DateBreakdown,
  weekStart = 1,
  options?: { dateOf?: (todo: TodoRecord) => string }
): PanelDateSection[] {
  const dateOf = options?.dateOf ?? ((todo: TodoRecord) => todo.dueDate?.slice(0, 10) ?? '')
  const keyFor = (day: string): string => {
    if (!day) return ''
    if (mode === 'monthly') return day.slice(0, 7)
    if (mode === 'daily') return day
    return todayIso(startOfWeek(parseLocalDate(day), weekStart))
  }
  const buckets = new Map<string, TodoRecord[]>()
  for (const todo of todos) {
    const key = keyFor(dateOf(todo))
    const bucket = buckets.get(key)
    if (bucket) bucket.push(todo)
    else buckets.set(key, [todo])
  }
  return [...buckets.entries()]
    .sort(([a], [b]) => (a === '' ? -1 : b === '' ? 1 : b.localeCompare(a)))
    .map(([key, list]) => ({ key, kind: key ? mode : 'none', todos: list }))
}

export interface QuickAddParse {
  title: string
  dueDate: string
  priority: TodoPriority
}

/**
 * Parse quick-add tokens out of a raw title:
 * `@today` / `@tomorrow` / `@YYYY-MM-DD` set the due date, `!` / `!!` / `!!!`
 * set the priority (low / medium / high). Tokens can sit anywhere in the text;
 * the leftover words become the title.
 */
export function parseQuickAdd(raw: string, today: string = todayIso()): QuickAddParse {
  let dueDate = ''
  let priority: TodoPriority = 'normal'

  const withoutDates = raw.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi, (_m, pre: string, token: string) => {
    const t = token.toLowerCase()
    if (t === 'today') dueDate = today
    else if (t === 'tomorrow') {
      const d = new Date(`${today}T00:00:00`)
      d.setDate(d.getDate() + 1)
      dueDate = todayIso(d)
    } else dueDate = token
    return pre
  })

  const withoutPriority = withoutDates.replace(/(^|\s)(!{1,3})(?=\s|$)/g, (_m, pre: string, bangs: string) => {
    priority = bangs.length >= 3 ? 'high' : bangs.length === 2 ? 'medium' : 'low'
    return pre
  })

  return { title: withoutPriority.replace(/\s+/g, ' ').trim(), dueDate, priority }
}
