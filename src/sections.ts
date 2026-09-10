import type { TodoPriority, TodoRecord } from '@valley/plugin-sdk/types'
import { byPriorityThenName, byStartTimeThenPriority, compareByName } from './sort'
import { descendantIds } from './tree'
import { parseLocalDate, startOfWeek } from '@valley/plugin-sdk/dateGrid'

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
export function todayIso(now: Date = new Date()): string {
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${mm}-${dd}`
}

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

export interface DaySection {
  /** `YYYY-MM-DD`, or `''` for the no-deadline bucket. */
  key: string
  todos: TodoRecord[]
  /** The day is in the past — the header reads in `--negative-color`. */
  overdue: boolean
}

/**
 * Bucket todos under **date headers**, the way Scheduled and Today read.
 *
 * The date moves out of every row and onto one line above the group: in a
 * date-ordered list the row repeats what the header already said, and at 245px
 * that repetition is the widest thing on the line.
 *
 * Children are pulled to their parent's day even when their own due date says
 * otherwise, so a subtree is never split across two headers — a step of a task
 * belongs beside the task. Undated todos land in one trailing `''` bucket.
 */
export function groupByDay(todos: TodoRecord[], today: string = todayIso()): DaySection[] {
  const dayOf = new Map<string, string>()
  const byId = new Map(todos.map((t) => [t.id, t]))
  const roots = todos.filter((t) => !t.parentId || !byId.has(t.parentId))
  for (const root of roots) {
    const day = root.dueDate?.slice(0, 10) ?? ''
    dayOf.set(root.id, day)
    for (const child of descendantIds(todos, root.id)) dayOf.set(child, day)
  }

  const buckets = new Map<string, TodoRecord[]>()
  for (const todo of todos) {
    const day = dayOf.get(todo.id) ?? todo.dueDate?.slice(0, 10) ?? ''
    const bucket = buckets.get(day)
    if (bucket) bucket.push(todo)
    else buckets.set(day, [todo])
  }

  return [...buckets.entries()]
    // Dated days ascending; the undated bucket always last.
    .sort(([a], [b]) => (a === '' ? 1 : b === '' ? -1 : a.localeCompare(b)))
    .map(([key, list]) => ({
      key,
      overdue: !!key && key < today,
      todos: list.sort(byStartTimeThenPriority)
    }))
}

export type DateBreakdown = 'monthly' | 'weekly' | 'daily'

export interface PanelDateSection {
  /** `''` for undated, otherwise a day, week-start day, or month. */
  key: string
  kind: 'none' | DateBreakdown
  todos: TodoRecord[]
}

export function completionTimestamp(todo: TodoRecord): string {
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
  const ordered = [...todos].sort((a, b) =>
    completionTimestamp(b).localeCompare(completionTimestamp(a)) || compareByName(a, b)
  )
  const buckets = new Map<string, TodoRecord[]>()
  for (const todo of ordered) {
    const day = localDayOfTimestamp(completionTimestamp(todo))
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
 * bucket so a user's selected sort remains authoritative. Descendants inherit
 * their root's date and therefore never split away from the parent row.
 */
export function panelDateSections(
  todos: TodoRecord[],
  mode: DateBreakdown,
  weekStart = 1,
  options?: { dateOf?: (todo: TodoRecord) => string; inheritRoot?: boolean }
): PanelDateSection[] {
  const dateOf = options?.dateOf ?? ((todo: TodoRecord) => todo.dueDate?.slice(0, 10) ?? '')
  const byId = new Map(todos.map((todo) => [todo.id, todo]))
  const dayOf = new Map<string, string>()
  if (options?.inheritRoot !== false) {
    for (const root of todos.filter((todo) => !todo.parentId || !byId.has(todo.parentId))) {
      const day = dateOf(root)
      dayOf.set(root.id, day)
      for (const childId of descendantIds(todos, root.id)) dayOf.set(childId, day)
    }
  }

  const keyFor = (day: string): string => {
    if (!day) return ''
    if (mode === 'monthly') return day.slice(0, 7)
    if (mode === 'daily') return day
    return todayIso(startOfWeek(parseLocalDate(day), weekStart))
  }
  const buckets = new Map<string, TodoRecord[]>()
  for (const todo of todos) {
    const key = keyFor(dayOf.get(todo.id) ?? dateOf(todo))
    const bucket = buckets.get(key)
    if (bucket) bucket.push(todo)
    else buckets.set(key, [todo])
  }
  return [...buckets.entries()]
    .sort(([a], [b]) => (a === '' ? -1 : b === '' ? 1 : b.localeCompare(a)))
    .map(([key, list]) => ({ key, kind: key ? mode : 'none', todos: list }))
}

export type TimeOfDayId = 'untimed' | 'morning' | 'afternoon' | 'tonight'

/**
 * Where a `"HH:MM"` falls. The two boundaries are the ones a day is actually
 * described with, not equal thirds: noon, and the hour work stops.
 */
export const TIME_OF_DAY_ORDER: TimeOfDayId[] = ['untimed', 'morning', 'afternoon', 'tonight']

export const TIME_OF_DAY_LABEL_KEYS: Record<TimeOfDayId, string> = {
  untimed: '',
  morning: 'todo.timeOfDay.morning',
  afternoon: 'todo.timeOfDay.afternoon',
  tonight: 'todo.timeOfDay.tonight'
}

export function timeOfDay(startTime: string | undefined): TimeOfDayId {
  if (!startTime) return 'untimed'
  const hour = Number(startTime.slice(0, 2))
  if (!Number.isFinite(hour)) return 'untimed'
  if (hour < 12) return 'morning'
  return hour < 18 ? 'afternoon' : 'tonight'
}

export interface TimeSection {
  id: TimeOfDayId
  todos: TodoRecord[]
}

/**
 * Split one day's todos into Morning · Afternoon · Tonight.
 *
 * Untimed work leads with **no header**: it is the bulk of most days, and a
 * "Whenever" heading above it would be the loudest thing on a screen whose point
 * is the timed items. Empty buckets are dropped rather than rendered hollow, and
 * a subtree stays with its parent for the same reason `groupByDay` does — a step
 * of a task belongs beside the task, whatever hour it names.
 */
export function groupByTimeOfDay(todos: TodoRecord[]): TimeSection[] {
  const byId = new Map(todos.map((t) => [t.id, t]))
  const slotOf = new Map<string, TimeOfDayId>()
  for (const root of todos.filter((t) => !t.parentId || !byId.has(t.parentId))) {
    const slot = timeOfDay(root.startTime)
    slotOf.set(root.id, slot)
    for (const child of descendantIds(todos, root.id)) slotOf.set(child, slot)
  }

  const buckets = new Map<TimeOfDayId, TodoRecord[]>()
  for (const todo of todos) {
    const slot = slotOf.get(todo.id) ?? timeOfDay(todo.startTime)
    const bucket = buckets.get(slot)
    if (bucket) bucket.push(todo)
    else buckets.set(slot, [todo])
  }

  return TIME_OF_DAY_ORDER.filter((id) => buckets.has(id)).map((id) => ({
    id,
    todos: buckets.get(id)!.sort(byStartTimeThenPriority)
  }))
}

export interface MonthSection {
  /** `YYYY-MM`. */
  key: string
  days: DaySection[]
  /** The rest of the current month, which reads "Rest of <Month>" not "<Month>". */
  partial: boolean
}

/**
 * How far ahead Scheduled keeps a header per day before rolling up into months.
 * Two weeks is the horizon a day header still means something over: past it the
 * list is a wall of near-empty headings, which is what a month row replaces.
 */
export const DAY_HEADER_HORIZON_DAYS = 14

function monthKey(day: string): string {
  return day.slice(0, 7)
}

/**
 * Split future day sections into the near ones — which keep their own day
 * header — and the rest, rolled up per month.
 *
 * `from` is the day the horizon is measured from, and days at or before it are
 * assumed already handled by the caller's Overdue/Today blocks; only later days
 * reach here.
 */
export function rollUpFutureDays(
  days: DaySection[],
  from: string,
  horizonDays: number = DAY_HEADER_HORIZON_DAYS
): { near: DaySection[]; months: MonthSection[] } {
  const horizon = addDaysIso(from, horizonDays)
  const near: DaySection[] = []
  const later: DaySection[] = []
  for (const day of days) {
    // The undated bucket has no month to belong to, so it stays with the near
    // list and renders under its own "No deadline" header, as it always has.
    if (!day.key || day.key <= horizon) near.push(day)
    else later.push(day)
  }

  const byMonth = new Map<string, DaySection[]>()
  for (const day of later) {
    const key = monthKey(day.key)
    const bucket = byMonth.get(key)
    if (bucket) bucket.push(day)
    else byMonth.set(key, [day])
  }

  const currentMonth = monthKey(from)
  const months = [...byMonth.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, list]) => ({ key, days: list, partial: key === currentMonth }))

  return { near, months }
}

/** `YYYY-MM-DD` plus n days, calendar-safe across month and year ends. */
function addDaysIso(day: string, days: number): string {
  const [y, m, d] = day.split('-').map(Number)
  const date = new Date(y, (m || 1) - 1, (d || 1) + days)
  return todayIso(date)
}

export interface PageStats {
  open: number
  dueToday: number
  overdue: number
  /** Total tracked time across all todos (`actualMinutes` sum). */
  trackedMinutes: number
}

export function pageStats(todos: TodoRecord[], today: string = todayIso()): PageStats {
  let open = 0
  let dueToday = 0
  let overdue = 0
  let trackedMinutes = 0
  for (const todo of todos) {
    trackedMinutes += todo.actualMinutes ?? 0
    if (todo.completed) continue
    open++
    const due = todo.dueDate?.slice(0, 10) ?? ''
    if (!due) continue
    if (due === today) dueToday++
    else if (due < today) overdue++
  }
  return { open, dueToday, overdue, trackedMinutes }
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
