import { React, api } from './runtime'
import type { ReactElement } from 'react'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import {
  CalendarDays,
  ArrowRightCircle,
  CircleCheck,
  Ellipsis,
  FaExclamation,
  Flag,
  FolderInput,
  IndentGlyph,
  OutdentGlyph,
  Pencil,
  TodoStatusGlyph,
  Trash,
  Weekend
} from './icons'
import { todoPriorityLabel, uiText } from './localization'
import { PRIORITIES, isoDay } from './sort'
import { statusMenuOptions, effectiveStatus, patchForStatus } from './statuses'
import { rescheduleActions } from './reschedule'

export const TodoMenu = ({
  todo,
  groupNames,
  setOpenId,
  onEdit,
  onPatch,
  onRequestDelete,
  disabled = false,
  canIndent = false,
  canOutdent = false,
  onIndent,
  onOutdent
}: {
  todo: TodoRecord
  groupNames: string[]
  openId: string | null
  setOpenId: (id: string | null) => void
  onEdit: () => void
  onPatch: (patch: Partial<TodoRecord>) => unknown
  onRequestDelete: () => unknown
  disabled?: boolean
  canIndent?: boolean
  canOutdent?: boolean
  onIndent?: () => void
  onOutdent?: () => void
}): ReactElement => {
  const currentStatus = effectiveStatus(todo)

  return (
    <div className="todo-menu-wrap">
      <button
        className="todo-menu-btn"
        aria-label={uiText('auto.047d10fd5b0e')}
        title={uiText('auto.6bf5da9c080b')}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation()
          setOpenId(todo.id)
          // Every swipe action is mirrored here. A gesture is not reachable by
          // keyboard or by a trackpad-less mouse, so the menu is what keeps
          // reschedule/flag/delete from being swipe-only.
          const reschedule = rescheduleActions(todo.dueDate ?? '', isoDay(new Date()))
          void api.ui.openMenu([
            {
              label: uiText('auto.bae7d5be7082'),
              icon: <CircleCheck className="todo-menu-action-icon" />,
              enabled: !disabled,
              submenu: statusMenuOptions().map((option) => ({
                label: uiText(option.labelKey),
                icon: <TodoStatusGlyph status={option.status} dotCls={option.cls} />,
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
              label: uiText('todo.tree.indent'),
              icon: <IndentGlyph className="todo-menu-action-icon" />,
              enabled: !disabled && canIndent && !!onIndent,
              onSelect: () => onIndent?.()
            },
            {
              label: uiText('todo.tree.outdent'),
              icon: <OutdentGlyph className="todo-menu-action-icon" />,
              enabled: !disabled && canOutdent && !!onOutdent,
              onSelect: () => onOutdent?.()
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
          ], { anchor: e.currentTarget, align: 'end' }).finally(() => setOpenId(null))
        }}
      >
        <Ellipsis />
      </button>
    </div>
  )
}
