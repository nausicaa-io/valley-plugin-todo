import { React, api } from '../runtime'
import { groupMenuItems } from './TodoMenu'
import type { ReactElement } from 'react'
import type { TodoPriority, TodoRecord } from '../types'
import { parseAppOpenUrl } from '@valley/plugin-sdk/paths'
import { getSharedTodos, onSharedTodos } from '../state/sharedTodos'
import { confirmDeleteTodo } from '../data/undo'
import { normalizeTodoUrl } from '../domain/records'
import { useTodoStatusHistory } from '../data/reads'
import { type DocumentRevision } from '../domain/rpc'
import { AttachmentCard } from './AttachmentCard'
import { CalendarDays, FileGlyph, Flag, Link, MapPin, Paperclip, TodoStatusGlyph, Trash, X } from './icons'
import { FileSearchField } from './FileSearchField'
import { ClockTimeField, InlineCalendar } from './DatePanel'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { PriorityIcon } from './table/cells'
import { openStatusMenu } from './SwipeRow'
import { formatDueLabel, isoDay } from '../model/sort'
import { LocationField } from './LocationField'
import { TagChipsField } from './TagChipsField'
import { allGroups, groupColorFor } from '../model/groups'
import { useGroups } from '../state/groupStore'
import { PRIORITIES } from '../model/sort'
import { effectiveStatus, statusDef } from '../state/statusStore'
import type { TodoListController } from '../state/controller'
import { todoPriorityLabel, todoStatusLabel, uiText } from '../localization'

interface DetailProps {
  todoId: string
  c: TodoListController
  close: () => void
}

/**
 * Debounced "last value wins" writer for a continuously-typed field.
 *
 * Two hazards it exists for: a patch per keystroke is a database transaction
 * per keystroke, and `patchTodo` refuses while a write for that id is already in
 * flight — so a naive debounce can silently drop the user's final keystrokes if
 * they stop typing during a write. This re-queues a rejected value instead.
 */
function useCoalescedWrite(
  write: (value: string) => Promise<boolean>,
  delay = 500,
  failed?: () => void
): (value: string) => void {
  const writeRef = React.useRef(write)
  writeRef.current = write
  const queued = React.useRef<string | null>(null)
  const inFlight = React.useRef(false)
  const timer = React.useRef<number | null>(null)
  const retries = React.useRef(0)
  const failedRef = React.useRef(failed)
  failedRef.current = failed

  const flush = React.useCallback(async (): Promise<void> => {
    if (inFlight.current) return
    const value = queued.current
    if (value === null) return
    queued.current = null
    inFlight.current = true
    try {
      const ok = await writeRef.current(value)
      // Rejected (a concurrent write held the id) and nothing newer arrived —
      // put it back rather than lose it.
      if (!ok && queued.current === null) queued.current = value
      if (ok) retries.current = 0
      else retries.current += 1
    } catch {
      if (queued.current === null) queued.current = value
      retries.current += 1
    } finally {
      inFlight.current = false
      if (queued.current !== null && retries.current < 3) timer.current = window.setTimeout(() => { void flush() }, 250)
      else if (queued.current !== null) failedRef.current?.()
    }
  }, [])

  React.useEffect(
    () => () => {
      if (timer.current != null) window.clearTimeout(timer.current)
      // Unmounting mid-edit must still land the last value.
      void flush()
    },
    [flush]
  )

  return React.useCallback(
    (value: string) => {
      queued.current = value
      retries.current = 0
      if (timer.current != null) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        timer.current = null
        void flush()
      }, delay)
    },
    [flush, delay]
  )
}

