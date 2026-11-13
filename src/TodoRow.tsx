import { React, api, registerTodoRow } from './runtime'
import { InlineCalendar } from './DatePanel'
import { renderInlineMarkdown } from './markdown'
import type { ComponentType, MemoExoticComponent, ReactElement } from 'react'
import type { TodoRecord } from './types'
import { openTodoCalendar } from './calendarSource'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { allGroups, groupColorFor, type TodoGroup } from './groups'
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Clock,
  FileGlyph,
  Flag,
  Link,
  MapPin,
  Paperclip,
  PriorityGlyph,
  TodoStatusGlyph
} from './icons'
import { openLocation } from './LocationField'
import { TodoMenu, openTodoContextMenu } from './TodoMenu'
import { confirmDeleteTodo } from './data'
import { basename } from './draft'
import { kindLabel } from './AttachmentCard'
import { SwipeRow, openStatusMenu, type SwipeRowActions } from './SwipeRow'
import { statusMenuOptions, effectiveStatus, getStatusSettings, patchForStatus, statusDef, type TodoStatusSettings } from './statuses'
import { PRIORITIES, formatDate, formatDueLabel, isoDay } from './sort'
import type { TodoRowActions } from './controller'
import { taskIconRevision } from './taskIcons'
import { getAllGroups } from './groupStore'
import { todoPriorityMetaLabel, uiText } from './localization'
import { StatusBadge } from './StatusBadge'
import { setTodoSearch } from './viewStore'

/**
 * How many file cards a row draws before the rest become one "+N more".
 * Two is what fits beside a title and its meta line without the files becoming
 * the row; the rest are one press away, in the row itself.
 */
const MAX_ROW_FILES = 2

/**
 * Everything outside its props a row reads while rendering: the day, the date
 * format, the language, the status settings, the status icon folder and the
 * colours of switched-off groups a task may still carry. A
 * memoised row takes it as one prop, so a change to any of them still reaches
 * every row, exactly as the list's own re-render used to.
 */
export interface RowEnv {
  today: string
  dateFormat: ReturnType<typeof api.getState>['dateFormat']
  language: string
  statuses: TodoStatusSettings
  icons: number
  /** Every group, switched off or not, as `groupColorFor` falls back to it. */
  groupColors: string
}

export function useRowEnv(): RowEnv {
  const today = isoDay(new Date())
  const dateFormat = api.getState().dateFormat
  const language = api.ui.language()
  const statuses = getStatusSettings()
  const icons = taskIconRevision()
  const groupColors = JSON.stringify(getAllGroups())
  return React.useMemo(() => ({ today, dateFormat, language, statuses, icons, groupColors }), [today, dateFormat, language, statuses, icons, groupColors])
}

/**
 * `React.memo(render)`, wrapped so the memo is made from the host's React
 * instance (set when the runtime starts, after this module loads). The wrapper
 * itself holds no state; the memoised row below it bails out on equal props.
 */
export function memoRow<P extends object>(render: (props: P) => ReactElement): (props: P) => ReactElement {
  const memos = new WeakMap<object, MemoExoticComponent<(props: P) => ReactElement>>()
  return (props: P): ReactElement => {
    const memo = memos.get(React) ?? React.memo(render)
    memos.set(React, memo)
    return React.createElement(memo as unknown as ComponentType<object>, props)
  }
}

/** The previous value while the new one is structurally equal, so a re-read list (groups) keeps its identity. */
export function useStructuralValue<T>(value: T): T {
  const ref = React.useRef<{ value: T; json: string } | null>(null)
  if (ref.current?.value === value) return ref.current.value
  const json = JSON.stringify(value)
  if (ref.current?.json !== json) ref.current = { value, json }
  return ref.current.value
}

const TITLE_HTML_LIMIT = 500

interface TitleHtmlCache { html: Map<string, string>; pending: Map<string, Promise<string>> }

/** Rendered titles for this plugin runtime; it goes away with the runtime on reload. */
function titleHtmlCache(): TitleHtmlCache {
  return api.runtime.getOrCreate('todo.titleHtml', () => ({ html: new Map<string, string>(), pending: new Map<string, Promise<string>>() }))
}

function cachedTitleHtml(title: string): string | undefined {
  const cache = titleHtmlCache().html
  const html = cache.get(title)
  if (html === undefined) return undefined
  cache.delete(title)
  cache.set(title, html)
  return html
}

