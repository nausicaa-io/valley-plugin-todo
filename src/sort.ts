import type { TodoPriority, TodoRecord } from '@valley/plugin-sdk/types'
import { formatIsoDateByPattern, formatIsoDateByShortPattern } from '@valley/plugin-sdk/datePattern'
import { uiText } from './localization'

export interface PriorityDef {
  id: TodoPriority
  labelKey: string
  symbol: string
}

export const PRIORITIES: PriorityDef[] = [
  { id: 'normal', labelKey: 'todo.priority.none', symbol: '' },
  { id: 'low', labelKey: 'todo.priority.low', symbol: '!' },
  { id: 'medium', labelKey: 'todo.priority.medium', symbol: '!!' },
  { id: 'high', labelKey: 'todo.priority.high', symbol: '!!!' }
]

/** Priority dropdown options, ordered none → high. */
export function priorityOptions(): { value: TodoPriority; label: string }[] {
  return PRIORITIES.map((p) => ({ value: p.id, label: uiText(p.labelKey) }))
}

export type SortField = 'due' | 'priority' | 'flagged' | 'updated' | 'created' | 'name'
export type SortDir = 'desc' | 'asc'
/** Keys, resolved at render — a module-level `uiText` would freeze the language. */
export const SORT_LABEL_KEYS: Record<SortField, string> = {
  due: 'todo.sort.due',
  priority: 'todo.sort.priority',
  flagged: 'todo.flagged',
  updated: 'todo.sort.updated',
  created: 'todo.sort.created',
  name: 'todo.sort.name'
}

export const PRIORITY_RANK: Record<TodoPriority, number> = { high: 3, medium: 2, low: 1, normal: 0 }

export function compareByName(a: TodoRecord, b: TodoRecord): number {
  return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
}

export function compareTodos(a: TodoRecord, b: TodoRecord, field: SortField): number {
  if (field === 'name') {
    return compareByName(a, b)
  }
  if (field === 'priority') {
    // asc = high → normal (most urgent first); desc = normal → high
    const r = PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority]
    return r !== 0 ? r : byStartTimeThenPriority(a, b)
  }
  if (field === 'flagged') {
    const byFlag = Number(!!b.flagged) - Number(!!a.flagged)
    return byFlag !== 0 ? byFlag : byStartTimeThenPriority(a, b)
  }
  if (field === 'due') {
    // No-deadline first, then ascending due date (most urgent → furthest).
    // Higher priority breaks same-date (and no-date) ties, then title.
    const ad = a.dueDate || ''
    const bd = b.dueDate || ''
    if (!ad && !bd) return byStartTimeThenPriority(a, b)
    if (!ad) return -1
    if (!bd) return 1
    const byDate = ad.localeCompare(bd)
    return byDate !== 0 ? byDate : byStartTimeThenPriority(a, b)
  }
  const key = field === 'created' ? 'createdAt' : 'updatedAt'
  const byDate = a[key].localeCompare(b[key])
  return byDate !== 0 ? byDate : compareByName(a, b)
}

export function byPriorityThenName(a: TodoRecord, b: TodoRecord): number {
  const byPriority = PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority]
  return byPriority !== 0 ? byPriority : compareByName(a, b)
}

// Same-day tie-break: timed todos chronological (start time ascending), untimed
// after them, then priority/name. Keeps the list in step with the calendar.
export function byStartTimeThenPriority(a: TodoRecord, b: TodoRecord): number {
  const at = a.startTime || ''
  const bt = b.startTime || ''
  if (at && bt) {
    const byStart = at.localeCompare(bt)
    if (byStart !== 0) return byStart
  } else if (at) {
    return -1
  } else if (bt) {
    return 1
  }
  return byPriorityThenName(a, b)
}

export function sortTodos(todos: TodoRecord[], field: SortField, dir: SortDir): TodoRecord[] {
  return [...todos].sort((a, b) => {
    if (field === 'due' && dir === 'desc') {
      const ad = a.dueDate || ''
      const bd = b.dueDate || ''
      if (!ad && !bd) return byStartTimeThenPriority(a, b)
      if (!ad) return -1
      if (!bd) return 1
      const byNewestDate = bd.localeCompare(ad)
      return byNewestDate !== 0 ? byNewestDate : byStartTimeThenPriority(a, b)
    }
    const r = compareTodos(a, b, field)
    return dir === 'asc' ? r : -r
  })
}