/** A text input that only writes when the user is done with it. */
function BufferedInput({
  value,
  onCommit,
  ariaLabel,
  placeholder,
  type = 'text',
  className
}: {
  value: string
  onCommit: (next: string) => void
  ariaLabel: string
  placeholder?: string
  type?: string
  className?: string
}): ReactElement {
  const [draft, setDraft] = React.useState(value)
  // Adopt an external change (another surface, an undo) unless the user is in
  // the middle of typing here.
  const focused = React.useRef(false)
  React.useEffect(() => {
    if (!focused.current) setDraft(value)
  }, [value])
  const commit = (): void => {
    if (draft !== value) onCommit(draft)
  }
  return (
    <input
      className={className}
      type={type}
      value={draft}
      aria-label={ariaLabel}
      placeholder={placeholder}
      onFocus={() => { focused.current = true }}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => { focused.current = false; commit() }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') { e.currentTarget.blur() }
        if (e.key === 'Escape') { setDraft(value); e.currentTarget.blur() }
      }}
    />
  )
}

interface DetailDraft {
  value: { title: string | null; note: string | null; tags: string[] | null; error: string }
  revision?: DocumentRevision
  loadingRevision?: Promise<void>
  listeners: Set<() => void>
}

function detailDraft(todoId: string): DetailDraft {
  const drafts = api.runtime.getOrCreate('todo.detailDrafts', () => new Map<string, DetailDraft>())
  let draft = drafts.get(todoId)
  if (!draft) { draft = { value: { title: null, note: null, tags: null, error: '' }, listeners: new Set() }; drafts.set(todoId, draft) }
  return draft
}

