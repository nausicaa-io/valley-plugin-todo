import { React, api } from './runtime'
import {
  DEFAULT_VIEW,
  normalizeSmartListSettings,
  parseView,
  sameView,
  serializeView,
  type SmartListSettings,
  type TodoView
} from './views'
import { normalizeStatusFilter, type TodoStatusFilter } from './statuses'
import type { DateBreakdown } from './sections'
import type { SortDir, SortField } from './sort'

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
type Listener = (view: TodoView) => void

interface ViewStore {
  view: TodoView | null
  history: TodoView[]
  historyIndex: number
  listeners: Set<Listener>
}

type CompletedListener = (show: boolean) => void

type StatusFilterListener = (filter: TodoStatusFilter) => void

interface CompletedStore {
  show: boolean | null
  listeners: Set<CompletedListener>
}

interface StatusFilterStore {
  filter: TodoStatusFilter | null
  listeners: Set<StatusFilterListener>
}

interface SearchStore {
  query: string | null
  listeners: Set<(query: string) => void>
}

export interface PageSort {
  field: SortField | 'auto'
  dir: SortDir
}

interface PageSortStore {
  value: PageSort | null
  listeners: Set<(value: PageSort) => void>
}

const STORE_KEY = 'todo.view'
const COMPLETED_STORE_KEY = 'todo.showCompleted'
const STATUS_FILTER_STORE_KEY = 'todo.statusFilter'
const SEARCH_STORE_KEY = 'todo.search'
const PAGE_SORT_STORE_KEY = 'todo.pageSort'
/** Unchanged from the chip bar, so an existing selection survives the upgrade. */
export const VIEW_SETTING_KEY = 'panelChip'
export const SHOW_COMPLETED_SETTING_KEY = 'pageShowCompleted'
export const STATUS_FILTER_SETTING_KEY = 'statusFilter'
export const DATE_BREAKDOWN_SETTING_KEY = 'dateBreakdown'
export const SMART_LISTS_SETTING_KEY = 'smartLists'
export const SEARCH_SETTING_KEY = 'pageSearch'
export const PAGE_SORT_SETTING_KEY = 'pageSort'

