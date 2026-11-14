import { React, api, useTodoRevealRequest, revealRequestStore } from '../runtime'
import type { CSSProperties, ReactElement, DragEvent } from 'react'
import type { TodoPriority, TodoRecord, TodoStatus } from '../types'
import { paletteCssContrast, paletteCssValue } from '@valley/plugin-sdk/palette'
import { useActiveCalendarSelection, useHostState } from '../state/hooks'
import { todoSearchMatcher } from '../model/search'
import {
  CalendarClock,
  CalendarDays,
  MapPin,
  Paperclip,
  CalendarToday,
  CalendarWeek,
  CircleCheck,
  ComfortableView,
  CompactView,
  CreatedSortGlyph,
  Flag,
  Inbox,
  ListFilter,
  NameSortGlyph,
  Plus,
  PriorityGlyph,
  Search,
  SortAscending,
  SortDescending,
  UpdatedSortGlyph,
  X,
  ChevronDown,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown
} from './icons'
import { useTodoListController } from '../state/controller'
import { TodoDetailModal } from './TodoDetail'
import { LocationField } from './LocationField'
import { parseQuickAdd } from '../model/sections'
import { PanelDateList } from './PanelDateList'
import { groupDropPlacement, moveGroup, useCollapsedGroups, useGroups } from '../state/groupStore'
import { allGroups, groupColorFor, groupKey, isSubgroupName } from '../model/groups'
import {
  configuredSmartLists,
  countForGroup,
  groupCounts,
  matchesVisibleView,
  sameView,
  serializeView,
  smartListForeground,
  viewCounts,
  type SmartListId,
  type TodoView
} from '../model/views'
import {
  DEFAULT_VIEW,
  setShowCompleted,
  setView,
  useDateBreakdown,
  usePanelPresentation,
  useShowCompleted,
  useSmartListSettings,
  useStatusFilter,
  useTodoSearch
} from '../state/viewStore'
import { openViewTab, opensInNewTab, showView, useShownView } from '../state/tabs'
import { selectionOf, toggleName, viewOfSelection } from '../model/listSelection'
import { PRIORITIES, SORT_LABEL_KEYS, formatDate, formatDueLabel, isoDay, type SortDir, type SortField } from '../model/sort'
import { uiText } from '../localization'
import { DONE_STATUSES, isDoneStatus, matchesStatusFilter, useStatusVocabulary } from '../state/statusStore'
import { openManageGroups } from './GroupEditor'
import { StatusQuickPicks, visibleSelectedStatuses } from './StatusFilter'

export function sortFieldGlyph(field: SortField): ReactElement {
  if (field === 'flagged') return <Flag />
  if (field === 'priority') return <PriorityGlyph />
  if (field === 'due') return <CalendarClock />
  if (field === 'updated') return <UpdatedSortGlyph />
  if (field === 'created') return <CreatedSortGlyph />
  return <NameSortGlyph />
}

