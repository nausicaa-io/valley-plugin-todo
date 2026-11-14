import { React, api } from '../runtime'
import type { ReactElement } from 'react'
import type { UiMenuItem, UiMenuTarget } from '@valley/plugin-sdk'
import type { TodoRecord } from '../types'
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
import { todoPriorityLabel, uiText } from '../localization'
import { PRIORITIES, isoDay } from '../model/sort'
import { statusMenuOptions, effectiveStatus, patchForStatus } from '../state/statusStore'
import { rescheduleActions } from '../model/reschedule'
import { groupForName, groupKey, type TodoGroup } from '../model/groups'
import { getGroups } from '../state/groupStore'

/**
 * Menu rows for choosing a group. The main groups come first, in order; a group
 * with subgroups is one row with a chevron, whose submenu starts with the group
 * itself and then lists its subgroups, so many groups never form one long flat
 * column. `row` builds the row of one group name.
 */
export function groupMenuItems(names: readonly string[], groups: readonly TodoGroup[], row: (name: string) => UiMenuItem): UiMenuItem[] {
  const offered = new Set(names.map(groupKey))
  const known = groups.filter((group) => offered.has(groupKey(group.name)))
  const items = known.filter((group) => !group.parent || !known.some((candidate) => candidate.id === group.parent)).map((group): UiMenuItem => {
    const own = row(group.name)
    const subgroups = known.filter((candidate) => candidate.parent === group.id).map((candidate) => row(candidate.name))
    if (!subgroups.length) return own
    const family = [own, ...subgroups]
    return {
      label: group.name,
      // A group colour a caller puts on its rows is carried to the group's own row too.
      ...('color' in own ? { color: (own as { color?: string }).color } : {}),
      ...(own.type === 'radio' ? { type: 'radio' as const, checked: family.some((item) => item.checked === true) } : {}),
      submenu: family
    }
  })
  return [...items, ...names.filter((name) => !groupForName(groups, name)).map(row)]
}

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
          ...groupMenuItems(groupNames, getGroups(), (name) => ({
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
