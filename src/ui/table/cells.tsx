import { React, api } from '../../runtime'
import type { CSSProperties, ReactElement } from 'react'
import type { TodoPriority, TodoRecord } from '../../types'
import { ArrowDown, ArrowRight, ArrowUp, Minus } from '../icons'
import { LocationField } from '../LocationField'
import { ClockTimeField, InlineCalendar } from '../DatePanel'
import { TagChipsField } from '../TagChipsField'
import { uiText } from '../../localization'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { groupColorFor, groupPathLabel, parentGroupName, type TodoGroup } from '../../model/groups'

export const PriorityIcon = ({ priority }: { priority: TodoPriority }): ReactElement => {
  const Glyph = priority === 'high' ? ArrowUp : priority === 'medium' ? ArrowRight : priority === 'low' ? ArrowDown : Minus
  return <Glyph className={`todo-table-priority-icon todo-priority-${priority}`} />
}

/** A group in the table's Group column: a subgroup reads behind its main group, "Valley · Plugins". */
export function GroupPill({ name, groups }: { name: string; groups: TodoGroup[] }): ReactElement {
  const parent = parentGroupName(name, groups)
  return (
    <span className="todo-table-group-pill" title={groupPathLabel(name, groups)} style={{ '--todo-group-color': paletteCssValue(groupColorFor(name, groups)) } as CSSProperties}>
      <span className="todo-group-dot" aria-hidden="true" />
      <span className="todo-table-group-name">{parent && <span className="todo-table-group-parent">{parent} · </span>}{name}</span>
    </span>
  )
}

/** Date and start time of one task, edited in place from its Due cell. */
export function DueEditor({ todo, onPatch }: { todo: TodoRecord; onPatch: (patch: Partial<TodoRecord>) => void }): ReactElement {
  const [date, setDate] = React.useState(todo.dueDate?.slice(0, 10) ?? '')
  const [time, setTime] = React.useState(todo.startTime ?? '')
  return (
    <div className="todo-cell-editor">
      <InlineCalendar
        value={date}
        onChange={(value) => {
          setDate(value)
          if (!value) setTime('')
          onPatch(value ? { dueDate: value } : { dueDate: '', startTime: undefined, endTime: undefined })
        }}
      />
      <ClockTimeField
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
export function NotesEditor({ initial, onInput, onDone }: { initial: string; onInput: (value: string) => void; onDone: () => void }): ReactElement {
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

export function TagsEditor({ todo, onPatch }: { todo: TodoRecord; onPatch: (patch: Partial<TodoRecord>) => void }): ReactElement {
  const [tags, setTags] = React.useState<string[]>(todo.tags ?? [])
  return (
    <div className="todo-cell-editor">
      <TagChipsField value={tags} autoFocus onChange={(next) => { setTags(next); onPatch({ tags: next }) }} />
    </div>
  )
}

export function LocationEditor({ todo, onPatch }: { todo: TodoRecord; onPatch: (patch: Partial<TodoRecord>) => void }): ReactElement {
  const [location, setLocation] = React.useState(todo.location)
  return (
    <div className="todo-cell-editor">
      <LocationField value={location} autoFocus onChange={(next) => { setLocation(next); onPatch({ location: next }) }} />
    </div>
  )
}

/** The note's first non-empty line, as written: notes are plain text. */
export function notePreview(note: string): string {
  return note.split('\n').map((line) => line.trim()).find(Boolean) ?? ''
}
