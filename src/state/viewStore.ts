import { React, api, captureTodoScope } from '../runtime'
import {
  DEFAULT_VIEW,
  normalizeSmartListSettings,
  parseView,
  sameView,
  serializeView,
  type SmartListSettings,
  type TodoView
} from '../model/views'
import { normalizeStatusFilter, type TodoStatusFilter } from './statusStore'
import type { DateBreakdown } from '../model/sections'
import type { SortDir, SortField } from '../model/sort'

/**
 * The selected view, shared by the sidebar and the main page.
 *
 * The sidebar *is* the navigation now, so both surfaces have to read one value:
 * clicking "Scheduled" in the panel has to retitle the page. The host runtime
 * keeps this state stable across module re-imports within one load session.
 *
 * Persistence rides on `api.settings`, which is a round trip: the cached value
 * here is what makes a click paint immediately rather than a frame after the
 * host echoes the write back (the same correctness argument as `groupStore.ts`).
 */
/**
 * One shared value behind every surface: the session copy of a saved setting,
 * read from the settings on first use and kept in the host runtime so it
 * survives a module re-import. `set` only changes the copy and tells the
 * listeners; each value below saves itself in its own way.
 */
interface SharedValue<T> {
  get(): T
  /** The session copy, or null before anything read it. */
  peek(): T | null
  set(value: T): void
  subscribe(listener: (value: T) => void): () => void
  /** Forget the copy, so the next read comes from the settings again. */
  reset(): void
  /** The value, re-rendering the calling component when it changes. */
  use(): T
}

interface Cell<T> {
  value: T | null
  listeners: Set<(value: T) => void>
}

function sharedValue<T, Extra extends object = object>(storeKey: string, read: () => T, extra?: () => Extra): SharedValue<T> & { cell(): Cell<T> & Extra } {
  const cell = (): Cell<T> & Extra => api.runtime.getOrCreate(storeKey, () => ({ value: null, listeners: new Set(), ...extra?.() }) as Cell<T> & Extra)
  const get = (): T => {
    const c = cell()
    if (c.value === null) c.value = read()
    return c.value
  }
  const subscribe = (listener: (value: T) => void): (() => void) => {
    const c = cell()
    c.listeners.add(listener)
    return () => { c.listeners.delete(listener) }
  }
  return {
    cell,
    get,
    peek: () => cell().value,
    set: (value) => {
      const c = cell()
      c.value = value
      for (const listener of c.listeners) listener(value)
    },
    subscribe,
    reset: () => { cell().value = null },
    use: () => {
      const [value, setValue] = React.useState<T>(get)
      React.useEffect(() => subscribe(setValue), [])
      return value
    }
  }
}

/** Typing updates the UI at once; the saved setting trails by this long. */
export const SEARCH_PERSIST_DELAY_MS = 300

/** Every table column sorts; the narrow lists offer only the shared fields. */
const TABLE_ONLY_SORT_FIELDS = ['group', 'notes', 'status', 'location', 'tags'] as const
export type PageSortField = SortField | 'auto' | (typeof TABLE_ONLY_SORT_FIELDS)[number]

export interface PageSort {
  field: PageSortField
  dir: SortDir
}

/** Unchanged from the chip bar, so an existing selection survives the upgrade. */
const VIEW_SETTING_KEY = 'panelChip'
const SHOW_COMPLETED_SETTING_KEY = 'pageShowCompleted'
const STATUS_FILTER_SETTING_KEY = 'statusFilter'
export const DATE_BREAKDOWN_SETTING_KEY = 'dateBreakdown'
const SMART_LISTS_SETTING_KEY = 'smartLists'
const SEARCH_SETTING_KEY = 'pageSearch'
const PAGE_SORT_SETTING_KEY = 'pageSort'

interface PanelPresentation {
  compact: boolean
  sortField: SortField
  sortDir: SortDir
  showCompleted: boolean
  statusFilter: TodoStatusFilter
  groupNames: string[]
  includeUngrouped: boolean
}

const PANEL_PRESENTATION_KEYS = {
  todo: 'panelPresentation',
  attachment: 'attachmentPanelPresentation'
} as const
const SORT_FIELDS: SortField[] = ['due', 'priority', 'flagged', 'updated', 'created', 'name']

function normalizePanelPresentation(raw: unknown): PanelPresentation {
  const record = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {}
  return {
    compact: record.compact !== false,
    sortField: SORT_FIELDS.includes(record.sortField as SortField) ? record.sortField as SortField : 'due',
    sortDir: record.sortDir === 'asc' ? 'asc' : 'desc',
    showCompleted: record.showCompleted === true,
    statusFilter: normalizeStatusFilter(record.statusFilter),
    groupNames: Array.isArray(record.groupNames)
      ? [...new Set(record.groupNames.filter((name): name is string => typeof name === 'string' && name.trim().length > 0).map((name) => name.trim()))]
      : [],
    includeUngrouped: record.includeUngrouped === true
  }
}

