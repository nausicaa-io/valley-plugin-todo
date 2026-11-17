import { React, api, revealRequestStore } from '../../runtime'
import type { CSSProperties, HTMLAttributes, ReactElement } from 'react'
import type { TodoRecord } from '../../types'
import { type TodoGroup } from '../../model/groups'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronsUpDown } from '../icons'
import { useRowEnv, useStructuralValue } from '../TodoRow'
import { patchForStatus } from '../../state/statusStore'
import { SECTION_LABEL_KEYS, type TodoSectionId } from '../../model/sections'
import { type PageSort } from '../../state/viewStore'
import type { TodoListController } from '../../state/controller'
import { uiText } from '../../localization'
import { COLUMN_LABEL_KEYS, COLUMN_MIN_WIDTH, FIXED_EDGE_WIDTH, PAGE_SIZES, RESIZABLE, ResizableColumn, TITLE_MIN_WIDTH, TableColumn, TodoColumn, columnLabelKey, normalizeColumnWidths, normalizePageSize, useMeasuredWidths, useSetting, useTableColumns, useTagsWidth } from './columns'
import { ColumnResizer, SortHeader, StatusHeaderFilter } from './header'
import { TableRow } from './row'
import { NewTaskRow } from './newRow'
import { selectTodoProperties, useSelectedTodoId } from '../surfaces'
import { TASK_SEGMENT_ID } from '../TaskCard'

/**
 * The main page's task table: the list row's status control and fields in the
 * list row's order, sortable column headers, a selected row that the right
 * sidebar's Task tab shows (a click selects, ↑ and ↓ move it), Cmd/Shift-click
 * selection with bulk actions, a column picker and pagination. Columns, rows per page and the
 * priority filter persist in the plugin settings; the selection and the
 * current page are session state.
 */

export function TodoTable({ todos, groups, c, sort, onSort, resetKey, empty, sectionOf, composeSignal = 0, newTaskPatch, instanceId }: {
  todos: TodoRecord[]
  /** The main tab this table is in, for revealing its Task tab in the right sidebar. */
  instanceId?: string
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
  // Every + adds one more new row; each row is its own draft.
  const [drafts, setDrafts] = React.useState<number[]>([])
  // Only the row being typed in is highlighted; the newest row starts out as that row.
  const [activeDraft, setActiveDraft] = React.useState<number | null>(null)
  const nextDraft = React.useRef(1)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!composeSignal) return
    const key = nextDraft.current++
    setDrafts((current) => [key, ...current])
    setActiveDraft(key)
    setPage(0)
    scrollRef.current?.scrollTo?.({ top: 0 })
  }, [composeSignal])
  const removeDraft = (key: number): void => setDrafts((current) => current.filter((candidate) => candidate !== key))
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

  // The one selected task: its row is marked and the right sidebar's Task tab shows it.
  const currentId = useSelectedTodoId('main_workspace')
  // The rows call stable callbacks, which read the page and the selection they were drawn with.
  const pickState = React.useRef({ rows, selection, todos, pageSize, currentId, instanceId })
  pickState.current = { rows, selection, todos, pageSize, currentId, instanceId }
  const pick = React.useCallback((id: string, range: boolean): void => {
    const { rows: shown, selection: picked, currentId: current } = pickState.current
    const to = shown.findIndex((todo) => todo.id === id)
    const from = range ? shown.findIndex((todo) => todo.id === pickAnchor.current) : -1
    // The selected row counts as picked once a second row joins it.
    if (!picked.size && current && current !== id && shown.some((todo) => todo.id === current)) select([current], true)
    if (from >= 0) select(shown.slice(Math.min(from, to), Math.max(from, to) + 1).map((todo) => todo.id), true)
    else select([id], !picked.has(id))
    pickAnchor.current = id
  }, [])
  /** A plain click: this row alone is selected, and the right sidebar turns to its Task tab. */
  const selectRow = React.useCallback((id: string): void => {
    setSelection((prev) => (prev.size ? new Set() : prev))
    pickAnchor.current = id
    selectTodoProperties(id, 'main_workspace')
    api.workspace.showProperties(pickState.current.instanceId, { segmentId: TASK_SEGMENT_ID })
  }, [])
  // ↑ and ↓ move the selection through the whole list, turning the page when it leaves this one.
  const [focusId, setFocusId] = React.useState<string | null>(null)
  const moveRow = React.useCallback((id: string, step: 1 | -1): void => {
    const { todos: all, pageSize: size } = pickState.current
    const next = all[all.findIndex((todo) => todo.id === id) + step]
    if (!next || !all.some((todo) => todo.id === id)) return
    setSelection((prev) => (prev.size ? new Set() : prev))
    pickAnchor.current = next.id
    selectTodoProperties(next.id, 'main_workspace')
    setPage(Math.floor(all.indexOf(next) / size))
    setFocusId(next.id)
  }, [])
  React.useLayoutEffect(() => {
    if (!focusId) return
    const row = [...(tableRef.current?.querySelectorAll<HTMLElement>('.todo-table-row') ?? [])].find((candidate) => candidate.dataset.todoId === focusId)
    if (!row) return
    row.focus({ preventScroll: true })
    row.scrollIntoView?.({ block: 'nearest' })
    setFocusId(null)
  }, [focusId, rows])
  const clearRow = React.useCallback((): void => {
    setSelection((prev) => (prev.size ? new Set() : prev))
    selectTodoProperties(null, 'main_workspace')
  }, [])
  const env = useRowEnv()
  const rowGroups = useStructuralValue(groups)

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
        groups={rowGroups}
        columns={order}
        actions={c.actions}
        pending={c.pendingIds.has(todo.id)}
        env={env}
        selected={selection.has(todo.id) || currentId === todo.id}
        current={currentId === todo.id}
        onPick={pick}
        onSelect={selectRow}
        onMove={moveRow}
        onClear={clearRow}
      />
    )
  }

  return (
    <div className="todo-table-shell">
      <div className="todo-table-scroll" ref={scrollRef} onClick={(event) => { if (!(event.target as Element).closest('tr, button, input')) clearRow() }}>
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
              {/* With a sized Title, the trailing column takes the room that is left. */}
              <th className="todo-table-actions" style={widths.title ? { width: 'auto', minWidth: 24 } : undefined} />
            </tr>
          </thead>
          <tbody>
            {drafts.map((key) => (
              <NewTaskRow key={key} order={order} groups={groups} c={c} newTaskPatch={newTaskPatch} active={activeDraft === key} onActivate={() => setActiveDraft(key)} onRemove={() => removeDraft(key)} />
            ))}
            {bodyRows}
          </tbody>
        </table>
        {/* Outside the table: an empty row would have to span columns the narrow
            layout hides, and that adds a phantom column to the header. */}
        {!rows.length && !drafts.length && <div className="todo-table-empty-state">{empty}</div>}
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
