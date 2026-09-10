import { React, api, useTodoRevealRequest } from './runtime'
import type { CSSProperties, ReactElement } from 'react'
import type { TodoRecord, TodoStatus } from '@valley/plugin-sdk/types'
import { paletteCssContrast, paletteCssValue } from '@valley/plugin-sdk/palette'
import { useActiveCalendarSelection, useHostState } from './hooks'
import { matchesSearch } from './search'
import {
  CalendarClock,
  CalendarToday,
  CircleCheck,
  ComfortableView,
  CompactView,
  CreatedSortGlyph,
  Flag,
  GroupGlyph,
  Inbox,
  NameSortGlyph,
  Plus,
  PriorityGlyph,
  Search,
  SortAscending,
  SortDescending,
  UpdatedSortGlyph,
  X
} from './icons'
import { useTodoListController } from './controller'
import { TodoDetailModal } from './TodoDetail'
import { PanelDateList } from './PanelDateList'
import { useGroups } from './groupStore'
import { allGroups, groupColorFor, groupKey } from './groups'
import {
  configuredSmartLists,
  groupCount,
  matchesVisibleView,
  sameView,
  serializeView,
  viewCounts,
  type SmartListId,
  type TodoView
} from './views'
import {
  DEFAULT_VIEW,
  setShowCompleted,
  setView,
  useDateBreakdown,
  usePanelPresentation,
  useShowCompleted,
  useSmartListSettings,
  useStatusFilter,
  useTodoSearch,
  useView
} from './viewStore'
import { SORT_LABEL_KEYS, formatDate, isoDay, type SortDir, type SortField } from './sort'
import { uiText } from './localization'
import { DONE_STATUSES, matchesStatusFilter, useStatusVocabulary } from './statuses'
import { StatusFilterDropdown } from './StatusFilter'
import { openManageGroups } from './GroupEditor'

export function sortFieldGlyph(field: SortField): ReactElement {
  if (field === 'flagged') return <Flag />
  if (field === 'priority') return <PriorityGlyph />
  if (field === 'due') return <CalendarClock />
  if (field === 'updated') return <UpdatedSortGlyph />
  if (field === 'created') return <CreatedSortGlyph />
  return <NameSortGlyph />
}