/** Persist the independent display/filter controls of each narrow panel. */
export function usePanelPresentation(
  surface: keyof typeof PANEL_PRESENTATION_KEYS
): [PanelPresentation, (patch: Partial<PanelPresentation>) => void] {
  const key = PANEL_PRESENTATION_KEYS[surface]
  const read = React.useCallback(
    (): PanelPresentation => normalizePanelPresentation(api.settings.get()[key]),
    [key]
  )
  const [value, setLocal] = React.useState<PanelPresentation>(read)
  React.useEffect(() => api.settings.subscribe(() => setLocal(read())), [read])
  const patch = React.useCallback((next: Partial<PanelPresentation>): void => {
    setLocal((current) => {
      const merged = normalizePanelPresentation({ ...current, ...next })
      void api.settings.set(key, merged)
      return merged
    })
  }, [key])
  return [value, patch]
}

export function getDateBreakdown(): DateBreakdown {
  const value = api.settings.get()[DATE_BREAKDOWN_SETTING_KEY]
  return value === 'weekly' || value === 'daily' ? value : 'monthly'
}

export function useDateBreakdown(): DateBreakdown {
  const [value, setValue] = React.useState<DateBreakdown>(getDateBreakdown)
  React.useEffect(() => api.settings.subscribe(() => setValue(getDateBreakdown())), [])
  return value
}

const setting = (key: string): unknown => api.settings.get()[key]
const savedSearch = (): string => { const saved = setting(SEARCH_SETTING_KEY); return typeof saved === 'string' ? saved.slice(0, 500) : '' }

/** The selected list, with the lists visited before it for the header's back and forward. */
const view = sharedValue<TodoView, { history: TodoView[]; historyIndex: number }>('todo.view', () => parseView(setting(VIEW_SETTING_KEY)), () => ({ history: [], historyIndex: -1 }))
const showCompleted = sharedValue<boolean>('todo.showCompleted', () => setting(SHOW_COMPLETED_SETTING_KEY) === true)
const statusFilter = sharedValue<TodoStatusFilter>('todo.statusFilter', () => {
  const raw = setting(STATUS_FILTER_SETTING_KEY)
  const filter = normalizeStatusFilter(raw)
  // A filter saved in the single-status spelling is saved again as a list.
  if (typeof raw === 'string' && raw !== 'all' && filter !== 'all') void api.settings.set(STATUS_FILTER_SETTING_KEY, filter)
  return filter
})
const search = sharedValue<string, { pending?: { timer: ReturnType<typeof setTimeout>; write: (value: string) => void; forget: () => void } }>('todo.search', savedSearch)
const pageSort = sharedValue<PageSort>('todo.pageSort', () => normalizePageSort(setting(PAGE_SORT_SETTING_KEY)))

export function getView(): TodoView {
  const current = view.get()
  const cell = view.cell()
  // The first read starts the history at the saved list.
  if (cell.historyIndex < 0) {
    cell.history = [current]
    cell.historyIndex = 0
  }
  return current
}

function showAndSave(next: TodoView): void {
  view.set(next)
  void api.settings.set(VIEW_SETTING_KEY, serializeView(next))
}

export function setView(next: TodoView): void {
  if (sameView(getView(), next)) return
  const cell = view.cell()
  cell.history = [...cell.history.slice(0, cell.historyIndex + 1), next].slice(-20)
  cell.historyIndex = cell.history.length - 1
  showAndSave(next)
}

export function getViewHistoryState(): { canGoBack: boolean; canGoForward: boolean } {
  getView()
  const { history, historyIndex } = view.cell()
  return { canGoBack: historyIndex > 0, canGoForward: historyIndex < history.length - 1 }
}

export function goViewHistory(delta: -1 | 1): void {
  getView()
  const cell = view.cell()
  const index = cell.historyIndex + delta
  if (index < 0 || index >= cell.history.length) return
  cell.historyIndex = index
  showAndSave(cell.history[index])
}

export const onView = view.subscribe

/**
 * Drop the cache on `register()`. Without this a realm switch shows the previous
 * realm's selection.
 */
export function resetViewCache(): void {
  flushTodoSearch()
  const cell = view.cell()
  cell.history = []
  cell.historyIndex = -1
  for (const value of [view, showCompleted, statusFilter, search, pageSort]) value.reset()
}

export function getSmartListSettings(): SmartListSettings {
  return normalizeSmartListSettings(api.settings.get()[SMART_LISTS_SETTING_KEY])
}

export function setSmartListSettings(settings: SmartListSettings): void {
  void api.settings.set(SMART_LISTS_SETTING_KEY, normalizeSmartListSettings(settings))
}

