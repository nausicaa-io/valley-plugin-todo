import type { ReactElement } from 'react'
import type { TodoStatus } from '../types'
import { React, api } from '../runtime'
import { ChevronDown, TodoStatusGlyph } from './icons'
import { uiText } from '../localization'
import { setShowCompleted, useShowCompleted, useStatusFilter } from '../state/viewStore'
import {
  useStatusVocabulary,
  type TodoStatusFilter, isDoneStatus } from '../state/statusStore'

function selectedStatuses(filter: TodoStatusFilter, active: TodoStatus[]): TodoStatus[] {
  return filter === 'all' ? active : filter.filter((status) => active.includes(status))
}

export function visibleSelectedStatuses(filter: TodoStatusFilter, active: TodoStatus[], showCompleted: boolean): TodoStatus[] {
  const selected = selectedStatuses(filter, active)
  return showCompleted ? selected : selected.filter((status) => !isDoneStatus(status))
}

/** All · Completed · To do in one segmented row: everything, finished work, or everything unfinished. */
export function StatusQuickPicks(): ReactElement {
  const [filter, onChange] = useStatusFilter()
  const [showCompleted] = useShowCompleted()
  const defs = useStatusVocabulary()
  const active = defs.map((status) => status.id)
  const selected = visibleSelectedStatuses(filter, active, showCompleted)
  const open = active.filter((status) => !isDoneStatus(status))
  const done = active.filter((status) => isDoneStatus(status))
  const same = (list: TodoStatus[]): boolean => list.length === selected.length && list.every((status) => selected.includes(status))
  const picks = [
    { id: 'all', label: uiText('todo.chip.all'), title: uiText('todo.filters.quickAll'), active: selected.length === active.length, select: () => { setShowCompleted(true); onChange('all') } },
    { id: 'done', label: uiText('todo.status.completed'), title: uiText('todo.filters.quickDone'), active: same(done), select: () => { setShowCompleted(true); onChange(done as [TodoStatus, ...TodoStatus[]]) } },
    { id: 'open', label: uiText('todo.status.todo'), title: uiText('todo.filters.quickOpen'), active: same(open), select: () => { setShowCompleted(false); onChange(open as [TodoStatus, ...TodoStatus[]]) } }
  ]
  return (
    <div className="todo-status-quick" role="group" aria-label={uiText('todo.filters.statuses')}>
      {picks.map((pick) => (
        <button
          key={pick.id}
          type="button"
          className={`todo-status-quick-btn${pick.active ? ' active' : ''}`}
          aria-pressed={pick.active}
          aria-label={pick.title}
          title={pick.title}
          onClick={pick.select}
        >
          {pick.label}
        </button>
      ))}
    </div>
  )
}

export function StatusChoices(): ReactElement {
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
    setShowCompleted(next.some((status) => isDoneStatus(status)))
    onChange(next.length === active.length ? 'all' : next as [TodoStatus, ...TodoStatus[]])
  }

  return (
    <div className="todo-status-filter-menu">
      <StatusQuickPicks />
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
            <span>{status.label}</span>
          </button>
        )
      })}
    </div>
  )
}