function PanelStatusPopover(): ReactElement {
  const [showCompleted] = useShowCompleted()
  const [statusFilter, setStatusFilter] = useStatusFilter()
  const statusDefs = useStatusVocabulary()
  const active = statusDefs.map((status) => status.id)
  const chooseCompletedVisibility = (show: boolean): void => {
    if (statusFilter !== 'all') {
      const selected = statusFilter.filter((status) => active.includes(status))
      const next = show
        ? active.filter((status) => selected.includes(status) || status === 'completed')
        : selected.filter((status) => !DONE_STATUSES.includes(status))
      const nonEmpty = next.length ? next : active.filter((status) => !DONE_STATUSES.includes(status))
      setStatusFilter(nonEmpty.length === active.length ? 'all' : nonEmpty as [TodoStatus, ...TodoStatus[]])
    }
    setShowCompleted(show)
  }
  return (
    <div className="todo-filter-popover-body">
      <div className="todo-completed-row">
        <span>{uiText('todo.filters.completed')}</span>
        <div className="todo-completed-choices">
          <button
            type="button"
            className={`todo-completed-choice${!showCompleted ? ' active' : ''}`}
            aria-pressed={!showCompleted}
            onClick={() => chooseCompletedVisibility(false)}
          >
            {uiText('todo.completed.hide')}
          </button>
          <button
            type="button"
            className={`todo-completed-choice${showCompleted ? ' active' : ''}`}
            aria-pressed={showCompleted}
            onClick={() => chooseCompletedVisibility(true)}
          >
            {uiText('todo.completed.showAll')}
          </button>
        </div>
      </div>
      <div className="todo-filter-control-row status">
        <span>{uiText('todo.filters.statuses')}</span>
        <StatusFilterDropdown filter={statusFilter} />
      </div>
    </div>
  )
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

export function GroupFilterPopover({
  todos,
  groups,
  names,
  hasUngrouped,
  selected,
  includeUngrouped,
  onChange,
  onOpenSettings,
  embedded = false
}: {
  todos: TodoRecord[]
  groups: ReturnType<typeof useGroups>
  names: string[]
  hasUngrouped: boolean
  selected: string[]
  includeUngrouped: boolean
  onChange: (names: string[], includeUngrouped: boolean) => void
  onOpenSettings: () => void
  embedded?: boolean
}): ReactElement {
  const [localSelected, setLocalSelected] = React.useState(selected)
  const [localUngrouped, setLocalUngrouped] = React.useState(includeUngrouped)
  const selectedNames = embedded ? selected : localSelected
  const ungrouped = embedded ? includeUngrouped : localUngrouped
  const allSelected = selectedNames.length === names.length && (!hasUngrouped || ungrouped)
  const activeRows = [
    ...names.map((name) => selectedNames.some((candidate) => candidate.toLowerCase() === name.toLowerCase())),
    ...(hasUngrouped ? [ungrouped] : [])
  ]
  const selectionRunClass = (active: boolean, index: number): string => active
    ? ` active${!activeRows[index - 1] ? ' selection-run-start' : ''}${!activeRows[index + 1] ? ' selection-run-end' : ''}`
    : ''
  const commit = (nextNames: string[], nextUngrouped: boolean): void => {
    setLocalSelected(nextNames)
    setLocalUngrouped(nextUngrouped)
    onChange(nextNames, nextUngrouped)
  }
  const embeddedRows = (name: string | null): ReactElement => {
    const matching = todos.filter((todo) => name === null
      ? !todo.group
      : groupKey(todo.group ?? '') === groupKey(name))
    const label = name ?? uiText('todo.chip.noGroup')
    const active = name === null
      ? ungrouped
      : selectedNames.some((candidate) => groupKey(candidate) === groupKey(name))
    return <div className="todo-group-filter-item" key={name ?? 'ungrouped'}>
      <div className="props-info-row">
        <dt className="props-info-key">{name && <span className="props-info-dot" style={{ background: paletteCssValue(groupColorFor(name, groups)) }} />}{label}</dt>
        <dd className="props-info-value props-info-filter-value"><span>{matching.length}</span><api.ui.settings.Toggle label={label} checked={active} onChange={() => commit(name === null
          ? selectedNames
          : active
            ? selectedNames.filter((candidate) => groupKey(candidate) !== groupKey(name))
            : [...selectedNames, name], name === null ? !ungrouped : ungrouped)} /></dd>
      </div>
    </div>
  }
  if (embedded) return <div className="props-info">
    <div className="props-info-actions">
      <button type="button" onClick={onOpenSettings}>{uiText('todo.properties.manageGroups')}</button>
      {(names.length > 0 || hasUngrouped) && <button type="button" onClick={() => commit(allSelected ? [] : names, allSelected ? false : hasUngrouped)}>{uiText(allSelected ? 'todo.group.deselectAll' : 'todo.group.selectAll')}</button>}
    </div>
    <dl className="props-info-table">
      {names.map((name) => embeddedRows(name))}
      {hasUngrouped && embeddedRows(null)}
    </dl>
  </div>
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
              className={`todo-group-filter-row${selectionRunClass(active, index)}`}
              aria-pressed={active}
              onClick={() => commit(active ? localSelected.filter((candidate) => candidate.toLowerCase() !== name.toLowerCase()) : [...localSelected, name], localUngrouped)}
            >
              <span className="todo-group-filter-check" aria-hidden="true">{active ? '✓' : ''}</span>
              <span className="todo-tree-dot" style={{ background: paletteCssValue(groupColorFor(name, groups)) }} />
              <span className="todo-tree-label">{name}</span>
              <span className="todo-tree-count">{groupCount(todos, name)}</span>
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
            <span className="todo-tree-count">{groupCount(todos, null)}</span>
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
  const { activePluginTab, indexEntries, dateFormat } = useHostState()
  const { selectedDate, selectedDateRange } = useActiveCalendarSelection()
  const groups = useGroups()
  const view = useView()
  const [draft, setDraft] = React.useState('')
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
  const fabRef = React.useRef<HTMLButtonElement>(null)

  const c = useTodoListController(sortField, sortDir, 'left_sidebar')
  useTodoRevealRequest(c.openDetail)
  const today = isoDay(new Date())

  const counts = React.useMemo(() => viewCounts(c.todos, today), [c.todos, today])
  const groupNames = React.useMemo(
    () => allGroups(groups),
    [groups]
  )
  const hasUngrouped = React.useMemo(() => c.todos.some((t) => !t.group), [c.todos])
  const selectedGroupNames = view.kind === 'groups' ? view.names : groupNames
  const includeSelectedUngrouped = view.kind === 'groups' ? view.includeUngrouped === true : hasUngrouped
  const allGroupsSelected = selectedGroupNames.length === groupNames.length
    && (!hasUngrouped || includeSelectedUngrouped)

  const visibleTodos = React.useMemo(() => {
    let list = c.ordered.filter((todo) => matchesVisibleView(todo, view, showCompleted, today))
    if (statusFilter !== 'all') list = list.filter((todo) => matchesStatusFilter(todo, statusFilter))
    if (search.trim()) {
      list = list.filter((todo) =>
        matchesSearch(search, todo.tags ?? [], todo.title, todo.note, todo.group ?? '')
      )
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
    const title = draft.trim()
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
    setDraft('')
    // A todo created inside a smart list has to *be* in it, or it disappears
    // the moment it is made.
    const patch: Partial<TodoRecord> = { ...(selectedGroup ? { group: selectedGroup } : {}) }
    if (view.kind === 'smart' && view.id === 'today') patch.dueDate = today
    if (view.kind === 'smart' && view.id === 'flagged') patch.flagged = true
    const created = await c.create(title, undefined, { patch })
    if (!created) setDraft(title)
    else inputRef.current?.focus()
  }

  const openComposer = (): void => {
    setComposing(true)
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }

  const closeComposer = (): void => {
    setDraft('')
    setComposing(false)
  }

  /**
   * What is left in the funnel once the smart lists own the filtering: how the
   * list *looks* (compact), how it is ordered, and the group machinery. The due
   * windows moved into Scheduled/Today, and "hide completed" is now the
   * Completed list's absence. Groups land here because ＋ is now unambiguously
   * "new todo" — one button, one meaning.
   */
  const openStatusMenu = (anchor: HTMLElement): void => {
    void api.ui.openPopover(
      () => <PanelStatusPopover />,
      { anchor, align: 'end' },
      { className: 'todo-filter-popover', ariaLabel: uiText('todo.filters.statusAndCompleted') }
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

  const openGroups = (anchor: HTMLElement): void => {
    void api.ui.openPopover(
      ({ close }) => (
        <GroupFilterPopover
          todos={c.todos}
          groups={groups}
          names={groupNames}
          hasUngrouped={hasUngrouped}
          selected={selectedGroupNames}
          includeUngrouped={includeSelectedUngrouped}
          onChange={(nextNames, nextUngrouped) => setView(
            nextNames.length === groupNames.length && (!hasUngrouped || nextUngrouped)
              ? DEFAULT_VIEW
              : { kind: 'groups', names: nextNames, includeUngrouped: nextUngrouped }
          )}
          onOpenSettings={() => {
            close()
            void openManageGroups()
          }}
        />
      ),
      { anchor, align: 'end' },
      { className: 'todo-groups-popover', ariaLabel: uiText('todo.view.groups') }
    )
  }

  const clearCalendarFilter = (): void => {
    api.workspace.patchTimeControl({ selectedDate: null, rangeStart: null, rangeEnd: null })
  }

  const treeRow = (
    label: string,
    target: TodoView,
    count: number,
    icon?: ReactElement,
    dot?: string,
    variant?: 'smart',
    /** Stored colour (`palette:<id>` or a hex) that tints the chip. */
    chip?: string
  ): ReactElement => {
    const current = sameView(view, target)
    const active = target.kind === 'groups' && target.names.length === 1 && !target.includeUngrouped && view.kind === 'groups'
      ? view.names.some((name) => groupKey(name) === groupKey(target.names[0]))
      : current
    return (
      <button
        key={serializeView(target)}
        type="button"
        className={`todo-tree-row${dot ? ' nested' : ''}${variant ? ` todo-${variant}-chip` : ''}${active ? ' active' : ''}`}
        aria-current={current ? 'true' : undefined}
        aria-pressed={target.kind === 'groups' ? active : undefined}
        // A `var(--color-…)`, never a resolved hex: an inline style outranks
        // every stylesheet, so resolving here would put the colour out of reach
        // of the user's own `.valley/design/*.css`.
        style={
          chip
            ? ({
                '--todo-chip-color': paletteCssValue(chip),
                '--todo-chip-on': paletteCssContrast(chip)
              } as CSSProperties)
            : undefined
        }
        onClick={() => setView(target)}
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
      ? uiText(statusDefs.find((status) => status.id === statusFilter[0])?.labelKey ?? 'todo.chip.all')
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
                className={`todo-menu-btn todo-groups-menu-btn${allGroupsSelected ? '' : ' active'}`}
                aria-label={uiText('todo.view.groups')}
                title={uiText('todo.view.groups')}
                type="button"
                onClick={(e) => openGroups(e.currentTarget)}
              >
                <GroupGlyph />
              </button>
              <button
                className={`todo-menu-btn todo-status-menu-btn${showCompleted || statusFilter !== 'all' ? ' active' : ''}`}
                aria-label={uiText('todo.filters.statusAndCompleted')}
                title={uiText('todo.filters.statusAndCompleted')}
                type="button"
                onClick={(e) => openStatusMenu(e.currentTarget)}
              >
                <CircleCheck />
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
            onClick={() => api.workspace.openMainTab()}
          />
        </div>
      </header>

      {/* The search field is permanent now: the tree replaced the chip bar that
          used to be worth the row it occupied, and a hidden field made search a
          two-click operation in the surface people search from most. */}
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

      {pageActive ? (
        <div className="todo-tree todo-active-navigation">
          <nav className="todo-smart-grid" aria-label={uiText('auto.fdebf6672120')}>
            {smartLists.map((list) => treeRow(
              uiText(list.labelKey),
              { kind: 'smart', id: list.id },
              counts[list.id],
              SMART_ICONS[list.id](),
              undefined,
              'smart',
              list.color
            ))}
          </nav>
          <div className="todo-navigation-groups">
            <div className="todo-navigation-groups-title">{uiText('todo.view.myLists')}</div>
            {groupNames.map((name) => treeRow(
              name,
              { kind: 'groups', names: [name] },
              groupCount(c.todos, name),
              undefined,
              groupColorFor(name, groups)
            ))}
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
                  list.color
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
            {composing && (
          <form
            className="todo-compose"
            onSubmit={(e) => {
              e.preventDefault()
              void create()
            }}
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') closeComposer()
              }}
              // Blur closes it only when nothing was typed: losing focus with a
              // half-written todo in the field must never throw it away.
              onBlur={() => {
                if (!draft.trim()) setComposing(false)
              }}
              placeholder={
                activeGroup
                  ? uiText('todo.newTodoIn', { p0: activeGroup })
                  : uiText('auto.c274dabfd0fe')
              }
              aria-label={uiText('auto.184c39d1837f')}
              disabled={c.creating}
            />
          </form>
            )}
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

          <button
            ref={fabRef}
            className="todo-fab"
            type="button"
            aria-label={fabLabel}
            title={fabLabel}
            disabled={c.creating}
            onClick={() => (composing ? void create() : openComposer())}
          >
            <Plus />
          </button>
        </>
      )}

      <TodoDetailModal c={c} indexEntries={indexEntries} />
    </div>
  )
}

/** `left_sidebar` view: the task browser. */
export const AllPanel = (): ReactElement => <TodoPanel />
