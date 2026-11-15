import { React, api, revealRequestStore } from '../../runtime'
import type { ReactElement, RefObject } from 'react'
import type { TodoPriority, TodoRecord } from '../../types'
import { CalendarDays, Flag, MapPin, Paperclip, PriorityGlyph, X } from '../icons'
import type { TodoListController } from '../../state/controller'
import { LocationField } from '../LocationField'
import { parseQuickAdd } from '../../model/sections'
import type { TodoView } from '../../model/views'
import { PRIORITIES, formatDueLabel } from '../../model/sort'
import { uiText } from '../../localization'

/**
 * The sidebar's inline composer: title, optional notes and tags, and small
 * schedule, place, attachment, priority and flag controls. Its state lives in
 * the panel that calls this hook, so the form keeps its draft wherever the
 * panel places it.
 */
export function useComposer({ c, view, today, dateFormat, pageActive }: {
  c: TodoListController
  /** The list a new task is created into. */
  view: TodoView
  today: string
  dateFormat: string | undefined
  /** Whether a To-Do main tab is focused; focus returns to the title when that changes. */
  pageActive: boolean
}): { composing: boolean; open: () => void; form: ReactElement | false; fabRef: RefObject<HTMLButtonElement> } {
  const [draft, setDraft] = React.useState('')
  const [draftNote, setDraftNote] = React.useState('')
  const [draftTags, setDraftTags] = React.useState('')
  const [draftFields, setDraftFields] = React.useState<Partial<TodoRecord>>({})
  const [addingAttachment, setAddingAttachment] = React.useState(false)
  // Date, place and attachments stay folded behind their chip until wanted.
  // The composer opens with its date and time fields shown (14 Nov); the calendar chip still folds them.
  const [showSchedule, setShowSchedule] = React.useState(true)
  const [showPlace, setShowPlace] = React.useState(false)
  const [createError, setCreateError] = React.useState(false)
  const { DateField, TimeField } = api.ui.settings
  // The create field is summoned by ＋ rather than parked above the list: the
  // panel already has a plus, and a permanently empty box costs a row of the
  // 245px column for something used a few times a day.
  const [composing, setComposing] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const noteRef = React.useRef<HTMLTextAreaElement>(null)
  const fabRef = React.useRef<HTMLButtonElement>(null)

  /** The sole selected group can be assigned without asking. */
  const activeGroup = view.kind === 'groups' && view.names.length === 1 && !view.includeUngrouped
    ? view.names[0]
    : undefined

  /**
   * Commit the composer. It stays open on success so a run of todos is one
   * uninterrupted flow of type-Enter-type-Enter, and closes only on Escape or
   * an empty Enter — the same contract as Reminders' new-item row.
   */
  const create = async (): Promise<void> => {
    if (c.creating) return
    const parsed = parseQuickAdd(draft, today)
    const title = parsed.title
    if (!title) {
      closeComposer()
      return
    }
    let selectedGroup = activeGroup
    if (view.kind === 'groups' && view.names.length + (view.includeUngrouped ? 1 : 0) > 1) {
      const picked = await api.ui.openMenu(
        [
          ...view.names.map((name, index) => ({ id: `group:${index}`, label: name })),
          ...(view.includeUngrouped ? [{ id: 'ungrouped', label: uiText('todo.chip.noGroup') }] : [])
        ],
        { anchor: inputRef.current ?? fabRef.current!, align: 'start' }
      )
      if (picked === null) return
      selectedGroup = picked.startsWith('group:') ? view.names[Number(picked.slice(6))] : undefined
    }
    setCreateError(false)
    // A todo created in Flagged is flagged; a date is only set when picked.
    const patch: Partial<TodoRecord> = { note: draftNote.trim(), tags: [...new Set([...(draftFields.tags ?? []), ...draftTags.split(/[\s,]+/).map(tag => tag.replace(/^#+/, '')).filter(Boolean)])], priority: parsed.priority, ...(selectedGroup ? { group: selectedGroup } : {}) }
    if (view.kind === 'smart' && view.id === 'flagged') patch.flagged = true
    Object.assign(patch, { ...draftFields, tags: patch.tags })
    if (parsed.dueDate) patch.dueDate = parsed.dueDate
    const created = await c.create(title, undefined, { patch })
    if (!created) setCreateError(true)
    else {
      setCreateError(false)
      setDraft('')
      setDraftNote('')
      setDraftTags('')
      setDraftFields({})
      setAddingAttachment(false)
      setShowSchedule(true)
      setShowPlace(false)
      inputRef.current?.focus()
    }
  }

  const openComposer = (): void => {
    setComposing(true)
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }

  const closeComposer = (): void => {
    setDraft('')
    setComposing(false)
    setDraftNote('')
    setDraftTags('')
    setDraftFields({})
    setAddingAttachment(false)
    setShowSchedule(true)
    setShowPlace(false)
    setCreateError(false)
  }

  const requests = revealRequestStore()
  const request = React.useSyncExternalStore(requests.subscribe, requests.get, requests.get)
  React.useEffect(() => {
    if (request?.mode !== 'create') return
    setComposing(true)
    requests.clear()
  }, [request, requests])
  React.useEffect(() => {
    if (composing && !c.creating) inputRef.current?.focus()
  }, [composing, pageActive, c.creating])

  React.useLayoutEffect(() => {
    if (!noteRef.current) return
    noteRef.current.style.height = 'auto'
    noteRef.current.style.height = `${noteRef.current.scrollHeight}px`
  }, [draftNote, composing])

  // No date unless one is picked: the Today chip adds it with one click.
  const composeDate = draftFields.dueDate ?? ''
  const compose = composing && (
    <form className="todo-compose" onSubmit={event => { event.preventDefault(); void create() }}
      onKeyDown={event => { if (event.key === 'Escape' && !event.defaultPrevented && !c.creating) { event.preventDefault(); closeComposer() } }}>
      <span className="todo-compose-circle" aria-hidden="true" />
      <input ref={inputRef} className="todo-compose-title" value={draft}
        onChange={event => setDraft(event.target.value)}
        placeholder={activeGroup ? uiText('todo.newTodoIn', { p0: activeGroup }) : uiText('auto.c274dabfd0fe')}
        aria-label={uiText('auto.184c39d1837f')} disabled={c.creating} />
      <textarea ref={noteRef} className="todo-compose-note" rows={1} value={draftNote}
        onChange={event => setDraftNote(event.target.value)}
        placeholder={uiText('todo.edit.notes')} aria-label={uiText('todo.edit.notes')} disabled={c.creating} />
      <div className="todo-compose-tags">
        {(draftFields.tags ?? []).map(tag => <span className="todo-compose-token" key={tag}>
          <span>#{tag}</span><button type="button" aria-label={uiText('todo.compose.removeTag', { tag })}
            disabled={c.creating} onClick={() => setDraftFields(fields => ({ ...fields, tags: fields.tags?.filter(value => value !== tag) }))}><X /></button>
        </span>)}
        <input value={draftTags} onChange={event => {
          const value = event.target.value
          if (!('isComposing' in event.nativeEvent && event.nativeEvent.isComposing) && /[\s,]/.test(value)) {
            const parts = value.split(/[\s,]+/)
            const pending = parts.pop() ?? ''
            setDraftFields(fields => ({ ...fields, tags: [...new Set([...(fields.tags ?? []), ...parts.map(tag => tag.replace(/^#+/, '')).filter(Boolean)])] }))
            setDraftTags(pending)
          } else setDraftTags(value)
        }} onKeyDown={event => {
          if (event.nativeEvent.isComposing) return
          if (event.key === 'Enter' && draftTags.trim()) {
            event.preventDefault()
            setDraftFields(fields => ({ ...fields, tags: [...new Set([...(fields.tags ?? []), draftTags.trim().replace(/^#+/, '')].filter(Boolean))] }))
            setDraftTags('')
          }
          if (event.key === 'Backspace' && !draftTags) setDraftFields(fields => ({ ...fields, tags: fields.tags?.slice(0, -1) }))
        }} placeholder={uiText('todo.compose.addTags')} aria-label={uiText('todo.edit.tags')} disabled={c.creating} />
      </div>
      {showSchedule && <div className="todo-compose-schedule">
        <DateField className="todo-compose-date-field" value={composeDate}
          onChange={dueDate => setDraftFields(fields => ({ ...fields, dueDate }))}
          placeholder={uiText('todo.compose.addDate')} ariaLabel={uiText('todo.field.dueDate')} disabled={c.creating} />
        <TimeField className="todo-compose-time-field" value={draftFields.startTime ?? ''}
          onChange={startTime => setDraftFields(fields => ({ ...fields, startTime: startTime || undefined }))}
          placeholder={uiText('todo.compose.time')} ariaLabel={uiText('todo.field.startTime')} disabled={c.creating} />
      </div>}
      {showPlace && <div className="todo-compose-location"><LocationField value={draftFields.location} disabled={c.creating}
        onChange={location => setDraftFields(fields => ({ ...fields, location }))} /></div>}
      {(addingAttachment || !!draftFields.attachments?.length) && <div className="todo-compose-attachments">
        {(draftFields.attachments ?? []).map(path => <span className="todo-compose-token todo-compose-attachment" key={path} title={path}>
          <Paperclip /><span>{path.split('/').pop()}</span><button type="button" disabled={c.creating}
            aria-label={`${uiText('todo.removeAttachment')}: ${path}`} onClick={() => setDraftFields(fields => ({ ...fields, attachments: fields.attachments?.filter(value => value !== path) }))}><X /></button>
        </span>)}
        {addingAttachment && <api.ui.ResourcePicker className="todo-compose-attachment-picker" value="" kinds={['attachment']} ariaLabel={uiText('todo.addAttachment')}
          placeholder={uiText('todo.addAttachment')} disabled={c.creating} onChange={path => {
            if (!path) return
            setDraftFields(fields => ({ ...fields, attachments: [...new Set([...(fields.attachments ?? []), path])] }))
            setAddingAttachment(false)
          }} />}
      </div>}
      <div className="todo-compose-controls">
        <button type="button" className={`todo-compose-chip${composeDate ? ' has-value' : ''}`} aria-pressed={showSchedule} disabled={c.creating}
          aria-label={uiText('todo.compose.addDate')} title={uiText('todo.compose.addDate')} onClick={() => setShowSchedule(open => !open)}>
          <CalendarDays />{composeDate && <span>{formatDueLabel(composeDate, today, { today: uiText('todo.due.today'), tomorrow: uiText('todo.due.tomorrow'), yesterday: uiText('todo.due.yesterday') }, api.ui.language(), dateFormat)}{draftFields.startTime ? ` ${draftFields.startTime}` : ''}</span>}
        </button>
        <button type="button" className={`todo-compose-chip${draftFields.location ? ' has-value' : ''}`} aria-pressed={showPlace} disabled={c.creating}
          aria-label={uiText('todo.compose.addPlace')} title={draftFields.location?.name ?? uiText('todo.compose.addPlace')} onClick={() => setShowPlace(open => !open)}>
          <MapPin />
        </button>
        <button type="button" className={`todo-compose-chip${draftFields.attachments?.length ? ' has-value' : ''}`} aria-pressed={addingAttachment} disabled={c.creating}
          aria-label={uiText('todo.addAttachment')} title={uiText('todo.addAttachment')} onClick={() => setAddingAttachment(open => !open)}>
          <Paperclip />{!!draftFields.attachments?.length && <span>{draftFields.attachments.length}</span>}
        </button>
        <button type="button" className={`todo-compose-chip todo-compose-priority${draftFields.priority && draftFields.priority !== 'normal' ? ' has-value' : ''}`} disabled={c.creating}
          aria-label={uiText('todo.field.priority')} title={uiText('todo.field.priority')}
          onClick={async event => {
            const priority = await api.ui.openMenu(PRIORITIES.map(item => ({ id: item.id, label: uiText(item.labelKey), checked: item.id === (draftFields.priority ?? 'normal') })), { anchor: event.currentTarget, align: 'start' })
            if (priority) setDraftFields(fields => ({ ...fields, priority: priority as TodoPriority }))
          }}><PriorityGlyph />{draftFields.priority && draftFields.priority !== 'normal' && <span>{uiText(`todo.priority.${draftFields.priority}`)}</span>}</button>
        <button type="button" className="todo-compose-chip todo-compose-flag" onClick={() => setDraftFields(fields => ({ ...fields, flagged: !(fields.flagged ?? (view.kind === 'smart' && view.id === 'flagged')) }))}
          aria-label={uiText('todo.flag')} title={uiText('todo.flag')} aria-pressed={draftFields.flagged ?? (view.kind === 'smart' && view.id === 'flagged')}
          disabled={c.creating}><Flag /></button>
        <button type="submit" className="todo-compose-submit" disabled={!draft.trim() || c.creating}>{uiText('todo.group.add')}</button>
      </div>
      {createError && <div className="todo-compose-error" role="alert">{uiText('todo.error.saveDraft')}</div>}
      <button type="button" className="todo-menu-btn todo-compose-cancel" onClick={closeComposer}
        aria-label={uiText('todo.group.cancel')} title={uiText('todo.group.cancel')} disabled={c.creating}><X /></button>
    </form>
  )

  return { composing, open: openComposer, form: compose, fabRef }
}