export function useSmartListSettings(): SmartListSettings {
  const [settings, setSettings] = React.useState<SmartListSettings>(getSmartListSettings)
  React.useEffect(() => api.settings.subscribe(() => setSettings(getSmartListSettings())), [])
  return settings
}

/** Write the latest typed search now, if one is waiting. Safe to call at any time. */
export function flushTodoSearch(): void {
  const s = search.cell()
  const pending = s.pending
  if (!pending) return
  s.pending = undefined
  clearTimeout(pending.timer)
  pending.forget()
  if (s.value !== null) pending.write(s.value)
}

export function setTodoSearch(query: string): void {
  const s = search.cell()
  const next = query.slice(0, 500)
  if (s.value === next) return
  search.set(next)
  if (next === '') {
    if (s.pending) {
      clearTimeout(s.pending.timer)
      s.pending.forget()
      s.pending = undefined
    }
    void api.settings.set(SEARCH_SETTING_KEY, next)
    return
  }
  if (s.pending) clearTimeout(s.pending.timer)
  const bound = api
  const write = (value: string): void => { void bound.settings.set(SEARCH_SETTING_KEY, value).catch(() => undefined) }
  const forget = s.pending?.forget ?? captureTodoScope()?.onDispose(flushTodoSearch) ?? (() => undefined)
  s.pending = { timer: setTimeout(flushTodoSearch, SEARCH_PERSIST_DELAY_MS), write, forget }
}

export function useTodoSearch(): [string, (query: string) => void] {
  return [search.use(), setTodoSearch]
}

function normalizePageSort(raw: unknown): PageSort {
  const value = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {}
  const field = value.field === 'auto' || (TABLE_ONLY_SORT_FIELDS as readonly unknown[]).includes(value.field) || SORT_FIELDS.includes(value.field as SortField)
    ? value.field as PageSortField
    : 'auto'
  return { field, dir: value.dir === 'desc' ? 'desc' : 'asc' }
}

function setPageSort(value: PageSort): void {
  const next = normalizePageSort(value)
  const current = pageSort.peek()
  if (current?.field === next.field && current.dir === next.dir) return
  pageSort.set(next)
  void api.settings.set(PAGE_SORT_SETTING_KEY, next)
}

export function usePageSort(): [PageSort, (value: PageSort) => void] {
  return [pageSort.use(), setPageSort]
}

interface TodoVisibleState extends Record<string, unknown> {
  v: 1
  view: unknown
  showCompleted: boolean
  statusFilter: TodoStatusFilter
  search: string
  sort: PageSort
}

export function readTodoVisibleState(view: TodoView = getView()): TodoVisibleState {
  return {
    v: 1,
    view: serializeView(view),
    showCompleted: showCompleted.get(),
    statusFilter: statusFilter.get(),
    search: search.peek() ?? savedSearch(),
    sort: pageSort.get()
  }
}

/** Apply a saved state; a tab pinned to one list keeps its list and leaves the shared view alone (`keepView`). */
export function applyTodoVisibleState(raw: Record<string, unknown>, keepView = false): boolean {
  if (raw.v !== 1) return false
  if (!keepView) setView(parseView(raw.view))
  setShowCompleted(raw.showCompleted === true)
  setStatusFilter(normalizeStatusFilter(raw.statusFilter))
  setTodoSearch(typeof raw.search === 'string' ? raw.search : '')
  flushTodoSearch()
  setPageSort(normalizePageSort(raw.sort))
  return true
}

function setStatusFilter(filter: TodoStatusFilter): void {
  const next = normalizeStatusFilter(filter)
  const previous = statusFilter.get()
  if (previous === 'all' && next === 'all') return
  if (previous !== 'all' && next !== 'all' && previous.length === next.length && previous.every((id, i) => id === next[i])) return
  statusFilter.set(next)
  void api.settings.set(STATUS_FILTER_SETTING_KEY, next)
}

export function useStatusFilter(): [TodoStatusFilter, (filter: TodoStatusFilter) => void] {
  const filter = statusFilter.use()
  // A status removed or hidden in Settings leaves the filter.
  React.useEffect(() => api.settings.subscribe(() => setStatusFilter(statusFilter.get())), [])
  return [filter, setStatusFilter]
}

export function useView(): TodoView {
  const [current, setLocal] = React.useState<TodoView>(getView)
  React.useEffect(() => onView(setLocal), [])
  return current
}

export function setShowCompleted(show: boolean): void {
  if (showCompleted.peek() === show) return
  showCompleted.set(show)
  void api.settings.set(SHOW_COMPLETED_SETTING_KEY, show)
}

export function useShowCompleted(): [boolean, () => void] {
  return [showCompleted.use(), () => setShowCompleted(!showCompleted.get())]
}

export { DEFAULT_VIEW }
