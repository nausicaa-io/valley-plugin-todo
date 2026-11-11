import { React, api, registerTodoRow, revealRequestStore } from './runtime'
import type { CSSProperties, ReactElement } from 'react'
import type { TodoPriority, TodoRecord } from '@valley/plugin-sdk/types'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { renderInlineMarkdown } from './markdown'
import { openTodoCalendar } from './calendarSource'
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
  Flag,
  MapPin,
  Minus,
  PriorityGlyph,
  SlidersHorizontal,
  TodoStatusGlyph
} from './icons'
import { TodoMenu } from './TodoMenu'
import { useStatusCheck } from './TodoRow'
import { openLocation } from './LocationField'
import { openStatusMenu } from './SwipeRow'
import { confirmDeleteTodo } from './data'
import { effectiveStatus, patchForStatus, statusDef, useStatusVocabulary } from './statuses'
import { PRIORITIES, formatDate, formatDueLabel, isoDay, type SortField } from './sort'
import { useShowCompleted, useStatusFilter, type PageSort } from './viewStore'
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

export type TodoColumn = 'note' | 'group' | 'status' | 'priority' | 'due' | 'location' | 'tags'

// The order a list row reads in: title, text, then its details.
const COLUMNS: { id: TodoColumn; labelKey: string }[] = [
  { id: 'note', labelKey: 'todo.table.note' },
  { id: 'group', labelKey: 'todo.table.group' },
  { id: 'status', labelKey: 'todo.table.status' },
  { id: 'priority', labelKey: 'todo.table.priority' },
  { id: 'due', labelKey: 'todo.table.due' },
  { id: 'location', labelKey: 'todo.table.location' },
  { id: 'tags', labelKey: 'todo.table.tags' }
]
// Status starts off: the check at the front of the row already shows it.
const DEFAULT_COLUMNS: TodoColumn[] = ['note', 'group', 'priority', 'due']
const PAGE_SIZES = [10, 20, 30, 40, 50]
// Highest first, matching the order the priority menus read in.
const PRIORITY_ORDER: TodoPriority[] = PRIORITIES.map((p) => p.id).reverse()

function normalizeColumns(raw: unknown): TodoColumn[] {
  if (!Array.isArray(raw)) return DEFAULT_COLUMNS
  return COLUMNS.map((column) => column.id).filter((id) => raw.includes(id))
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

export const useTableColumns = (): [TodoColumn[], (value: TodoColumn[]) => void] => useSetting('pageColumns', normalizeColumns)
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
      {selected.length > 0 && <div className="todo-filter-divider" />}
      {selected.length > 0 && (
        <button type="button" className="todo-status-filter-option todo-filter-clear" onClick={() => setSelected([])}>
          {uiText('todo.table.clearFilter')}
        </button>
      )}
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
        { className: 'todo-status-filter-popover', ariaLabel: uiText('todo.table.priority') }
      )}
    />
  )
}

