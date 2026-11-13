import { React, api } from '../../runtime'
import type { TodoPriority, TodoRecord } from '../../types'
import { PRIORITIES, formatDueLabel, isoDay } from '../../model/sort'
import { todoPriorityLabel, uiText } from '../../localization'

/** The table's columns: ids, persisted choices and measured widths. */
export type TodoColumn = 'note' | 'group' | 'priority' | 'due' | 'flagged' | 'location' | 'tags'

// The order a list row reads in: title, text, then its details.
const COLUMNS: { id: TodoColumn; labelKey: string }[] = [
  { id: 'note', labelKey: 'todo.table.note' },
  { id: 'group', labelKey: 'todo.table.group' },
  { id: 'priority', labelKey: 'todo.table.priority' },
  { id: 'due', labelKey: 'todo.table.due' },
  { id: 'flagged', labelKey: 'todo.flagged' },
  { id: 'location', labelKey: 'todo.table.location' },
  { id: 'tags', labelKey: 'todo.table.tags' }
]
// The default reading order; the check at the front of the row already shows the status.
/** The table's column order: Title moves like any other column but is always shown. */
export type TableColumn = TodoColumn | 'title'
const DEFAULT_COLUMNS: TableColumn[] = ['title', 'due', 'priority', 'group', 'note']
export const PAGE_SIZES = [10, 20, 30, 40, 50, 100, 200, 500]
// Highest first, matching the order the priority menus read in.
export const PRIORITY_ORDER: TodoPriority[] = PRIORITIES.map((p) => p.id).reverse()

export const COLUMN_IDS = COLUMNS.map((column) => column.id)
/** Mirrors the stylesheet widths; Text counts at its narrowest useful width. */
export const COLUMN_MIN_WIDTH: Record<TodoColumn, number> = { note: 200, group: 132, priority: 104, due: 156, flagged: 92, location: 140, tags: 140 }

/** Rendered width of `html` inside an element of `className`, in the table's own document. */
function measureWidth(table: HTMLElement, className: string, html: string): number {
  const probe = table.ownerDocument.createElement('span')
  probe.className = className
  probe.style.cssText = 'position:absolute;visibility:hidden;left:-9999px;top:0;max-width:none;margin:0'
  probe.innerHTML = html
  table.appendChild(probe)
  const width = probe.getBoundingClientRect().width
  probe.remove()
  return Math.ceil(width)
}

const escapeHtml = (value: string): string => value.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]!)

/**
 * Due and Priority are sized to their widest possible content in the current
 * language and date format, so a date with its time and a priority label never
 * get cut off. The cell button's own padding is offset by its negative margin,
 * so a column needs the button's width plus the cell's 6px right padding.
 */
interface MeasuredWidths { due: number; priority: number; flagged: number; mins: Record<ResizableColumn, number> }

export function useMeasuredWidths(tableRef: { current: HTMLTableElement | null }): MeasuredWidths {
  const [widths, setWidths] = React.useState<MeasuredWidths>({ due: COLUMN_MIN_WIDTH.due, priority: COLUMN_MIN_WIDTH.priority, flagged: COLUMN_MIN_WIDTH.flagged, mins: { ...MIN_RESIZE_WIDTH } })
  const dateFormat = api.getState().dateFormat
  const language = api.ui.language()
  React.useLayoutEffect(() => {
    const table = tableRef.current
    if (!table) return
    const today = isoDay(new Date())
    const labels = { today: uiText('todo.due.today'), tomorrow: uiText('todo.due.tomorrow'), yesterday: uiText('todo.due.yesterday') }
    const dueTexts = [
      labels.today, labels.tomorrow, labels.yesterday,
      ...Array.from({ length: 12 }, (_, month) => formatDueLabel(`2030-${String(month + 1).padStart(2, '0')}-28`, today, labels, language, dateFormat))
    ]
    const due = Math.max(
      ...dueTexts.map((text) => measureWidth(table, 'todo-table-cell-btn is-overdue', `<span>${escapeHtml(text)}</span><span class="todo-table-time">23:59</span>`)),
      measureWidth(table, 'todo-table-sort active', `<span>${escapeHtml(uiText('todo.table.due'))}</span><svg width="12" height="12"></svg>`)
    )
    const priority = Math.max(
      ...PRIORITY_ORDER.map((id) => measureWidth(table, 'todo-table-cell-btn', `<svg width="14" height="14"></svg><span>${escapeHtml(todoPriorityLabel(id))}</span>`)),
      measureWidth(table, 'todo-table-sort active', `<span>${escapeHtml(uiText('todo.table.priority'))}</span><svg width="12" height="12"></svg>`)
    )
    const flagged = measureWidth(table, 'todo-table-sort active', `<span>${escapeHtml(uiText('todo.flagged'))}</span><svg width="12" height="12"></svg>`)
    const header = (labelKey: string): number => measureWidth(table, 'todo-table-sort active', `<span>${escapeHtml(uiText(labelKey))}</span><svg width="12" height="12"></svg>`) + 16
    const mins = Object.fromEntries(RESIZABLE.map((id) => [id, Math.max(MIN_RESIZE_WIDTH[id], header(id === 'title' ? 'todo.table.title' : COLUMN_LABEL_KEYS[id]))])) as Record<ResizableColumn, number>
    const next: MeasuredWidths = { due: Math.max(due + 10, 96), priority: Math.max(priority + 10, 72), flagged: Math.max(flagged + 10, 48), mins }
    setWidths((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next))
  }, [tableRef, dateFormat, language])
  return widths
}
/** Until the user drags it, Tags fits the widest tag list shown, up to TAGS_MAX_WIDTH. */
const TAGS_MAX_WIDTH = 360

