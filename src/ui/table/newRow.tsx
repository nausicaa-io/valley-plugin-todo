import { React, api } from '../../runtime'
import { groupMenuItems } from '../TodoMenu'
import type { ReactElement } from 'react'
import type { TodoPriority, TodoRecord, TodoStatus } from '../../types'
import { allGroups, groupColorFor, type TodoGroup } from '../../model/groups'
import { Flag, MapPin, TodoStatusGlyph } from '../icons'
import { patchForStatus, statusMenuOptions } from '../../state/statusStore'
import { parseQuickAdd } from '../../model/sections'
import { formatDueLabel, isoDay } from '../../model/sort'
import type { TodoListController } from '../../state/controller'
import { todoPriorityLabel, uiText } from '../../localization'
import { PRIORITY_ORDER, TableColumn, TodoColumn } from './columns'
import { GroupPill, LocationEditor, NotesEditor, PriorityIcon, TagsEditor, notePreview } from './cells'

/** One task per pasted line, with list markers and checkboxes stripped. */
function pastedTaskLines(text: string): string[] {
  return text.split(/\r?\n/)
    .map((line) => line.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/, '').replace(/^\[[ xX]?\]\s*/, '').trim())
    .filter(Boolean)
}

interface NewRowFields { dueDate?: string; priority?: TodoPriority; group?: string; flagged?: boolean; note?: string; location?: TodoRecord['location']; tags?: string[]; status?: TodoStatus | null }

