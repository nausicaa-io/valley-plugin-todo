import type { TodoRecord } from '../types'
import { paletteRef } from '@valley/plugin-sdk/palette'
import { parseLocalDate, weekStartIndex } from '@valley/plugin-sdk/dateGrid'
import { api } from '../runtime'
import { groupFamilyRevision, groupKey, groupKeysCovered } from './groups'
import { addDays, isoDay } from './sort'

function hostWeekStart(): number {
  try {
    return weekStartIndex(api?.getState().weekStart)
  } catch {
    return 1
  }
}

/**
 * The last day of the week `today` falls in, following the host's first day of
 * the week. This week is everything due on or before it — overdue included,
 * for the same reason Today includes it.
 */
export function endOfWeek(today: string, weekStart: number = hostWeekStart()): string {
  const day = parseLocalDate(today).getDay()
  return addDays(today, 6 - ((day - weekStart + 7) % 7))
}

/**
 * What the sidebar selects and both surfaces show.
 *
 * This replaces the chip bar. A chip row asked two questions at once — "which
 * list" and "which due window" — with one active answer, so half the
 * combinations were unreachable and the bar cost three rows of chrome above the
 * first todo at 245px. Five fixed smart lists plus the group tree say the same
 * things in a column that also has room for counts.
 */
export type SmartListId = 'scheduled' | 'today' | 'week' | 'flagged' | 'all' | 'completed'

export type TodoView =
  | { kind: 'smart'; id: SmartListId }
  | { kind: 'groups'; names: string[]; includeUngrouped?: boolean }
  | { kind: 'tag'; name: string }
  | { kind: 'nogroup' }

/**
 * All, not Today. Today is a *dated* list, so on a fresh realm — and for anyone
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
   * while still tracking the theme. Same rationale as `state/statusStore.ts`.
   */
  color: string
  /** Renders under date headers instead of the row's inline date. */
  dated: boolean
  /** A fixed glyph colour on the coloured tile; absent means the palette's paired contrast. */
  textColor?: SmartListTextColor
}

export const SMART_LISTS: SmartListDef[] = [
  { id: 'scheduled', labelKey: 'todo.view.scheduled', color: paletteRef('red'), dated: true },
  { id: 'today', labelKey: 'todo.view.today', color: paletteRef('primary-blue'), dated: true },
  { id: 'week', labelKey: 'todo.view.week', color: paletteRef('violet'), dated: true },
  { id: 'flagged', labelKey: 'todo.view.flagged', color: paletteRef('yellow'), dated: false },
  { id: 'all', labelKey: 'todo.view.all', color: paletteRef('gray'), dated: false },
  { id: 'completed', labelKey: 'todo.view.completed', color: paletteRef('green'), dated: false }
]

export const DEFAULT_SMART_LIST_ORDER: SmartListId[] = SMART_LISTS.map((list) => list.id)

export type SmartListTextColor = 'auto' | 'white' | 'black'

export interface SmartListSettings {
  order: SmartListId[]
  hidden: SmartListId[]
  /** Only lists the user recoloured; the rest keep their built-in colour. */
  colors: Partial<Record<SmartListId, string>>
  /** The glyph and label colour on the list's coloured tile; absent means auto. */
  textColors: Partial<Record<SmartListId, SmartListTextColor>>
}