export function formatDate(value: string, pattern = 'dd-mm-yyyy'): string {
  return value ? formatIsoDateByPattern(value, pattern) : ''
}

/** Local `YYYY-MM-DD` for a Date — never `toISOString`, which is UTC and lands
 *  on the wrong day either side of midnight. */
export function isoDay(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${m}-${d}`
}

/** A `YYYY-MM-DD` as a local midnight Date, or null when it is not one. */
export function parseLocalDate(value: string): Date | null {
  const [y, m, d] = value.split('-').map((n) => parseInt(n, 10))
  if (!y || !m || !d) return null
  const date = new Date(y, m - 1, d)
  date.setHours(0, 0, 0, 0)
  return date
}

/** `YYYY-MM-DD` shifted by whole days, staying in local time. */
export function addDays(iso: string, days: number): string {
  const date = parseLocalDate(iso)
  if (!date) return iso
  date.setDate(date.getDate() + days)
  return isoDay(date)
}

/**
 * The date as a **section header** reads it — "Mon 1 Jun". Deliberately a third
 * formatter beside {@link formatDate} (numeric, for chips) and
 * {@link formatDueLabel} (relative, for a row's meta line): a header sits above
 * a group of rows and has to name the day unambiguously *and* compactly, so it
 * takes the weekday but never "Today".
 */
export function formatDayHeader(value: string, locale?: string, pattern = 'ddd d mmm'): string {
  return formatIsoDateByShortPattern(value.slice(0, 10), pattern, locale)
}

/**
 * A month header for the Scheduled roll-up: "September", or "September 2027"
 * once the year stops being obvious. `partial` is the rest of the current
 * month, which reads "Rest of September" — the days before today are already
 * above it under Overdue.
 */
export function formatMonthHeader(
  key: string,
  locale: string | undefined,
  opts: { partial?: boolean; restOfLabel?: string; now?: Date } = {}
): string {
  const date = parseLocalDate(`${key}-01`)
  if (!date) return key
  const now = opts.now ?? new Date()
  const sameYear = date.getFullYear() === now.getFullYear()
  const name = date.toLocaleDateString(locale, sameYear ? { month: 'long' } : { month: 'long', year: 'numeric' })
  return opts.partial && opts.restOfLabel ? opts.restOfLabel.replace('{{p0}}', name) : name
}

/** Relative day names the row shows instead of a date, supplied translated. */
export interface DueLabels {
  today: string
  tomorrow: string
  yesterday: string
}

/**
 * The date as a row reads it: "Today", "Tomorrow", "Yesterday", a weekday inside
 * the coming week, else the numeric date. Deliberately a *second* formatter —
 * {@link formatDate} is what the calendar filter chips show, and a chip reading
 * "Today" would no longer say which day was picked.
 *
 * Pure: the caller passes the translated words and the locale, so the rule stays
 * testable without an i18n instance.
 */
export function formatDueLabel(
  value: string,
  today: string,
  labels: DueLabels,
  locale?: string,
  datePattern = 'dd-mm-yyyy'
): string {
  if (!value) return ''
  const day = value.slice(0, 10)
  if (day === today) return labels.today
  const [y, m, d] = day.split('-').map(Number)
  const [ty, tm, td] = today.split('-').map(Number)
  if (!y || !m || !d || !ty || !tm || !td) return formatDate(value, datePattern)
  const target = new Date(y, m - 1, d)
  const base = new Date(ty, tm - 1, td)
  const days = Math.round((target.getTime() - base.getTime()) / 86400000)
  if (days === 1) return labels.tomorrow
  if (days === -1) return labels.yesterday
  if (days > 1 && days < 7) return target.toLocaleDateString(locale, { weekday: 'long' })
  return formatDate(value, datePattern)
}