/** One new row at the top of the table: a draft until Enter adds it or leaving the row saves it. */
export function NewTaskRow({ order, groups, c, newTaskPatch, active, onActivate, onRemove }: {
  order: TableColumn[]
  groups: TodoGroup[]
  c: TodoListController
  newTaskPatch?: () => Partial<TodoRecord>
  /** The one row that may be highlighted. */
  active: boolean
  onActivate: () => void
  onRemove: () => void
}): ReactElement {
  const [draft, setDraft] = React.useState('')
  const [draftFields, setDraftFields] = React.useState<NewRowFields>({})
  const draftRef = React.useRef<HTMLInputElement>(null)
  const newRowRef = React.useRef<HTMLTableRowElement>(null)
  const newRowMenu = React.useRef(false)
  // A new row takes the keyboard at once: the frame first (the + sits in the host header), then the title.
  React.useEffect(() => {
    const focus = (): void => {
      const input = draftRef.current
      if (!input) return
      if (!input.ownerDocument.hasFocus() && !/jsdom/i.test(navigator.userAgent)) input.ownerDocument.defaultView?.focus()
      input.focus()
    }
    focus()
    const timer = window.setTimeout(focus, 60)
    return () => window.clearTimeout(timer)
  }, [])
  // What the row holds right now, for the saves that run outside a render (leaving the row, closing the tab).
  const latest = React.useRef({ draft, draftFields, create: c.create, newTaskPatch })
  latest.current = { draft, draftFields, create: c.create, newTaskPatch }
  /** Enter is saving the row: its title field is disabled meanwhile, which must not count as leaving it. */
  const adding = React.useRef(false)
  /** The row was saved or discarded; nothing may save it a second time. */
  const gone = React.useRef(false)
  const createTasks = async (lines: string[], background: boolean): Promise<void> => {
    const { draftFields: fields, create, newTaskPatch: viewPatch } = latest.current
    const today = isoDay(new Date())
    for (const line of lines) {
      const parsed = parseQuickAdd(line, today)
      if (!parsed.title) continue
      const dueDate = parsed.dueDate || fields.dueDate
      await create(parsed.title, undefined, {
        background,
        patch: {
          ...viewPatch?.(),
          priority: parsed.priority !== 'normal' ? parsed.priority : fields.priority ?? parsed.priority,
          ...(dueDate ? { dueDate } : {}),
          ...(fields.group ? { group: fields.group } : {}),
          ...(fields.flagged ? { flagged: true } : {}),
          ...(fields.note?.trim() ? { note: fields.note } : {}),
          ...(fields.location ? { location: fields.location } : {}),
          ...(fields.tags?.length ? { tags: fields.tags } : {}),
          ...(fields.status ? patchForStatus(fields.status) : {})
        }
      })
    }
  }
  /** Enter and pasted lines: add the tasks and keep the row for the next one. */
  const addTasks = async (lines: string[]): Promise<void> => {
    adding.current = true
    try { await createTasks(lines, false) } finally { adding.current = false }
    setDraft('')
    draftRef.current?.focus()
  }
  /** Escape, or Enter on an empty title: the row goes away unsaved. */
  const closeComposer = (): void => {
    gone.current = true
    onRemove()
  }
  /**
   * Leaving the row saves it: a row with a title becomes a task with every field
   * it was given, without Enter. A row without a title was never a task.
   */
  const leaveRow = (): void => {
    if (gone.current || adding.current) return
    gone.current = true
    const title = latest.current.draft
    if (title.trim()) void createTasks([title], true)
    onRemove()
  }
  // A row with a title is also saved when its table goes away (the tab closes or shows another list).
  React.useEffect(() => () => {
    if (gone.current || adding.current || !latest.current.draft.trim()) return
    gone.current = true
    void createTasks([latest.current.draft], true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const onNewRowBlur = (): void => {
    window.setTimeout(() => {
      // Focus outside this document is a host widget (the date panel, a menu): keep the row.
      // The table draws in its own surface document, not the plugin's controller document.
      const doc = newRowRef.current?.ownerDocument
      if (newRowMenu.current || !doc || !doc.hasFocus() || newRowRef.current?.contains(doc.activeElement)) return
      leaveRow()
    }, 0)
  }
  // Any click outside the row (and outside its own menus, which draw in the host) leaves it.
  React.useEffect(() => {
    const onDown = (event: PointerEvent): void => {
      if (newRowMenu.current || newRowRef.current?.contains(event.target as Node)) return
      leaveRow()
    }
    const doc = newRowRef.current?.ownerDocument
    doc?.addEventListener('pointerdown', onDown, true)
    return () => doc?.removeEventListener('pointerdown', onDown, true)
  })
  const wasActive = React.useRef(active)
  React.useEffect(() => {
    if (wasActive.current && !active) leaveRow()
    wasActive.current = active
  })
  const newRowOpen = (open: Promise<unknown>): void => {
    newRowMenu.current = true
    void open.catch(() => {}).finally(() => {
      newRowMenu.current = false
      draftRef.current?.focus()
    })
  }
  const newRowCell = (id: TodoColumn): ReactElement => {
    switch (id) {
      case 'due': {
        const due = draftFields.dueDate
        const label = due
          ? formatDueLabel(due, isoDay(new Date()), { today: uiText('todo.due.today'), tomorrow: uiText('todo.due.tomorrow'), yesterday: uiText('todo.due.yesterday') }, api.ui.language(), api.getState().dateFormat)
          : ''
        return (
          <td key={id} className="todo-table-due">
            <button
              type="button"
              className="todo-table-cell-btn todo-table-due-text"
              disabled={c.creating}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.due') })}
              onClick={(event) => newRowOpen(api.ui.pickDateTime({ mode: 'date', value: due ?? '', ariaLabel: uiText('todo.field.dueDate') }, { anchor: event.currentTarget, align: 'start', gap: 4 }).then((value) => {
                if (value !== null) setDraftFields((fields) => ({ ...fields, dueDate: value || undefined }))
              }))}
            >
              {label ? <span>{label}</span> : <span className="todo-table-new-hint">{uiText('todo.table.due')}</span>}
            </button>
          </td>
        )
      }
      case 'priority': {
        const priority = draftFields.priority ?? 'normal'
        return (
          <td key={id} className="todo-table-priority">
            <button
              type="button"
              className={`todo-table-cell-btn${priority === 'normal' ? ' muted' : ''}`}
              disabled={c.creating}
              title={uiText('todo.table.priority')}
              onClick={(event) => newRowOpen(api.ui.openMenu(PRIORITY_ORDER.map((value) => ({
                label: todoPriorityLabel(value),
                icon: <PriorityIcon priority={value} />,
                type: 'radio' as const,
                checked: priority === value,
                onSelect: () => setDraftFields((fields) => ({ ...fields, priority: value }))
              })), { anchor: event.currentTarget }))}
            >
              <PriorityIcon priority={priority} />
              <span>{todoPriorityLabel(priority)}</span>
            </button>
          </td>
        )
      }
      case 'group':
        return (
          <td key={id} className="todo-table-group">
            <button
              type="button"
              className="todo-table-edit-btn"
              disabled={c.creating}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.group') })}
              onClick={(event) => newRowOpen(api.ui.openMenu([
                { label: uiText('todo.chip.noGroup'), type: 'radio' as const, checked: !draftFields.group, onSelect: () => setDraftFields((fields) => ({ ...fields, group: undefined })) },
                ...groupMenuItems(allGroups(groups), groups, (name) => ({
                  label: name,
                  type: 'radio' as const,
                  checked: draftFields.group === name,
                  color: groupColorFor(name, groups),
                  onSelect: () => setDraftFields((fields) => ({ ...fields, group: name }))
                }))
              ], { anchor: event.currentTarget, align: 'start' }))}
            >
              {draftFields.group ? (
                <GroupPill name={draftFields.group} groups={groups} />
              ) : <span className="todo-table-new-hint">{uiText('todo.table.group')}</span>}
            </button>
          </td>
        )
      case 'flagged':
        return (
          <td key={id} className="todo-table-flagged">
            <button
              type="button"
              className={`todo-table-flag-btn${draftFields.flagged ? ' on' : ''}`}
              aria-pressed={!!draftFields.flagged}
              disabled={c.creating}
              aria-label={uiText('todo.flag')}
              onClick={() => setDraftFields((fields) => ({ ...fields, flagged: !fields.flagged || undefined }))}
            >
              <Flag />
            </button>
          </td>
        )
      case 'note':
        return (
          <td key={id} className="todo-table-note" title={draftFields.note || undefined}>
            <button
              type="button"
              className="todo-table-edit-btn"
              disabled={c.creating}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.note') })}
              onClick={(event) => {
                let value = draftFields.note ?? ''
                const save = (): void => setDraftFields((fields) => ({ ...fields, note: value || undefined }))
                newRowOpen(api.ui.openPopover(
                  ({ close }) => <NotesEditor initial={draftFields.note ?? ''} onInput={(next) => { value = next }} onDone={() => { save(); close() }} />,
                  { anchor: event.currentTarget, align: 'start', gap: 4 },
                  { className: 'todo-cell-popover', ariaLabel: uiText('todo.edit.notes'), width: 360, beforeDismiss: () => { save(); return true } }
                ))
              }}
            >
              {draftFields.note ? <span className="todo-table-note-text">{notePreview(draftFields.note)}</span> : <span className="todo-table-new-hint">{uiText('todo.table.note')}</span>}
            </button>
          </td>
        )
      case 'location':
        return (
          <td key={id} className="todo-table-location">
            <button
              type="button"
              className="todo-table-cell-btn todo-table-edit-btn"
              disabled={c.creating}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.location') })}
              onClick={(event) => newRowOpen(api.ui.openPopover(
                () => <LocationEditor todo={{ location: draftFields.location } as TodoRecord} onPatch={(next) => setDraftFields((fields) => ({ ...fields, location: next.location }))} />,
                { anchor: event.currentTarget, align: 'start', gap: 4 },
                { className: 'todo-cell-popover', ariaLabel: uiText('todo.field.location'), width: 300 }
              ))}
            >
              {draftFields.location ? <><MapPin /><span>{draftFields.location.name}</span></> : <span className="todo-table-new-hint">{uiText('todo.field.location')}</span>}
            </button>
          </td>
        )
      case 'tags':
        return (
          <td key={id} className="todo-table-tags">
            <button
              type="button"
              className="todo-table-edit-btn"
              disabled={c.creating}
              aria-label={uiText('todo.table.editCell', { p0: uiText('todo.table.tags') })}
              onClick={(event) => newRowOpen(api.ui.openPopover(
                () => <TagsEditor todo={{ tags: draftFields.tags ?? [] } as unknown as TodoRecord} onPatch={(next) => setDraftFields((fields) => ({ ...fields, tags: next.tags }))} />,
                { anchor: event.currentTarget, align: 'start', gap: 4 },
                { className: 'todo-cell-popover', ariaLabel: uiText('todo.edit.tags'), width: 280 }
              ))}
            >
              {draftFields.tags?.length ? draftFields.tags.map((tag) => <span key={tag} className="todo-table-tag">#{tag}</span>) : <span className="todo-table-new-hint">{uiText('todo.table.tags')}</span>}
            </button>
          </td>
        )
      default:
        return <td key={id} className={`todo-table-${id}`} />
    }
  }
  const newRowStatus = draftFields.status ? statusMenuOptions().find((option) => option.status === draftFields.status) : undefined
  const pickNewRowStatus = (anchor: HTMLElement): void => newRowOpen(api.ui.openMenu(statusMenuOptions().map((option) => ({
    label: option.label,
    icon: <TodoStatusGlyph status={option.status} dotCls={option.cls} color={option.color} />,
    type: 'radio' as const,
    checked: option.status === null ? !draftFields.status : option.status === draftFields.status,
    onSelect: () => setDraftFields((fields) => ({ ...fields, status: option.status }))
  })), { anchor }))
  return (
              <tr className="todo-table-new-row" ref={newRowRef} onBlur={onNewRowBlur} onFocus={onActivate}>
                <td className="todo-table-select">
                  <button type="button" className="todo-table-new-status" disabled={c.creating} aria-label={uiText('todo.table.status')} title={newRowStatus?.label ?? uiText('todo.table.status')} onClick={(event) => pickNewRowStatus(event.currentTarget)}>
                    {newRowStatus ? <TodoStatusGlyph status={newRowStatus.status} dotCls={newRowStatus.cls} /> : <span className="todo-table-new-circle" aria-hidden="true" />}
                  </button>
                </td>
                {order.map((id) => id === 'title' ? (
                  <td key={id} className="todo-table-title">
                    <input
                      ref={draftRef}
                      className="todo-table-new-input"
                      value={draft}
                      disabled={c.creating}
                      placeholder={uiText('todo.table.newRow')}
                      aria-label={uiText('auto.184c39d1837f')}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.nativeEvent.isComposing) return
                        if (event.key === 'Enter') {
                          event.preventDefault()
                          if (draft.trim()) void addTasks([draft])
                          else closeComposer()
                        } else if (event.key === 'Escape') {
                          event.preventDefault()
                          closeComposer()
                        }
                      }}
                      onPaste={(event) => {
                        const text = event.clipboardData.getData('text/plain')
                        if (!/\r?\n/.test(text.trim())) return
                        // Several lines become several tasks at once.
                        event.preventDefault()
                        void addTasks(pastedTaskLines(`${draft}${text}`))
                      }}
                    />
                  </td>
                ) : newRowCell(id))}
                <td className="todo-table-actions" />
              </tr>
  )
}
