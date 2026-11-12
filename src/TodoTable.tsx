import { React, api, registerTodoRow, revealRequestStore } from './runtime'
import type { CSSProperties, HTMLAttributes, ReactElement } from 'react'
import type { TodoPriority, TodoRecord } from './types'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { renderInlineMarkdown } from './markdown'
import { allGroups, groupColorFor, type TodoGroup } from './groups'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  CircleCheck,
  GripVertical,
  Flag,
  MapPin,
  Minus,
  PriorityGlyph,
  SlidersHorizontal
} from './icons'
import { TodoMenu } from './TodoMenu'
import { useStatusCheck } from './TodoRow'
import { LocationField } from './LocationField'
import { openStatusMenu } from './SwipeRow'
import { confirmDeleteTodo } from './data'
import { effectiveStatus, patchForStatus, useStatusVocabulary } from './statuses'
import { StatusBadge } from './StatusBadge'
import { SECTION_LABEL_KEYS, parseQuickAdd, type TodoSectionId } from './sections'
import { PRIORITIES, formatDate, formatDueLabel, isoDay } from './sort'
import { useShowCompleted, useStatusFilter, type PageSort, type PageSortField } from './viewStore'
import { StatusChoices, visibleSelectedStatuses } from './StatusFilter'
import type { TodoListController } from './controller'
import { todoPriorityLabel, todoStatusLabel, uiText } from './localization'

/**
 * The main page's task table: the list row's status control and fields in the
 * list row's order, sortable column headers, Cmd/Shift-click selection with
 * bulk actions, a column picker and pagination. Columns, rows per page and the
 * priority filter persist in the plugin settings; the selection and the
 * current page are session state.
 */

export type TodoColumn = 'note' | 'group' | 'status' | 'priority' | 'due' | 'flagged' | 'location' | 'tags'

