import { React, api } from './runtime'
import type { ReactElement } from 'react'
import type { UiMenuTarget } from '@valley/plugin-sdk'
import type { TodoRecord } from './types'
import {
  CalendarDays,
  ArrowRightCircle,
  CircleCheck,
  Ellipsis,
  FaExclamation,
  Flag,
  FolderInput,
  Pencil,
  TodoStatusGlyph,
  Trash,
  Weekend
} from './icons'
import { todoPriorityLabel, uiText } from './localization'
import { PRIORITIES, isoDay } from './sort'
import { statusMenuOptions, effectiveStatus, patchForStatus } from './statuses'
import { rescheduleActions } from './reschedule'

export interface TodoMenuOptions {
  todo: TodoRecord
  groupNames: string[]
  setOpenId: (id: string | null) => void
  onEdit: () => void
  onPatch: (patch: Partial<TodoRecord>) => unknown
  onRequestDelete: () => unknown
  disabled?: boolean
}

/**
 * The task's actions menu, opened from its ⋯ button or by right-clicking the
 * row (list rows and table rows alike). Every swipe action is mirrored here:
 * a gesture is not reachable by keyboard or by a trackpad-less mouse, so the
 * menu keeps reschedule/flag/delete from being swipe-only.
 */
export function openTodoMenu(target: UiMenuTarget, { todo, groupNames, setOpenId, onEdit, onPatch, onRequestDelete, disabled = false }: TodoMenuOptions): Promise<void> {
  const currentStatus = effectiveStatus(todo)
  setOpenId(todo.id)
  const reschedule = rescheduleActions(todo.dueDate ?? '', isoDay(new Date()))
  return api.ui.openMenu([
      {
        label: uiText('auto.bae7d5be7082'),
        icon: <CircleCheck className="todo-menu-action-icon" />,
        enabled: !disabled,
        submenu: statusMenuOptions().map((option) => ({
          label: option.label,
          icon: <TodoStatusGlyph status={option.status} dotCls={option.cls} color={option.color} />,
          type: 'radio' as const,
          checked: option.status === null
            ? currentStatus === 'open'
            : currentStatus === option.status,
          onSelect: () => onPatch(patchForStatus(option.status))
        }))
      },
      {
        label: uiText('todo.menu.reschedule'),
        icon: <CalendarDays className="todo-menu-action-icon" />,
        enabled: !disabled,
        submenu: reschedule
          .filter((action) => action.date)
          .map((action) => ({
            label: uiText(action.labelKey),
            icon: action.id === 'tomorrow'
              ? <ArrowRightCircle className="todo-menu-action-icon" />
              : action.id === 'weekend'
                ? <Weekend className="todo-menu-action-icon" />
                : undefined,
            onSelect: () => onPatch({ dueDate: action.date! })
          }))
      },
      {
        label: uiText(todo.flagged ? 'todo.swipe.unflag' : 'todo.swipe.flag'),
        icon: <Flag className="todo-menu-action-icon" />,
        enabled: !disabled,
        onSelect: () => onPatch({ flagged: todo.flagged ? undefined : true })
      },
      {
        label: uiText('auto.886cbff9d9df'),
        icon: <FaExclamation className="todo-menu-action-icon" />,
        enabled: !disabled,
        submenu: PRIORITIES.map((priority) => ({
          label: todoPriorityLabel(priority.id),
          type: 'radio' as const,
          checked: todo.priority === priority.id,
          onSelect: () => onPatch({ priority: priority.id })
        }))
      },
      {
        label: uiText('todo.menu.moveGroup'),
        icon: <FolderInput className="todo-menu-action-icon" />,
        enabled: !disabled,
        submenu: [
          {
            label: uiText('todo.chip.noGroup'),
            type: 'radio' as const,
            checked: !todo.group,
            onSelect: () => onPatch({ group: undefined })
          },
          ...groupNames.map((name) => ({
            label: name,
            type: 'radio' as const,
            checked: todo.group === name,
            onSelect: () => onPatch({ group: name })
          }))
        ]
      },
      { type: 'separator' },
      {
        label: uiText('auto.5301648dcf6b'),
        icon: <Pencil className="todo-menu-action-icon" />,
        enabled: !disabled,
        onSelect: onEdit
      },
      { type: 'separator' },
      {
        label: uiText('auto.f6fdbe48dc54'),
        icon: <Trash className="todo-menu-action-icon" />,
        enabled: !disabled,
        danger: true,
        onSelect: onRequestDelete
      }
    ], target).then(() => undefined).finally(() => setOpenId(null))
}

/** Open the actions menu at the pointer for a right-click on a task row. */
export function openTodoContextMenu(event: React.MouseEvent, options: TodoMenuOptions): void {
  if ((event.target as HTMLElement).closest('input, textarea, [contenteditable="true"]')) return
  event.preventDefault()
  event.stopPropagation()
  void openTodoMenu({ x: event.clientX, y: event.clientY }, options)
}

export const TodoMenu = ({
  todo,
  groupNames,
  setOpenId,
  onEdit,
  onPatch,
  onRequestDelete,
  disabled = false
}: TodoMenuOptions): ReactElement => (
  <div className="todo-menu-wrap">
    <button
      className="todo-menu-btn"
      aria-label={uiText('auto.047d10fd5b0e')}
      title={uiText('auto.6bf5da9c080b')}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation()
        void openTodoMenu({ anchor: e.currentTarget, align: 'end' }, { todo, groupNames, setOpenId, onEdit, onPatch, onRequestDelete, disabled })
      }}
    >
      <Ellipsis />
    </button>
  </div>
)