export interface PanelPresentation {
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

function store(): ViewStore {
  return api.runtime.getOrCreate(STORE_KEY, () => ({
    view: null,
    history: [],
    historyIndex: -1,
    listeners: new Set()
  }))
}

function completedStore(): CompletedStore {
  return api.runtime.getOrCreate(COMPLETED_STORE_KEY, () => ({ show: null, listeners: new Set() }))
}

function statusFilterStore(): StatusFilterStore {
  return api.runtime.getOrCreate(STATUS_FILTER_STORE_KEY, () => ({ filter: null, listeners: new Set() }))
}

function searchStore(): SearchStore {
  return api.runtime.getOrCreate(SEARCH_STORE_KEY, () => ({ query: null, listeners: new Set() }))
}

function pageSortStore(): PageSortStore {
  return api.runtime.getOrCreate(PAGE_SORT_STORE_KEY, () => ({ value: null, listeners: new Set() }))
}

export function getView(): TodoView {
  const s = store()
  if (!s.view) {
    s.view = parseView(api.settings.get()[VIEW_SETTING_KEY])
    s.history = [s.view]
    s.historyIndex = 0
  }
  return s.view
}

export function setView(view: TodoView): void {
  const s = store()
  getView()
  if (s.view && sameView(s.view, view)) return
  const base = s.history.slice(0, s.historyIndex + 1)
  s.history = [...base, view].slice(-20)
  s.historyIndex = s.history.length - 1
  s.view = view
  void api.settings.set(VIEW_SETTING_KEY, serializeView(view))
  for (const fn of s.listeners) fn(view)
}

export function getViewHistoryState(): { canGoBack: boolean; canGoForward: boolean } {
  const s = store()
  getView()
  return {
    canGoBack: s.historyIndex > 0,
    canGoForward: s.historyIndex < s.history.length - 1
  }
}

export function goViewHistory(delta: -1 | 1): void {
  const s = store()
  getView()
  const nextIndex = s.historyIndex + delta
  if (nextIndex < 0 || nextIndex >= s.history.length) return
  s.historyIndex = nextIndex
  s.view = s.history[nextIndex]
  void api.settings.set(VIEW_SETTING_KEY, serializeView(s.view))
  for (const fn of s.listeners) fn(s.view)
}

export function onView(fn: Listener): () => void {
  const s = store()
  s.listeners.add(fn)
  return () => {
    s.listeners.delete(fn)
  }
}

/**
 * Drop the cache on `register()`. Without this a vault switch shows the previous
 * vault's selection.
 */
export function resetViewCache(): void {
  const viewStore = store()
  viewStore.view = null
  viewStore.history = []
  viewStore.historyIndex = -1
  completedStore().show = null
  statusFilterStore().filter = null
  searchStore().query = null
  pageSortStore().value = null
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

export function setTodoSearch(query: string): void {
  const s = searchStore()
  const next = query.slice(0, 500)
  if (s.query === next) return
  s.query = next
  void api.settings.set(SEARCH_SETTING_KEY, next)
  for (const listener of s.listeners) listener(next)
}

export function useTodoSearch(): [string, (query: string) => void] {
  const read = (): string => {
    const s = searchStore()
    if (s.query === null) s.query = typeof api.settings.get()[SEARCH_SETTING_KEY] === 'string'
      ? String(api.settings.get()[SEARCH_SETTING_KEY]).slice(0, 500)
      : ''
    return s.query
  }
  const [query, setQuery] = React.useState(read)
  React.useEffect(() => {
    const s = searchStore()
    s.listeners.add(setQuery)
    return () => { s.listeners.delete(setQuery) }
  }, [])
  return [query, setTodoSearch]
}

function normalizePageSort(raw: unknown): PageSort {
  const value = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {}
  const field = value.field === 'auto' || SORT_FIELDS.includes(value.field as SortField)
    ? value.field as SortField | 'auto'
    : 'auto'
  return { field, dir: value.dir === 'desc' ? 'desc' : 'asc' }
}

export function getPageSort(): PageSort {
  const s = pageSortStore()
  if (!s.value) s.value = normalizePageSort(api.settings.get()[PAGE_SORT_SETTING_KEY])
  return s.value
}

export function setPageSort(value: PageSort): void {
  const s = pageSortStore()
  const next = normalizePageSort(value)
  if (s.value?.field === next.field && s.value.dir === next.dir) return
  s.value = next
  void api.settings.set(PAGE_SORT_SETTING_KEY, next)
  for (const listener of s.listeners) listener(next)
}

export function usePageSort(): [PageSort, (value: PageSort) => void] {
  const [value, setValue] = React.useState<PageSort>(getPageSort)
  React.useEffect(() => {
    const s = pageSortStore()
    s.listeners.add(setValue)
    return () => { s.listeners.delete(setValue) }
  }, [])
  return [value, setPageSort]
}

export interface TodoVisibleState extends Record<string, unknown> {
  v: 1
  view: unknown
  showCompleted: boolean
  statusFilter: TodoStatusFilter
  search: string
  sort: PageSort
}

export function readTodoVisibleState(): TodoVisibleState {
  return {
    v: 1,
    view: serializeView(getView()),
    showCompleted: getShowCompleted(),
    statusFilter: getStatusFilter(),
    search: searchStore().query ?? (typeof api.settings.get()[SEARCH_SETTING_KEY] === 'string'
      ? String(api.settings.get()[SEARCH_SETTING_KEY]).slice(0, 500)
      : ''),
    sort: getPageSort()
  }
}

export function applyTodoVisibleState(raw: Record<string, unknown>): boolean {
  if (raw.v !== 1) return false
  setView(parseView(raw.view))
  setShowCompleted(raw.showCompleted === true)
  setStatusFilter(normalizeStatusFilter(raw.statusFilter))
  setTodoSearch(typeof raw.search === 'string' ? raw.search : '')
  setPageSort(normalizePageSort(raw.sort))
  return true
}

export function getStatusFilter(): TodoStatusFilter {
  const s = statusFilterStore()
  if (s.filter === null) {
    const raw = api.settings.get()[STATUS_FILTER_SETTING_KEY]
    s.filter = normalizeStatusFilter(raw)
    if (typeof raw === 'string' && raw !== 'all' && s.filter !== 'all') {
      void api.settings.set(STATUS_FILTER_SETTING_KEY, s.filter)
    }
  }
  return s.filter
}

export function setStatusFilter(filter: TodoStatusFilter): void {
  const s = statusFilterStore()
  const next = normalizeStatusFilter(filter)
  const previous = s.filter ?? getStatusFilter()
  if (previous === 'all' && next === 'all') return
  if (previous !== 'all' && next !== 'all' && previous.length === next.length && previous.every((id, i) => id === next[i])) return
  s.filter = next
  void api.settings.set(STATUS_FILTER_SETTING_KEY, next)
  for (const fn of s.listeners) fn(next)
}

export function useStatusFilter(): [TodoStatusFilter, (filter: TodoStatusFilter) => void] {
  const [filter, setLocal] = React.useState<TodoStatusFilter>(getStatusFilter)
  React.useEffect(() => {
    const s = statusFilterStore()
    s.listeners.add(setLocal)
    const offSettings = api.settings.subscribe(() => {
      const next = normalizeStatusFilter(s.filter ?? getStatusFilter())
      setStatusFilter(next)
    })
    return () => {
      s.listeners.delete(setLocal)
      offSettings()
    }
  }, [])
  return [filter, setStatusFilter]
}

export function useView(): TodoView {
  const [view, setLocal] = React.useState<TodoView>(getView)
  React.useEffect(() => onView(setLocal), [])
  return view
}

export function getShowCompleted(): boolean {
  const s = completedStore()
  if (s.show === null) s.show = api.settings.get()[SHOW_COMPLETED_SETTING_KEY] === true
  return s.show
}

export function setShowCompleted(show: boolean): void {
  const s = completedStore()
  if (s.show === show) return
  s.show = show
  void api.settings.set(SHOW_COMPLETED_SETTING_KEY, show)
  for (const fn of s.listeners) fn(show)
}

export function useShowCompleted(): [boolean, () => void] {
  const [show, setLocal] = React.useState<boolean>(getShowCompleted)
  React.useEffect(() => {
    const s = completedStore()
    s.listeners.add(setLocal)
    return () => {
      s.listeners.delete(setLocal)
    }
  }, [])
  return [show, () => setShowCompleted(!getShowCompleted())]
}

export { DEFAULT_VIEW }
