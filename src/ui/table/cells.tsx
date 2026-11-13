import { React, api } from '../../runtime'
import type { ReactElement } from 'react'
import type { TodoPriority, TodoRecord } from '../../types'
import { ArrowDown, ArrowRight, ArrowUp, Minus } from '../icons'
import { LocationField } from '../LocationField'
import { ClockTimeField, InlineCalendar } from '../DatePanel'
import { TagChipsField } from '../TagChipsField'
import { uiText } from '../../localization'

export const PriorityIcon = ({ priority }: { priority: TodoPriority }): ReactElement => {
  const Glyph = priority === 'high' ? ArrowUp : priority === 'medium' ? ArrowRight : priority === 'low' ? ArrowDown : Minus
  return <Glyph className={`todo-table-priority-icon todo-priority-${priority}`} />
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
