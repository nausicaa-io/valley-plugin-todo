import { React, api, registerTodoRow } from './runtime'
import { renderInlineMarkdown } from './markdown'
import type { DragEvent, ReactElement } from 'react'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import { CALENDAR_ITEM_SOURCE_V1, CALENDAR_NAVIGATOR_V1 } from '@valley/plugin-sdk'
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
import { TodoMenu } from './TodoMenu'
import { confirmDeleteTodo } from './data'
import { basename } from './draft'
import { kindLabel } from './AttachmentCard'
import { SwipeRow, openStatusMenu, type SwipeRowActions } from './SwipeRow'
import { statusMenuOptions, effectiveStatus, patchForStatus, statusDef } from './statuses'
import { PRIORITIES, formatDate, formatDueLabel, isoDay } from './sort'
import type { TodoListController } from './controller'
import { todoPriorityMetaLabel, todoStatusLabel, uiText } from './localization'

/**
 * How many file cards a row draws before the rest become one "+N more".
 * Two is what fits beside a title and its meta line without the files becoming
 * the row; the rest are one press away, in the row itself.
 */
const MAX_ROW_FILES = 2

/**
 * One todo row — a round status control, markdown title/note preview, then
 * lightweight metadata and file tiles. Editing lives in the detail modal, which
 * the surrounding list renders; a row only asks for it (⋯ → Edit, double-click).
 *
 * The row also hosts the swipe trays and its own indentation. Both are drawn
 * here rather than by each list so the sidebar and the page cannot drift: a
 * nested todo has to look nested wherever it appears.
 */