export function useTagsWidth(tableRef: { current: HTMLTableElement | null }, todos: readonly TodoRecord[]): number {
  const [width, setWidth] = React.useState(COLUMN_MIN_WIDTH.tags)
  const lists = React.useMemo(() => [...new Set(todos.map((todo) => (todo.tags ?? []).join('\n')).filter(Boolean))], [todos])
  const key = lists.join('\0')
  React.useLayoutEffect(() => {
    const table = tableRef.current
    if (!table) return
    const widest = Math.max(0, ...lists.map((list) => measureWidth(table, '', list.split('\n').map((tag) => `<span class="todo-table-tag">#${escapeHtml(tag)}</span>`).join(''))))
    setWidth(Math.min(TAGS_MAX_WIDTH, Math.max(COLUMN_MIN_WIDTH.tags, widest + 12)))
  }, [tableRef, key])
  return width
}
export const TITLE_MIN_WIDTH = 240
export const FIXED_EDGE_WIDTH = 34 + 48
export const COLUMN_LABEL_KEYS = Object.fromEntries(COLUMNS.map((column) => [column.id, column.labelKey])) as Record<TodoColumn, string>

/** The shown columns in the order the user arranged them. */
function normalizeColumns(raw: unknown): TableColumn[] {
  if (!Array.isArray(raw)) return DEFAULT_COLUMNS
  const valid = [...new Set(raw)].filter((id): id is TableColumn => id === 'title' || COLUMN_IDS.includes(id as TodoColumn))
  return valid.includes('title') ? valid : ['title', ...valid]
}

function normalizePriorities(raw: unknown): TodoPriority[] {
  return Array.isArray(raw) ? PRIORITY_ORDER.filter((id) => raw.includes(id)) : []
}

export function normalizePageSize(raw: unknown): number {
  return PAGE_SIZES.includes(raw as number) ? raw as number : PAGE_SIZES[0]
}

export function useSetting<T>(key: string, normalize: (raw: unknown) => T): [T, (value: T) => void] {
  const [value, setValue] = React.useState<T>(() => normalize(api.settings.get()[key]))
  // An unrelated settings write keeps this value's identity, so the rows it feeds stay memoised.
  React.useEffect(() => api.settings.subscribe(() => {
    const next = normalize(api.settings.get()[key])
    setValue((current) => (JSON.stringify(current) === JSON.stringify(next) ? current : next))
  }), [key, normalize])
  const update = React.useCallback((next: T) => {
    setValue(next)
    void api.settings.set(key, next)
  }, [key])
  return [value, update]
}

export const useTableColumns = (): [TableColumn[], (value: TableColumn[]) => void] => useSetting('pageColumns', normalizeColumns)

export const columnLabelKey = (id: TableColumn): string => (id === 'title' ? 'todo.table.title' : COLUMN_LABEL_KEYS[id])
export const usePriorityFilter = (): [TodoPriority[], (value: TodoPriority[]) => void] => useSetting('pagePriorityFilter', normalizePriorities)

/** Columns whose width can be dragged; Due and Priority keep their measured width. */
export type ResizableColumn = 'title' | 'note' | 'group' | 'location' | 'tags'
export const RESIZABLE: ResizableColumn[] = ['title', 'note', 'group', 'location', 'tags']
/** A column never drags narrower than this, nor than its own header label (measured). */
export const MIN_RESIZE_WIDTH: Record<ResizableColumn, number> = { title: 180, note: 120, group: 104, location: 104, tags: 96 }
export const MAX_RESIZE_WIDTH = 900

export function normalizeColumnWidths(raw: unknown): Partial<Record<ResizableColumn, number>> {
  const value = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {}
  const out: Partial<Record<ResizableColumn, number>> = {}
  for (const id of RESIZABLE) {
    const width = value[id]
    if (typeof width === 'number' && Number.isFinite(width)) out[id] = Math.round(Math.min(MAX_RESIZE_WIDTH, Math.max(MIN_RESIZE_WIDTH[id], width)))
  }
  return out
}