const TodoDetail = ({ todoId, c, close }: DetailProps): ReactElement | null => {
  const [todos, setTodos] = React.useState<TodoRecord[]>(getSharedTodos)
  React.useEffect(() => onSharedTodos(setTodos), [])
  const todo = todos.find((t) => t.id === todoId)
  const statusHistory = useTodoStatusHistory(todoId)
  const groups = useGroups()

  const [addingAttachment, setAddingAttachment] = React.useState(false)
  const [addingUrl, setAddingUrl] = React.useState(false)
  const [addingFile, setAddingFile] = React.useState(false)
  const [showActivity, setShowActivity] = React.useState(false)
  const opened = React.useRef<TodoRecord | null>(null)
  const [urlDraft, setUrlDraft] = React.useState('')
  const draft = detailDraft(todoId)
  const draftValue = React.useSyncExternalStore(React.useCallback((listener) => { draft.listeners.add(listener); return () => { draft.listeners.delete(listener) } }, [draft]), () => draft.value, () => draft.value)
  const patchDraft = React.useCallback((patch: Partial<DetailDraft['value']>) => { draft.value = { ...draft.value, ...patch }; for (const listener of draft.listeners) listener() }, [draft])
  const titleDraft = draftValue.title
  const setTitleDraft = (title: string | null): void => patchDraft({ title })
  const failed = (): void => patchDraft({ error: uiText('todo.error.saveDraft') })
  React.useEffect(() => {
    if (draft.revision || draft.loadingRevision) return
    draft.loadingRevision = api.documents.read({ pluginId: 'todo', sourceId: 'tasks', itemId: todoId })
      .then((document) => {
        if (document && !draft.revision) draft.revision = { expectedRevision: document.revision, realmGeneration: document.realmGeneration }
      })
      .catch(() => { patchDraft({ error: uiText('todo.error.saveDraft') }) })
      .finally(() => { draft.loadingRevision = undefined })
  }, [draft, todoId, patchDraft])
  const commitPatch = async (patch: Partial<TodoRecord>): Promise<boolean> => {
    if (!draft.revision) await draft.loadingRevision
    if (!draft.revision) return false
    return c.patchTodo(todoId, patch, draft.revision)
  }
  const writeTitle = useCoalescedWrite(async (value) => {
    const ok = value.trim() ? await commitPatch({ title: value }) : true
    if (ok && draft.value.title === value) patchDraft({ title: null, error: '' })
    return ok
  }, 500, failed)
  const writeNote = useCoalescedWrite(async (value) => {
    const ok = await commitPatch({ note: value })
    if (ok && draft.value.note === value) patchDraft({ note: null, error: '' })
    return ok
  }, 500, failed)
  const writeTags = useCoalescedWrite(async (value) => {
    const tags = JSON.parse(value) as string[]
    const ok = await commitPatch({ tags })
    if (ok && JSON.stringify(draft.value.tags) === value) patchDraft({ tags: null, error: '' })
    return ok
  }, 0, failed)

  // The record can vanish under us (deleted here or elsewhere) — close rather
  // than render a panel describing nothing. A freshly mounted surface opened by
  // a reveal request has not loaded the shared list yet, so wait for that first.
  React.useEffect(() => {
    if (!todo && !c.loading) close()
  }, [todo, c.loading, close])
  if (!todo) return null

  const patch = (p: Partial<TodoRecord>): void => { void commitPatch(p).then((ok) => { if (!ok) failed() }) }
  const setTags = (tags: string[]): void => { patchDraft({ tags }); writeTags(JSON.stringify(tags)) }
  /** Attachments are stored absent, never as an empty array. */
  const setAttachments = (paths: string[]): void =>
    patch({ attachments: paths.length ? paths : undefined })
  /** Same contract for links: absent, never an empty array. */
  const setUrls = (urls: string[]): void => patch({ urls: urls.length ? urls : undefined })
  const groupNames = allGroups(groups)

  // Cancel puts the task back as it was when the sheet opened. Title and notes
  // go through their own write queues, so the original value supersedes any
  // edit still waiting there; everything else is one patch.
  if (!opened.current) opened.current = structuredClone(todo)
  const cancel = (): void => {
    const original = opened.current
    if (original) {
      writeTitle(original.title)
      writeNote(original.note)
      patch({
        tags: original.tags,
        status: original.status,
        completed: original.completed,
        priority: original.priority,
        dueDate: original.dueDate,
        startTime: original.startTime,
        endTime: original.endTime,
        group: original.group,
        location: original.location,
        flagged: original.flagged,
        attachments: original.attachments,
        urls: original.urls,
        filePath: original.filePath
      })
    }
    patchDraft({ title: null, note: null, tags: null, error: '' })
    close()
  }
  const status = effectiveStatus(todo)
  const today = isoDay()
  const dueLabel = todo.dueDate
    ? `${formatDueLabel(todo.dueDate.slice(0, 10), today, { today: uiText('todo.due.today'), tomorrow: uiText('todo.due.tomorrow'), yesterday: uiText('todo.due.yesterday') }, api.ui.language(), api.getState().dateFormat)}${todo.startTime ? ` · ${todo.startTime}${todo.endTime ? `–${todo.endTime}` : ''}` : ''}`
    : ''
  const popover = (anchor: HTMLElement, label: string, render: () => ReactElement, width = 300): void => {
    void api.ui.openPopover(render, { anchor, align: 'start', gap: 4 }, { className: 'todo-cell-popover', ariaLabel: label, width })
  }
  const chip = (key: string, icon: ReactElement, label: string, placeholder: string, onClick: (anchor: HTMLElement) => void, extraClass = ''): ReactElement => (
    <button
      key={key}
      type="button"
      className={`todo-sheet-chip${label ? '' : ' is-empty'}${extraClass ? ` ${extraClass}` : ''}`}
      aria-label={label ? `${placeholder}: ${label}` : placeholder}
      title={key === 'place' && todo.location ? todo.location.name : undefined}
      onClick={(event) => onClick(event.currentTarget)}
    >
      {icon}
      <span>{label || placeholder}</span>
    </button>
  )

  return (
    <api.ui.Modal
      title={uiText('todo.edit.title')}
      size="medium"
      bodyClassName="todo-detail-body todo-sheet-body"
      onClose={close}
      footer={
        <div className="todo-detail-footer">
          <button
            type="button"
            className="todo-sheet-delete"
            onClick={() => {
              // The sheet steps aside for the question and comes back on Cancel.
              close()
              void confirmDeleteTodo(todo, c.removeTodo).then((deleted) => { if (!deleted) c.openDetail(todo.id) })
            }}
          >
            <Trash />
            {uiText('auto.f6fdbe48dc54')}
          </button>
          <button type="button" className="todo-sheet-cancel" onClick={cancel}>
            {uiText('auto.77dfd2135f4d')}
          </button>
          <button type="button" className="btn-primary" onClick={close}>
            {uiText('todo.edit.done')}
          </button>
        </div>
      }
    >
      <div className="todo-sheet">
        {draftValue.error && <p role="alert">{draftValue.error}</p>}
        <div className="todo-sheet-head">
          <button
            type="button"
            className="todo-sheet-status"
            data-status={status}
            title={todoStatusLabel(status)}
            aria-label={`${uiText('auto.bae7d5be7082')}: ${todoStatusLabel(status)}`}
            onClick={(event) => openStatusMenu(event.currentTarget, todo, (next) => patch(next))}
          >
            <TodoStatusGlyph status={status === 'open' ? null : status} dotCls={statusDef(status).cls} />
          </button>
          {/* The host focuses this on open instead of its own ✕ — the title is
              what a just-created todo is waiting for, and Enter here closes. */}
          <input
            className="todo-sheet-title"
            data-modal-initial-focus="true"
            value={titleDraft ?? todo.title}
            aria-label={uiText('auto.c5e8306a511f')}
            onChange={(e) => { setTitleDraft(e.target.value); writeTitle(e.target.value) }}
            onBlur={() => { if (titleDraft === todo.title) setTitleDraft(null) }}
            onKeyDown={(e) => { if (e.key === 'Enter') close() }}
          />
          <button
            className={`todo-sheet-flag${todo.flagged ? ' on' : ''}`}
            type="button"
            onClick={() => patch({ flagged: todo.flagged ? undefined : true })}
            aria-pressed={!!todo.flagged}
            title={uiText('todo.flag')}
            aria-label={uiText('todo.flag')}
          >
            <Flag />
          </button>
        </div>

        <textarea
          className="todo-sheet-notes"
          value={draftValue.note ?? todo.note}
          aria-label={uiText('todo.edit.notes')}
          placeholder={uiText('todo.sheet.notesPlaceholder')}
          rows={3}
          onChange={event => { const note = event.target.value; patchDraft({ note }); writeNote(note) }}
        />

        <div className="todo-sheet-chips">
          {chip('status', <TodoStatusGlyph status={status === 'open' ? null : status} dotCls={statusDef(status).cls} />, status === 'open' ? '' : todoStatusLabel(status), uiText('auto.bae7d5be7082'),
            (anchor) => openStatusMenu(anchor, todo, (next) => patch(next)))}
          {chip('due', <CalendarDays />, dueLabel, uiText('todo.sheet.date'),
            (anchor) => popover(anchor, uiText('todo.edit.schedule'), () => <ScheduleEditor todo={todo} onPatch={patch} />, 280), todo.dueDate && todo.dueDate.slice(0, 10) < today && !todo.completed ? 'is-overdue' : '')}
          {chip('group', <span className="todo-sheet-dot" style={todo.group ? { background: paletteCssValue(groupColorFor(todo.group, groups)) } : undefined} />, todo.group ?? '', uiText('todo.edit.group'),
            (anchor) => void api.ui.openMenu([
              { label: uiText('todo.chip.noGroup'), type: 'radio' as const, checked: !todo.group, onSelect: () => patch({ group: undefined }) },
              ...groupMenuItems(groupNames, groups, (name) => ({ label: name, type: 'radio' as const, checked: todo.group === name, color: groupColorFor(name, groups), onSelect: () => patch({ group: name }) }))
            ], { anchor, align: 'start' }))}
          {chip('place', <MapPin />, todo.location?.name.split(',')[0].trim() ?? '', uiText('todo.sheet.place'),
            (anchor) => popover(anchor, uiText('todo.location'), () => <PlaceEditor todo={todo} onPatch={patch} />, 320))}
          {chip('priority', <PriorityIcon priority={todo.priority} />, todo.priority === 'normal' ? '' : todoPriorityLabel(todo.priority), uiText('auto.886cbff9d9df'),
            (anchor) => void api.ui.openMenu(PRIORITIES.map((p) => ({ label: todoPriorityLabel(p.id), icon: <PriorityIcon priority={p.id} />, type: 'radio' as const, checked: todo.priority === p.id, onSelect: () => patch({ priority: p.id as TodoPriority }) })), { anchor, align: 'start' }))}
        </div>

        <TagChipsField value={draftValue.tags ?? todo.tags ?? []} onChange={setTags} bare />

        {((todo.attachments ?? []).length > 0 || addingAttachment) && (
          <div className="todo-sheet-section todo-sheet-attachments">
            {(todo.attachments ?? []).map((relPath) => (
              <AttachmentCard
                key={relPath}
                relPath={relPath}
                onRemove={() => setAttachments((todo.attachments ?? []).filter((p) => p !== relPath))}
              />
            ))}
            {addingAttachment && (
              <FileSearchField
                placeholder={uiText('todo.file.searchAttachment')}
                onCancel={() => setAddingAttachment(false)}
                onPick={(path) => {
                  if (!(todo.attachments ?? []).includes(path)) setAttachments([...(todo.attachments ?? []), path])
                  setAddingAttachment(false)
                }}
              />
            )}
          </div>
        )}

        {((todo.urls ?? []).length > 0 || addingUrl || todo.filePath || addingFile) && (
          <div className="todo-sheet-section">
            {todo.filePath && (
              <div className="todo-detail-url-card">
                <button
                  className="todo-detail-url-open"
                  type="button"
                  title={todo.filePath}
                  onClick={(event) => api.workspace.openFile(todo.filePath!, undefined, { newTab: api.ui.hasModKey(event) })}
                >
                  <FileGlyph />
                  <span>{todo.filePath.split('/').pop()}</span>
                  <span className="todo-sheet-muted">{uiText('todo.linkedFile')}</span>
                </button>
                <button
                  className="todo-detail-url-remove"
                  type="button"
                  title={uiText('todo.sheet.unlinkFile')}
                  aria-label={uiText('todo.sheet.unlinkFile')}
                  onClick={() => patch({ filePath: undefined })}
                >
                  <X />
                </button>
              </div>
            )}
            {addingFile && !todo.filePath && (
              <FileSearchField
                placeholder={uiText('todo.file.searchLinked')}
                onCancel={() => setAddingFile(false)}
                onPick={(path) => { patch({ filePath: path }); setAddingFile(false) }}
              />
            )}
            {(todo.urls ?? []).map((url) => (
              <div className="todo-detail-url-card" key={url}>
                <button
                  className="todo-detail-url-open"
                  type="button"
                  title={url}
                  onClick={(event) => {
                    const relPath = parseAppOpenUrl(url)
                    if (relPath) api.workspace.openFile(relPath, undefined, { newTab: api.ui.hasModKey(event) })
                    else void api.files.openExternalUrl(url)
                  }}
                >
                  <Link />
                  <span>{shortUrl(url)}</span>
                </button>
                <button
                  className="todo-detail-url-remove"
                  type="button"
                  title={uiText('todo.removeUrl')}
                  aria-label={uiText('todo.removeUrlOf', { p0: url })}
                  onClick={() => setUrls((todo.urls ?? []).filter((u) => u !== url))}
                >
                  <X />
                </button>
              </div>
            ))}
            {addingUrl && (
              <BufferedInput
                className="todo-detail-link-input todo-detail-url"
                value={urlDraft}
                onCommit={(v) => {
                  const next = normalizeTodoUrl(v)
                  if (next && !(todo.urls ?? []).includes(next)) setUrls([...(todo.urls ?? []), next])
                  setUrlDraft('')
                  setAddingUrl(false)
                }}
                placeholder={uiText('todo.urlPlaceholder')}
                ariaLabel={uiText('todo.url')}
              />
            )}
          </div>
        )}

        {showActivity && statusHistory.length > 0 && (
          <ol className="todo-activity-list todo-sheet-section">
            {[...statusHistory].reverse().map((change, index) => (
              <li key={`${change.changedAt}:${index}`}>
                <span>{todoStatusLabel(change.from)} → {todoStatusLabel(change.to)}</span>
                <time dateTime={change.changedAt}>{new Date(change.changedAt).toLocaleString(api.ui.language())}</time>
              </li>
            ))}
          </ol>
        )}

        <div className="todo-sheet-adds">
          <button className="todo-detail-add" type="button" onClick={() => setAddingAttachment(true)}><Paperclip /> {uiText('todo.sheet.attachment')}</button>
          <button className="todo-detail-add" type="button" onClick={() => setAddingUrl(true)}><Link /> {uiText('todo.sheet.link')}</button>
          {!todo.filePath && <button className="todo-detail-add" type="button" onClick={() => setAddingFile(true)}><FileGlyph /> {uiText('todo.linkedFile')}</button>}
          {statusHistory.length > 0 && (
            <button className="todo-detail-add todo-sheet-activity" type="button" aria-expanded={showActivity} onClick={() => setShowActivity((open) => !open)}>
              {uiText('todo.activity')} ({statusHistory.length})
            </button>
          )}
        </div>
      </div>
    </api.ui.Modal>
  )
}

