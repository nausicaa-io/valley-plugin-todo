import { React, api } from '../../runtime'
import { groupMenuItems } from '../TodoMenu'
import type { CSSProperties, ReactElement } from 'react'
import type { TodoPriority, TodoRecord, TodoStatus } from '../../types'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { allGroups, groupColorFor, type TodoGroup } from '../../model/groups'
import { Flag, MapPin, TodoStatusGlyph } from '../icons'
import { InlineCalendar } from '../DatePanel'
import { patchForStatus, statusMenuOptions } from '../../state/statusStore'
import { parseQuickAdd } from '../../model/sections'
import { formatDueLabel, isoDay } from '../../model/sort'
import type { TodoListController } from '../../state/controller'
import { todoPriorityLabel, uiText } from '../../localization'
import { PRIORITY_ORDER, TableColumn, TodoColumn } from './columns'
import { LocationEditor, NotesEditor, PriorityIcon, TagsEditor, notePreview } from './cells'

/** One task per pasted line, with list markers and checkboxes stripped. */
export function pastedTaskLines(text: string): string[] {
  return text.split(/\r?\n/)
    .map((line) => line.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/, '').replace(/^\[[ xX]?\]\s*/, '').trim())
    .filter(Boolean)
}

interface NewRowFields { dueDate?: string; priority?: TodoPriority; group?: string; flagged?: boolean; note?: string; location?: TodoRecord['location']; tags?: string[]; status?: TodoStatus | null }

/** One new row at the top of the table: a draft task until Enter adds it. */
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
  const [newRowActive, setNewRowActive] = React.useState(true)
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
  const addTasks = async (lines: string[]): Promise<void> => {
    const today = isoDay(new Date())
    for (const line of lines) {
      const parsed = parseQuickAdd(line, today)
      if (!parsed.title) continue
      const dueDate = parsed.dueDate || draftFields.dueDate
      await c.create(parsed.title, undefined, {
        patch: {
          ...newTaskPatch?.(),
          priority: parsed.priority !== 'normal' ? parsed.priority : draftFields.priority ?? parsed.priority,
          ...(dueDate ? { dueDate } : {}),
          ...(draftFields.group ? { group: draftFields.group } : {}),
          ...(draftFields.flagged ? { flagged: true } : {}),
          ...(draftFields.note?.trim() ? { note: draftFields.note } : {}),
          ...(draftFields.location ? { location: draftFields.location } : {}),
          ...(draftFields.tags?.length ? { tags: draftFields.tags } : {}),
          ...(draftFields.status ? patchForStatus(draftFields.status) : {})
        }
      })
    }
    setDraft('')
    draftRef.current?.focus()
  }
  const closeComposer = onRemove
  // A row without a title is not a task yet: it goes away when you leave it.
  const newRowPristine = !draft.trim()
  // The row closes when focus moves elsewhere in the table while its title is empty.
  const onNewRowBlur = (): void => {
    window.setTimeout(() => {
      // Focus outside this document is a host widget (the date panel, a menu): keep the row.
      // The table draws in its own surface document, not the plugin's controller document.
      const doc = newRowRef.current?.ownerDocument
      if (newRowMenu.current || !doc || !doc.hasFocus() || newRowRef.current?.contains(doc.activeElement)) return
      if (newRowPristine) closeComposer()
      else setNewRowActive(false)
    }, 0)
  }
  // Any click outside the row (and outside its own menus, which draw in the host) turns it plain.
  React.useEffect(() => {
    const onDown = (event: PointerEvent): void => {
      if (newRowMenu.current || newRowRef.current?.contains(event.target as Node)) return
      if (newRowPristine) closeComposer()
      else setNewRowActive(false)
    }
    const doc = newRowRef.current?.ownerDocument
    doc?.addEventListener('pointerdown', onDown, true)
    return () => doc?.removeEventListener('pointerdown', onDown, true)
  })
  const wasActive = React.useRef(active)
  React.useEffect(() => {
    if (wasActive.current && !active) {
      if (newRowPristine) closeComposer()
      else setNewRowActive(false)
    }
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
              onClick={(event) => newRowOpen(api.ui.openPopover(({ close }) => (
                <div className="todo-cell-editor">
                  <InlineCalendar value={due ?? ''} onChange={(value) => { setDraftFields((fields) => ({ ...fields, dueDate: value || undefined })); close() }} />
                </div>
              ), { anchor: event.currentTarget, align: 'start', gap: 4 }, { className: 'todo-cell-popover', ariaLabel: uiText('todo.field.dueDate'), width: 260 }))}
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
                <span className="todo-table-group-pill" title={draftFields.group} style={{ '--todo-group-color': paletteCssValue(groupColorFor(draftFields.group, groups)) } as CSSProperties}>
                  <span className="todo-group-dot" aria-hidden="true" />
                  <span className="todo-table-group-name">{draftFields.group}</span>
                </span>
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
              <tr className={'todo-table-new-row' + (newRowActive && active ? '' : ' is-idle')} ref={newRowRef} onBlur={onNewRowBlur} onFocus={() => { setNewRowActive(true); onActivate() }}>
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