export function normalizeSmartListSettings(value: unknown): SmartListSettings {
  const raw = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const order: SmartListId[] = []
  for (const id of Array.isArray(raw.order) ? raw.order : []) {
    if (typeof id === 'string' && DEFAULT_SMART_LIST_ORDER.includes(id as SmartListId) && !order.includes(id as SmartListId)) {
      order.push(id as SmartListId)
    }
  }
  // A list added in a later version joins beside its default neighbour, not at the end.
  DEFAULT_SMART_LIST_ORDER.forEach((id, index) => {
    if (order.includes(id)) return
    const before = DEFAULT_SMART_LIST_ORDER.slice(0, index).reverse().find((candidate) => order.includes(candidate))
    order.splice(before ? order.indexOf(before) + 1 : 0, 0, id)
  })
  const rawHidden = Array.isArray(raw.hidden) ? raw.hidden : []
  const hidden = order.filter((id) => rawHidden.includes(id))
  if (hidden.length === order.length) hidden.shift()
  const rawColors = raw.colors && typeof raw.colors === 'object' ? raw.colors as Record<string, unknown> : {}
  const colors: Partial<Record<SmartListId, string>> = {}
  for (const id of DEFAULT_SMART_LIST_ORDER) {
    const value = rawColors[id]
    if (typeof value === 'string' && /^(palette:[\w-]+|#[0-9a-f]{6})$/i.test(value)) colors[id] = value
  }
  const rawText = raw.textColors && typeof raw.textColors === 'object' ? raw.textColors as Record<string, unknown> : {}
  const textColors: Partial<Record<SmartListId, SmartListTextColor>> = {}
  for (const id of DEFAULT_SMART_LIST_ORDER) {
    const value = rawText[id]
    if (value === 'white' || value === 'black') textColors[id] = value
  }
  return { order, hidden, colors, textColors }
}

export function configuredSmartLists(settings: SmartListSettings): SmartListDef[] {
  return settings.order
    .filter((id) => !settings.hidden.includes(id))
    .map((id) => smartListDef(id, settings))
}

export function smartListDef(id: SmartListId, settings?: Pick<SmartListSettings, 'colors' | 'textColors'>): SmartListDef {
  const base = SMART_LISTS.find((l) => l.id === id) ?? SMART_LISTS.find((l) => l.id === 'all')!
  const color = settings?.colors[base.id]
  const textColor = settings?.textColors?.[base.id]
  return color || textColor ? { ...base, ...(color ? { color } : {}), ...(textColor ? { textColor } : {}) } : base
}

/** The CSS foreground on a smart list's coloured tile. */
export function smartListForeground(list: SmartListDef, contrast: (color: string) => string): string {
  if (list.textColor === 'white') return '#ffffff'
  if (list.textColor === 'black') return '#000000'
  return contrast(list.color)
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

const groupKeyCache = new WeakMap<object, { names: readonly string[]; count: number; revision: number; keys: Set<string> }>()

/** The selected group keys of a groups view, built once per view object rather than per todo. */
function groupViewKeys(view: Extract<TodoView, { kind: 'groups' }>): Set<string> {
  const hit = groupKeyCache.get(view)
  const revision = groupFamilyRevision()
  if (hit && hit.names === view.names && hit.count === view.names.length && hit.revision === revision) return hit.keys
  // A selected group covers its subgroups.
  const keys = new Set(view.names.flatMap((name) => [...groupKeysCovered(name)]))
  groupKeyCache.set(view, { names: view.names, count: view.names.length, revision, keys })
  return keys
}

/** Apply every criterion of a view except the open/completed split. */
export function matchesViewScope(todo: TodoRecord, view: TodoView, today: string = isoDay(new Date())): boolean {
  if (view.kind === 'groups') {
    if (!todo.group) return view.includeUngrouped === true
    return groupViewKeys(view).has(groupKey(todo.group))
  }
  if (view.kind === 'tag') return (todo.tags ?? []).some((tag) => tag.replace(/^#/, '').toLowerCase() === view.name.toLowerCase())
  if (view.kind === 'nogroup') return !todo.group
  switch (view.id) {
    case 'scheduled':
      return !!todo.dueDate
    case 'today':
      return !!todo.dueDate && todo.dueDate.slice(0, 10) <= today
    case 'week':
      return !!todo.dueDate && todo.dueDate.slice(0, 10) <= endOfWeek(today)
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

export type ViewCounts = Record<SmartListId, number>

/** One pass for every badge — a `filter` per list over the same todos is waste. */
export function viewCounts(todos: TodoRecord[], today: string = isoDay(new Date())): ViewCounts {
  const counts: ViewCounts = { scheduled: 0, today: 0, week: 0, flagged: 0, all: 0, completed: 0 }
  const weekEnd = endOfWeek(today)
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
    if (due <= weekEnd) counts.week++
  }
  return counts
}

/** How many todos a group row shows — open only, so a done pile never inflates it. */
export function groupCount(todos: TodoRecord[], name: string | null): number {
  const keys = name === null ? null : groupKeysCovered(name)
  return todos.filter((t) => !t.completed && (keys === null ? !t.group : keys.has(groupKey(t.group ?? ''))))
    .length
}

export interface GroupCounts {
  /** Todos per `groupKey` of their group; an ungrouped todo counts under `groupKey('')`. */
  byKey: Map<string, number>
  /** Todos without a group. */
  ungrouped: number
}

/**
 * Every group row's count in one pass, so a list of groups costs one walk over
 * the todos instead of one per group. `openOnly` gives {@link groupCount}'s numbers.
 */
export function groupCounts(todos: readonly TodoRecord[], openOnly = true): GroupCounts {
  const byKey = new Map<string, number>()
  let ungrouped = 0
  for (const todo of todos) {
    if (openOnly && todo.completed) continue
    const key = groupKey(todo.group ?? '')
    byKey.set(key, (byKey.get(key) ?? 0) + 1)
    if (!todo.group) ungrouped++
  }
  return { byKey, ungrouped }
}

/** One group row's count from {@link groupCounts}; `null` is the ungrouped row. */
export function countForGroup(counts: GroupCounts, name: string | null): number {
  if (name === null) return counts.ungrouped
  let total = 0
  for (const key of groupKeysCovered(name)) total += counts.byKey.get(key) ?? 0
  return total
}

/**
 * Serialize for plugin settings — a selected list must survive a restart.
 * The group spellings are unchanged from the chip bar they replace, so a realm
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
