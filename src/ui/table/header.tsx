import { React, api } from '../../runtime'
import type { HTMLAttributes, ReactElement } from 'react'
import { ArrowDown, ArrowUp, ChevronsUpDown, CircleCheck, GripVertical, PriorityGlyph, SlidersHorizontal } from '../icons'
import { useStatusVocabulary } from '../../state/statusStore'
import { useShowCompleted, useStatusFilter, type PageSort, type PageSortField } from '../../state/viewStore'
import { StatusChoices, visibleSelectedStatuses } from '../StatusFilter'
import { todoPriorityLabel, uiText } from '../../localization'
import { COLUMN_IDS, MAX_RESIZE_WIDTH, MIN_RESIZE_WIDTH, PRIORITY_ORDER, ResizableColumn, TableColumn, columnLabelKey, usePriorityFilter, useTableColumns } from './columns'
import { PriorityIcon } from './cells'

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
export function StatusHeaderFilter(): ReactElement {
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

export function SortHeader({ field, label, className, sort, onSort, width, resize, thProps }: {
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

/**
 * The split between two headers: nothing to see until the pointer is over it,
 * then a thin line. Dragging sets the column to its left; a double-click
 * returns it to its default width.
 */
export function ColumnResizer({ id, label, min, onDrag, onCommit, onReset }: {
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
