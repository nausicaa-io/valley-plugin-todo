import type { TodoRecord } from '@valley/plugin-sdk/types'
import { paletteRef } from '@valley/plugin-sdk/palette'
import { groupKey } from './groups'
import { isoDay } from './sort'

/**
 * What the sidebar selects and both surfaces show.
 *
 * This replaces the chip bar. A chip row asked two questions at once — "which
 * list" and "which due window" — with one active answer, so half the
 * combinations were unreachable and the bar cost three rows of chrome above the
 * first todo at 245px. Five fixed smart lists plus the group tree say the same
 * things in a column that also has room for counts.
 */
export type SmartListId = 'scheduled' | 'today' | 'flagged' | 'all' | 'completed'

export type TodoView =
  | { kind: 'smart'; id: SmartListId }
  | { kind: 'groups'; names: string[]; includeUngrouped?: boolean }
  | { kind: 'tag'; name: string }
  | { kind: 'nogroup' }

/**
 * All, not Today. Today is a *dated* list, so on a fresh vault — and for anyone
 * who keeps undated todos — it opens empty while the sidebar counts say there
 * is work. It is also what the chip bar defaulted to, so an upgrade lands on
 * the same list the user was already looking at.
 */
export const DEFAULT_VIEW: TodoView = { kind: 'smart', id: 'all' }

export interface SmartListDef {
  id: SmartListId
  labelKey: string
  /**
   * A `palette:<id>` reference (see `@valley/plugin-sdk/palette`) for the list's colour —
   * the page title, and the chip in the sidebar strip. It must not follow the
   * **accent**, or every list would look the same and the header would stop
   * telling you which one you are in; going through the palette keeps that true
   * while still tracking the theme. Same rationale as `statuses.ts`.
   */
  color: string
  /** Renders under date headers instead of the row's inline date. */
  dated: boolean
}

export const SMART_LISTS: SmartListDef[] = [
  { id: 'scheduled', labelKey: 'todo.view.scheduled', color: paletteRef('red'), dated: true },
  { id: 'today', labelKey: 'todo.view.today', color: paletteRef('primary-blue'), dated: true },
  { id: 'flagged', labelKey: 'todo.view.flagged', color: paletteRef('yellow'), dated: false },
  { id: 'all', labelKey: 'todo.view.all', color: paletteRef('gray'), dated: false },
  { id: 'completed', labelKey: 'todo.view.completed', color: paletteRef('green'), dated: false }
]

export const DEFAULT_SMART_LIST_ORDER: SmartListId[] = SMART_LISTS.map((list) => list.id)

export interface SmartListSettings {
  order: SmartListId[]
  hidden: SmartListId[]
}

export function normalizeSmartListSettings(value: unknown): SmartListSettings {
  const raw = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const order: SmartListId[] = []
  for (const id of Array.isArray(raw.order) ? raw.order : []) {
    if (typeof id === 'string' && DEFAULT_SMART_LIST_ORDER.includes(id as SmartListId) && !order.includes(id as SmartListId)) {
      order.push(id as SmartListId)
    }
  }
  for (const id of DEFAULT_SMART_LIST_ORDER) if (!order.includes(id)) order.push(id)
  const rawHidden = Array.isArray(raw.hidden) ? raw.hidden : []
  const hidden = order.filter((id) => rawHidden.includes(id))
  if (hidden.length === order.length) hidden.shift()
  return { order, hidden }
}

export function configuredSmartLists(settings: SmartListSettings): SmartListDef[] {
  return settings.order
    .filter((id) => !settings.hidden.includes(id))
    .map((id) => smartListDef(id))
}

export function smartListDef(id: SmartListId): SmartListDef {
  return SMART_LISTS.find((l) => l.id === id) ?? SMART_LISTS[3]
}

/**
 * Apply a view to one record. Pure, so the sidebar list, the page and the
 * counts beside each row cannot disagree about what a list contains.
 *
 * `Today` includes overdue on purpose — an overdue todo is the most today thing
 * there is, and a list that hides it is how things get missed. `All` means all
 * *open* todos; finished work has its own list.
 */
export function matchesView(todo: TodoRecord, view: TodoView, today: string = isoDay(new Date())): boolean {
  if (!matchesViewScope(todo, view, today)) return false
  if (view.kind !== 'smart') return true
  return view.id === 'completed' ? todo.completed : !todo.completed
}