function ColumnChoices(): ReactElement {
  const [columns, setColumns] = useTableColumns()
  return (
    <div className="todo-status-filter-menu">
      <div className="todo-table-menu-label">{uiText('todo.table.toggleColumns')}</div>
      <div className="todo-filter-divider" />
      {COLUMNS.map((column) => {
        const checked = columns.includes(column.id)
        return (
          <button
            type="button"
            className="todo-status-filter-option all"
            aria-pressed={checked}
            key={column.id}
            onClick={() => setColumns(checked
              ? columns.filter((id) => id !== column.id)
              : COLUMNS.map((entry) => entry.id).filter((id) => columns.includes(id) || id === column.id))}
          >
            <span className="todo-status-filter-check" aria-hidden="true">{checked ? '✓' : ''}</span>
            <span>{uiText(column.labelKey)}</span>
          </button>
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
        { className: 'todo-status-filter-popover', ariaLabel: uiText('todo.table.toggleColumns') }
      )}
    >
      <SlidersHorizontal />
    </button>
  )
}

function SortHeader({ field, label, className, sort, onSort }: {
  field: SortField
  label: string
  className: string
  sort: PageSort
  onSort: (sort: PageSort) => void
}): ReactElement {
  const active = sort.field === field
  const Icon = !active ? ChevronsUpDown : sort.dir === 'asc' ? ArrowUp : ArrowDown
  return (
    <th className={className} aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <button
        type="button"
        className={`todo-table-sort${active ? ' active' : ''}`}
        // Unsorted → ascending → descending → back to the view's own order.
        onClick={() => onSort(!active
          ? { field, dir: 'asc' }
          : sort.dir === 'asc' ? { field, dir: 'desc' } : { field: 'auto', dir: 'asc' })}
      >
        <span>{label}</span>
        <Icon />
      </button>
    </th>
  )
}

const ROW_CONTROLS = 'input, button, a, textarea, [contenteditable="true"]'

/** The note's first line of words as plain text: a 37px row has no room for blocks. */
function notePreview(note: string): string {
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
  columns: TodoColumn[]
  c: TodoListController
  selected: boolean
  /** Toggles this row, or with `range` selects from the last picked row to it. */
  onPick: (range: boolean) => void
}): ReactElement {
  const rowRef = React.useRef<HTMLTableRowElement>(null)
  React.useEffect(() => rowRef.current ? registerTodoRow(todo.id, rowRef.current) : undefined, [todo.id])
  const clickTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(() => () => { if (clickTimer.current) clearTimeout(clickTimer.current) }, [])
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
  const def = statusDef(status)
  const pending = c.pendingIds.has(todo.id)
  const patch = (next: Partial<TodoRecord>): unknown => c.patchTodo(todo.id, next)
  const openCalendar = (): void => {
    if (!openTodoCalendar(todo)) c.openDetail(todo.id)
  }
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

  return (
    <tr
      ref={rowRef}
      className={`todo-table-row${todo.completed ? ' completed' : ''}${selected ? ' selected' : ''}`}
      data-todo-id={todo.id}
      aria-selected={selected}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault()
          const next = event.key === 'ArrowDown' ? event.currentTarget.nextElementSibling : event.currentTarget.previousElementSibling
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
        // Same gesture as the list rows: one click opens a dated task in
        // Calendar, a double-click opens the editor.
        if ((event.target as Element).closest(ROW_CONTROLS)) return
        if (api.ui.hasModKey(event) || event.shiftKey) {
          onPick(event.shiftKey)
          return
        }
        if (event.detail > 1) return
        if (clickTimer.current) clearTimeout(clickTimer.current)
        clickTimer.current = setTimeout(() => { clickTimer.current = null; openCalendar() }, 220)
      }}
      onDoubleClick={(event) => {
        if (clickTimer.current) { clearTimeout(clickTimer.current); clickTimer.current = null }
        if ((event.target as Element).closest(ROW_CONTROLS) || api.ui.hasModKey(event) || event.shiftKey) return
        c.openDetail(todo.id)
      }}
    >
      <td className="todo-table-select">{check}</td>
      <td className="todo-table-title">
        {titleHtml
          ? <span className="todo-table-title-text" dangerouslySetInnerHTML={{ __html: titleHtml }} />
          : <span className="todo-table-title-text">{todo.title}</span>}
      </td>
      {columns.includes('note') && (
        <td className="todo-table-note" title={noteLine || undefined}>
          <span className="todo-table-note-text">{noteLine}</span>
        </td>
      )}
      {columns.includes('group') && (
        <td className="todo-table-group">
          {todo.group && (
            <span className="todo-group-text" title={todo.group} style={{ color: paletteCssValue(groupColorFor(todo.group, groups)) }}>
              <span className="todo-group-dot" aria-hidden="true" />
              <span className="todo-table-group-name">{todo.group}</span>
            </span>
          )}
        </td>
      )}
      {columns.includes('status') && (
        <td className="todo-table-status">
          <button
            type="button"
            className="todo-table-cell-btn"
            disabled={pending}
            title={uiText('todo.table.status')}
            onClick={(event) => openStatusMenu(event.currentTarget, todo, patch)}
          >
            <TodoStatusGlyph status={status === 'open' ? null : status} dotCls={def.cls} />
            <span>{todoStatusLabel(status)}</span>
          </button>
        </td>
      )}
      {columns.includes('priority') && (
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
      )}
      {columns.includes('due') && (
        <td className="todo-table-due">
          {dueLabel && (
            <button
              type="button"
              className={`todo-table-cell-btn${overdue ? ' is-overdue' : ''}`}
              title={uiText('todo.openInCalendar', { p0: formatDate(todo.dueDate, dateFormat) })}
              onClick={openCalendar}
            >
              <span>{dueLabel}</span>
              {todo.startTime && <span className="todo-table-time">{todo.startTime}</span>}
            </button>
          )}
        </td>
      )}
      {columns.includes('location') && (
        <td className="todo-table-location">
          {todo.location && (
            <button
              type="button"
              className="todo-table-cell-btn"
              title={uiText('todo.openLocationOf', { p0: todo.location.name })}
              onClick={() => openLocation(todo.location!)}
            >
              <MapPin />
              <span>{todo.location.name}</span>
            </button>
          )}
        </td>
      )}
      {columns.includes('tags') && (
        <td className="todo-table-tags" title={todo.tags?.map((tag) => `#${tag}`).join(' ') || undefined}>
          {todo.tags?.map((tag) => <span key={tag} className="todo-table-tag">#{tag}</span>)}
        </td>
      )}
      <td className="todo-table-actions">
        {todo.flagged && <span className="todo-table-flag" title={uiText('todo.flagged')}><Flag /></span>}
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

export function TodoTable({ todos, groups, c, sort, onSort, resetKey, empty }: {
  todos: TodoRecord[]
  groups: TodoGroup[]
  c: TodoListController
  sort: PageSort
  onSort: (sort: PageSort) => void
  /** Changes whenever the filters or order change, which returns to page one. */
  resetKey: string
  empty: string
}): ReactElement {
  const [columns] = useTableColumns()
  const [pageSize, setPageSize] = useSetting('pageRowsPerPage', normalizePageSize)
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

  const span = 3 + columns.length

  return (
    <div className="todo-table-shell">
      <div className="todo-table-scroll">
        <table className="todo-table">
          <thead>
            <tr>
              <th className="todo-table-select" />
              <SortHeader field="name" label={uiText('todo.table.title')} className="todo-table-title" sort={sort} onSort={onSort} />
              {columns.includes('note') && <th className="todo-table-note"><span className="todo-table-th">{uiText('todo.table.note')}</span></th>}
              {columns.includes('group') && <th className="todo-table-group"><span className="todo-table-th">{uiText('todo.table.group')}</span></th>}
              {columns.includes('status') && <th className="todo-table-status"><span className="todo-table-th">{uiText('todo.table.status')}</span></th>}
              {columns.includes('priority') && <SortHeader field="priority" label={uiText('todo.table.priority')} className="todo-table-priority" sort={sort} onSort={onSort} />}
              {columns.includes('due') && <SortHeader field="due" label={uiText('todo.table.due')} className="todo-table-due" sort={sort} onSort={onSort} />}
              {columns.includes('location') && <th className="todo-table-location"><span className="todo-table-th">{uiText('todo.table.location')}</span></th>}
              {columns.includes('tags') && <th className="todo-table-tags"><span className="todo-table-th">{uiText('todo.table.tags')}</span></th>}
              <th className="todo-table-actions" />
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((todo) => (
              <TableRow
                key={todo.id}
                todo={todo}
                groups={groups}
                columns={columns}
                c={c}
                selected={selection.has(todo.id)}
                onPick={(range) => pick(todo.id, range)}
              />
            )) : (
              <tr className="todo-table-empty-row"><td colSpan={span} className="todo-table-empty">{empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="todo-table-footer">
        <div className="todo-table-selection">
          <span>{selected.length
            ? uiText('todo.table.selectedCount', { count: selected.length })
            : uiText(todos.length === 1 ? 'todo.table.oneTask' : 'todo.table.taskCount', { count: todos.length })}</span>
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
