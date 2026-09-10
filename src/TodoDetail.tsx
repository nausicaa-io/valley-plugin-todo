import { React, api } from './runtime'
import type { ReactElement } from 'react'
import type { IndexEntry, TodoPriority, TodoRecord, TodoStatus } from '@valley/plugin-sdk/types'
import { parseAppOpenUrl } from '@valley/plugin-sdk/paths'
import { getSharedTodos, onSharedTodos } from './sharedTodos'
import { confirmDeleteTodo, normalizeTodoUrl, type DocumentRevision } from './data'
import { FilePathInput } from './fields'
import { AttachmentCard } from './AttachmentCard'
import { Flag, Link, MapPin, Paperclip, Plus, X } from './icons'
import { LocationField } from './LocationField'
import { allGroups } from './groups'
import { useGroups } from './groupStore'
import { PRIORITIES } from './sort'
import { activeStatuses, effectiveStatus, patchForStatus } from './statuses'
import { canReparent } from './tree'
import { composeRemindAt } from './draft'
import type { TodoListController } from './controller'
import { todoStatusLabel, uiText } from './localization'

interface DetailProps {
  todoId: string
  c: TodoListController
  indexEntries: IndexEntry[]
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

const TodoDetail = ({ todoId, c, indexEntries, close }: DetailProps): ReactElement | null => {
  const { Toggle, SelectField, Segmented, DateField, TimeField } = api.ui.settings
  const [todos, setTodos] = React.useState<TodoRecord[]>(getSharedTodos)
  React.useEffect(() => onSharedTodos(setTodos), [])
  const todo = todos.find((t) => t.id === todoId)
  const groups = useGroups()

  const [addingAttachment, setAddingAttachment] = React.useState(false)
  const [attachmentDraft, setAttachmentDraft] = React.useState('')
  const [addingUrl, setAddingUrl] = React.useState(false)
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
        if (document && !draft.revision) draft.revision = { expectedRevision: document.revision, vaultGeneration: document.vaultGeneration }
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

  /** Legal parents, including the full-subtree depth and cycle checks. */
  const parentOptions = React.useMemo(() => {
    return todos
      .filter((t) => t.title.trim() && canReparent(todos, todoId, t.id))
      .map((t) => ({ value: t.id, label: t.title }))
  }, [todos, todoId])

  // The record can vanish under us (deleted here or elsewhere) — close rather
  // than render a panel describing nothing.
  React.useEffect(() => {
    if (!todo) close()
  }, [todo, close])
  if (!todo) return null

  const patch = (p: Partial<TodoRecord>): void => { void commitPatch(p).then((ok) => { if (!ok) failed() }) }
  const setTags = (tags: string[]): void => { patchDraft({ tags }); writeTags(JSON.stringify(tags)) }
  /** Attachments are stored absent, never as an empty array. */
  const setAttachments = (paths: string[]): void =>
    patch({ attachments: paths.length ? paths : undefined })
  /** Same contract for links: absent, never an empty array. */
  const setUrls = (urls: string[]): void => patch({ urls: urls.length ? urls : undefined })
  const remindDate = todo.remindAt?.slice(0, 10) ?? ''
  const remindTime = todo.remindAt?.slice(11, 16) ?? ''
  const setRemind = (date: string, time: string): void =>
    patch({ remindAt: composeRemindAt(date, time), reminderFiredAt: undefined })
  const groupNames = allGroups(groups)
  const parentTitle = todo.parentId
    ? todos.find((t) => t.id === todo.parentId)?.title ?? ''
    : ''

  return (
    <api.ui.Modal
      title={uiText('todo.edit.title')}
      size="large"
      bodyClassName="todo-detail-body"
      onClose={close}
      footer={
        <>
          <button
            type="button"
            className="btn-danger todo-detail-delete"
            onClick={() => void confirmDeleteTodo(todo, c.removeTodo)}
          >
            {uiText('auto.f6fdbe48dc54')}
          </button>
          <button type="button" className="btn-primary" onClick={close}>
            {uiText('todo.edit.done')}
          </button>
        </>
      }
    >
      {draftValue.error && <p role="alert">{draftValue.error}</p>}
      <div className="todo-detail-title-row">
        {/* The host focuses this on open instead of its own ✕ — the title is
            what a just-created todo is waiting for, and Enter here closes. */}
        <input
          className="todo-detail-title"
          data-modal-initial-focus="true"
          value={titleDraft ?? todo.title}
          aria-label={uiText('auto.c5e8306a511f')}
          onChange={(e) => { setTitleDraft(e.target.value); writeTitle(e.target.value) }}
          onBlur={() => { if (titleDraft === todo.title) setTitleDraft(null) }}
          onKeyDown={(e) => { if (e.key === 'Enter') close() }}
        />
        <button
          className={`todo-detail-flag${todo.flagged ? ' on' : ''}`}
          type="button"
          onClick={() => patch({ flagged: todo.flagged ? undefined : true })}
          aria-pressed={!!todo.flagged}
          title={uiText('todo.flag')}
          aria-label={uiText('todo.flag')}
        >
          <Flag />
        </button>
      </div>

      {/* Two columns: what the todo *says* on the left, what it *is* on the
          right. The rail collapses under the notes when the modal is narrow. */}
      <div className="todo-detail-cols">
        <div className="todo-detail-col">
          <div className="todo-detail-block">
            <div className="todo-detail-group-label">{uiText('todo.edit.notes')}</div>
            <div className="todo-detail-notes">
              <api.ui.NoteInput
                value={draftValue.note ?? todo.note}
                context={{ ref: { pluginId: 'todo', sourceId: 'tasks', itemId: todo.id }, sourcePath: todo.filePath }}
                tags={draftValue.tags ?? todo.tags ?? []}
                onTagsChange={setTags}
                onRevisionChange={(revision) => {
                  if (!draft.revision || (draft.value.note === null && draft.value.title === null && draft.value.tags === null) || revision.expectedRevision < draft.revision.expectedRevision) draft.revision = revision
                }}
                onChange={(note) => { patchDraft({ note }); writeNote(note) }}
                onSave={close}
                onCancel={close}
              />
            </div>
          </div>

          <div className="todo-detail-block">
            <div className="todo-detail-group-label">{uiText('todo.edit.tags')}</div>
            <api.ui.TagInput value={draftValue.tags ?? todo.tags ?? []} onChange={setTags} />
          </div>

          <div className="todo-detail-block">
            <div className="todo-detail-group-label">
              <Paperclip /> {uiText('todo.attachments')}
            </div>
            {(todo.attachments ?? []).map((relPath) => (
              <AttachmentCard
                key={relPath}
                relPath={relPath}
                onRemove={() => setAttachments((todo.attachments ?? []).filter((p) => p !== relPath))}
              />
            ))}
            {addingAttachment ? (
              <FilePathInput
                value={attachmentDraft}
                onChange={(v) => {
                  setAttachmentDraft(v)
                  // The picker reports a full relPath the moment a suggestion is
                  // chosen; a half-typed query never matches an index entry.
                  if (indexEntries.some((e) => e.relPath === v)) {
                    if (!(todo.attachments ?? []).includes(v)) {
                      setAttachments([...(todo.attachments ?? []), v])
                    }
                    setAttachmentDraft('')
                    setAddingAttachment(false)
                  }
                }}
                indexEntries={indexEntries}
              />
            ) : (
              <button
                className="todo-detail-add"
                type="button"
                onClick={() => setAddingAttachment(true)}
              >
                <Plus /> {uiText('todo.addAttachment')}
              </button>
            )}
          </div>

          <div className="todo-detail-block todo-detail-links-block">
            <div className="todo-detail-group-label">
              <Link /> {uiText('todo.links')}
            </div>
            <label className="todo-linked-file-control">
              <span>{uiText('todo.linkedFile')}</span>
              <FilePathInput
                value={todo.filePath ?? ''}
                onChange={(v) => patch({ filePath: v.trim() || undefined })}
                indexEntries={indexEntries}
              />
            </label>
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
                  <span>{url}</span>
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
            {addingUrl ? (
              <BufferedInput
                className="todo-detail-link-input todo-detail-url"
                value={urlDraft}
                onCommit={(v) => {
                  const next = normalizeTodoUrl(v)
                  // An empty commit closes the field; a duplicate is a no-op
                  // rather than an error, matching the attachment picker.
                  if (next && !(todo.urls ?? []).includes(next)) {
                    setUrls([...(todo.urls ?? []), next])
                  }
                  setUrlDraft('')
                  setAddingUrl(false)
                }}
                placeholder={uiText('todo.urlPlaceholder')}
                ariaLabel={uiText('todo.url')}
              />
            ) : (
              <button className="todo-detail-add" type="button" onClick={() => setAddingUrl(true)}>
                <Plus /> {uiText('todo.addWebAppLink')}
              </button>
            )}
          </div>
        </div>

        <div className="todo-detail-col todo-detail-rail">
          <div className="todo-detail-block">
            <div className="todo-detail-group-label">{uiText('todo.edit.properties')}</div>

            <label className="todo-detail-field" data-status={effectiveStatus(todo)}>
              <span className="todo-detail-label">{uiText('auto.bae7d5be7082')}</span>
              <SelectField
                className="todo-select"
                value={effectiveStatus(todo)}
                // Through `patchForStatus`, so picking Completed here checks the
                // box exactly as the checkbox does — one rule, not two.
                onChange={(v) => patch(patchForStatus(v === 'open' ? null : (v as TodoStatus)))}
                ariaLabel={uiText('auto.bae7d5be7082')}
                options={activeStatuses().map((s) => ({ value: s, label: todoStatusLabel(s) }))}
              />
            </label>

            <label className="todo-detail-field">
              <span className="todo-detail-label">{uiText('auto.886cbff9d9df')}</span>
              <Segmented
                value={todo.priority}
                onChange={(v) => patch({ priority: v as TodoPriority })}
                ariaLabel={uiText('auto.886cbff9d9df')}
                options={PRIORITIES.map((p) => ({
                  value: p.id,
                  label: p.symbol || uiText('todo.priorityNone')
                }))}
              />
            </label>

            {/* The group was reachable only from the row's ⋯ menu; the record
                stores the name, so a typed one is a usable group at once. */}
            <label className="todo-detail-field">
              <span className="todo-detail-label">{uiText('todo.edit.group')}</span>
              <api.ui.ComboField
                className="todo-detail-combo"
                value={todo.group ?? ''}
                onChange={(v) => patch({ group: v.trim() || undefined })}
                options={groupNames.map((name) => ({ value: name, label: name }))}
                ariaLabel={uiText('todo.edit.group')}
                clearLabel={uiText('todo.chip.noGroup')}
                allowCustom={false}
              />
            </label>

            {/* The third way to nest, beside Tab on a row and ⋯ → Indent — and
                the only one that reaches a parent that is not next to the row.
                Its own subtree and anything already at the depth limit are
                excluded, so the field cannot build a cycle or an illegal tier. */}
            <label className="todo-detail-field">
              <span className="todo-detail-label">{uiText('todo.tree.subtaskOf')}</span>
              <api.ui.ComboField
                className="todo-detail-combo"
                value={parentTitle}
                onChange={(v) => {
                  const name = v.trim()
                  const match = parentOptions.find((o) => o.label === name)
                  patch({ parentId: match?.value || undefined })
                }}
                options={parentOptions}
                ariaLabel={uiText('todo.tree.subtaskOf')}
                clearLabel={uiText('todo.tree.noParent')}
              />
            </label>
          </div>

          <div className="todo-detail-block">
            <div className="todo-detail-group-label">{uiText('todo.edit.schedule')}</div>

            <label className="todo-detail-field">
              <span className="todo-detail-label">{uiText('auto.145caf292855')}</span>
              <DateField
                className="todo-detail-inline-date"
                value={todo.dueDate}
                ariaLabel={uiText('auto.4c1aeebc433b')}
                onChange={(next) => patch({ dueDate: next })}
              />
            </label>

            <label className="todo-detail-field todo-detail-field-stack">
              <span className="todo-detail-label">{uiText('auto.0a8adac9d6d5')}</span>
              <span className="todo-clock-row">
                <TimeField
                  value={todo.startTime ?? ''}
                  ariaLabel={uiText('auto.88d8206d586a')}
                  onChange={(value) => patch({ startTime: value || undefined })}
                />
                <span className="todo-clock-dash">–</span>
                <TimeField
                  value={todo.endTime ?? ''}
                  ariaLabel={uiText('auto.cd7800da7f4f')}
                  onChange={(value) => patch({ endTime: value || undefined })}
                />
              </span>
            </label>
          </div>

          {/* remind me — only the triggers this app can actually honour. */}
          <div className="todo-detail-block">
            <div className="todo-detail-group-label">{uiText('todo.remindMe')}</div>
            {/* The kit's Toggle takes `label` as its accessible name only — it draws
                no text — so the visible label is ours. */}
            <div className="todo-detail-row">
              <span className="todo-detail-label">{uiText('todo.onADay')}</span>
              <span className="todo-detail-row-end">
                {remindDate && (
                  <DateField
                    className="todo-detail-inline-date"
                    value={remindDate}
                    ariaLabel={uiText('todo.remindDate')}
                    clearable={false}
                    onChange={(next) => setRemind(next, remindTime)}
                  />
                )}
                <Toggle
                  checked={!!remindDate}
                  onChange={(on) => setRemind(on ? todo.dueDate || todayIso() : '', on ? remindTime : '')}
                  label={uiText('todo.onADay')}
                />
              </span>
            </div>
            <div className="todo-detail-row">
              <span className="todo-detail-label">{uiText('todo.atATime')}</span>
              <span className="todo-detail-row-end">
                {remindTime && (
                  <TimeField
                    className="todo-detail-inline-input"
                    value={remindTime}
                    ariaLabel={uiText('todo.remindTime')}
                    clearable={false}
                    onChange={(value) => setRemind(remindDate, value)}
                  />
                )}
                <Toggle
                  checked={!!remindTime}
                  disabled={!remindDate}
                  onChange={(on) => setRemind(remindDate, on ? '09:00' : '')}
                  label={uiText('todo.atATime')}
                />
              </span>
            </div>
            {remindDate && (
              <p className="todo-detail-hint">{uiText('todo.reminderAppOpenHint')}</p>
            )}
          </div>

          <div className="todo-detail-block">
            <div className="todo-detail-group-label">
              <MapPin /> {uiText('todo.location')}
            </div>
            <LocationField
              value={todo.location}
              onChange={(location) => patch({ location })}
            />
          </div>

          <div className="todo-detail-block todo-activity-block">
            <div className="todo-detail-group-label">{uiText('todo.activity')}</div>
            {(todo.statusHistory ?? []).length ? (
              <ol className="todo-activity-list">
                {[...(todo.statusHistory ?? [])].reverse().map((change, index) => (
                  <li key={`${change.changedAt}:${index}`}>
                    <span>{todoStatusLabel(change.from)} → {todoStatusLabel(change.to)}</span>
                    <time dateTime={change.changedAt}>{new Date(change.changedAt).toLocaleString(api.ui.language())}</time>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="todo-detail-hint">{uiText('todo.activity.empty')}</p>
            )}
          </div>

        </div>
      </div>
    </api.ui.Modal>
  )
}

function todayIso(): string {
  const now = new Date()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${m}-${d}`
}

/**
 * The editor a surface renders — every list mounts exactly one, and
 * `c.editingId` decides whether it shows anything. The `key` remounts it when a
 * different todo is opened, so the title buffer and the attachment draft never
 * carry over from the record before.
 */
export const TodoDetailModal = ({
  c,
  indexEntries
}: {
  c: TodoListController
  indexEntries: IndexEntry[]
}): ReactElement | null => {
  if (!c.editingId) return null
  return (
    <TodoDetail
      key={c.editingId}
      todoId={c.editingId}
      c={c}
      indexEntries={indexEntries}
      close={c.closeDetail}
    />
  )
}