function renderTitleHtml(title: string): Promise<string> {
  const cache = titleHtmlCache()
  let pending = cache.pending.get(title)
  if (!pending) {
    pending = renderInlineMarkdown(title).then((html) => {
      cache.html.set(title, html)
      if (cache.html.size > TITLE_HTML_LIMIT) cache.html.delete(cache.html.keys().next().value!)
      return html
    }).finally(() => { cache.pending.delete(title) })
    cache.pending.set(title, pending)
  }
  return pending
}

/** A title's inline Markdown, rendered by the host once per title string. */
export function useTitleHtml(title: string): string {
  const [titleHtml, setTitleHtml] = React.useState(() => cachedTitleHtml(title) ?? '')
  React.useEffect(() => {
    const cached = cachedTitleHtml(title)
    if (cached !== undefined) {
      setTitleHtml(cached)
      return
    }
    let active = true
    setTitleHtml('')
    void renderTitleHtml(title).then((html) => { if (active) setTitleHtml(html) }).catch(() => { if (active) setTitleHtml('') })
    return () => { active = false }
  }, [title])
  return titleHtml
}

/**
 * The round status control shared by the list rows and the task table: a click
 * toggles completed, press-and-hold opens the list of statuses.
 */
export function useStatusCheck(todo: TodoRecord, pending: boolean, patchTodo: TodoRowActions['patchTodo']): { check: ReactElement; cancelHold: () => void } {
  const status = effectiveStatus(todo)
  const checkboxRef = React.useRef<HTMLInputElement>(null)
  const longPressTimer = React.useRef<number | null>(null)
  const longPressed = React.useRef(false)

  const cancelHold = React.useCallback((): void => {
    if (longPressTimer.current != null) {
      window.clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }, [])
  React.useEffect(() => cancelHold, [cancelHold])

  const check = (
    <span className="todo-check-wrap">
      <input
        ref={checkboxRef}
        className="todo-check"
        data-status={status}
        type="checkbox"
        // Only `completed` ticks. Canceled is *done* for filtering — it
        // lands in the Completed list — but a tick would claim the work
        // happened, and it explicitly did not; it gets the ✕ glyph instead.
        checked={status === 'completed'}
        aria-disabled={pending || undefined}
        onPointerDown={() => {
          if (pending) return
          longPressed.current = false
          cancelHold()
          longPressTimer.current = window.setTimeout(() => {
            longPressed.current = true
            const anchor = checkboxRef.current
            if (anchor) void api.ui.openMenu(statusMenuOptions().map((option) => ({
              label: option.label,
              icon: <TodoStatusGlyph status={option.status} dotCls={option.cls} color={option.color} />,
              type: 'radio' as const,
              checked: option.status === null ? status === 'open' : option.status === status,
              enabled: !pending,
              onSelect: () => patchTodo(todo.id, patchForStatus(option.status))
            })), { anchor })
          }, 450)
        }}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        onClick={(e) => {
          // A long-press already opened the status menu — swallow the toggle.
          if (longPressed.current) e.preventDefault()
        }}
        onKeyDown={() => { longPressed.current = false }}
        onChange={(e) => {
          // React raises this from the same click, whatever onClick prevented.
          if (longPressed.current) {
            longPressed.current = false
            return
          }
          void patchTodo(todo.id, patchForStatus(e.target.checked ? 'completed' : null))
        }}
        aria-label={uiText('auto.13816aca9c25', { p0: todo.title })}
      />
      {/* The glyph overlays the box for every state that is neither plain
          open nor a plain tick — one lookup, so a new status needs no edit here. */}
      {status !== 'open' && status !== 'completed' && (
        <span className="todo-check-glyph">
          <TodoStatusGlyph status={status} dotCls={statusDef(status).cls} />
        </span>
      )}
    </span>
  )
  return { check, cancelHold }
}

/**
 * One todo row — a round status control, markdown title/note preview, then
 * lightweight metadata and file tiles. Editing lives in the detail modal, which
 * the surrounding list renders; a row only asks for it (⋯ → Edit, double-click).
 */
export const TodoRow = memoRow(function TodoRow({
  todo,
  groups,
  compact,
  actions,
  pending,
  menuOpen,
  env,
  hideDate = false,
  onMoveFocus
}: {
  todo: TodoRecord
  groups: TodoGroup[]
  compact: boolean
  actions: TodoRowActions
  /** A write for this todo is in flight. */
  pending: boolean
  /** This todo's ⋯ menu is the open one. */
  menuOpen: boolean
  env: RowEnv
  /** Suppress the inline due date — a date section header already says it. */
  hideDate?: boolean
  /** ↑/↓ between rows, so the list is navigable without stealing Tab entirely. */
  onMoveFocus?: (todoId: string, delta: number) => void
}): ReactElement {
  const clickTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(() => () => { if (clickTimer.current) clearTimeout(clickTimer.current) }, [])
  const titleHtml = useTitleHtml(todo.title)
  const openFile = (relPath: string, newTab?: boolean): void =>
    api.workspace.openFile(relPath, undefined, { newTab })

  const priorityDef = PRIORITIES.find((p) => p.id === todo.priority) ?? PRIORITIES[0]
  const groupNames = allGroups(groups)
  const status = effectiveStatus(todo)
  const files = [todo.filePath, ...(todo.attachments ?? [])].filter((path): path is string => !!path)
  // A row is a summary: seven files drew a 460px row that owned the whole
  // sidebar. So it shows two and folds the rest behind one card — which expands
  // the list in place rather than sending the reader to the detail modal, since
  // wanting the fourth file is not wanting the editor.
  const [filesExpanded, setFilesExpanded] = React.useState(false)
  const shownFiles = filesExpanded ? files : files.slice(0, MAX_ROW_FILES)
  const hiddenFiles = files.length - shownFiles.length
  // A link has never had a signal on the row, and in compact mode the file cards
  // below are suppressed too — so both become meta-line glyphs rather than facts
  // you can only reach by opening the item.
  const urlCount = todo.urls?.length ?? 0
  const showFileCount = compact && files.length > 0
  const reminderPending = !!todo.remindAt && !todo.reminderFiredAt
  const statusWord = !!todo.status && todo.status !== 'open' && !statusDef(todo.status, env.statuses).done
  const tagCount = todo.tags?.length ?? 0
  const today = env.today
  const dueLabel = todo.dueDate && !hideDate
    ? formatDueLabel(
        todo.dueDate,
        today,
        {
          today: uiText('todo.due.today'),
          tomorrow: uiText('todo.due.tomorrow'),
          yesterday: uiText('todo.due.yesterday')
        },
        env.language,
        env.dateFormat
      )
    : ''
  const dueDateFull = todo.dueDate ? formatDate(todo.dueDate, env.dateFormat) : ''
  const overdue = !!todo.dueDate && !todo.completed && todo.dueDate.slice(0, 10) < today
  const hasWhenLine = !!(dueLabel || todo.startTime || reminderPending || todo.group)
  const hasDetailLine = !!(statusWord || todo.priority !== 'normal' || todo.location || urlCount > 0 || showFileCount)

  const rowRef = React.useRef<HTMLElement>(null)
  React.useEffect(() => rowRef.current ? registerTodoRow(todo.id, rowRef.current) : undefined, [todo.id])
  const { check, cancelHold } = useStatusCheck(todo, pending, actions.patchTodo)

  const openCalendar = (): void => {
    if (!openTodoCalendar(todo)) actions.openDetail(todo.id)
  }

  const patch = (next: Partial<TodoRecord>): unknown => actions.patchTodo(todo.id, next)

  const swipeActions = React.useMemo<SwipeRowActions>(
    () => ({
      reschedule: (date) => void actions.patchTodo(todo.id, { dueDate: date }),
      pickDate: (anchor) => {
        void api.ui.openPopover(
          (ctx) => (
            <div className="todo-swipe-datepick">
              <InlineCalendar
                value={todo.dueDate?.slice(0, 10) ?? ''}
                onChange={(next) => {
                  void actions.patchTodo(todo.id, { dueDate: next })
                  ctx.close()
                }}
              />
            </div>
          ),
          { anchor },
          { ariaLabel: uiText('todo.swipe.date') }
        )
      },
      setStatus: (anchor) => openStatusMenu(anchor, todo, patch),
      toggleFlag: () => void actions.patchTodo(todo.id, { flagged: !todo.flagged }),
      openDetails: () => actions.openDetail(todo.id),
      remove: () => void confirmDeleteTodo(todo, actions.removeTodo)
    }),
    // `patch` closes over the same two values the rest of this list names.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todo, actions]
  )

  return (
    <SwipeRow todo={todo} disabled={pending} actions={swipeActions} onEngage={cancelHold}>
      <article
        ref={rowRef}
        className={`todo-row todo-row-navigable${todo.completed ? ' completed' : ''}${
          compact ? ' compact' : ''
        }${todo.flagged ? ' flagged' : ''}`}
        data-todo-id={todo.id}
        data-status={status}
        tabIndex={0}
        onContextMenu={(e) => openTodoContextMenu(e, {
          todo,
          groupNames,
          setOpenId: actions.setMenuId,
          onEdit: () => actions.openDetail(todo.id),
          onPatch: patch,
          onRequestDelete: () => confirmDeleteTodo(todo, actions.removeTodo),
          disabled: pending
        })}
        onKeyDown={(e) => {
          // Only a press on the row itself — inside the ⋯ button or the checkbox
          // the keys belong to that control.
          if (e.target !== e.currentTarget) return
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            onMoveFocus?.(todo.id, e.key === 'ArrowDown' ? 1 : -1)
            return
          }
          if (e.key === 'Escape') {
            // Always an exit: ↑/↓ own the list, so Tab must never be able to
            // trap a keyboard user inside it.
            e.currentTarget.blur()
            return
          }
          if (e.key === 'Enter') {
            e.preventDefault()
            actions.openDetail(todo.id)
          }
        }}
        onClick={(e) => {
          // Every interactive affordance is a button or an input; the modal is
          // rendered by the list, so it can never be a click target here.
          if ((e.target as Element).closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')) return
          // The second click of a double-click is the editor's, not the
          // Calendar's — navigating twice for one gesture is noise.
          if (e.detail > 1) return
          if (clickTimer.current) clearTimeout(clickTimer.current)
          clickTimer.current = setTimeout(() => { clickTimer.current = null; openCalendar() }, 220)
        }}
        onDoubleClick={(e) => {
          if (clickTimer.current) { clearTimeout(clickTimer.current); clickTimer.current = null }
          if ((e.target as Element).closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')) return
          actions.openDetail(todo.id)
        }}
      >
        {check}

        <div className="todo-row-main">
          <h4>
            {priorityDef.symbol && (
              <span className={`todo-priority-inline todo-priority-${todo.priority}`}>
                {priorityDef.symbol}{' '}
              </span>
            )}
            {titleHtml ? <span className="todo-title-md" dangerouslySetInnerHTML={{ __html: titleHtml }} /> : <span className="todo-title-md">{todo.title}</span>}
          </h4>

          {!compact && todo.note.trim() && <div className="todo-notes is-plain">{todo.note}</div>}

          {/* The details are fixed lines, not one wrapping run: the date
              first with the group after it, then status, priority and place,
              then tags (dropped in compact). Every row starts its lines the
              same way, so the eye finds the date without reading the line. */}
          {(hasWhenLine || hasDetailLine || (!compact && tagCount > 0)) && (
            <div className="todo-view-meta">
              {hasWhenLine && (
                <div className="todo-meta-line todo-meta-when">
                  <span className="todo-meta-cluster">
                    {dueLabel && (
                      // The date is the row's own link into the Calendar. It stops the
                      // click rather than letting the row handle it, so one press is
                      // one navigation and the row's double-click still opens details.
                      <button
                        className={`todo-date${overdue ? ' is-overdue' : ''}`}
                        type="button"
                        title={uiText('todo.openInCalendar', { p0: dueDateFull || dueLabel })}
                        onClick={(e) => {
                          e.stopPropagation()
                          openCalendar()
                        }}
                      >
                        <span className="todo-meta-icon"><CalendarDays /></span>
                        <span className="todo-date-day">{dueLabel}</span>
                        {dueDateFull && dueDateFull !== dueLabel && (
                          <span className="todo-date-full">{dueDateFull}</span>
                        )}
                      </button>
                    )}
                    {todo.startTime && (
                      <span className="todo-clock-text">
                        {/* Beside its date the time needs no glyph of its own:
                            the two read as one "when". */}
                        {!dueLabel && <span className="todo-meta-icon"><Clock /></span>}
                        {todo.startTime}{todo.endTime ? `–${todo.endTime}` : ''}
                      </span>
                    )}
                    {reminderPending && (
                      <span className="todo-meta-glyph" title={uiText('todo.reminderSet')}>
                        <Bell />
                        {todo.remindAt!.slice(11, 16)}
                      </span>
                    )}
                  </span>
                  {todo.group && (
                    <span className="todo-group-text" title={todo.group} style={{ color: paletteCssValue(groupColorFor(todo.group, groups)) }}>
                      <span className="todo-group-dot" aria-hidden="true" />
                      <span className="todo-meta-ellipsis">{todo.group}</span>
                    </span>
                  )}
                </div>
              )}
              {hasDetailLine && (
                <div className="todo-meta-line todo-meta-details">
                  {statusWord && <StatusBadge status={todo.status!} />}
                  {todo.priority !== 'normal' && (
                    <span className={`todo-priority-text todo-priority-${todo.priority}`}>
                      <span className="todo-meta-icon"><PriorityGlyph /></span>
                      {todoPriorityMetaLabel(todo.priority)}
                    </span>
                  )}
                  {todo.location && (
                    <button
                      className="todo-location-meta"
                      type="button"
                      title={uiText('todo.openLocationOf', { p0: todo.location.name })}
                      onClick={(e) => {
                        e.stopPropagation()
                        openLocation(todo.location!)
                      }}
                    >
                      <span className="todo-meta-icon"><MapPin /></span>
                      <span className="todo-meta-ellipsis">{todo.location.name}</span>
                    </button>
                  )}
                  {showFileCount && (
                    <span className="todo-attach-count" title={uiText('todo.attachments')}>
                      <span className="todo-meta-icon"><Paperclip /></span>
                      {files.length}
                    </span>
                  )}
                  {urlCount > 0 && (
                    <span className="todo-meta-glyph" title={uiText('todo.url')}>
                      <Link />
                      {urlCount > 1 && urlCount}
                    </span>
                  )}
                </div>
              )}
              {!compact && tagCount > 0 && (
                <div className="todo-meta-line todo-meta-tags">
                  {todo.tags!.slice(0, 3).map((tag) => (
                    // A tag is a bubble that searches for itself: one press
                    // puts `#tag` in the To-Do search the lists already share.
                    <button
                      key={tag}
                      className="todo-tag-text"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setTodoSearch(`#${tag}`)
                      }}
                    >
                      #{tag}
                    </button>
                  ))}
                  {tagCount > 3 && (
                    <span className="todo-tag-more" title={todo.tags!.slice(3).map((tag) => `#${tag}`).join(' ')}>+{tagCount - 3}</span>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        <div className="todo-row-actions">
          {todo.flagged && (
            <span className="todo-flag-mark" title={uiText('todo.flagged')}><Flag /></span>
          )}
          <TodoMenu
            todo={todo}
            groupNames={groupNames}
            openId={menuOpen ? todo.id : null}
            setOpenId={actions.setMenuId}
            onEdit={() => actions.openDetail(todo.id)}
            onPatch={patch}
            onRequestDelete={() => confirmDeleteTodo(todo, actions.removeTodo)}
            disabled={pending}
          />
        </div>

        {!compact && files.length > 0 && (
          <div className="todo-file-list" aria-label={uiText('auto.c509ffcf5b5c')}>
            {shownFiles.map((relPath) => (
              <button
                key={relPath}
                className="todo-file-card"
                title={relPath}
                onClick={(e) => {
                  e.stopPropagation()
                  openFile(relPath, api.ui.hasModKey(e))
                }}
                type="button"
              >
                <span className="todo-file-card-icon">
                  {relPath === todo.filePath ? <FileGlyph /> : <Paperclip />}
                </span>
                <span className="todo-file-card-copy">
                  <span className="todo-file-card-name">{basename(relPath)}</span>
                  <span className="todo-file-card-kind">{kindLabel(relPath)}</span>
                </span>
              </button>
            ))}
            {(hiddenFiles > 0 || filesExpanded) && (
              <button
                className={`todo-file-card todo-file-card-more${filesExpanded ? ' open' : ''}`}
                title={filesExpanded ? uiText('todo.fewerFiles') : uiText('todo.moreFiles', { p0: hiddenFiles })}
                aria-expanded={filesExpanded}
                onClick={(e) => {
                  e.stopPropagation()
                  setFilesExpanded((open) => !open)
                }}
                type="button"
              >
                <span className="todo-file-card-icon"><ChevronDown /></span>
                <span className="todo-file-card-copy">
                  <span className="todo-file-card-name">
                    {filesExpanded ? uiText('todo.fewerFiles') : uiText('todo.moreFiles', { p0: hiddenFiles })}
                  </span>
                </span>
              </button>
            )}
          </div>
        )}
      </article>
    </SwipeRow>
  )
})
