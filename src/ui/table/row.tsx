import { React, api, registerTodoRow } from '../../runtime'
import type { CSSProperties, ReactElement } from 'react'
import type { TodoRecord } from '../../types'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { allGroups, groupColorFor, type TodoGroup } from '../../model/groups'
import { Flag, MapPin } from '../icons'
import { groupMenuItems, openTodoContextMenu } from '../TodoMenu'
import { memoRow, useStatusCheck, useTitleHtml, type RowEnv } from '../TodoRow'
import { confirmDeleteTodo } from '../../data/undo'
import { effectiveStatus } from '../../state/statusStore'
import { formatDate, formatDueLabel } from '../../model/sort'
import type { TodoRowActions } from '../../state/controller'
import { todoPriorityLabel, uiText } from '../../localization'
import { PRIORITY_ORDER, TableColumn, TodoColumn } from './columns'
import { DueEditor, LocationEditor, NotesEditor, PriorityIcon, TagsEditor, notePreview } from './cells'

const ROW_CONTROLS = 'input, button, a, textarea, [contenteditable="true"]'

export const TableRow = memoRow(function TableRow({ todo, groups, columns, actions, pending, env, selected, onPick }: {
  todo: TodoRecord
  groups: TodoGroup[]
  columns: TableColumn[]
  actions: TodoRowActions
  /** A write for this todo is in flight. */
  pending: boolean
  env: RowEnv
  selected: boolean
  /** Toggles this row, or with `range` selects from the last picked row to it. */
  onPick: (todoId: string, range: boolean) => void
}): ReactElement {
  const rowRef = React.useRef<HTMLTableRowElement>(null)
  React.useEffect(() => rowRef.current ? registerTodoRow(todo.id, rowRef.current) : undefined, [todo.id])
  const titleHtml = useTitleHtml(todo.title)
  const noteLine = notePreview(todo.note)
  const { check } = useStatusCheck(todo, pending, actions.patchTodo)

  const status = effectiveStatus(todo)
  const patch = (next: Partial<TodoRecord>): unknown => actions.patchTodo(todo.id, next)
  const today = env.today
  const dateFormat = env.dateFormat
  const dueLabel = todo.dueDate
    ? formatDueLabel(
        todo.dueDate,
        today,
        { today: uiText('todo.due.today'), tomorrow: uiText('todo.due.tomorrow'), yesterday: uiText('todo.due.yesterday') },
        env.language,
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
  /** The cell whose editor is open: marked so it is clear which row the popover edits. */
  const [editing, setEditing] = React.useState<TodoColumn | null>(null)
  const track = (column: TodoColumn, open: Promise<unknown>): void => {
    setEditing(column)
    void open.catch(() => {}).finally(() => setEditing((current) => (current === column ? null : current)))
  }
  const editIn = (column: TodoColumn, anchor: HTMLElement, label: string, render: () => ReactElement, width = 260): void => {
    track(column, api.ui.openPopover(render, { anchor, align: 'start', gap: 4 }, { className: 'todo-cell-popover', ariaLabel: label, width }))
  }
  const placeholder = (column: TodoColumn, icon: ReactElement | null, label: string): ReactElement | null =>
    editing === column ? <span className="todo-table-placeholder">{icon}<span>{label}</span></span> : null
  const tdClass = (column: TodoColumn): string => `todo-table-${column}${editing === column ? ' is-editing' : ''}`
  const openNotes = (anchor: HTMLElement): void => {
    let value = todo.note
    const save = (): void => { if (value !== todo.note) void patch({ note: value }) }
    setEditing('note')
    void api.ui.openPopover(
      ({ close }) => <NotesEditor initial={todo.note} onInput={(next) => { value = next }} onDone={() => { save(); close() }} />,
      { anchor, align: 'start', gap: 4 },
      { className: 'todo-cell-popover', ariaLabel: uiText('todo.edit.notes'), width: 360, beforeDismiss: () => { save(); return true } }
    ).catch(() => {}).finally(() => setEditing((current) => (current === 'note' ? null : current)))
  }

  const cell = (id: TodoColumn): ReactElement => {
    switch (id) {
      case 'note':
        return (
          <td className={tdClass('note')} title={noteLine || undefined}>
            <button type="button" className="todo-table-edit-btn" disabled={pending} aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.note') })} onClick={(event) => openNotes(event.currentTarget)}>
              {noteLine ? <span className="todo-table-note-text">{noteLine}</span> : placeholder('note', null, uiText('todo.table.note'))}
            </button>
          </td>
        )
      case 'group':
        return (
          <td className={tdClass('group')}>
            <button
              type="button"
              className="todo-table-edit-btn"
              disabled={pending}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.group') })}
              onClick={(event) => track('group', api.ui.openMenu([
                { label: uiText('todo.chip.noGroup'), type: 'radio' as const, checked: !todo.group, onSelect: () => patch({ group: undefined }) },
                ...groupMenuItems(allGroups(groups), groups, (name) => ({
                  label: name,
                  type: 'radio' as const,
                  checked: todo.group === name,
                  color: groupColorFor(name, groups),
                  onSelect: () => patch({ group: name })
                }))
              ], { anchor: event.currentTarget, align: 'start' }))}
            >
              {todo.group ? (
                <span className="todo-table-group-pill" title={todo.group} style={{ '--todo-group-color': paletteCssValue(groupColorFor(todo.group, groups)) } as CSSProperties}>
                  <span className="todo-group-dot" aria-hidden="true" />
                  <span className="todo-table-group-name">{todo.group}</span>
                </span>
              ) : placeholder('group', null, uiText('todo.table.group'))}
            </button>
          </td>
        )
      case 'priority':
        return (
          <td className={tdClass('priority')}>
            <button
              type="button"
              className={`todo-table-cell-btn${todo.priority === 'normal' ? ' muted' : ''}`}
              disabled={pending}
              title={uiText('todo.table.priority')}
              onClick={(event) => track('priority', api.ui.openMenu(PRIORITY_ORDER.map((id) => ({
                label: todoPriorityLabel(id),
                icon: <PriorityIcon priority={id} />,
                type: 'radio' as const,
                checked: todo.priority === id,
                onSelect: () => patch({ priority: id })
              })), { anchor: event.currentTarget }))}
            >
              <PriorityIcon priority={todo.priority} />
              <span>{todoPriorityLabel(todo.priority)}</span>
            </button>
          </td>
        )
      case 'due':
        return (
          <td className={tdClass('due')}>
            {/* Edits the date in place; the table never jumps to Calendar. */}
            <button
              type="button"
              className={`todo-table-cell-btn todo-table-due-text${overdue ? ' is-overdue' : ''}`}
              disabled={pending}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.due') })}
              title={todo.dueDate ? formatDate(todo.dueDate, dateFormat) : uiText('todo.field.dueDate')}
              onClick={(event) => editIn('due', event.currentTarget, uiText('todo.field.dueDate'), () => <DueEditor todo={todo} onPatch={(next) => void patch(next)} />, 240)}
            >
              <span>{dueLabel}</span>
              {todo.startTime && <span className="todo-table-time">{todo.startTime}</span>}
            </button>
          </td>
        )
      case 'flagged':
        return (
          <td className={tdClass('flagged')}>
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
          <td className={tdClass('location')}>
            <button
              type="button"
              className="todo-table-cell-btn todo-table-edit-btn"
              disabled={pending}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.location') })}
              title={todo.location?.name ?? uiText('todo.field.location')}
              onClick={(event) => editIn('location', event.currentTarget, uiText('todo.field.location'), () => <LocationEditor todo={todo} onPatch={(next) => void patch(next)} />, 300)}
            >
              {todo.location ? <><MapPin /><span>{todo.location.name}</span></> : placeholder('location', <MapPin />, uiText('todo.field.location'))}
            </button>
          </td>
        )
      case 'tags':
        return (
          <td className={tdClass('tags')} title={todo.tags?.map((tag) => `#${tag}`).join(' ') || undefined}>
            <button
              type="button"
              className="todo-table-edit-btn"
              disabled={pending}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.tags') })}
              onClick={(event) => editIn('tags', event.currentTarget, uiText('todo.edit.tags'), () => <TagsEditor todo={todo} onPatch={(next) => void patch(next)} />, 280)}
            >
              {todo.tags?.length ? todo.tags.map((tag) => <span key={tag} className="todo-table-tag">#{tag}</span>) : placeholder('tags', null, uiText('todo.table.tags'))}
            </button>
          </td>
        )
    }
  }

  return (
    <tr
      ref={rowRef}
      className={`todo-table-row${todo.completed ? ' completed' : ''}${selected ? ' selected' : ''}${editing || editingTitle ? ' is-editing' : ''}`}
      data-todo-id={todo.id}
      data-status={status}
      aria-selected={selected}
      tabIndex={0}
      onContextMenu={(event) => openTodoContextMenu(event, {
        todo,
        groupNames: allGroups(groups),
        setOpenId: actions.setMenuId,
        onEdit: () => actions.openDetail(todo.id),
        onPatch: patch,
        onRequestDelete: () => confirmDeleteTodo(todo, actions.removeTodo),
        disabled: pending
      })}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault()
          let next = event.key === 'ArrowDown' ? event.currentTarget.nextElementSibling : event.currentTarget.previousElementSibling
          while (next && !next.classList.contains('todo-table-row')) next = event.key === 'ArrowDown' ? next.nextElementSibling : next.previousElementSibling
          ;(next as HTMLElement | null)?.focus()
        } else if (event.key === 'Enter') {
          event.preventDefault()
          actions.openDetail(todo.id)
        } else if (event.key === ' ') {
          event.preventDefault()
          onPick(todo.id, false)
        } else if (event.key === 'Escape') {
          event.currentTarget.blur()
        }
      }}
      onClick={(event) => {
        // A click only focuses the row; Cmd/Shift-click selects, a double-click
        // opens the editor. The table never jumps to Calendar.
        if ((event.target as Element).closest(ROW_CONTROLS)) return
        if (api.ui.hasModKey(event) || event.shiftKey) onPick(todo.id, event.shiftKey)
      }}
      onDoubleClick={(event) => {
        const onTitle = !!(event.target as Element).closest('.todo-table-title-btn')
        if (onTitle && titleTimer.current) { clearTimeout(titleTimer.current); titleTimer.current = null }
        if ((!onTitle && (event.target as Element).closest(ROW_CONTROLS)) || api.ui.hasModKey(event) || event.shiftKey) return
        actions.openDetail(todo.id)
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
                if (api.ui.hasModKey(event) || event.shiftKey) { onPick(todo.id, event.shiftKey); return }
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
        {/* Empty on purpose (14 Nov): no ⋯ button (the row's actions are on its right-click menu) and no flag; a flag shows only in the Flagged column. */}
      </td>
    </tr>
  )
})