/** Apply every criterion of a view except the open/completed split. */
export function matchesViewScope(todo: TodoRecord, view: TodoView, today: string = isoDay(new Date())): boolean {
  if (view.kind === 'groups') {
    if (!todo.group) return view.includeUngrouped === true
    const selected = new Set(view.names.map(groupKey))
    return selected.has(groupKey(todo.group))
  }
  if (view.kind === 'tag') return (todo.tags ?? []).some((tag) => tag.replace(/^#/, '').toLowerCase() === view.name.toLowerCase())
  if (view.kind === 'nogroup') return !todo.group
  switch (view.id) {
    case 'scheduled':
      return !!todo.dueDate
    case 'today':
      return !!todo.dueDate && todo.dueDate.slice(0, 10) <= today
    case 'flagged':
      return !!todo.flagged
    case 'completed':
      return todo.completed
    default:
      return true
  }
}

export function matchesVisibleView(
  todo: TodoRecord,
  view: TodoView,
  showCompleted: boolean,
  today: string = isoDay(new Date())
): boolean {
  if (!matchesViewScope(todo, view, today)) return false
  if (view.kind === 'smart' && view.id === 'completed') return todo.completed
  return showCompleted || !todo.completed
}

/**
 * How many *done* todos this view covers.
 *
 * Every list except Completed filters completion out, so `matchesView` can't
 * answer this — but the page header has to, because it is the number the
 * Hide/Show toggle beside it is talking about. So the completion clause is
 * dropped and the rest of each list's criteria applied to the done pile.
 */
export function completedForView(
  todos: TodoRecord[],
  view: TodoView,
  today: string = isoDay(new Date())
): number {
  return todos.filter((todo) => {
    if (!todo.completed) return false
    if (view.kind === 'groups') return matchesViewScope(todo, view, today)
    if (view.kind === 'tag') return (todo.tags ?? []).some((tag) => tag.replace(/^#/, '').toLowerCase() === view.name.toLowerCase())
    if (view.kind === 'nogroup') return !todo.group
    switch (view.id) {
      case 'scheduled':
        return !!todo.dueDate
      case 'today':
        return !!todo.dueDate && todo.dueDate.slice(0, 10) <= today
      case 'flagged':
        return !!todo.flagged
      default:
        return true
    }
  }).length
}

export type ViewCounts = Record<SmartListId, number>

/** One pass for all five badges — five `filter`s over the same list is waste. */
export function viewCounts(todos: TodoRecord[], today: string = isoDay(new Date())): ViewCounts {
  const counts: ViewCounts = { scheduled: 0, today: 0, flagged: 0, all: 0, completed: 0 }
  for (const todo of todos) {
    if (todo.completed) {
      counts.completed++
      continue
    }
    counts.all++
    if (todo.flagged) counts.flagged++
    const due = todo.dueDate?.slice(0, 10) ?? ''
    if (!due) continue
    counts.scheduled++
    if (due <= today) counts.today++
  }
  return counts
}

/** How many todos a group row shows — open only, so a done pile never inflates it. */
export function groupCount(todos: TodoRecord[], name: string | null): number {
  const key = name === null ? null : groupKey(name)
  return todos.filter((t) => !t.completed && (key === null ? !t.group : groupKey(t.group ?? '') === key))
    .length
}

/**
 * Serialize for plugin settings — a selected list must survive a restart.
 * The group spellings are unchanged from the chip bar they replace, so a vault
 * that persisted `group:Fungi` keeps its selection with no settings migration.
 */
export function serializeView(view: TodoView): string {
  switch (view.kind) {
    case 'groups':
      return `groups:${encodeURIComponent(JSON.stringify({ names: view.names, includeUngrouped: view.includeUngrouped === true }))}`
    case 'nogroup':
      return 'nogroup'
    case 'tag':
      return `tag:${view.name}`
    default:
      return view.id
  }
}

const SMART_IDS = SMART_LISTS.map((l) => l.id) as string[]

/**
 * Parse a persisted value. Retired chip spellings are folded onto the nearest
 * surviving list rather than reset — `all` was the old default and stays
 * meaningful, and someone left in "Due today" should land in Today, not be
 * silently moved somewhere else.
 */
export function parseView(raw: unknown): TodoView {
  if (typeof raw !== 'string') return DEFAULT_VIEW
  const value = raw.trim()
  if (value === 'nogroup') return { kind: 'nogroup' }
  if (value.startsWith('tag:')) {
    const name = value.slice(4).trim()
    return name ? { kind: 'tag', name } : DEFAULT_VIEW
  }
  if (value.startsWith('group:')) {
    const name = value.slice(6).trim()
    return name ? { kind: 'groups', names: [name] } : DEFAULT_VIEW
  }
  if (value.startsWith('groups:')) {
    try {
      const parsed = JSON.parse(decodeURIComponent(value.slice(7))) as unknown
      if (!parsed || typeof parsed !== 'object') return DEFAULT_VIEW
      const record = parsed as { names?: unknown; includeUngrouped?: unknown }
      const names = Array.isArray(record.names)
        ? [...new Set(record.names.filter((name): name is string => typeof name === 'string' && !!name.trim()).map((name) => name.trim()))]
        : []
      const includeUngrouped = record.includeUngrouped === true
      return names.length || includeUngrouped ? { kind: 'groups', names, includeUngrouped } : DEFAULT_VIEW
    } catch {
      return DEFAULT_VIEW
    }
  }
  if (SMART_IDS.includes(value)) return { kind: 'smart', id: value as SmartListId }
  if (value.startsWith('due:')) {
    return { kind: 'smart', id: value === 'due:today' ? 'today' : 'scheduled' }
  }
  return DEFAULT_VIEW
}

export function sameView(a: TodoView, b: TodoView): boolean {
  return serializeView(a) === serializeView(b)
}