export const TodoRow = ({
  todo,
  groups,
  compact,
  c,
  depth = 0,
  hideDate = false,
  canIndent = false,
  canOutdent = false,
  onIndent,
  onOutdent,
  onMoveFocus,
  draggable = false,
  dropTarget = false,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd
}: {
  todo: TodoRecord
  groups: TodoGroup[]
  compact: boolean
  c: TodoListController
  /** Nesting level, 0 = root. Capped by `MAX_TODO_DEPTH` upstream. */
  depth?: number
  /** Suppress the inline due date — a date section header already says it. */
  hideDate?: boolean
  canIndent?: boolean
  canOutdent?: boolean
  onIndent?: () => void
  onOutdent?: () => void
  /** ↑/↓ between rows, so the list is navigable without stealing Tab entirely. */
  onMoveFocus?: (delta: number) => void
  draggable?: boolean
  dropTarget?: boolean
  onDragStart?: (event: DragEvent<HTMLElement>) => void
  onDragOver?: (event: DragEvent<HTMLElement>) => void
  onDragLeave?: (event: DragEvent<HTMLElement>) => void
  onDrop?: (event: DragEvent<HTMLElement>) => void
  onDragEnd?: (event: DragEvent<HTMLElement>) => void
}): ReactElement => {
  const [titleHtml, setTitleHtml] = React.useState('')
  React.useEffect(() => {
    let active = true
    setTitleHtml('')
    void renderInlineMarkdown(todo.title).then((html) => { if (active) setTitleHtml(html) }).catch(() => { if (active) setTitleHtml('') })
    return () => { active = false }
  }, [todo.title])
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
  const hasMeta = !!(
    (todo.dueDate && !hideDate) ||
    todo.startTime ||
    todo.remindAt ||
    todo.location ||
    todo.group ||
    urlCount > 0 ||
    showFileCount ||
    (todo.status && todo.status !== 'open' && !statusDef(todo.status).done) ||
    todo.priority !== 'normal'
  )
  const pending = c.pendingIds.has(todo.id)
  const today = isoDay(new Date())
  const dueLabel = todo.dueDate && !hideDate
    ? formatDueLabel(
        todo.dueDate,
        today,
        {
          today: uiText('todo.due.today'),
          tomorrow: uiText('todo.due.tomorrow'),
          yesterday: uiText('todo.due.yesterday')
        },
        api.ui.language(),
        api.getState().dateFormat
      )
    : ''
  const dueDateFull = todo.dueDate ? formatDate(todo.dueDate, api.getState().dateFormat) : ''
  const overdue = !!todo.dueDate && !todo.completed && todo.dueDate.slice(0, 10) < today

  // Checkbox: click toggles completed; press-and-hold opens a status menu.
  const checkboxRef = React.useRef<HTMLInputElement>(null)
  const rowRef = React.useRef<HTMLElement>(null)
  React.useEffect(() => rowRef.current ? registerTodoRow(todo.id, rowRef.current) : undefined, [todo.id])
  const longPressTimer = React.useRef<number | null>(null)
  const longPressed = React.useRef(false)

  const clearLongPress = React.useCallback((): void => {
    if (longPressTimer.current != null) {
      window.clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }, [])
  React.useEffect(() => clearLongPress, [clearLongPress])

  const openCalendar = (): void => {
    const date = todo.dueDate?.slice(0, 10)
    if (!date) return
    const navigator = api.interop.services.providers(CALENDAR_NAVIGATOR_V1)[0]
    if (!navigator) return
    const sourceId = api.interop.services.providers(CALENDAR_ITEM_SOURCE_V1)
      .find((source) => source.owner === api.pluginId)?.providerId
    void navigator.invoke('openDate', [{
      date,
      startTime: todo.startTime,
      endTime: todo.endTime,
      sourceId,
      itemId: todo.id
    }])
  }

  const patch = (next: Partial<TodoRecord>): unknown => c.patchTodo(todo.id, next)

  const swipeActions = React.useMemo<SwipeRowActions>(
    () => ({
      reschedule: (date) => void c.patchTodo(todo.id, { dueDate: date }),
      pickDate: (anchor) => {
        const { DateField } = api.ui.settings
        void api.ui.openPopover(
          (ctx) => (
            <div className="todo-swipe-datepick">
              <DateField
                value={todo.dueDate}
                ariaLabel={uiText('todo.swipe.date')}
                onChange={(next) => {
                  void c.patchTodo(todo.id, { dueDate: next })
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
      toggleFlag: () => void c.patchTodo(todo.id, { flagged: !todo.flagged }),
      openDetails: () => c.openDetail(todo.id),
      remove: () => void confirmDeleteTodo(todo, c.removeTodo)
    }),
    // `patch` closes over the same two values the rest of this list names.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todo, c]
  )

  return (
    <SwipeRow todo={todo} disabled={pending} actions={swipeActions} onEngage={clearLongPress}>
      <article
        ref={rowRef}
        className={`todo-row${todo.dueDate ? ' todo-row-navigable' : ''}${todo.completed ? ' completed' : ''}${
          compact ? ' compact' : ''
        }${todo.flagged ? ' flagged' : ''}${depth ? ' nested' : ''}${dropTarget ? ' drop-target' : ''}`}
        data-todo-id={todo.id}
        data-depth={depth || undefined}
        style={depth ? { paddingLeft: `calc(var(--todo-indent) * ${depth})` } : undefined}
        tabIndex={0}
        onDragStart={(e) => {
          if ((e.target as Element).closest('input, button, a, textarea')) {
            e.preventDefault()
            return
          }
          onDragStart?.(e)
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        onKeyDown={(e) => {
          // Only a press on the row itself — inside the ⋯ button or the checkbox
          // the keys belong to that control.
          if (e.target !== e.currentTarget) return
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            onMoveFocus?.(e.key === 'ArrowDown' ? 1 : -1)
            return
          }
          if (e.key === 'Escape') {
            // Always an exit: ↑/↓ own the list, so Tab must never be able to
            // trap a keyboard user inside it.
            e.currentTarget.blur()
            return
          }
          if (e.key === 'Tab') {
            const move = e.shiftKey ? onOutdent : onIndent
            const allowed = e.shiftKey ? canOutdent : canIndent
            if (!move || !allowed) return // refused → Tab keeps its normal job
            e.preventDefault()
            move()
            return
          }
          if (e.key === 'Enter') {
            e.preventDefault()
            c.openDetail(todo.id)
          }
        }}
        onClick={(e) => {
          // Every interactive affordance is a button or an input; the modal is
          // rendered by the list, so it can never be a click target here.
          if ((e.target as Element).closest('input, button, a, .todo-row-actions')) return
          // The second click of a double-click is the editor's, not the
          // Calendar's — navigating twice for one gesture is noise.
          if (e.detail > 1) return
          openCalendar()
        }}
        onDoubleClick={(e) => {
          if ((e.target as Element).closest('input, button, a, .todo-row-actions')) return
          c.openDetail(todo.id)
        }}
      >
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
            disabled={pending}
            onPointerDown={() => {
              if (pending) return
              longPressed.current = false
              clearLongPress()
              longPressTimer.current = window.setTimeout(() => {
                longPressed.current = true
                const anchor = checkboxRef.current
                if (anchor) void api.ui.openMenu(statusMenuOptions().map((option) => ({
                  label: uiText(option.labelKey),
                  icon: <TodoStatusGlyph status={option.status} dotCls={option.cls} />,
                  type: 'radio' as const,
                  checked: option.status === null ? status === 'open' : option.status === status,
                  enabled: !pending,
                  onSelect: () => c.patchTodo(todo.id, patchForStatus(option.status))
                })), { anchor })
              }, 450)
            }}
            onPointerUp={clearLongPress}
            onPointerLeave={clearLongPress}
            onClick={(e) => {
              // A long-press already opened the status menu — swallow the toggle.
              if (longPressed.current) {
                e.preventDefault()
                longPressed.current = false
              }
            }}
            onChange={(e) => void c.patchTodo(todo.id, patchForStatus(e.target.checked ? 'completed' : null))}
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

        <div className="todo-row-main">
          <h4>
            {priorityDef.symbol && (
              <span className={`todo-priority-inline todo-priority-${todo.priority}`}>
                {priorityDef.symbol}{' '}
              </span>
            )}
            {titleHtml ? <span className="todo-title-md" draggable={draggable} dangerouslySetInnerHTML={{ __html: titleHtml }} /> : <span className="todo-title-md" draggable={draggable}>{todo.title}</span>}
          </h4>

          {!compact && todo.note.trim() && (
            <api.ui.MarkdownView
              className="todo-notes"
              value={todo.note}
              context={{ ref: { pluginId: 'todo', sourceId: 'tasks', itemId: todo.id }, sourcePath: todo.filePath }}
              onChange={(note) => { void c.patchTodo(todo.id, { note }) }}
            />
          )}

          {/* `!!` matters: `tags.length` is a number, and `false || 0` renders a
              literal "0" under every todo that has neither meta nor tags. */}
          {(hasMeta || (!compact && !!todo.tags?.length)) && (
            <div className="todo-view-meta">
              {todo.group && (
                <span className="todo-group-text" style={{ color: paletteCssValue(groupColorFor(todo.group, groups)) }}>
                  <span className="todo-group-dot" aria-hidden="true" />
                  {todo.group}
                </span>
              )}
              {/* An in-flight status is the row's most actionable fact, so it
                  reads as words on the meta line and not only as a glyph. */}
              {todo.status && todo.status !== 'open' && !statusDef(todo.status).done && (
                <span className={`todo-status-text ${statusDef(todo.status).cls}`}>
                  <TodoStatusGlyph status={todo.status} dotCls={statusDef(todo.status).cls} />
                  {todoStatusLabel(todo.status)}
                </span>
              )}
              {todo.priority !== 'normal' && (
                <span className={`todo-priority-text todo-priority-${todo.priority}`}>
                  <span className="todo-meta-icon"><PriorityGlyph /></span>
                  {todoPriorityMetaLabel(todo.priority)}
                </span>
              )}
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
                  <span className="todo-meta-icon"><Clock /></span>
                  {todo.startTime}{todo.endTime ? `–${todo.endTime}` : ''}
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
                  {todo.location.name}
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
              {todo.remindAt && !todo.reminderFiredAt && (
                // With the interpuncts gone, a lone bell sitting in front of the
                // first tag reads as that tag's glyph. Its time is what makes it
                // an item of its own — and it is the more useful half anyway.
                <span className="todo-meta-glyph" title={uiText('todo.reminderSet')}>
                  <Bell />
                  {todo.remindAt.slice(11, 16)}
                </span>
              )}
              {!compact && todo.tags?.map((tag) => (
                <span key={tag} className="todo-tag-text">#{tag}</span>
              ))}
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
            openId={c.menuId}
            setOpenId={c.setMenuId}
            onEdit={() => c.openDetail(todo.id)}
            onPatch={patch}
            onRequestDelete={() => confirmDeleteTodo(todo, c.removeTodo)}
            disabled={pending}
            canIndent={canIndent}
            canOutdent={canOutdent}
            onIndent={onIndent}
            onOutdent={onOutdent}
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
}