export function PanelSortPopover({
  sortField,
  setSortField,
  sortDir,
  setSortDir
}: {
  sortField: SortField
  setSortField: (value: SortField) => void
  sortDir: SortDir
  setSortDir: (value: SortDir) => void
}): ReactElement {
  const [selectedField, selectField] = React.useState(sortField)
  const [selectedDir, selectDir] = React.useState(sortDir)
  const sortOptions = Object.entries(SORT_LABEL_KEYS) as [SortField, string][]
  return (
    <div className="todo-filter-popover-body">
      <div className="todo-sort-heading">
        <span>{uiText('todo.filters.sort')}</span>
        <div className="todo-sort-directions">
          <button
            className={`todo-sort-direction${selectedDir === 'desc' ? ' active' : ''}`}
            type="button"
            aria-label={uiText('auto.01e635f27ec2')}
            title={uiText('auto.01e635f27ec2')}
            aria-pressed={selectedDir === 'desc'}
            onClick={() => {
              selectDir('desc')
              setSortDir('desc')
            }}
          >
            <SortDescending />
          </button>
          <button
            className={`todo-sort-direction${selectedDir === 'asc' ? ' active' : ''}`}
            type="button"
            aria-label={uiText('auto.4fee0a06b6e4')}
            title={uiText('auto.4fee0a06b6e4')}
            aria-pressed={selectedDir === 'asc'}
            onClick={() => {
              selectDir('asc')
              setSortDir('asc')
            }}
          >
            <SortAscending />
          </button>
        </div>
      </div>
      <div className="todo-sort-options">
        {sortOptions.map(([field, key]) => (
          <button
            key={field}
            type="button"
            className={`todo-sort-option${selectedField === field ? ' active' : ''}`}
            aria-pressed={selectedField === field}
            onClick={() => {
              selectField(field)
              setSortField(field)
            }}
          >
            {sortFieldGlyph(field)}
            <span>{uiText(key)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}


function PanelStatusPopover(): ReactElement {
  return (
    <div className="todo-filter-popover-body">
      <div className="todo-filter-section-label">{uiText('todo.filters.show')}</div>
      <StatusQuickPicks />
    </div>
  )
}
export function GroupFilterPopover({
  todos,
  groups,
  names,
  hasUngrouped,
  selected,
  includeUngrouped,
  onChange,
  onOpenSettings
}: {
  todos: TodoRecord[]
  groups: ReturnType<typeof useGroups>
  names: string[]
  hasUngrouped: boolean
  selected: string[]
  includeUngrouped: boolean
  onChange: (names: string[], includeUngrouped: boolean) => void
  onOpenSettings: () => void
}): ReactElement {
  const [localSelected, setLocalSelected] = React.useState(selected)
  const [localUngrouped, setLocalUngrouped] = React.useState(includeUngrouped)
  const allSelected = localSelected.length === names.length && (!hasUngrouped || localUngrouped)
  const activeRows = [
    ...names.map((name) => localSelected.some((candidate) => candidate.toLowerCase() === name.toLowerCase())),
    ...(hasUngrouped ? [localUngrouped] : [])
  ]
  const selectionRunClass = (active: boolean, index: number): string => active
    ? ` active${!activeRows[index - 1] ? ' selection-run-start' : ''}${!activeRows[index + 1] ? ' selection-run-end' : ''}`
    : ''
  const openCounts = React.useMemo(() => groupCounts(todos), [todos])
  const commit = (nextNames: string[], nextUngrouped: boolean): void => {
    setLocalSelected(nextNames)
    setLocalUngrouped(nextUngrouped)
    onChange(nextNames, nextUngrouped)
  }
  return (
    <div className="todo-group-filter-popover">
      <div className="todo-group-filter-head">
        <button type="button" className="todo-group-filter-title" onClick={onOpenSettings}>
          {uiText('todo.edit.group')}
        </button>
        <button
          type="button"
          className="todo-group-filter-all"
          onClick={() => commit(allSelected ? [] : names, allSelected ? false : hasUngrouped)}
        >
          {uiText(allSelected ? 'todo.group.deselectAll' : 'todo.group.selectAll')}
        </button>
      </div>
      <div className="todo-group-filter-list">
        {names.map((name, index) => {
          const active = activeRows[index]
          return (
            <button
              key={name}
              type="button"
              className={`todo-group-filter-row${isSubgroupName(name, groups) ? ' todo-subgroup' : ''}${selectionRunClass(active, index)}`}
              aria-pressed={active}
              onClick={() => commit(active ? localSelected.filter((candidate) => candidate.toLowerCase() !== name.toLowerCase()) : [...localSelected, name], localUngrouped)}
            >
              <span className="todo-group-filter-check" aria-hidden="true">{active ? '✓' : ''}</span>
              <span className="todo-tree-dot" style={{ background: paletteCssValue(groupColorFor(name, groups)) }} />
              <span className="todo-tree-label">{name}</span>
              <span className="todo-tree-count">{countForGroup(openCounts, name)}</span>
            </button>
          )
        })}
        {hasUngrouped && (
          <button
            type="button"
            className={`todo-group-filter-row${selectionRunClass(localUngrouped, names.length)}`}
            aria-pressed={localUngrouped}
            onClick={() => commit(localSelected, !localUngrouped)}
          >
            <span className="todo-group-filter-check" aria-hidden="true">{localUngrouped ? '✓' : ''}</span>
            <span className="todo-tree-dot no-group" />
            <span className="todo-tree-label">{uiText('todo.chip.noGroup')}</span>
            <span className="todo-tree-count">{countForGroup(openCounts, null)}</span>
          </button>
        )}
      </div>
    </div>
  )
}

/** One glyph per smart list, in `SMART_LISTS` order. */
const SMART_ICONS: Record<SmartListId, () => ReactElement> = {
  scheduled: () => <CalendarClock />,
  today: () => <CalendarToday />,
  week: () => <CalendarWeek />,
  flagged: () => <Flag />,
  all: () => <Inbox />,
  completed: () => <CircleCheck />
}

/**
 * `left_sidebar` view — the task browser, and now the app's To-Do navigation.
 *
 * The chip bar it replaces asked "which list" and "which due window" as one
 * question with one answer, and cost up to three wrapped rows of chrome above
 * the first todo at 245px. A column says the same things with room for counts:
 * five fixed smart lists, then the groups behind a disclosure — the shape
 * Contacts already uses, ported (never imported: a plugin may not reach into
 * another plugin).
 *
 * The selection lives in `viewStore`, so clicking a list here also retitles and
 * refills the main-workspace page.
 */
export const TodoPanel = (): ReactElement => {
  const { activePluginTab, dateFormat } = useHostState('activePluginTab', 'dateFormat')
  const { selectedDate, selectedDateRange } = useActiveCalendarSelection()
  const groups = useGroups()
  // While a tab pinned to one list is focused, the navigation highlights and creates into that tab's list.
  const view = useShownView()
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
  const [search, setSearch] = useTodoSearch()
  const [showCompleted] = useShowCompleted()
  const [presentation, patchPresentation] = usePanelPresentation('todo')
  const { sortField, sortDir, compact } = presentation
  const [statusFilter, setStatusFilter] = useStatusFilter()
  const statusDefs = useStatusVocabulary()
  const dateBreakdown = useDateBreakdown()
  const smartListSettings = useSmartListSettings()
  const smartLists = React.useMemo(() => configuredSmartLists(smartListSettings), [smartListSettings])
  const pageActive = activePluginTab?.pluginId === api.pluginId
  const inputRef = React.useRef<HTMLInputElement>(null)
  const noteRef = React.useRef<HTMLTextAreaElement>(null)
  const fabRef = React.useRef<HTMLButtonElement>(null)

  const c = useTodoListController(sortField, sortDir, 'left_sidebar')
  useTodoRevealRequest(c.openDetail)
  const today = isoDay(new Date())

  const counts = React.useMemo(() => viewCounts(c.todos, today), [c.todos, today])
  const openGroupCounts = React.useMemo(() => groupCounts(c.todos), [c.todos])
  const groupNames = React.useMemo(
    () => allGroups(groups),
    [groups]
  )
  const hasUngrouped = React.useMemo(() => c.todos.some((t) => !t.group), [c.todos])
  // The sidebar's Groups list: a group with subgroups folds, and rows drag to a new place.
  const [collapsedGroups, toggleCollapsedGroup, setCollapsedGroups] = useCollapsedGroups()
  const foldableGroups = React.useMemo(() => groups.filter((group) => groups.some((candidate) => candidate.parent === group.id)).map((group) => group.id), [groups])
  const allGroupsFolded = foldableGroups.length > 0 && foldableGroups.every((id) => collapsedGroups.has(id))
  const draggedGroup = React.useRef<{ id: string; x: number } | null>(null)
  // The last place the insertion line showed: a drop in the gap between two rows or on the title lands there.
  const pendingGroupDrop = React.useRef<Parameters<typeof moveGroup>[1] | null>(null)
  const [groupDrop, setGroupDrop] = React.useState<{ id: string; position: 'before' | 'after'; nested: boolean } | null>(null)

  const visibleTodos = React.useMemo(() => {
    let list = c.ordered.filter((todo) => matchesVisibleView(todo, view, showCompleted, today))
    if (statusFilter !== 'all') list = list.filter((todo) => matchesStatusFilter(todo, statusFilter))
    if (search.trim()) {
      list = list.filter(todoSearchMatcher(search))
    }
    // Calendar range filter: keep todos whose due date falls within the selection.
    if (selectedDateRange) {
      list = list.filter((todo) => {
        const d = todo.dueDate?.slice(0, 10)
        return !!d && d >= selectedDateRange.start && d <= selectedDateRange.end
      })
    } else if (selectedDate) {
      list = list.filter((todo) => todo.dueDate?.slice(0, 10) === selectedDate)
    }
    return list
  }, [c.ordered, view, showCompleted, statusFilter, search, selectedDate, selectedDateRange, today])

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

  /**
   * What is left in the funnel once the smart lists own the filtering: how the
   * list *looks* (compact), how it is ordered, and the group machinery. The due
   * windows moved into Scheduled/Today, and "hide completed" is now the
   * Completed list's absence. Groups land here because ＋ is now unambiguously
   * "new todo" — one button, one meaning.
   */
  // The sidebar's one filter is All · Completed · To do (14 Nov); groups are chosen in the Groups list, not here.
  const shownStatuses = visibleSelectedStatuses(statusFilter, statusDefs.map((status) => status.id), showCompleted)
  const openStatuses = statusDefs.map((status) => status.id).filter((status) => !isDoneStatus(status))
  const onlyTodo = shownStatuses.length === openStatuses.length && openStatuses.every((status) => shownStatuses.includes(status))
  const openStatusMenu = (anchor: HTMLElement): void => {
    void api.ui.openPopover(
      () => (
        <div className="todo-filter-popover-stack">
          <PanelStatusPopover />
        </div>
      ),
      { anchor, align: 'end' },
      { className: 'todo-filter-popover', ariaLabel: uiText('todo.filters.title'), width: 248 }
    )
  }

  const openSortMenu = (anchor: HTMLElement): void => {
    void api.ui.openPopover(
      () => (
        <PanelSortPopover
          sortField={sortField}
          setSortField={(value) => patchPresentation({ sortField: value })}
          sortDir={sortDir}
          setSortDir={(value) => patchPresentation({ sortDir: value })}
        />
      ),
      { anchor, align: 'end' },
      { className: 'todo-sort-popover', ariaLabel: uiText('auto.63e08dc2a4e3') }
    )
  }

  const clearCalendarFilter = (): void => {
    api.workspace.patchTimeControl({ selectedDate: null, rangeStart: null, rangeEnd: null })
  }

  // Shift-click adds or removes exactly the clicked list; a plain click selects it alone.
  const pickList = (name: string, event: { shiftKey: boolean }): void => {
    if (event.shiftKey) {
      const current = selectionOf(view)
      showView(viewOfSelection({ ...current, names: toggleName(current.names, name) }))
    } else showView({ kind: 'groups', names: [name] })
  }

  const treeRow = (
    label: string,
    target: TodoView,
    count: number,
    icon?: ReactElement,
    dot?: string,
    variant?: 'smart',
    /** Stored colour (`palette:<id>` or a hex) that tints the chip. */
    chip?: string,
    /** The glyph and label colour on the tinted chip; defaults to the palette's contrast. */
    chipOn?: string,
    /** A subgroup: the row sits indented under its group. */
    sub?: boolean
  ): ReactElement => {
    const current = sameView(view, target)
    const active = target.kind === 'groups' && target.names.length === 1 && !target.includeUngrouped && view.kind === 'groups'
      ? view.names.some((name) => groupKey(name) === groupKey(target.names[0]))
      : current
    return (
      <button
        key={serializeView(target)}
        type="button"
        className={`todo-tree-row${dot ? ' nested' : ''}${sub ? ' todo-subgroup' : ''}${variant ? ` todo-${variant}-chip` : ''}${active ? ' active' : ''}`}
        aria-current={current ? 'true' : undefined}
        aria-label={variant ? `${label} ${count}` : undefined}
        title={variant ? label : undefined}
        aria-pressed={target.kind === 'groups' ? active : undefined}
        // A `var(--color-…)`, never a resolved hex: an inline style outranks
        // every stylesheet, so resolving here would put the colour out of reach
        // of the user's own `.valley/design/*.css`.
        style={
          chip
            ? ({
                '--todo-chip-color': paletteCssValue(chip),
                '--todo-chip-on': chipOn ?? paletteCssContrast(chip)
              } as CSSProperties)
            : undefined
        }
        onClick={(event) => {
          if (opensInNewTab(event) || target.kind !== 'groups' || target.names.length !== 1) showView(target, opensInNewTab(event))
          else pickList(target.names[0], event)
        }}
        onAuxClick={(event) => {
          if (event.button !== 1) return
          event.preventDefault()
          showView(target, true)
        }}
      >
        {icon && <span className="todo-tree-icon">{icon}</span>}
        {dot && <span className="todo-tree-dot" style={{ background: paletteCssValue(dot) }} aria-hidden="true" />}
        <span className="todo-tree-label">{label}</span>
        <span className="todo-tree-count">{count}</span>
      </button>
    )
  }

  const filtered = !!(search || selectedDate || selectedDateRange || statusFilter !== 'all')
  const emptyLabel = filtered ? uiText('auto.006b85a57ddf') : uiText('auto.cec28cbe4204')
  const calendarSelectionLabel = selectedDateRange
    ? `${formatDate(selectedDateRange.start, dateFormat)} – ${formatDate(selectedDateRange.end, dateFormat)}`
    : selectedDate
      ? formatDate(selectedDate, dateFormat)
      : null
  const statusSelectionLabel = statusFilter === 'all'
    ? null
    : `${uiText('auto.bae7d5be7082')}: ${statusFilter.length === 1
      ? (statusDefs.find((status) => status.id === statusFilter[0])?.label ?? uiText('todo.chip.all'))
      : uiText('todo.filters.statusCount', { count: statusFilter.length })}`

  const fabLabel = uiText('todo.fab.newTodo')

  return (
    <div className="todo-panel">
      <header className="panel-header">
        <span className="panel-title">{uiText('auto.fdebf6672120')}</span>
        <div className="todo-header-actions">
          {!pageActive && (
            <>
              <button
                className={`todo-menu-btn todo-status-menu-btn${onlyTodo ? '' : ' active'}`}
                aria-label={uiText('todo.filters.title')}
                title={uiText('todo.filters.title')}
                type="button"
                onClick={(e) => openStatusMenu(e.currentTarget)}
              >
                <ListFilter />
              </button>
              <button
                className="todo-menu-btn todo-density-menu-btn"
                aria-label={uiText('auto.e3719eae891e')}
                aria-pressed={compact}
                title={compact ? uiText('auto.e3719eae891e') : uiText('auto.d2f76731e1e1')}
                type="button"
                onClick={() => patchPresentation({ compact: !compact })}
              >
                {compact ? <CompactView /> : <ComfortableView />}
              </button>
              <button
                className="todo-menu-btn todo-sort-menu-btn"
                aria-label={uiText('auto.63e08dc2a4e3')}
                title={`${sortDir === 'asc' ? uiText('auto.4fee0a06b6e4') : uiText('auto.01e635f27ec2')} · ${uiText(SORT_LABEL_KEYS[sortField])}`}
                type="button"
                onClick={(e) => openSortMenu(e.currentTarget)}
              >
                {sortDir === 'asc' ? <SortAscending /> : <SortDescending />}
                {sortFieldGlyph(sortField)}
              </button>
            </>
          )}
          <button
            className="plugin-open-page"
            type="button"
            aria-label={uiText('auto.25097a85052b')}
            title={uiText('auto.25097a85052b')}
            // ⌘-click (or middle click) opens the shown list in a new tab of its own.
            onClick={(event) => (opensInNewTab(event) ? openViewTab(view, true) : api.workspace.openMainTab())}
            onAuxClick={(event) => { if (event.button === 1) { event.preventDefault(); openViewTab(view, true) } }}
          />
        </div>
      </header>

      {/* The search field is permanent now: the tree replaced the chip bar that
          used to be worth the row it occupied, and a hidden field made search a
          two-click operation in the surface people search from most. */}
      <div className="search-field-row">
        <div className="todo-tree-search search-field">
          <Search className="search-field-icon" />
          <input
            className="search-field-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSearch('')
            }}
            placeholder={uiText('auto.7be377261c61')}
            aria-label={uiText('auto.e0345e9d3092')}
          />
          {search && (
            <button
              className="search-field-action"
              onClick={() => setSearch('')}
              aria-label={uiText('auto.67300d0fed7c')}
              type="button"
            >
              <X />
            </button>
          )}
        </div>
      </div>

      {pageActive ? (
        <div className="todo-tree todo-active-navigation">
          {compose}
          <nav className="todo-smart-grid" aria-label={uiText('auto.fdebf6672120')}>
            {smartLists.map((list) => treeRow(
              uiText(list.labelKey),
              { kind: 'smart', id: list.id },
              counts[list.id],
              SMART_ICONS[list.id](),
              undefined,
              'smart',
              list.color,
              smartListForeground(list, paletteCssContrast)
            ))}
          </nav>
          <div
            className="todo-navigation-groups"
            onDragOver={(event) => { if (draggedGroup.current && pendingGroupDrop.current) event.preventDefault() }}
            onDrop={(event) => {
              const dragged = draggedGroup.current
              const placement = pendingGroupDrop.current
              draggedGroup.current = null
              pendingGroupDrop.current = null
              setGroupDrop(null)
              if (!dragged || !placement) return
              event.preventDefault()
              void moveGroup(dragged.id, placement).catch(() => {})
            }}
          >
            <div className="todo-navigation-groups-head">
              <span className="todo-navigation-groups-title">{uiText('todo.view.myLists')}</span>
              {foldableGroups.length > 0 && (
                <button
                  type="button"
                  className="panel-tool-btn todo-groups-fold-all"
                  aria-label={uiText(allGroupsFolded ? 'todo.view.expandAllGroups' : 'todo.view.collapseAllGroups')}
                  title={uiText(allGroupsFolded ? 'todo.view.expandAllGroups' : 'todo.view.collapseAllGroups')}
                  onClick={() => setCollapsedGroups(allGroupsFolded ? [] : foldableGroups)}
                >
                  {allGroupsFolded ? <ChevronsUpDown /> : <ChevronsDownUp />}
                </button>
              )}
            </div>
            {groups.filter((group) => !(group.parent && collapsedGroups.has(group.parent))).map((group, _index, shown) => {
              const folds = groups.some((candidate) => candidate.parent === group.id)
              const collapsed = folds && collapsedGroups.has(group.id)
              // The slot is the upper or lower half of the row; dragging sideways by more than 20px picks the level.
              const placementAt = (event: DragEvent<HTMLElement>, dragged: { id: string; x: number }): ReturnType<typeof groupDropPlacement> => {
                const rect = event.currentTarget.getBoundingClientRect()
                const travel = (Number.isFinite(event.clientX) ? event.clientX : dragged.x) - dragged.x
                return groupDropPlacement(dragged.id, group.id, event.clientY < rect.top + rect.height / 2 ? 'before' : 'after', travel > 20 ? 1 : travel < -20 ? -1 : 0, collapsed)
              }
              // The insertion line sits where the group will land: before a row, or after the last row of its level.
              const lineFor = (placement: NonNullable<ReturnType<typeof groupDropPlacement>>, dragId: string): { id: string; position: 'before' | 'after'; nested: boolean } | null => {
                const rows = shown.filter((row) => row.id !== dragId && row.parent !== dragId)
                const parentShown = placement.parent !== null && !collapsedGroups.has(placement.parent)
                if (placement.before !== null && rows.some((row) => row.id === placement.before)) return { id: placement.before, position: 'before', nested: parentShown }
                const last = placement.parent === null ? rows.at(-1) : rows.filter((row) => row.id === placement.parent || row.parent === placement.parent).at(-1)
                return last ? { id: last.id, position: 'after', nested: parentShown } : null
              }
              return (
                <div
                  key={group.id}
                  className={`todo-group-nav-row${groupDrop?.id === group.id ? ` drop-${groupDrop.position}${groupDrop.nested ? ' drop-nested' : ''}` : ''}`}
                  draggable
                  onDragStart={(event) => {
                    draggedGroup.current = { id: group.id, x: Number.isFinite(event.clientX) ? event.clientX : 0 }
                    event.dataTransfer.effectAllowed = 'move'
                    event.dataTransfer.setData('text/plain', group.id)
                  }}
                  onDragOver={(event) => {
                    const dragged = draggedGroup.current
                    if (!dragged) return
                    const placement = placementAt(event, dragged)
                    const line = placement ? lineFor(placement, dragged.id) : null
                    pendingGroupDrop.current = line ? placement : null
                    if (!line) { if (groupDrop) setGroupDrop(null); return }
                    event.preventDefault()
                    event.dataTransfer.dropEffect = 'move'
                    if (groupDrop?.id !== line.id || groupDrop.position !== line.position || groupDrop.nested !== line.nested) setGroupDrop(line)
                  }}
                  onDrop={(event) => {
                    const dragged = draggedGroup.current
                    const placement = dragged ? placementAt(event, dragged) : null
                    draggedGroup.current = null
                    pendingGroupDrop.current = null
                    setGroupDrop(null)
                    event.stopPropagation()
                    if (!dragged || !placement) return
                    event.preventDefault()
                    void moveGroup(dragged.id, placement).catch(() => {})
                  }}
                  onDragEnd={() => { draggedGroup.current = null; pendingGroupDrop.current = null; setGroupDrop(null) }}
                >
                  {folds && (
                    <button
                      type="button"
                      className="todo-group-toggle"
                      aria-expanded={!collapsed}
                      aria-label={uiText(collapsed ? 'todo.view.expandGroup' : 'todo.view.collapseGroup', { p0: group.name })}
                      onClick={() => toggleCollapsedGroup(group.id)}
                    >
                      {collapsed ? <ChevronRight /> : <ChevronDown />}
                    </button>
                  )}
                  {treeRow(
                    group.name,
                    { kind: 'groups', names: [group.name] },
                    countForGroup(openGroupCounts, group.name),
                    undefined,
                    groupColorFor(group.name, groups),
                    undefined,
                    undefined,
                    undefined,
                    group.parent !== undefined
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <>
          {!search && (
            <div className="todo-tree">
              <nav className="todo-smart-strip" aria-label={uiText('auto.fdebf6672120')}>
                {calendarSelectionLabel ? (
                  <button
                    type="button"
                    className="todo-tree-row todo-smart-chip todo-calendar-selection-chip active"
                    title={uiText('auto.f93fb4b1ab19')}
                    onClick={clearCalendarFilter}
                  >
                    <span className="todo-tree-icon"><CalendarToday /></span>
                    <span className="todo-tree-label">{calendarSelectionLabel}</span>
                    <span className="todo-chip-clear" aria-hidden="true"><X /></span>
                  </button>
                ) : smartLists.map((list) => treeRow(
                  uiText(list.labelKey),
                  { kind: 'smart', id: list.id },
                  counts[list.id],
                  SMART_ICONS[list.id](),
                  undefined,
                  'smart',
                  list.color,
                  smartListForeground(list, paletteCssContrast)
                ))}
              </nav>

              {statusSelectionLabel && (
                <button
                  type="button"
                  className="todo-tree-row todo-smart-chip todo-status-chip active"
                  onClick={() => setStatusFilter('all')}
                >
                  <span className="todo-tree-label">{statusSelectionLabel}</span>
                  <span className="todo-chip-clear" aria-hidden="true"><X /></span>
                </button>
              )}
            </div>
          )}

          <div className="todo-list">
            {compose}
            {c.loading ? (
              <div className="right-sidebar-empty"><p>{uiText('auto.b5868978587a')}</p></div>
            ) : visibleTodos.length ? (
              <PanelDateList
                todos={visibleTodos}
                groups={groups}
                compact={compact}
                controller={c}
                mode={dateBreakdown}
                weekStart={api.getState().weekStart}
                timeline={view.kind === 'smart' && view.id === 'completed'}
              />
            ) : (
              <div className="right-sidebar-empty">
                <p>{emptyLabel}</p>
              </div>
            )}
          </div>

        </>
      )}

      {!composing && (
          <button
            ref={fabRef}
            className="todo-fab"
            type="button"
            aria-label={fabLabel}
            title={fabLabel}
            disabled={c.creating}
            onClick={openComposer}
          >
            <Plus />
          </button>
      )}
      <TodoDetailModal c={c} />
    </div>
  )
}

/** `left_sidebar` view: the task browser. */
export const AllPanel = (): ReactElement => <TodoPanel />
