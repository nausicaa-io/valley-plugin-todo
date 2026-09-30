import type { ReactElement } from 'react'
import type { TodoStatus } from '@valley/plugin-sdk/types'
import { React, api } from './runtime'
import { ChevronDown, TodoStatusGlyph } from './icons'
import { uiText } from './localization'
import { setShowCompleted, useShowCompleted, useStatusFilter } from './viewStore'
import {
  DONE_STATUSES,
  useStatusVocabulary,
  type TodoStatusFilter
} from './statuses'

function selectedStatuses(filter: TodoStatusFilter, active: TodoStatus[]): TodoStatus[] {
  return filter === 'all' ? active : filter.filter((status) => active.includes(status))
}

function visibleSelectedStatuses(filter: TodoStatusFilter, active: TodoStatus[], showCompleted: boolean): TodoStatus[] {
  const selected = selectedStatuses(filter, active)
  return showCompleted ? selected : selected.filter((status) => !DONE_STATUSES.includes(status))
}

function StatusChoices(): ReactElement {
  const [filter, onChange] = useStatusFilter()
  const [showCompleted] = useShowCompleted()
  const defs = useStatusVocabulary()
  const active = defs.map((status) => status.id)
  const selected = visibleSelectedStatuses(filter, active, showCompleted)

  const toggle = (id: TodoStatus): void => {
    const next = selected.includes(id)
      ? selected.filter((status) => status !== id)
      : active.filter((status) => selected.includes(status) || status === id)
    if (!next.length) return
    setShowCompleted(next.some((status) => DONE_STATUSES.includes(status)))
    onChange(next.length === active.length ? 'all' : next as [TodoStatus, ...TodoStatus[]])
  }

  return (
    <div className="todo-status-filter-menu">
      <button
        type="button"
        className="todo-status-filter-option all"
        aria-pressed={selected.length === active.length}
        onClick={() => {
          setShowCompleted(true)
          onChange('all')
        }}
      >
        <span className="todo-status-filter-check" aria-hidden="true">{selected.length === active.length ? '✓' : ''}</span>
        <span>{uiText('todo.chip.all')}</span>
      </button>
      <div className="todo-filter-divider" />
      {defs.map((status) => {
        const checked = selected.includes(status.id)
        return (
          <button
            type="button"
            className="todo-status-filter-option"
            aria-pressed={checked}
            key={status.id}
            onClick={() => toggle(status.id)}
          >
            <span className="todo-status-filter-check" aria-hidden="true">{checked ? '✓' : ''}</span>
            <span className="todo-status-filter-glyph">
              <TodoStatusGlyph status={status.id === 'open' ? null : status.id} dotCls={status.cls} />
            </span>
            <span>{uiText(status.labelKey)}</span>
          </button>
        )
      })}
    </div>
  )
}

export function StatusFilterDropdown({
  filter,
  className = ''
}: {
  filter: TodoStatusFilter
  className?: string
}): ReactElement {
  const [showCompleted] = useShowCompleted()
  const defs = useStatusVocabulary()
  const active = defs.map((status) => status.id)
  const selected = visibleSelectedStatuses(filter, active, showCompleted)
  const label = filter === 'all' && showCompleted
    ? uiText('todo.chip.all')
    : selected.length === 1
      ? uiText(defs.find((status) => status.id === selected[0])?.labelKey ?? 'todo.chip.all')
      : uiText('todo.filters.statusCount', { count: selected.length })

  return (
    <button
      type="button"
      className={'todo-status-filter-select ' + className}
      aria-label={uiText('todo.filters.statuses')}
      onClick={(event) => {
        void api.ui.openPopover(
          () => <StatusChoices />,
          { anchor: event.currentTarget, align: 'start', gap: 4 },
          { className: 'todo-status-filter-popover', ariaLabel: uiText('todo.filters.statuses') }
        )
      }}
    >
      <span>{label}</span>
      <ChevronDown />
    </button>
  )
}