// The order a list row reads in: title, text, then its details.
const COLUMNS: { id: TodoColumn; labelKey: string }[] = [
  { id: 'note', labelKey: 'todo.table.note' },
  { id: 'group', labelKey: 'todo.table.group' },
  { id: 'status', labelKey: 'todo.table.status' },
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
const PAGE_SIZES = [10, 20, 30, 40, 50, 100, 200, 500]
// Highest first, matching the order the priority menus read in.
const PRIORITY_ORDER: TodoPriority[] = PRIORITIES.map((p) => p.id).reverse()

const COLUMN_IDS = COLUMNS.map((column) => column.id)
/** Mirrors the stylesheet widths; Text counts at its narrowest useful width. */
const COLUMN_MIN_WIDTH: Record<TodoColumn, number> = { note: 200, group: 132, status: 112, priority: 104, due: 156, flagged: 92, location: 140, tags: 140 }

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

function useMeasuredWidths(tableRef: { current: HTMLTableElement | null }): MeasuredWidths {
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

function useTagsWidth(tableRef: { current: HTMLTableElement | null }, todos: readonly TodoRecord[]): number {
  const [width, setWidth] = React.useState(COLUMN_MIN_WIDTH.tags)
  const lists = [...new Set(todos.map((todo) => (todo.tags ?? []).join('\n')).filter(Boolean))]
  const key = lists.join('\0')
  React.useLayoutEffect(() => {
    const table = tableRef.current
    if (!table) return
    const widest = Math.max(0, ...lists.map((list) => measureWidth(table, '', list.split('\n').map((tag) => `<span class="todo-table-tag">#${escapeHtml(tag)}</span>`).join(''))))
    setWidth(Math.min(TAGS_MAX_WIDTH, Math.max(COLUMN_MIN_WIDTH.tags, widest + 12)))
  }, [tableRef, key])
  return width
}
const TITLE_MIN_WIDTH = 240
const FIXED_EDGE_WIDTH = 34 + 48
const COLUMN_LABEL_KEYS = Object.fromEntries(COLUMNS.map((column) => [column.id, column.labelKey])) as Record<TodoColumn, string>

/** The shown columns in the order the user arranged them. */
function normalizeColumns(raw: unknown): TableColumn[] {
  if (!Array.isArray(raw)) return DEFAULT_COLUMNS
  const valid = [...new Set(raw)].filter((id): id is TableColumn => id === 'title' || COLUMN_IDS.includes(id as TodoColumn))
  return valid.includes('title') ? valid : ['title', ...valid]
}

function normalizePriorities(raw: unknown): TodoPriority[] {
  return Array.isArray(raw) ? PRIORITY_ORDER.filter((id) => raw.includes(id)) : []
}

function normalizePageSize(raw: unknown): number {
  return PAGE_SIZES.includes(raw as number) ? raw as number : PAGE_SIZES[0]
}

function useSetting<T>(key: string, normalize: (raw: unknown) => T): [T, (value: T) => void] {
  const [value, setValue] = React.useState<T>(() => normalize(api.settings.get()[key]))
  React.useEffect(() => api.settings.subscribe(() => setValue(normalize(api.settings.get()[key]))), [key, normalize])
  const update = React.useCallback((next: T) => {
    setValue(next)
    void api.settings.set(key, next)
  }, [key])
  return [value, update]
}

export const useTableColumns = (): [TableColumn[], (value: TableColumn[]) => void] => useSetting('pageColumns', normalizeColumns)

const columnLabelKey = (id: TableColumn): string => (id === 'title' ? 'todo.table.title' : COLUMN_LABEL_KEYS[id])
export const usePriorityFilter = (): [TodoPriority[], (value: TodoPriority[]) => void] => useSetting('pagePriorityFilter', normalizePriorities)

export const PriorityIcon = ({ priority }: { priority: TodoPriority }): ReactElement => {
  const Glyph = priority === 'high' ? ArrowUp : priority === 'medium' ? ArrowRight : priority === 'low' ? ArrowDown : Minus
  return <Glyph className={`todo-table-priority-icon todo-priority-${priority}`} />
}

function FacetButton({ label, active, icon, onOpen }: { label: string; active: boolean; icon: ReactElement; onOpen: (anchor: HTMLElement) => void }): ReactElement {
  return (
    <button
      type="button"
      className={`todo-page-appbar-btn${active ? ' active' : ''}`}
      aria-label={label}
      title={label}
      onClick={(event) => onOpen(event.currentTarget)}
    >
      {icon}
    </button>
  )
}

export function StatusFacet(): ReactElement {
  const [filter] = useStatusFilter()
  const [showCompleted] = useShowCompleted()
  const defs = useStatusVocabulary()
  const active = defs.map((status) => status.id)
  const selected = visibleSelectedStatuses(filter, active, showCompleted)
  // Hiding done work is the default, not a filter the user set.
  const filtering = filter !== 'all' && selected.length !== active.length
  return (
    <FacetButton
      label={uiText('todo.table.status')}
      active={filtering}
      icon={<CircleCheck />}
      onOpen={(anchor) => void api.ui.openPopover(
        () => <StatusChoices />,
        { anchor, align: 'start', gap: 4 },
        { className: 'todo-status-filter-popover', ariaLabel: uiText('todo.filters.statuses') }
      )}
    />
  )
}

/** The status filter, on the header cell above the column of status checks it filters. */
function StatusHeaderFilter(): ReactElement {
  const [filter] = useStatusFilter()
  const [showCompleted] = useShowCompleted()
  const defs = useStatusVocabulary()
  const active = defs.map((status) => status.id)
  const selected = visibleSelectedStatuses(filter, active, showCompleted)
  const filtering = filter !== 'all' && selected.length !== active.length
  const label = uiText('todo.filters.statuses')
  return (
    <button
      type="button"
      className={`todo-table-status-filter${filtering ? ' active' : ''}`}
      aria-label={label}
      title={label}
      onClick={(event) => void api.ui.openPopover(
        () => <StatusChoices />,
        { anchor: event.currentTarget, align: 'start', gap: 4 },
        { className: 'todo-status-filter-popover', ariaLabel: label }
      )}
    >
      <CircleCheck />
    </button>
  )
}

function PriorityChoices(): ReactElement {
  const [selected, setSelected] = usePriorityFilter()
  return (
    <div className="todo-status-filter-menu">
      {PRIORITY_ORDER.map((id) => {
        const checked = selected.includes(id)
        return (
          <button
            type="button"
            className="todo-status-filter-option"
            aria-pressed={checked}
            key={id}
            onClick={() => setSelected(checked
              ? selected.filter((value) => value !== id)
              : PRIORITY_ORDER.filter((value) => selected.includes(value) || value === id))}
          >
            <span className="todo-status-filter-check" aria-hidden="true">{checked ? '✓' : ''}</span>
            <span className="todo-status-filter-glyph"><PriorityIcon priority={id} /></span>
            <span>{todoPriorityLabel(id)}</span>
          </button>
        )
      })}
    </div>
  )
}

export function PriorityFacet(): ReactElement {
  const [selected] = usePriorityFilter()
  return (
    <FacetButton
      label={uiText('todo.table.priority')}
      active={selected.length > 0}
      icon={<PriorityGlyph />}
      onOpen={(anchor) => void api.ui.openPopover(
        () => <PriorityChoices />,
        { anchor, align: 'start', gap: 4 },
        { className: 'todo-status-filter-popover todo-compact-popover', ariaLabel: uiText('todo.table.priority'), width: 168 }
      )}
    />
  )
}

/**
 * Every column reorders by dragging its grip (or Alt+↑/↓ on it), Title too;
 * the others also turn on and off. The table follows this order.
 */
function ColumnChoices(): ReactElement {
  const [shown, setShown] = useTableColumns()
  const order: TableColumn[] = [...shown, ...COLUMN_IDS.filter((id) => !shown.includes(id))]
  const [dragging, setDragging] = React.useState<TableColumn | null>(null)
  const [drop, setDrop] = React.useState<{ id: TableColumn; after: boolean } | null>(null)

  const move = (id: TableColumn, target: TableColumn, after: boolean): void => {
    if (id === target) return
    const next = order.filter((candidate) => candidate !== id)
    next.splice(next.indexOf(target) + (after ? 1 : 0), 0, id)
    setShown(next.filter((candidate) => shown.includes(candidate)))
  }

  return (
    <div className="todo-status-filter-menu todo-column-menu" onDragEnd={() => { setDragging(null); setDrop(null) }}>
      <div className="todo-table-menu-label">{uiText('todo.table.toggleColumns')}</div>
      <div className="todo-filter-divider" />
      {order.map((id, index) => {
        const checked = shown.includes(id)
        const locked = id === 'title'
        const label = uiText(columnLabelKey(id))
        return (
          <div
            key={id}
            className={`todo-column-option${locked ? ' is-locked' : ''}${dragging === id ? ' is-dragging' : ''}${drop?.id === id ? (drop.after ? ' drop-after' : ' drop-before') : ''}`}
            onDragOver={(event) => {
              if (!dragging) return
              event.preventDefault()
              const rect = event.currentTarget.getBoundingClientRect()
              setDrop({ id, after: event.clientY > rect.top + rect.height / 2 })
            }}
            onDrop={(event) => {
              event.preventDefault()
              if (dragging && drop) move(dragging, drop.id, drop.after)
              setDragging(null)
              setDrop(null)
            }}
          >
            <span
              className="todo-column-grip"
              draggable
              role="button"
              tabIndex={0}
              aria-label={uiText('todo.table.reorderColumn', { p0: label })}
              title={uiText('todo.table.reorderColumn', { p0: label })}
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.setData('text/plain', id)
                const row = event.currentTarget.parentElement
                if (row) event.dataTransfer.setDragImage(row, 12, row.offsetHeight / 2)
                setDragging(id)
              }}
              onKeyDown={(event) => {
                if (!event.altKey || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return
                event.preventDefault()
                const target = order[index + (event.key === 'ArrowUp' ? -1 : 1)]
                if (target) move(id, target, event.key === 'ArrowDown')
              }}
            >
              <GripVertical />
            </span>
            <button
              type="button"
              className="todo-column-toggle"
              aria-pressed={checked}
              disabled={locked}
              onClick={() => setShown(order.filter((candidate) => candidate === id ? !checked : shown.includes(candidate)))}
            >
              <span className="todo-status-filter-check" aria-hidden="true">{checked ? '✓' : ''}</span>
              <span>{label}</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}

export function ColumnsButton(): ReactElement {
  return (
    <button
      type="button"
      className="todo-page-appbar-btn"
      aria-label={uiText('todo.table.toggleColumns')}
      title={uiText('todo.table.toggleColumns')}
      onClick={(event) => void api.ui.openPopover(
        () => <ColumnChoices />,
        { anchor: event.currentTarget, align: 'end', gap: 4 },
        { className: 'todo-status-filter-popover todo-compact-popover', ariaLabel: uiText('todo.table.toggleColumns'), width: 196 }
      )}
    >
      <SlidersHorizontal />
    </button>
  )
}

function SortHeader({ field, label, className, sort, onSort, width, resize, thProps }: {
  /** Drag-to-reorder handlers for the header cell. */
  thProps?: HTMLAttributes<HTMLTableCellElement>
  field: PageSortField
  label: string
  className: string
  sort: PageSort
  onSort: (sort: PageSort) => void
  /** A width the user dragged this column to. */
  width?: number | 'auto'
  /** The invisible split handle on the column's right edge. */
  resize?: ReactElement
}): ReactElement {
  const active = sort.field === field
  const Icon = !active ? ChevronsUpDown : sort.dir === 'asc' ? ArrowUp : ArrowDown
  return (
    <th
      {...thProps}
      className={className}
      style={width === undefined ? undefined : { width }}
      aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <button
        type="button"
        className={`todo-table-sort${active ? ' active' : ''}`}
        aria-label={label}
        title={label}
        // Unsorted → ascending → descending → back to the view's own order.
        onClick={() => onSort(!active
          ? { field, dir: 'asc' }
          : sort.dir === 'asc' ? { field, dir: 'desc' } : { field: 'auto', dir: 'asc' })}
      >
        <span>{label}</span>
        <Icon />
      </button>
      {resize}
    </th>
  )
}

/** Columns whose width can be dragged; Due and Priority keep their measured width. */
type ResizableColumn = 'title' | 'note' | 'group' | 'status' | 'location' | 'tags'
const RESIZABLE: ResizableColumn[] = ['title', 'note', 'group', 'status', 'location', 'tags']
/** A column never drags narrower than this, nor than its own header label (measured). */
const MIN_RESIZE_WIDTH: Record<ResizableColumn, number> = { title: 180, note: 120, group: 104, status: 100, location: 104, tags: 96 }
const MAX_RESIZE_WIDTH = 900

function normalizeColumnWidths(raw: unknown): Partial<Record<ResizableColumn, number>> {
  const value = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {}
  const out: Partial<Record<ResizableColumn, number>> = {}
  for (const id of RESIZABLE) {
    const width = value[id]
    if (typeof width === 'number' && Number.isFinite(width)) out[id] = Math.round(Math.min(MAX_RESIZE_WIDTH, Math.max(MIN_RESIZE_WIDTH[id], width)))
  }
  return out
}

/**
 * The split between two headers: nothing to see until the pointer is over it,
 * then a thin line. Dragging sets the column to its left; a double-click
 * returns it to its default width.
 */
function ColumnResizer({ id, label, min, onDrag, onCommit, onReset }: {
  id: ResizableColumn
  label: string
  min: number
  onDrag: (id: ResizableColumn, width: number) => void
  onCommit: (id: ResizableColumn, width: number) => void
  onReset: (id: ResizableColumn) => void
}): ReactElement {
  const drag = React.useRef<{ startX: number; startWidth: number; width: number } | null>(null)
  const clamp = (width: number): number => Math.round(Math.min(MAX_RESIZE_WIDTH, Math.max(min, width)))
  return (
    <span
      className="todo-col-resize"
      role="separator"
      aria-orientation="vertical"
      aria-label={uiText('todo.table.resizeColumn', { p0: label })}
      title={uiText('todo.table.resizeColumn', { p0: label })}
      onClick={(event) => event.stopPropagation()}
      onDoubleClick={(event) => {
        event.stopPropagation()
        onReset(id)
      }}
      onPointerDown={(event) => {
        if (event.button !== 0) return
        event.preventDefault()
        event.stopPropagation()
        const th = event.currentTarget.parentElement
        const startWidth = th ? th.getBoundingClientRect().width : MIN_RESIZE_WIDTH[id]
        drag.current = { startX: event.clientX, startWidth, width: startWidth }
        event.currentTarget.setPointerCapture?.(event.pointerId)
        event.currentTarget.classList.add('is-dragging')
      }}
      onPointerMove={(event) => {
        if (!drag.current) return
        const width = clamp(drag.current.startWidth + event.clientX - drag.current.startX)
        drag.current.width = width
        onDrag(id, width)
      }}
      onPointerUp={(event) => {
        if (!drag.current) return
        event.currentTarget.classList.remove('is-dragging')
        event.currentTarget.releasePointerCapture?.(event.pointerId)
        onCommit(id, drag.current.width)
        drag.current = null
      }}
      onPointerCancel={(event) => {
        event.currentTarget.classList.remove('is-dragging')
        drag.current = null
      }}
    />
  )
}


/** Date and start time of one task, edited in place from its Due cell. */
function DueEditor({ todo, onPatch }: { todo: TodoRecord; onPatch: (patch: Partial<TodoRecord>) => void }): ReactElement {
  const { DateField, TimeField } = api.ui.settings
  const [date, setDate] = React.useState(todo.dueDate?.slice(0, 10) ?? '')
  const [time, setTime] = React.useState(todo.startTime ?? '')
  return (
    <div className="todo-cell-editor">
      <DateField
        value={date}
        ariaLabel={uiText('todo.field.dueDate')}
        onChange={(value) => {
          setDate(value)
          if (!value) setTime('')
          onPatch(value ? { dueDate: value } : { dueDate: '', startTime: undefined, endTime: undefined })
        }}
      />
      <TimeField
        value={time}
        disabled={!date}
        ariaLabel={uiText('todo.field.startTime')}
        onChange={(value) => {
          setTime(value)
          onPatch({ startTime: value || undefined })
        }}
      />
    </div>
  )
}

/** Notes as plain text; saved when the box closes or on ⌘/Ctrl+Enter. */
function NotesEditor({ initial, onInput, onDone }: { initial: string; onInput: (value: string) => void; onDone: () => void }): ReactElement {
  return (
    <textarea
      className="todo-cell-notes"
      defaultValue={initial}
      rows={7}
      autoFocus
      aria-label={uiText('todo.edit.notes')}
      onChange={(event) => onInput(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && api.ui.hasModKey(event)) {
          event.preventDefault()
          onDone()
        }
      }}
    />
  )
}

function TagsEditor({ todo, onPatch }: { todo: TodoRecord; onPatch: (patch: Partial<TodoRecord>) => void }): ReactElement {
  const { ChipsField } = api.ui.settings
  const [tags, setTags] = React.useState<string[]>(todo.tags ?? [])
  return (
    <div className="todo-cell-editor">
      <ChipsField
        items={tags}
        ariaLabel={uiText('todo.edit.tags')}
        placeholder={uiText('todo.compose.addTags')}
        normalize={(value) => value.trim().replace(/^#+/, '')}
        removable
        onChange={(next) => {
          setTags(next)
          onPatch({ tags: next })
        }}
      />
    </div>
  )
}

function LocationEditor({ todo, onPatch }: { todo: TodoRecord; onPatch: (patch: Partial<TodoRecord>) => void }): ReactElement {
  const [location, setLocation] = React.useState(todo.location)
  return (
    <div className="todo-cell-editor">
      <LocationField value={location} onChange={(next) => { setLocation(next); onPatch({ location: next }) }} />
    </div>
  )
}

const ROW_CONTROLS = 'input, button, a, textarea, [contenteditable="true"]'

/** The note's first line of words as plain text: a 37px row has no room for blocks. */
export function notePreview(note: string): string {
  for (const raw of note.split('\n')) {
    if (raw.trim().startsWith('```')) continue
    const line = raw.trim()
      .replace(/^(?:>\s*)+/, '')
      .replace(/^#{1,6}\s+/, '')
      .replace(/^(?:[-*+]|\d+[.)])\s+(?:\[.\]\s+)?/, '')
      .replace(/!?\[\[([^\]|#]+)[^\]|]*(?:\|([^\]]+))?\]\]/g, (_, target: string, alias?: string) => alias ?? target.split('/').pop() ?? target)
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/(?<!\w)(\*\*|__|\*|_|~~|`)(?=\S)(.+?)(?<=\S)\1(?!\w)/g, '$2')
      .replace(/^\||\|$/g, '')
      .replace(/\s*\|\s*/g, ' · ')
      .trim()
    if (/[\p{L}\p{N}]/u.test(line)) return line
  }
  return ''
}

function TableRow({ todo, groups, columns, c, selected, onPick }: {
  todo: TodoRecord
  groups: TodoGroup[]
  columns: TableColumn[]
  c: TodoListController
  selected: boolean
  /** Toggles this row, or with `range` selects from the last picked row to it. */
  onPick: (range: boolean) => void
}): ReactElement {
  const rowRef = React.useRef<HTMLTableRowElement>(null)
  React.useEffect(() => rowRef.current ? registerTodoRow(todo.id, rowRef.current) : undefined, [todo.id])
  const [titleHtml, setTitleHtml] = React.useState('')
  React.useEffect(() => {
    let active = true
    setTitleHtml('')
    void renderInlineMarkdown(todo.title).then((html) => { if (active) setTitleHtml(html) }).catch(() => { if (active) setTitleHtml('') })
    return () => { active = false }
  }, [todo.title])
  const noteLine = notePreview(todo.note)
  const { check } = useStatusCheck(todo, c)

  const status = effectiveStatus(todo)
  const pending = c.pendingIds.has(todo.id)
  const patch = (next: Partial<TodoRecord>): unknown => c.patchTodo(todo.id, next)
  const today = isoDay(new Date())
  const dateFormat = api.getState().dateFormat
  const dueLabel = todo.dueDate
    ? formatDueLabel(
        todo.dueDate,
        today,
        { today: uiText('todo.due.today'), tomorrow: uiText('todo.due.tomorrow'), yesterday: uiText('todo.due.yesterday') },
        api.ui.language(),
        dateFormat
      )
    : ''
  const overdue = !!todo.dueDate && !todo.completed && todo.dueDate.slice(0, 10) < today

  const [editingTitle, setEditingTitle] = React.useState(false)
  // A click edits the title in place; a double-click opens the full editor instead.
  const titleTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(() => () => { if (titleTimer.current) clearTimeout(titleTimer.current) }, [])
  const [titleDraft, setTitleDraft] = React.useState(todo.title)
  const commitTitle = (): void => {
    const next = titleDraft.trim()
    setEditingTitle(false)
    if (next && next !== todo.title) void patch({ title: next })
  }
  const editIn = (anchor: HTMLElement, label: string, render: () => ReactElement, width = 260): void => {
    void api.ui.openPopover(render, { anchor, align: 'start', gap: 4 }, { className: 'todo-cell-popover', ariaLabel: label, width })
  }
  const openNotes = (anchor: HTMLElement): void => {
    let value = todo.note
    const save = (): void => { if (value !== todo.note) void patch({ note: value }) }
    void api.ui.openPopover(
      ({ close }) => <NotesEditor initial={todo.note} onInput={(next) => { value = next }} onDone={() => { save(); close() }} />,
      { anchor, align: 'start', gap: 4 },
      { className: 'todo-cell-popover', ariaLabel: uiText('todo.edit.notes'), width: 360, beforeDismiss: () => { save(); return true } }
    )
  }

  const cell = (id: TodoColumn): ReactElement => {
    switch (id) {
      case 'note':
        return (
          <td className="todo-table-note" title={noteLine || undefined}>
            <button type="button" className="todo-table-edit-btn" disabled={pending} aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.note') })} onClick={(event) => openNotes(event.currentTarget)}>
              <span className="todo-table-note-text">{noteLine}</span>
            </button>
          </td>
        )
      case 'group':
        return (
          <td className="todo-table-group">
            <button
              type="button"
              className="todo-table-edit-btn"
              disabled={pending}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.group') })}
              onClick={(event) => void api.ui.openMenu([
                { label: uiText('todo.chip.noGroup'), type: 'radio' as const, checked: !todo.group, onSelect: () => patch({ group: undefined }) },
                ...allGroups(groups).map((name) => ({
                  label: name,
                  type: 'radio' as const,
                  checked: todo.group === name,
                  color: groupColorFor(name, groups),
                  onSelect: () => patch({ group: name })
                }))
              ], { anchor: event.currentTarget, align: 'start' })}
            >
              {todo.group && (
                <span className="todo-table-group-pill" title={todo.group} style={{ '--todo-group-color': paletteCssValue(groupColorFor(todo.group, groups)) } as CSSProperties}>
                  <span className="todo-group-dot" aria-hidden="true" />
                  <span className="todo-table-group-name">{todo.group}</span>
                </span>
              )}
            </button>
          </td>
        )
      case 'status':
        return (
          <td className="todo-table-status">
            <button
              type="button"
              className="todo-table-cell-btn"
              disabled={pending}
              title={uiText('todo.table.status')}
              onClick={(event) => openStatusMenu(event.currentTarget, todo, patch)}
            >
              {status === 'open'
                ? <span className="todo-status-plain">{todoStatusLabel(status)}</span>
                : <StatusBadge status={status} />}
            </button>
          </td>
        )
      case 'priority':
        return (
          <td className="todo-table-priority">
            <button
              type="button"
              className={`todo-table-cell-btn${todo.priority === 'normal' ? ' muted' : ''}`}
              disabled={pending}
              title={uiText('todo.table.priority')}
              onClick={(event) => void api.ui.openMenu(PRIORITY_ORDER.map((id) => ({
                label: todoPriorityLabel(id),
                icon: <PriorityIcon priority={id} />,
                type: 'radio' as const,
                checked: todo.priority === id,
                onSelect: () => patch({ priority: id })
              })), { anchor: event.currentTarget })}
            >
              <PriorityIcon priority={todo.priority} />
              <span>{todoPriorityLabel(todo.priority)}</span>
            </button>
          </td>
        )
      case 'due':
        return (
          <td className="todo-table-due">
            {/* Edits the date in place; the table never jumps to Calendar. */}
            <button
              type="button"
              className={`todo-table-cell-btn todo-table-due-text${overdue ? ' is-overdue' : ''}`}
              disabled={pending}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.due') })}
              title={todo.dueDate ? formatDate(todo.dueDate, dateFormat) : uiText('todo.field.dueDate')}
              onClick={(event) => editIn(event.currentTarget, uiText('todo.field.dueDate'), () => <DueEditor todo={todo} onPatch={(next) => void patch(next)} />, 240)}
            >
              <span>{dueLabel}</span>
              {todo.startTime && <span className="todo-table-time">{todo.startTime}</span>}
            </button>
          </td>
        )
      case 'flagged':
        return (
          <td className="todo-table-flagged">
            <button
              type="button"
              className={`todo-table-flag-btn${todo.flagged ? ' on' : ''}`}
              aria-pressed={!!todo.flagged}
              disabled={pending}
              aria-label={uiText('todo.flag')}
              title={uiText(todo.flagged ? 'todo.flagged' : 'todo.flag')}
              onClick={() => patch({ flagged: !todo.flagged })}
            >
              <Flag />
            </button>
          </td>
        )
      case 'location':
        return (
          <td className="todo-table-location">
            <button
              type="button"
              className="todo-table-cell-btn todo-table-edit-btn"
              disabled={pending}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.location') })}
              title={todo.location?.name ?? uiText('todo.field.location')}
              onClick={(event) => editIn(event.currentTarget, uiText('todo.field.location'), () => <LocationEditor todo={todo} onPatch={(next) => void patch(next)} />, 300)}
            >
              {todo.location && <><MapPin /><span>{todo.location.name}</span></>}
            </button>
          </td>
        )
      case 'tags':
        return (
          <td className="todo-table-tags" title={todo.tags?.map((tag) => `#${tag}`).join(' ') || undefined}>
            <button
              type="button"
              className="todo-table-edit-btn"
              disabled={pending}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.tags') })}
              onClick={(event) => editIn(event.currentTarget, uiText('todo.edit.tags'), () => <TagsEditor todo={todo} onPatch={(next) => void patch(next)} />, 280)}
            >
              {todo.tags?.map((tag) => <span key={tag} className="todo-table-tag">#{tag}</span>)}
            </button>
          </td>
        )
    }
  }

  return (
    <tr
      ref={rowRef}
      className={`todo-table-row${todo.completed ? ' completed' : ''}${selected ? ' selected' : ''}`}
      data-todo-id={todo.id}
      data-status={status}
      aria-selected={selected}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault()
          let next = event.key === 'ArrowDown' ? event.currentTarget.nextElementSibling : event.currentTarget.previousElementSibling
          while (next && !next.classList.contains('todo-table-row')) next = event.key === 'ArrowDown' ? next.nextElementSibling : next.previousElementSibling
          ;(next as HTMLElement | null)?.focus()
        } else if (event.key === 'Enter') {
          event.preventDefault()
          c.openDetail(todo.id)
        } else if (event.key === ' ') {
          event.preventDefault()
          onPick(false)
        } else if (event.key === 'Escape') {
          event.currentTarget.blur()
        }
      }}
      onClick={(event) => {
        // A click only focuses the row; Cmd/Shift-click selects, a double-click
        // opens the editor. The table never jumps to Calendar.
        if ((event.target as Element).closest(ROW_CONTROLS)) return
        if (api.ui.hasModKey(event) || event.shiftKey) onPick(event.shiftKey)
      }}
      onDoubleClick={(event) => {
        const onTitle = !!(event.target as Element).closest('.todo-table-title-btn')
        if (onTitle && titleTimer.current) { clearTimeout(titleTimer.current); titleTimer.current = null }
        if ((!onTitle && (event.target as Element).closest(ROW_CONTROLS)) || api.ui.hasModKey(event) || event.shiftKey) return
        c.openDetail(todo.id)
      }}
    >
      <td className="todo-table-select">{check}</td>
      {columns.map((id) => <React.Fragment key={id}>{id === 'title' ? (
        <td className="todo-table-title">
          {editingTitle ? (
            <input
              className="todo-table-new-input todo-table-title-input"
              value={titleDraft}
              autoFocus
              aria-label={uiText('todo.table.title')}
              onChange={(event) => setTitleDraft(event.target.value)}
              onBlur={commitTitle}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing) return
                if (event.key === 'Enter') { event.preventDefault(); commitTitle() }
                else if (event.key === 'Escape') { event.preventDefault(); setTitleDraft(todo.title); setEditingTitle(false) }
              }}
            />
          ) : (
            <button
              type="button"
              className="todo-table-edit-btn todo-table-title-btn"
              disabled={pending}
              aria-label={uiText('todo.table.editTitle', { p0: todo.title })}
              onClick={(event) => {
                if (api.ui.hasModKey(event) || event.shiftKey) { onPick(event.shiftKey); return }
                if (event.detail > 1) return
                if (titleTimer.current) clearTimeout(titleTimer.current)
                titleTimer.current = setTimeout(() => {
                  titleTimer.current = null
                  setTitleDraft(todo.title)
                  setEditingTitle(true)
                }, 220)
              }}
            >
              {titleHtml
                ? <span className="todo-table-title-text" dangerouslySetInnerHTML={{ __html: titleHtml }} />
                : <span className="todo-table-title-text">{todo.title}</span>}
            </button>
          )}
        </td>
      ) : cell(id)}</React.Fragment>)}
      <td className="todo-table-actions">
        {todo.flagged && !columns.includes('flagged') && <span className="todo-table-flag" title={uiText('todo.flagged')}><Flag /></span>}
        <TodoMenu
          todo={todo}
          groupNames={allGroups(groups)}
          openId={c.menuId}
          setOpenId={c.setMenuId}
          onEdit={() => c.openDetail(todo.id)}
          onPatch={patch}
          onRequestDelete={() => confirmDeleteTodo(todo, c.removeTodo)}
          disabled={pending}
        />
      </td>
    </tr>
  )
}

/** One task per pasted line, with list markers and checkboxes stripped. */
export function pastedTaskLines(text: string): string[] {
  return text.split(/\r?\n/)
    .map((line) => line.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/, '').replace(/^\[[ xX]?\]\s*/, '').trim())
    .filter(Boolean)
}

export function TodoTable({ todos, groups, c, sort, onSort, resetKey, empty, sectionOf, composeSignal = 0, newTaskPatch }: {
  todos: TodoRecord[]
  /** Bumped by the page's +: opens the empty row at the top of the table. */
  composeSignal?: number
  /** Fields a new task needs to belong to the current view (group, date, flag). */
  newTaskPatch?: () => Partial<TodoRecord>
  /** With the view's own order, the Overdue · Today · Upcoming band each row belongs to; rows then sit under band headers. */
  sectionOf?: (todo: TodoRecord) => TodoSectionId
  groups: TodoGroup[]
  c: TodoListController
  sort: PageSort
  onSort: (sort: PageSort) => void
  /** Changes whenever the filters or order change, which returns to page one. */
  resetKey: string
  empty: string
}): ReactElement {
  const [order, setOrder] = useTableColumns()
  const columns = order.filter((id): id is TodoColumn => id !== 'title')
  const [headDrag, setHeadDrag] = React.useState<TableColumn | null>(null)
  const [headDrop, setHeadDrop] = React.useState<{ id: TableColumn; after: boolean } | null>(null)
  /** Drag a header and drop it before or after another to reorder the table. */
  const headerDrag = (id: TableColumn): { props: HTMLAttributes<HTMLTableCellElement>; className: string } => ({
    className: `${headDrag === id ? ' is-dragging' : ''}${headDrop?.id === id ? (headDrop.after ? ' col-drop-after' : ' col-drop-before') : ''}`,
    props: {
      draggable: true,
      onDragStart: (event) => {
        if ((event.target as Element).closest('.todo-col-resize')) { event.preventDefault(); return }
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text/plain', id)
        // A small chip with the column's name follows the pointer instead of
        // the browser's grey snapshot of the header cell.
        const doc = event.currentTarget.ownerDocument
        const chip = doc.createElement('div')
        chip.className = 'todo-col-drag-chip'
        chip.textContent = uiText(columnLabelKey(id))
        doc.body.appendChild(chip)
        event.dataTransfer.setDragImage?.(chip, Math.round(chip.offsetWidth / 2), Math.round(chip.offsetHeight / 2))
        window.setTimeout(() => chip.remove(), 0)
        setHeadDrag(id)
      },
      onDragOver: (event) => {
        if (!headDrag || headDrag === id) return
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
        const rect = event.currentTarget.getBoundingClientRect()
        setHeadDrop({ id, after: event.clientX > rect.left + rect.width / 2 })
      },
      onDrop: (event) => {
        event.preventDefault()
        if (headDrag && headDrop && headDrag !== headDrop.id) {
          const next = order.filter((candidate) => candidate !== headDrag)
          next.splice(next.indexOf(headDrop.id) + (headDrop.after ? 1 : 0), 0, headDrag)
          setOrder(next)
        }
        setHeadDrag(null)
        setHeadDrop(null)
      },
      onDragEnd: () => {
        setHeadDrag(null)
        setHeadDrop(null)
      }
    }
  })
  const tableRef = React.useRef<HTMLTableElement>(null)
  const measured = useMeasuredWidths(tableRef)
  const [columnWidths, setColumnWidths] = useSetting('pageColumnWidths', normalizeColumnWidths)
  const [liveWidths, setLiveWidths] = React.useState<Partial<Record<ResizableColumn, number>>>({})
  const tagsFit = useTagsWidth(tableRef, todos)
  const widths = Object.fromEntries(Object.entries({ tags: tagsFit, ...columnWidths, ...liveWidths })
    .map(([id, width]) => [id, Math.max(width as number, measured.mins[id as ResizableColumn])])) as Partial<Record<ResizableColumn, number>>
  const columnWidth = (id: TodoColumn): number => (id === 'due'
    ? measured.due
    : id === 'priority' ? measured.priority
      : id === 'flagged' ? measured.flagged : widths[id as ResizableColumn] ?? COLUMN_MIN_WIDTH[id])
  const [pageSize, setPageSize] = useSetting('pageRowsPerPage', normalizePageSize)
  const [composing, setComposing] = React.useState(false)
  const [draft, setDraft] = React.useState('')
  const draftRef = React.useRef<HTMLInputElement>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!composeSignal) return
    setComposing(true)
    setPage(0)
    scrollRef.current?.scrollTo?.({ top: 0 })
    window.setTimeout(() => draftRef.current?.focus(), 0)
  }, [composeSignal])
  const addTasks = async (lines: string[]): Promise<void> => {
    const today = isoDay(new Date())
    for (const line of lines) {
      const parsed = parseQuickAdd(line, today)
      if (!parsed.title) continue
      await c.create(parsed.title, undefined, {
        patch: { ...newTaskPatch?.(), priority: parsed.priority, ...(parsed.dueDate ? { dueDate: parsed.dueDate } : {}) }
      })
    }
    setDraft('')
    draftRef.current?.focus()
  }
  const closeComposer = (): void => {
    setDraft('')
    setComposing(false)
  }
  const [page, setPage] = React.useState(0)
  const [lastResetKey, setLastResetKey] = React.useState(resetKey)
  if (lastResetKey !== resetKey) {
    setLastResetKey(resetKey)
    setPage(0)
  }
  const [selection, setSelection] = React.useState<Set<string>>(() => new Set())
  const pickAnchor = React.useRef<string | null>(null)

  const pageCount = Math.max(1, Math.ceil(todos.length / pageSize))
  const current = Math.min(page, pageCount - 1)
  const rows = todos.slice(current * pageSize, (current + 1) * pageSize)
  const selected = React.useMemo(() => todos.filter((todo) => selection.has(todo.id)), [todos, selection])
  const completedCount = React.useMemo(() => todos.reduce((sum, todo) => sum + (todo.completed ? 1 : 0), 0), [todos])

  // A revealed or edited task has to be on screen, so turn to its page.
  const reveals = revealRequestStore()
  const reveal = React.useSyncExternalStore(reveals.subscribe, reveals.get, reveals.get)
  const showTodo = React.useCallback((id: string): void => {
    const index = todos.findIndex((todo) => todo.id === id)
    if (index >= 0) setPage(Math.floor(index / pageSize))
  }, [todos, pageSize])
  React.useLayoutEffect(() => { if (reveal?.todoId) showTodo(reveal.todoId) }, [reveal, showTodo])
  React.useLayoutEffect(() => { if (c.editingId) showTodo(c.editingId) }, [c.editingId]) // eslint-disable-line react-hooks/exhaustive-deps

  const select = (ids: string[], on: boolean): void => {
    setSelection((prev) => {
      const next = new Set(prev)
      for (const id of ids) {
        if (on) next.add(id)
        else next.delete(id)
      }
      return next
    })
  }

  const pick = (id: string, range: boolean): void => {
    const to = rows.findIndex((todo) => todo.id === id)
    const from = range ? rows.findIndex((todo) => todo.id === pickAnchor.current) : -1
    if (from >= 0) select(rows.slice(Math.min(from, to), Math.max(from, to) + 1).map((todo) => todo.id), true)
    else select([id], !selection.has(id))
    pickAnchor.current = id
  }

  const completeSelected = (): void => {
    for (const todo of selected) void c.patchTodo(todo.id, patchForStatus('completed'))
    setSelection(new Set())
  }

  const deleteSelected = async (): Promise<void> => {
    const ids = selected.map((todo) => todo.id)
    const choice = await api.ui.confirm({
      title: uiText('todo.table.deleteTitle', { count: ids.length }),
      message: uiText('todo.table.deleteMessage', { count: ids.length }),
      actions: [
        { label: uiText('auto.77dfd2135f4d'), value: 'cancel', variant: 'ghost' },
        { label: uiText('auto.f6fdbe48dc54'), value: 'delete', variant: 'danger' }
      ]
    })
    if (choice !== 'delete') return
    await Promise.all(ids.map((id) => c.removeTodo(id)))
    setSelection(new Set())
  }

  const resizer = (id: ResizableColumn, label: string): ReactElement => (
    <ColumnResizer
      id={id}
      label={label}
      min={measured.mins[id]}
      onDrag={(column, width) => setLiveWidths((prev) => ({ ...prev, [column]: width }))}
      onCommit={(column, width) => {
        setLiveWidths({})
        setColumnWidths({ ...columnWidths, [column]: width })
      }}
      onReset={(column) => {
        setLiveWidths({})
        const next = { ...columnWidths }
        delete next[column]
        setColumnWidths(next)
      }}
    />
  )
  const headerCell = (id: TodoColumn): ReactElement => {
    const label = uiText(COLUMN_LABEL_KEYS[id])
    const resizable = RESIZABLE.includes(id as ResizableColumn)
    return (
      <SortHeader
        field={id === 'note' ? 'notes' : id}
        label={label}
        className={`todo-table-${id}${headerDrag(id).className}`}
        thProps={headerDrag(id).props}
        sort={sort}
        onSort={onSort}
        width={resizable ? widths[id as ResizableColumn] : undefined}
        resize={resizable ? resizer(id as ResizableColumn, label) : undefined}
      />
    )
  }

  const span = 3 + columns.length
  const sectionCounts = React.useMemo(() => {
    if (!sectionOf) return null
    const counts = new Map<TodoSectionId, number>()
    for (const todo of todos) {
      const id = sectionOf(todo)
      counts.set(id, (counts.get(id) ?? 0) + 1)
    }
    return counts
  }, [todos, sectionOf])
  const bodyRows: ReactElement[] = []
  let lastSection: TodoSectionId | null = null
  for (const todo of rows) {
    const section = sectionOf?.(todo) ?? null
    if (section && section !== lastSection) {
      bodyRows.push(
        // One cell per column rather than a colspan: the container queries hide
        // columns, and a colspan wider than the visible row adds a phantom column.
        <tr className={`todo-table-section todo-table-section-${section}`} key={`section:${section}`}>
          <td className="todo-table-select">
            <span className="todo-table-section-text">
              <span className="todo-table-section-label">{uiText(SECTION_LABEL_KEYS[section])}</span>
              <span className="todo-table-section-count">{sectionCounts?.get(section) ?? 0}</span>
            </span>
          </td>
          {order.map((column) => <td key={column} className={`todo-table-${column}`} />)}
          <td className="todo-table-actions" />
        </tr>
      )
    }
    lastSection = section
    bodyRows.push(
      <TableRow
        key={todo.id}
        todo={todo}
        groups={groups}
        columns={order}
        c={c}
        selected={selection.has(todo.id)}
        onPick={(range) => pick(todo.id, range)}
      />
    )
  }

  return (
    <div className="todo-table-shell">
      <div className="todo-table-scroll" ref={scrollRef}>
        <table
          ref={tableRef}
          className="todo-table"
          data-dragging-col={headDrag ?? undefined}
          style={{
            minWidth: FIXED_EDGE_WIDTH + (widths.title ?? TITLE_MIN_WIDTH) + columns.reduce((sum, id) => sum + columnWidth(id), 0),
            '--todo-due-width': `${measured.due}px`,
            '--todo-priority-width': `${measured.priority}px`,
            '--todo-flagged-width': `${measured.flagged}px`
          } as CSSProperties}
        >
          <thead>
            <tr>
              <th className="todo-table-select"><StatusHeaderFilter /></th>
              {order.map((id) => <React.Fragment key={id}>{id === 'title'
                ? <SortHeader field="name" label={uiText('todo.table.title')} className={`todo-table-title${headerDrag('title').className}`} thProps={headerDrag('title').props} sort={sort} onSort={onSort} width={widths.title} resize={resizer('title', uiText('todo.table.title'))} />
                : headerCell(id)}</React.Fragment>)}
              {/* With a sized Title, the action column takes the room that is left. */}
              <th className="todo-table-actions" style={widths.title ? { width: 'auto', minWidth: 48 } : undefined} />
            </tr>
          </thead>
          <tbody>
            {composing && (
              <tr className="todo-table-new-row">
                <td className="todo-table-select"><span className="todo-table-new-circle" aria-hidden="true" /></td>
                {order.map((id) => id === 'title' ? (
                  <td key={id} className="todo-table-title">
                    <input
                      ref={draftRef}
                      className="todo-table-new-input"
                      value={draft}
                      disabled={c.creating}
                      placeholder={uiText('todo.table.newRow')}
                      aria-label={uiText('auto.184c39d1837f')}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.nativeEvent.isComposing) return
                        if (event.key === 'Enter') {
                          event.preventDefault()
                          if (draft.trim()) void addTasks([draft])
                          else closeComposer()
                        } else if (event.key === 'Escape') {
                          event.preventDefault()
                          closeComposer()
                        }
                      }}
                      onPaste={(event) => {
                        const text = event.clipboardData.getData('text/plain')
                        if (!/\r?\n/.test(text.trim())) return
                        // Several lines become several tasks at once.
                        event.preventDefault()
                        void addTasks(pastedTaskLines(`${draft}${text}`))
                      }}
                      onBlur={() => { if (!draft.trim()) setComposing(false) }}
                    />
                  </td>
                ) : <td key={id} className={`todo-table-${id}`} />)}
                <td className="todo-table-actions" />
              </tr>
            )}
            {bodyRows}
          </tbody>
        </table>
        {/* Outside the table: an empty row would have to span columns the narrow
            layout hides, and that adds a phantom column to the header. */}
        {!rows.length && !composing && <div className="todo-table-empty-state">{empty}</div>}
      </div>

      <div className="todo-table-footer">
        <div className="todo-table-selection">
          <span>{selected.length
            ? uiText('todo.table.selectedCount', { count: selected.length })
            : uiText(todos.length === 1 ? 'todo.table.oneTask' : 'todo.table.taskCount', { count: todos.length })}</span>
          {!selected.length && <span className="todo-table-done-count">{uiText('todo.table.completedCount', { count: completedCount })}</span>}
          {selected.length > 0 && (
            <>
              <button type="button" className="todo-table-bulk" onClick={completeSelected}>{uiText('todo.table.complete')}</button>
              <button type="button" className="todo-table-bulk danger" onClick={() => void deleteSelected()}>{uiText('auto.f6fdbe48dc54')}</button>
            </>
          )}
        </div>
        <div className="todo-table-pagination">
          <span className="todo-table-rows-label">{uiText('todo.table.rowsPerPage')}</span>
          <button
            type="button"
            className="todo-table-page-size"
            aria-label={uiText('todo.table.rowsPerPage')}
            onClick={(event) => void api.ui.openMenu(PAGE_SIZES.map((size) => ({
              label: String(size),
              type: 'radio' as const,
              checked: size === pageSize,
              onSelect: () => {
                setPageSize(size)
                setPage(0)
              }
            })), { anchor: event.currentTarget, align: 'start' })}
          >
            <span>{pageSize}</span>
            <ChevronsUpDown />
          </button>
          {pageCount > 1 && <span className="todo-table-page">{uiText('todo.table.page', { page: current + 1, pages: pageCount })}</span>}
          {pageCount > 1 && <div className="todo-table-pager">
            <button type="button" className="todo-table-page-btn" disabled={current === 0} aria-label={uiText('todo.table.firstPage')} title={uiText('todo.table.firstPage')} onClick={() => setPage(0)}><ChevronsLeft /></button>
            <button type="button" className="todo-table-page-btn" disabled={current === 0} aria-label={uiText('todo.table.previousPage')} title={uiText('todo.table.previousPage')} onClick={() => setPage(current - 1)}><ChevronLeft /></button>
            <button type="button" className="todo-table-page-btn" disabled={current >= pageCount - 1} aria-label={uiText('todo.table.nextPage')} title={uiText('todo.table.nextPage')} onClick={() => setPage(current + 1)}><ChevronRight /></button>
            <button type="button" className="todo-table-page-btn" disabled={current >= pageCount - 1} aria-label={uiText('todo.table.lastPage')} title={uiText('todo.table.lastPage')} onClick={() => setPage(pageCount - 1)}><ChevronsRight /></button>
          </div>}
        </div>
      </div>
    </div>
  )
}
