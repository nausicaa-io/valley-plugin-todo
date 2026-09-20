import { React, api, useTodoRevealRequest } from './runtime'
import type { ReactElement } from 'react'
import type { MainWorkspaceViewProps, UiMenuItem } from '@valley/plugin-sdk'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import { useActiveCalendarSelection, useHostState } from './hooks'
import { matchesSearch } from './search'
import { ChevronDown, FolderInput, GroupGlyph, Link, Plus, Search, Settings, X } from './icons'
import { useTodoListController } from './controller'
import { TodoList } from './TodoList'
import { TodoSections } from './TodoSections'
import { TodoDetailModal } from './TodoDetail'
import { openManageGroups } from './GroupEditor'
import { useGroups } from './groupStore'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { allGroups, groupColorFor } from './groups'
import {
  SECTION_LABEL_KEYS,
  SECTION_ORDER,
  TIME_OF_DAY_LABEL_KEYS,
  bucketTodos,
  completionTimelineSections,
  groupByDay,
  groupByTimeOfDay,
  parseQuickAdd,
  rollUpFutureDays,
  todayIso,
  type TodoSectionId
} from './sections'
import { SORT_LABEL_KEYS, formatDate, formatDayHeader, formatMonthHeader, sortTodos, type SortField } from './sort'
import { DEFAULT_VIEW, completedForView, matchesVisibleView, smartListDef } from './views'
import {
  getViewHistoryState,
  goViewHistory,
  readTodoVisibleState,
  usePageSort,
  setView,
  useShowCompleted,
  useStatusFilter,
  useTodoSearch,
  useView
} from './viewStore'
import { matchesStatusFilter } from './statuses'
import { uiText } from './localization'
import { StatusFilterDropdown } from './StatusFilter'
import { setTodoSurfaceActions } from './surfaces'

const COLLAPSED_KEY = 'pageCollapsed'

function readCollapsed(): Set<TodoSectionId> {
  const raw = api.settings.get()[COLLAPSED_KEY]
  if (!Array.isArray(raw)) return new Set<TodoSectionId>(['completed'])
  return new Set(raw.filter((v): v is TodoSectionId => SECTION_ORDER.includes(v as TodoSectionId)))
}

/**
 * `main_workspace` view — the full To-Do page for whatever the sidebar selected.
 *
 * The header is the view's name, large and in the list's own colour, with the
 * completed tally and a Hide/Show toggle under it: in a full-width surface the
 * first thing that has to be true is *which list am I looking at*, and a 13px
 * "To-Do" beside a stat line never answered that.
 *
 * Date-ordered lists (Scheduled, Today) render under date headers; every other
 * view keeps the Overdue · Today · Upcoming · Someday · Completed sections,
 * which are what makes an unordered pile readable.
 */