/** Due date with an optional start and end time, all drawn inside the popover. */
function ScheduleEditor({ todo, onPatch }: { todo: TodoRecord; onPatch: (patch: Partial<TodoRecord>) => void }): ReactElement {
  const [date, setDate] = React.useState(todo.dueDate?.slice(0, 10) ?? '')
  const [start, setStart] = React.useState(todo.startTime ?? '')
  const [end, setEnd] = React.useState(todo.endTime ?? '')
  return (
    <div className="todo-cell-editor">
      <InlineCalendar
        value={date}
        onChange={(value) => {
          setDate(value)
          if (!value) { setStart(''); setEnd('') }
          onPatch(value ? { dueDate: value } : { dueDate: '', startTime: undefined, endTime: undefined })
        }}
      />
      <div className="todo-sheet-times">
        <ClockTimeField value={start} disabled={!date} ariaLabel={uiText('auto.88d8206d586a')} placeholder={uiText('auto.88d8206d586a')} onChange={(value) => { setStart(value); onPatch({ startTime: value || undefined, ...(value ? {} : { endTime: undefined }) }); if (!value) setEnd('') }} />
        <ClockTimeField value={end} disabled={!start} ariaLabel={uiText('auto.cd7800da7f4f')} placeholder={uiText('auto.cd7800da7f4f')} onChange={(value) => { if (value && start && value <= start) { setEnd(end); return } setEnd(value); onPatch({ endTime: value || undefined }) }} />
      </div>
    </div>
  )
}

