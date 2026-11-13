import { React, api, useTodoRevealRequest, openTodoComposer } from '../runtime'
import type { ReactElement } from 'react'
import type { MainWorkspaceViewProps, UiMenuItem } from '@valley/plugin-sdk'
import { useActiveCalendarSelection, useHostState } from '../state/hooks'
import { todoSearchMatcher } from '../model/search'
import { FilterX, FolderInput, GroupGlyph, Link, Plus, Search, Settings, X } from './icons'
import { useTodoListController } from '../state/controller'
import { TodoDetailModal } from './TodoDetail'
import { openManageGroups } from './GroupEditor'
import { useGroups } from '../state/groupStore'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { allGroups, groupColorFor } from '../model/groups'
import { SECTION_ORDER, bucketTodos, completionTimelineSections, todayIso, type TodoSectionId } from '../model/sections'
import type { TodoRecord } from '../types'
import { formatDate, sortTodos, sortTodosByKey, type SortField } from '../model/sort'
import { notePreview } from './table/TodoTable'

/** What each table-only column sorts by. Status follows the order statuses are listed in. */
const TABLE_SORT_KEYS: Record<string, (todo: TodoRecord) => string | number | undefined> = {
  group: (todo) => todo.group ?? undefined,
  notes: (todo) => notePreview(todo.note) || undefined,
  status: (todo) => allStatuses().indexOf(effectiveStatus(todo)),
  location: (todo) => todo.location?.name || undefined,
  tags: (todo) => todo.tags?.[0]
}
import { DEFAULT_VIEW, matchesVisibleView, serializeView, smartListDef, type TodoView } from '../model/views'
import { openViewTab, pinnedView, viewTitle } from '../state/tabs'
import {
  getViewHistoryState,
  goViewHistory,
  readTodoVisibleState,
  usePageSort,
  setView,
  useShowCompleted,
  useStatusFilter,
  useSmartListSettings,
  useTodoSearch,
  useView
} from '../state/viewStore'
import { allStatuses, effectiveStatus, matchesStatusFilter } from '../state/statusStore'
import { uiText } from '../localization'
import { setTodoSurfaceActions } from './surfaces'
import { ColumnsButton, PriorityFacet, TodoTable, usePriorityFilter } from './table/TodoTable'

/**
 * `main_workspace` view — the full To-Do page for whatever the sidebar selected.
 *
 * One 38px bar carries the view's name in its own colour, the filters and the
 * column picker; the host draws its history and ⋯ controls into the same bar.
 * Below it the tasks are a sortable, paginated table. Without an explicit
 * sort, rows keep the Overdue · Today · Upcoming · Someday · Completed order,
 * and Completed reads newest completion first.
 */