export const Page = ({ navigation }: MainWorkspaceViewProps): ReactElement => {
  const { dateFormat, shortDateFormat } = useHostState('dateFormat', 'shortDateFormat')
  const { selectedDate, selectedDateRange } = useActiveCalendarSelection()
  // The host's styled dropdown — never a raw `<select>`, whose popup Chromium
  // hands to the OS unthemed and which ignores the native/custom menu setting.
  const { SelectField } = api.ui.settings
  const groups = useGroups()
  const view = useView()
  const viewHistory = getViewHistoryState()
  React.useEffect(() => {
    navigation.setController({
      canGoBack: viewHistory.canGoBack,
      canGoForward: viewHistory.canGoForward,
      goBack: () => goViewHistory(-1),
      goForward: () => goViewHistory(1)
    })
    return () => navigation.setController(null)
  }, [navigation, viewHistory.canGoBack, viewHistory.canGoForward])
  const [draft, setDraft] = React.useState('')
  const [search, setSearch] = useTodoSearch()
  const [pageSort, setPageSort] = usePageSort()
  const { field: sortField, dir: sortDir } = pageSort
  const [collapsed, setCollapsed] = React.useState<Set<TodoSectionId>>(readCollapsed)
  // Expansion is tracked, not collapse, so a month roll-up starts **closed**:
  // it exists because those months are far enough away to be noise, and an
  // empty collapse-set would put the whole wall of day headers straight back.
  // Session-scoped rather than persisted — the set of months moves with the
  // calendar, so a stored one goes stale on its own.
  const [expandedMonths, setExpandedMonths] = React.useState<Set<string>>(new Set())
  const [showCompleted, toggleCompleted] = useShowCompleted()
  const [statusFilter] = useStatusFilter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  // The controller's order only matters for 'auto' === section-internal sorting.
  const c = useTodoListController('due', 'asc')
  useTodoRevealRequest(c.openDetail)

  React.useEffect(() => {
    if (c.loading) return
    if (view.kind === 'groups') {
      const available = new Set(allGroups(groups))
      if (!view.includeUngrouped && !view.names.some((name) => available.has(name))) setView(DEFAULT_VIEW)
    } else if (view.kind === 'tag') {
      if (!c.todos.some((todo) => todo.tags?.includes(view.name))) setView(DEFAULT_VIEW)
    }
  }, [c.loading, c.todos, groups, view])

  React.useEffect(() => {
    if (!showCompleted) return
    setCollapsed((current) => {
      if (!current.has('completed')) return current
      const next = new Set(current)
      next.delete('completed')
      void api.settings.set(COLLAPSED_KEY, [...next])
      return next
    })
  }, [showCompleted])

  const today = todayIso()
  const listDef = view.kind === 'smart' ? smartListDef(view.id) : null
  const dated = !!listDef?.dated

  const title =
    view.kind === 'groups'
      ? view.names.length === 1 && !view.includeUngrouped
        ? view.names[0]
        : uiText('todo.view.selectedGroups', { count: view.names.length + (view.includeUngrouped ? 1 : 0) })
      : view.kind === 'tag'
        ? `#${view.name}`
      : view.kind === 'nogroup'
        ? uiText('todo.chip.noGroup')
        : uiText(listDef!.labelKey)

  // Always a `var(…)`, never a resolved hex — see `paletteCssValue`.
  const titleColor =
    view.kind === 'groups'
      ? view.names.length === 1 && !view.includeUngrouped
        ? paletteCssValue(groupColorFor(view.names[0], groups))
        : 'var(--accent-color)'
      : view.kind === 'tag'
        ? 'var(--accent-color)'
      : view.kind === 'nogroup'
        ? 'var(--text-color)'
        : paletteCssValue(listDef!.color) || 'var(--text-color)'

  const filtered = React.useMemo(() => {
    let list = c.todos.filter((todo) => matchesVisibleView(todo, view, showCompleted, today))
    if (statusFilter !== 'all') list = list.filter((todo) => matchesStatusFilter(todo, statusFilter))
    if (search.trim()) {
      list = list.filter((todo) =>
        matchesSearch(search, todo.tags ?? [], todo.title, todo.note, todo.group ?? '')
      )
    }
    if (selectedDateRange) {
      list = list.filter((todo) => {
        const d = todo.dueDate?.slice(0, 10)
        return !!d && d >= selectedDateRange.start && d <= selectedDateRange.end
      })
    } else if (selectedDate) {
      list = list.filter((todo) => todo.dueDate?.slice(0, 10) === selectedDate)
    }
    return list
  }, [c.todos, view, showCompleted, statusFilter, search, selectedDate, selectedDateRange, today])

  /**
   * The tally the header reports: the done todos this view covers — which in
   * every list but Completed is exactly what Hide is hiding, i.e. the number
   * the toggle beside it is talking about.
   */
  const completedCount = React.useMemo(
    () => completedForView(c.todos, view, today),
    [c.todos, view, today]
  )

  const visible = filtered

  const daySections = React.useMemo(
    () => (dated ? groupByDay(visible.filter((todo) => !todo.completed), today) : []),
    [dated, visible, today]
  )
  const overdueDaySections = daySections.filter((section) => !!section.key && section.key < today)
  const todayDaySection = daySections.find((section) => section.key === today)
  const datedCompleted = dated ? visible.filter((todo) => todo.completed) : []

  // Today reads by hour, Scheduled by date: the same records, cut the way the
  // question is asked. Splitting Today's own day into Morning/Afternoon/Tonight
  // is only useful where the day is the whole list.
  const todayTimeSections = React.useMemo(
    () => (todayDaySection ? groupByTimeOfDay(todayDaySection.todos) : []),
    [todayDaySection]
  )

  // Beyond a fortnight a header per day is a wall of near-empty headings, so
  // Scheduled rolls those up per month.
  const { near: futureDaySections, months: futureMonths } = React.useMemo(
    () => rollUpFutureDays(daySections.filter((s) => !s.key || s.key > today), today),
    [daySections, today]
  )

  const monthSections = React.useMemo(() => futureMonths.map(month => ({ ...month, todos: month.days.flatMap(day => day.todos) })), [futureMonths])

  const sections = React.useMemo(() => {
    if (dated) return null
    const buckets = bucketTodos(visible, today)
    if (sortField !== 'auto') {
      for (const id of SECTION_ORDER) buckets[id] = sortTodos(buckets[id], sortField, sortDir)
    }
    return buckets
  }, [dated, visible, today, sortField, sortDir])

  const completedTimeline = React.useMemo(
    () => view.kind === 'smart' && view.id === 'completed' ? completionTimelineSections(visible) : null,
    [view, visible]
  )

  // A just-created todo must stay visible while it is filled in, even when a
  // filter would hide it — tracked until the next create or a delete.
  const pinnedTodo: TodoRecord | undefined = c.lastCreatedId
    ? visible.find((t) => t.id === c.lastCreatedId) ?? c.todos.find((t) => t.id === c.lastCreatedId)
    : undefined

  const toggleMonth = (key: string): void => {
    setExpandedMonths((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleSection = (id: TodoSectionId): void => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      void api.settings.set(COLLAPSED_KEY, [...next])
      return next
    })
  }

  /** The group a new todo lands in: whichever one the sidebar is showing. */
  const activeGroup = view.kind === 'groups' && view.names.length === 1 && !view.includeUngrouped
    ? view.names[0]
    : undefined

  /** `openDetail` follows a FAB-driven create straight into the editor. */
  const create = async (opts?: { openDetail?: boolean; group?: string }): Promise<void> => {
    const parsed = parseQuickAdd(draft, today)
    if (!parsed.title) {
      inputRef.current?.focus()
      return
    }
    let group = opts?.group ?? activeGroup
    if (!opts?.group && view.kind === 'groups' && view.names.length + (view.includeUngrouped ? 1 : 0) > 1) {
      const picked = await api.ui.openMenu(
        [
          ...view.names.map((name, index) => ({ id: `group:${index}`, label: name })),
          ...(view.includeUngrouped ? [{ id: 'ungrouped', label: uiText('todo.chip.noGroup') }] : [])
        ],
        { anchor: inputRef.current!, align: 'start' }
      )
      if (picked === null) return
      group = picked.startsWith('group:') ? view.names[Number(picked.slice(6))] : undefined
    }
    setDraft('')
    // A todo created inside a dated list has to *be* in it, or it vanishes the
    // moment it is made: Today means "due today", so that is the date it gets.
    const dueDate =
      parsed.dueDate || (view.kind === 'smart' && view.id === 'today' ? today : '')
    const created = await c.create(parsed.title, undefined, {
      patch: {
        dueDate,
        priority: parsed.priority,
        ...(group ? { group } : {}),
        ...(view.kind === 'smart' && view.id === 'flagged' ? { flagged: true } : {})
      }
    })
    if (!created) {
      setDraft(draft)
      return
    }
    if (opts?.openDetail) c.openDetail(created.id)
  }

  const clearCalendarFilter = (): void => {
    api.workspace.patchTimeControl({ selectedDate: null, rangeStart: null, rangeEnd: null })
  }

  /** The page can assign shared groups; their definitions live in Settings. */
  const names = allGroups(groups)
  const actions: UiMenuItem[] = [
        { label: uiText('todo.fab.newTodo'), icon: <Plus />, onSelect: () => inputRef.current?.focus() },
        ...(names.length
          ? [
              {
                label: uiText('todo.fab.newTodoIn'),
                icon: <FolderInput />,
                submenu: names.map((name) => ({
                  label: name,
                  onSelect: () => {
                    setView({ kind: 'groups', names: [name] })
                    inputRef.current?.focus()
                  }
                }))
              }
            ]
          : []),
        { type: 'separator' as const },
        {
          label: uiText('todo.group.manage'),
          icon: <GroupGlyph />,
          onSelect: () => void openManageGroups()
        },
        { type: 'separator' as const },
        {
          label: uiText('auto.fb3a16f382f8'),
          icon: <Link />,
          onSelect: () => void navigator.clipboard.writeText(api.workspace.buildOwnLink(readTodoVisibleState()))
        },
        {
          label: uiText('auto.c7f73bb54d92'),
          icon: <Settings />,
          onSelect: () => api.workspace.openOwnSettings()
        }
  ]
  const openFab = (anchor: HTMLElement): void => { void api.ui.openMenu(actions, { anchor, align: 'end' }) }
  React.useEffect(() => { setTodoSurfaceActions(actions) })
  React.useEffect(() => () => setTodoSurfaceActions(null), [])

  // `c.creating` keeps the label on «Create todo» while a create is in flight —
  // `create()` clears the draft immediately, and keying off the draft alone
  // renamed the button under the user's cursor mid-action.
  const fabLabel =
    draft.trim() || c.creating ? uiText('auto.9c0410f3884e') : uiText('todo.fab.menu')

  return (
    <div className="todo-page">
      <div className="todo-page-appbar">
        <div className="todo-page-appbar-title" style={{ color: titleColor }}>{title}</div>

      </div>

      <div className="todo-page-scroll hidescrollbar">
        <div className="todo-page-column">
        <header className="todo-page-header">
          <h1 className="todo-page-view-title" style={{ color: titleColor }}>
            {title}
          </h1>
          <div className="todo-page-view-sub">
            <span>{uiText('todo.page.completedCount', { count: completedCount })}</span>
            <button
              type="button"
              className="todo-page-view-toggle"
              style={{ color: titleColor }}
              aria-pressed={showCompleted}
              onClick={toggleCompleted}
            >
              {uiText(showCompleted ? 'todo.completed.hide' : 'todo.completed.showAll')}
            </button>
          </div>
        </header>

        <form
          className="todo-page-quickadd"
          onSubmit={(e) => {
            e.preventDefault()
            void create()
          }}
        >
          <Plus className="todo-page-quickadd-icon" />
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={
              activeGroup
                ? uiText('todo.newTodoIn', { p0: activeGroup })
                : uiText('auto.d0e6e1dca756')
            }
            aria-label={uiText('auto.81df98734775')}
            disabled={c.creating}
          />
        </form>

        <div className="todo-page-toolbar">
          <div className="todo-search-wrap search-field">
            <Search className="search-field-icon" />
            <input
              className="search-field-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={uiText('auto.f4ade25164a5')}
              aria-label={uiText('auto.e0345e9d3092')}
            />
            {search && (
              <button className="search-field-action" type="button" onClick={() => setSearch('')} aria-label={uiText('auto.67300d0fed7c')}>
                <X />
              </button>
            )}
          </div>
          <SelectField
            className="flagged-notes-sort-select"
            value={sortField}
            ariaLabel={uiText('auto.63e08dc2a4e3')}
            onChange={(value) => setPageSort({ ...pageSort, field: value as SortField | 'auto' })}
            options={[
              { value: 'auto', label: uiText('auto.c614ba7c453c') },
              ...Object.entries(SORT_LABEL_KEYS).map(([value, key]) => ({ value, label: uiText(key) }))
            ]}
          />
          {sortField !== 'auto' && (
            <button
              className="flagged-notes-sort-dir"
              type="button"
              aria-label={uiText('auto.44b8af7351fe', { p0: sortDir === 'asc' ? 'descending' : 'ascending' })}
              onClick={() => setPageSort({ ...pageSort, dir: sortDir === 'asc' ? 'desc' : 'asc' })}
            >
              {sortDir === 'asc' ? uiText('auto.4fee0a06b6e4') : uiText('auto.01e635f27ec2')}
            </button>
          )}
          <StatusFilterDropdown filter={statusFilter} />
          {(selectedDateRange || selectedDate) && (
            <button
              type="button"
              className="todo-due-chip active todo-date-chip"
              title={uiText('auto.f93fb4b1ab19')}
              onClick={clearCalendarFilter}
            >
              {selectedDateRange
                ? `${formatDate(selectedDateRange.start, dateFormat)} – ${formatDate(selectedDateRange.end, dateFormat)}`
                : formatDate(selectedDate!, dateFormat)}{' '}
              <X />
            </button>
          )}
        </div>

        {c.loading ? (
          <div className="right-sidebar-empty"><p>{uiText('auto.b5868978587a')}</p></div>
        ) : completedTimeline ? (
          completedTimeline.length ? (
            <TodoSections className="todo-completed-timeline" sections={completedTimeline} c={c}>
              {(section) => (
                <section className="todo-schedule-block" key={section.key}>
                  <h2 className="todo-schedule-head todo-schedule-completed">
                    <span>{formatDayHeader(section.key, api.ui.language(), shortDateFormat)}</span>
                    <span className="todo-page-section-count">{section.todos.length}</span>
                  </h2>
                  <TodoList todos={section.todos} groups={groups} compact={false} c={c} />
                </section>
              )}
            </TodoSections>
          ) : (
            <div className="right-sidebar-empty"><p>{uiText('auto.cec28cbe4204')}</p></div>
          )
        ) : dated ? (
          daySections.length || datedCompleted.length ? (
            <>
              {datedCompleted.length > 0 && (
                <section className="todo-schedule-block">
                  <h2 className="todo-schedule-head todo-schedule-completed">
                    <span>{uiText('todo.view.completed')}</span>
                    <span className="todo-page-section-count">{datedCompleted.length}</span>
                  </h2>
                  <TodoList todos={datedCompleted} groups={groups} compact={false} c={c} />
                </section>
              )}

              {overdueDaySections.length > 0 && (
                <section className="todo-schedule-block">
                  <h2 className="todo-schedule-head todo-schedule-overdue">
                    <span>{uiText('todo.due.overdue')}</span>
                    <span className="todo-page-section-count">
                      {overdueDaySections.reduce((count, section) => count + section.todos.length, 0)}
                    </span>
                  </h2>
                  <TodoSections sections={overdueDaySections} c={c}>
                  {(section) => (
                    <div key={section.key} className="todo-page-days">
                      <h3 className="todo-day-head is-overdue">
                        {formatDayHeader(section.key, api.ui.language(), shortDateFormat)}
                      </h3>
                      <TodoList todos={section.todos} groups={groups} compact={false} hideDate c={c} />
                    </div>
                  )}
                  </TodoSections>
                </section>
              )}

              {todayDaySection && (
                <section className="todo-schedule-block">
                  <h2 className="todo-schedule-head todo-schedule-today">
                    <span>{uiText('todo.due.today')}</span>
                    <span className="todo-page-section-count">{todayDaySection.todos.length}</span>
                  </h2>
                  {todayTimeSections.map((slot) => (
                    <div key={slot.id} className="todo-page-days">
                      {/* Untimed work leads with no header — see groupByTimeOfDay. */}
                      {slot.id !== 'untimed' && (
                        <h3 className="todo-timeofday-head">
                          {uiText(TIME_OF_DAY_LABEL_KEYS[slot.id])}
                        </h3>
                      )}
                      <TodoList todos={slot.todos} groups={groups} compact={false} hideDate c={c} />
                    </div>
                  ))}
                </section>
              )}

              {futureDaySections.map((section) => (
                <section key={section.key || 'nodate'} className="todo-page-days">
                  <h2 className="todo-day-head">
                    {section.key
                      ? formatDayHeader(section.key, api.ui.language(), shortDateFormat)
                      : uiText('todo.due.noDeadline')}
                  </h2>
                  <TodoList todos={section.todos} groups={groups} compact={false} hideDate c={c} />
                </section>
              ))}

              <TodoSections sections={monthSections} c={c} layoutKey={expandedMonths} estimate={month => expandedMonths.has(month.key) ? 48 + month.days.length * 32 + month.todos.length * 84 : 48}>
              {(month) => {
                const collapsed = !expandedMonths.has(month.key)
                const count = month.days.reduce((n, d) => n + d.todos.length, 0)
                return (
                  <section key={month.key} className={`todo-month${collapsed ? ' collapsed' : ''}`}>
                    <button
                      type="button"
                      className="todo-month-head"
                      aria-expanded={!collapsed}
                      onClick={() => toggleMonth(month.key)}
                    >
                      <ChevronDown className="todo-page-section-chevron" />
                      <span className="todo-month-label">
                        {formatMonthHeader(month.key, api.ui.language(), {
                          partial: month.partial,
                          restOfLabel: uiText('todo.month.restOf')
                        })}
                      </span>
                      <span className="todo-page-section-count">{count}</span>
                    </button>
                    {!collapsed &&
                      month.days.map((section) => (
                        <div key={section.key} className="todo-page-days">
                          <h3 className="todo-day-head">
                            {formatDayHeader(section.key, api.ui.language(), shortDateFormat)}
                          </h3>
                          <TodoList todos={section.todos} groups={groups} compact={false} hideDate c={c} />
                        </div>
                      ))}
                  </section>
                )
              }}
              </TodoSections>
            </>
          ) : (
            <div className="right-sidebar-empty"><p>{uiText('auto.cec28cbe4204')}</p></div>
          )
        ) : (
          SECTION_ORDER.map((id) => {
            let list = sections![id]
            // Keep a just-created row visible in its section even when filters hide it.
            if (pinnedTodo && !list.some((t) => t.id === pinnedTodo.id)) {
              const bucket = bucketTodos([pinnedTodo], today)
              if (bucket[id].length) list = [pinnedTodo, ...list]
            }
            const isCollapsed = collapsed.has(id)
            if (!list.length && id !== 'today') return null
            return (
              <section key={id} className={`todo-page-section${isCollapsed ? ' collapsed' : ''}`}>
                <button
                  type="button"
                  className="todo-page-section-head"
                  aria-expanded={!isCollapsed}
                  onClick={() => toggleSection(id)}
                >
                  <ChevronDown className="todo-page-section-chevron" />
                  <span className={`todo-page-section-label todo-page-section-${id}`}>
                    {uiText(SECTION_LABEL_KEYS[id])}
                  </span>
                  <span className="todo-page-section-count">{list.length}</span>
                </button>
                {!isCollapsed && (
                  <div className="todo-page-section-body">
                    {list.length ? (
                      <TodoList todos={list} groups={groups} compact={false} c={c} />
                    ) : (
                      <div className="todo-page-section-empty">{uiText('auto.346d73d6f5b6')}</div>
                    )}
                  </div>
                )}
              </section>
            )
          })
        )}

        </div>
      </div>

      <button
        className="todo-fab"
        type="button"
        aria-label={fabLabel}
        title={fabLabel}
        disabled={c.creating}
        onClick={(e) => {
          // Typed → commit it and open the new todo. Empty → the ＋ is the way
          // into groups, not a button that only focuses a field.
          if (draft.trim()) void create({ openDetail: true })
          else openFab(e.currentTarget)
        }}
      >
        <Plus />
      </button>

      <TodoDetailModal c={c} />
    </div>
  )
}