/** Where the task happens, with the place search. */
function PlaceEditor({ todo, onPatch }: { todo: TodoRecord; onPatch: (patch: Partial<TodoRecord>) => void }): ReactElement {
  const [location, setLocation] = React.useState(todo.location)
  return (
    <div className="todo-cell-editor">
      <LocationField value={location} autoFocus onChange={(next) => { setLocation(next); onPatch({ location: next }) }} />
    </div>
  )
}

/** "openstreetmap.org/#map=13/47.37/8.54" rather than the whole URL; the title keeps it all. */
function shortUrl(url: string): string {
  try {
    const parsed = new URL(url)
    const rest = `${parsed.pathname === '/' ? '' : parsed.pathname}${parsed.search}${parsed.hash}`
    return `${parsed.hostname.replace(/^www\./, '')}${rest}`
  } catch {
    return url
  }
}

/**
 * The editor a surface renders — every list mounts exactly one, and
 * `c.editingId` decides whether it shows anything. The `key` remounts it when a
 * different todo is opened, so the title buffer and the attachment draft never
 * carry over from the record before.
 */
export const TodoDetailModal = ({
  c,
}: {
  c: TodoListController
}): ReactElement | null => {
  if (!c.editingId) return null
  return (
    <TodoDetail
      key={c.editingId}
      todoId={c.editingId}
      c={c}
      close={c.closeDetail}
    />
  )
}
