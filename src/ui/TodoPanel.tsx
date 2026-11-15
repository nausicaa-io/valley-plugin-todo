import { React, api, useTodoRevealRequest } from '../runtime'
import type { CSSProperties, ReactElement } from 'react'
import type { TodoStatus } from '../types'
import { paletteCssContrast, paletteCssValue } from '@valley/plugin-sdk/palette'
import { useActiveCalendarSelection, useHostState } from '../state/hooks'
import {
  CalendarClock,
  CalendarToday,
  CalendarWeek,
  CircleCheck,
  ComfortableView,
  CompactView,
  Flag,
  Inbox,
  ListFilter,
  Plus,
  Search,
  SortAscending,
  SortDescending,
  X,
  Circle
} from './icons'
import { useTodoListController } from '../state/controller'
import { TodoDetailModal } from './TodoDetail'
import { PanelDateList } from './PanelDateList'
import { useGroups } from '../state/groupStore'
import { groupColorFor, groupKey } from '../model/groups'
import {
  configuredSmartLists,
  countForGroup,
  groupCounts,
  sameView,
  serializeView,
  smartListForeground,
  viewCounts,
  type SmartListId,
  type TodoView
} from '../model/views'
import {
  setShowCompleted,
  useDateBreakdown,
  usePanelPresentation,
  useShowCompleted,
  useSmartListSettings,
  useStatusFilter,
  useTodoSearch
} from '../state/viewStore'
import { openViewTab, opensInNewTab, showView, useShownView } from '../state/tabs'
import { selectionOf, toggleName, viewOfSelection } from '../model/listSelection'
import { SORT_LABEL_KEYS, formatDate, isoDay } from '../model/sort'
import { uiText } from '../localization'
import { isDoneStatus, useStatusVocabulary } from '../state/statusStore'
import { visibleSelectedStatuses } from './StatusFilter'
import { filterVisibleTodos } from '../state/visibleTodos'
import { useComposer } from './panel/Composer'
import { GroupsNav } from './panel/GroupsNav'
import { PanelSortPopover, sortFieldGlyph } from './panel/popovers'


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

  const c = useTodoListController(sortField, sortDir, 'left_sidebar')
  useTodoRevealRequest(c.openDetail)
  const today = isoDay(new Date())

  const counts = React.useMemo(() => viewCounts(c.todos, today), [c.todos, today])
  const openGroupCounts = React.useMemo(() => groupCounts(c.todos), [c.todos])

  const visibleTodos = React.useMemo(
    () => filterVisibleTodos(c.ordered, { view, showCompleted, today, statusFilter, search, selectedDate, selectedDateRange }),
    [c.ordered, view, showCompleted, statusFilter, search, selectedDate, selectedDateRange, today]
  )

  const composer = useComposer({ c, view, today, dateFormat, pageActive })

  /**
   * What is left in the funnel once the smart lists own the filtering: how the
   * list *looks* (compact), how it is ordered, and the group machinery. The due
   * windows moved into Scheduled/Today, and "hide completed" is now the
   * Completed list's absence. Groups land here because ＋ is now unambiguously
   * "new todo" — one button, one meaning.
   */
  // The sidebar's one filter (14 Nov): All, Completed or To do. The header button shows the icon of the
  // current choice and opens a three-row dropdown; groups are chosen in the Groups list, not here.
  const activeStatuses = statusDefs.map((status) => status.id)
  const shownStatuses = visibleSelectedStatuses(statusFilter, activeStatuses, showCompleted)
  const doneStatuses = activeStatuses.filter((status) => isDoneStatus(status))
  const showsExactly = (list: TodoStatus[]): boolean => list.length === shownStatuses.length && list.every((status) => shownStatuses.includes(status))
  const completion: 'all' | 'completed' | 'todo' | null = showsExactly(activeStatuses) ? 'all'
    : showsExactly(doneStatuses) ? 'completed'
      : showsExactly(activeStatuses.filter((status) => !isDoneStatus(status))) ? 'todo' : null
  const COMPLETION_ICONS = { all: <Inbox />, completed: <CircleCheck />, todo: <Circle /> }
  const COMPLETION_LABELS = { all: uiText('todo.chip.all'), completed: uiText('todo.view.completed'), todo: uiText('todo.status.todo') }
  const openStatusMenu = (anchor: HTMLElement): void => {
    void api.ui.openMenu((['all', 'completed', 'todo'] as const).map((id) => ({
      label: COMPLETION_LABELS[id],
      icon: COMPLETION_ICONS[id],
      type: 'radio' as const,
      checked: completion === id,
      onSelect: () => {
        setShowCompleted(id !== 'todo')
        setStatusFilter(id === 'completed' && doneStatuses.length ? doneStatuses as [TodoStatus, ...TodoStatus[]] : 'all')
      }
    })), { anchor, align: 'end' })
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
  const fabLabel = uiText('todo.fab.newTodo')

  return (
    <div className="todo-panel">
      <header className="panel-header">
        <span className="panel-title">{uiText('auto.fdebf6672120')}</span>
        <div className="todo-header-actions">
          {!pageActive && (
            <>
              <button
                className={`todo-menu-btn todo-status-menu-btn${completion === 'todo' ? '' : ' active'}`}
                aria-label={uiText('todo.filters.title')}
                aria-haspopup="menu"
                title={completion ? `${uiText('todo.filters.title')}: ${COMPLETION_LABELS[completion]}` : uiText('todo.filters.title')}
                type="button"
                onClick={(e) => openStatusMenu(e.currentTarget)}
              >
                {completion ? COMPLETION_ICONS[completion] : <ListFilter />}
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
          {composer.form}
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
          <GroupsNav groups={groups} row={(group) => treeRow(
            group.name,
            { kind: 'groups', names: [group.name] },
            countForGroup(openGroupCounts, group.name),
            undefined,
            groupColorFor(group.name, groups),
            undefined,
            undefined,
            undefined,
            group.parent !== undefined
          )} />
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
            </div>
          )}

          <div className="todo-list">
            {composer.form}
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

      {!composer.composing && (
          <button
            ref={composer.fabRef}
            className="todo-fab"
            type="button"
            aria-label={fabLabel}
            title={fabLabel}
            disabled={c.creating}
            onClick={composer.open}
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