export const Page = ({ navigation, instanceId }: MainWorkspaceViewProps): ReactElement => {
  const { dateFormat, activePluginTab } = useHostState('dateFormat', 'activePluginTab')
  const { selectedDate, selectedDateRange } = useActiveCalendarSelection()
  const groups = useGroups()
  const shared = useView()
  // A tab opened with ⌘-click is pinned to one list; the tab without an instance shows the shared view.
  const pinned = React.useMemo(() => pinnedView(instanceId), [instanceId])
  const view = pinned ?? shared
  const focused = activePluginTab?.pluginId === api.pluginId && activePluginTab.instanceId === instanceId
  const viewHistory = getViewHistoryState()
  React.useEffect(() => {
    if (pinned) return
    navigation.setController({
      canGoBack: viewHistory.canGoBack,
      canGoForward: viewHistory.canGoForward,
      goBack: () => goViewHistory(-1),
      goForward: () => goViewHistory(1)
    })
    return () => navigation.setController(null)
  }, [navigation, pinned, viewHistory.canGoBack, viewHistory.canGoForward])
  const [search, setSearch] = useTodoSearch()
  const [searchOpen, setSearchOpen] = React.useState(() => !!search.trim())
  const searchRef = React.useRef<HTMLInputElement>(null)
  const openSearch = (): void => {
    setSearchOpen(true)
    window.setTimeout(() => searchRef.current?.focus(), 0)
  }
  const closeSearch = (): void => {
    setSearch('')
    setSearchOpen(false)
  }
  const [pageSort, setPageSort] = usePageSort()
  const { field: sortField, dir: sortDir } = pageSort
  const [showCompleted] = useShowCompleted()
  const [statusFilter, setStatusFilter] = useStatusFilter()
  const [priorities, setPriorities] = usePriorityFilter()

  const c = useTodoListController('due', 'asc')
  useTodoRevealRequest(c.openDetail)

  React.useEffect(() => {
    if (c.loading || pinned) return
    if (view.kind === 'groups') {
      const available = new Set(allGroups(groups))
      if (!view.includeUngrouped && !view.names.some((name) => available.has(name))) setView(DEFAULT_VIEW)
    } else if (view.kind === 'tag') {
      if (!c.todos.some((todo) => todo.tags?.includes(view.name))) setView(DEFAULT_VIEW)
    }
  }, [c.loading, c.todos, groups, view, pinned])

  const today = todayIso()
  const smartListSettings = useSmartListSettings()
  const listDef = view.kind === 'smart' ? smartListDef(view.id, smartListSettings) : null

  const title = viewTitle(view)

  // The tab names the open list (Today, Scheduled, a group…); the header below carries no second title.
  // Never cleared on unmount: the host unmounts a hidden tab's view, and the tab must keep its list's name.
  React.useEffect(() => {
    api.workspace.setMainTabTitle(title, instanceId)
  }, [title, instanceId])

  const filtered = React.useMemo(() => {
    let list = c.todos.filter((todo) => matchesVisibleView(todo, view, showCompleted, today))
    if (statusFilter !== 'all') list = list.filter((todo) => matchesStatusFilter(todo, statusFilter))
    if (priorities.length) list = list.filter((todo) => priorities.includes(todo.priority))
    if (search.trim()) {
      list = list.filter(todoSearchMatcher(search))
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
  }, [c.todos, view, showCompleted, statusFilter, priorities, search, selectedDate, selectedDateRange, today])

  const { ordered, sectionOf } = React.useMemo(() => {
    const columnKey = TABLE_SORT_KEYS[sortField as keyof typeof TABLE_SORT_KEYS]
    if (columnKey) return { ordered: sortTodosByKey(filtered, columnKey, sortDir), sectionOf: undefined }
    if (sortField !== 'auto') return { ordered: sortTodos(filtered, sortField as SortField, sortDir), sectionOf: undefined }
    if (view.kind === 'smart' && view.id === 'completed') {
      return { ordered: completionTimelineSections(filtered).flatMap((section) => section.todos), sectionOf: undefined }
    }
    const buckets = bucketTodos(filtered, today)
    const bands = new Map<string, TodoSectionId>()
    for (const id of SECTION_ORDER) for (const todo of buckets[id]) bands.set(todo.id, id)
    return {
      ordered: SECTION_ORDER.flatMap((id) => buckets[id]),
      sectionOf: (todo: TodoRecord): TodoSectionId => bands.get(todo.id) ?? 'someday'
    }
  }, [filtered, sortField, sortDir, view, today])

  const filteredBy = !!search.trim() || priorities.length > 0 || statusFilter !== 'all'
  const resetFilters = (): void => {
    setSearch('')
    setPriorities([])
    setStatusFilter('all')
  }
  const resetKey = [
    serializeView(view), search, JSON.stringify(statusFilter), priorities.join(), showCompleted,
    sortField, sortDir, selectedDate ?? '', selectedDateRange?.start ?? '', selectedDateRange?.end ?? ''
  ].join('|')

  const clearCalendarFilter = (): void => {
    api.workspace.patchTimeControl({ selectedDate: null, rangeStart: null, rangeEnd: null })
  }

  // + adds an empty row at the top of the table instead of the sidebar composer.
  const [composeSignal, setComposeSignal] = React.useState(0)
  const openInlineComposer = (): void => setComposeSignal((count) => count + 1)
  /** What a task added from this view needs to stay in it. */
  const newTaskPatch = (): Partial<TodoRecord> => {
    const patch: Partial<TodoRecord> = {}
    if (view.kind === 'groups' && view.names.length === 1 && !view.includeUngrouped) patch.group = view.names[0]
    if (view.kind === 'smart' && (view.id === 'today' || view.id === 'week')) patch.dueDate = today
    if (view.kind === 'smart' && view.id === 'flagged') patch.flagged = true
    return patch
  }

  /** The page can assign shared groups; their definitions live in Settings. */
  const names = allGroups(groups)
  const actions: UiMenuItem[] = [
        { label: uiText('todo.fab.newTodo'), icon: <Plus />, onSelect: openInlineComposer },
        ...(names.length
          ? [
              {
                label: uiText('todo.fab.newTodoIn'),
                icon: <FolderInput />,
                submenu: names.map((name) => ({
                  label: name,
                  onSelect: (context?: { newTab?: boolean }) => {
                    const target: TodoView = { kind: 'groups', names: [name] }
                    if (context?.newTab || pinned) {
                      openViewTab(target, context?.newTab === true)
                      openTodoComposer()
                    } else {
                      setView(target)
                      openInlineComposer()
                    }
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
          onSelect: () => void navigator.clipboard.writeText(api.workspace.buildOwnLink(readTodoVisibleState(view)))
        },
        {
          label: uiText('auto.c7f73bb54d92'),
          icon: <Settings />,
          onSelect: () => api.workspace.openOwnSettings()
        }
  ]
  const owner = instanceId ?? ''
  React.useEffect(() => { if (focused || activePluginTab?.pluginId !== api.pluginId) setTodoSurfaceActions(actions, owner) })
  React.useEffect(() => () => setTodoSurfaceActions(null, owner), [owner])

  return (
    <div className="todo-page">
      <div className={`todo-page-appbar${searchOpen ? ' is-searching' : ''}`}>
        {searchOpen ? (
          // Like Music: the search takes the title's place as a plain, borderless
          // field, and only while it is wanted.
          <div className="todo-page-search">
            <Search className="todo-page-search-icon" />
            <input
              ref={searchRef}
              className="todo-page-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault()
                  closeSearch()
                }
              }}
              onBlur={() => { if (!search.trim()) setSearchOpen(false) }}
              placeholder={uiText('todo.table.filterPlaceholder')}
              aria-label={uiText('auto.e0345e9d3092')}
            />
          </div>
        ) : (
          <span className="todo-page-appbar-spacer" aria-hidden="true" />
        )}
        {(selectedDateRange || selectedDate) && (
          <button
            type="button"
            className="todo-page-date-filter"
            title={uiText('auto.f93fb4b1ab19')}
            onClick={clearCalendarFilter}
          >
            <span>
              {selectedDateRange
                ? `${formatDate(selectedDateRange.start, dateFormat)} – ${formatDate(selectedDateRange.end, dateFormat)}`
                : formatDate(selectedDate!, dateFormat)}
            </span>
            <X />
          </button>
        )}
        <div className="todo-page-appbar-actions">
          {/* One button in one place: search while closed, close while open. */}
          <button
            type="button"
            className={`todo-page-appbar-btn${!searchOpen && search.trim() ? ' active' : ''}`}
            aria-label={searchOpen ? uiText('auto.67300d0fed7c') : uiText('auto.e0345e9d3092')}
            title={searchOpen ? uiText('auto.67300d0fed7c') : uiText('auto.e0345e9d3092')}
            // Keep the field's focus so its blur does not close it before this click lands.
            onMouseDown={(event) => { if (searchOpen) event.preventDefault() }}
            onClick={searchOpen ? closeSearch : openSearch}
          >
            {searchOpen ? <X /> : <Search />}
          </button>
          <PriorityFacet />
          {filteredBy && (
            <button
              type="button"
              className="todo-page-appbar-btn"
              aria-label={uiText('todo.table.reset')}
              title={uiText('todo.table.reset')}
              onClick={resetFilters}
            >
              <FilterX />
            </button>
          )}
          <ColumnsButton />
          <button
            type="button"
            className="todo-page-appbar-btn todo-page-add"
            aria-label={uiText('todo.fab.newTodo')}
            title={uiText('todo.fab.newTodo')}
            onClick={openInlineComposer}
          >
            <Plus />
          </button>
        </div>
      </div>

      {c.loading ? (
        <div className="right-sidebar-empty"><p>{uiText('auto.b5868978587a')}</p></div>
      ) : (
        <TodoTable
          todos={ordered}
          groups={groups}
          c={c}
          sort={pageSort}
          onSort={setPageSort}
          resetKey={resetKey}
          empty={uiText('todo.table.empty')}
          sectionOf={sectionOf}
          composeSignal={composeSignal}
          newTaskPatch={newTaskPatch}
        />
      )}

      <TodoDetailModal c={c} />
    </div>
  )
}
