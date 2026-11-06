import { React, api, useTodoRevealRequest, openTodoComposer } from './runtime'
import type { ReactElement } from 'react'
import type { MainWorkspaceViewProps, UiMenuItem } from '@valley/plugin-sdk'
import { useActiveCalendarSelection, useHostState } from './hooks'
import { matchesSearch } from './search'
import { FolderInput, GroupGlyph, Link, Plus, Search, Settings, X } from './icons'
import { useTodoListController } from './controller'
import { TodoDetailModal } from './TodoDetail'
import { openManageGroups } from './GroupEditor'
import { useGroups } from './groupStore'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { allGroups, groupColorFor } from './groups'
import { SECTION_ORDER, bucketTodos, completionTimelineSections, todayIso } from './sections'
import { formatDate, sortTodos } from './sort'
import { DEFAULT_VIEW, matchesVisibleView, serializeView, smartListDef } from './views'
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
import { setTodoSurfaceActions } from './surfaces'
import { ColumnsButton, PriorityFacet, StatusFacet, TodoTable, usePriorityFilter } from './TodoTable'

/**
 * `main_workspace` view — the full To-Do page for whatever the sidebar selected.
 *
 * One 38px bar carries the view's name in its own colour, the filters and the
 * column picker; the host draws its history and ⋯ controls into the same bar.
 * Below it the tasks are a sortable, paginated table. Without an explicit
 * sort, rows keep the Overdue · Today · Upcoming · Someday · Completed order,
 * and Completed reads newest completion first.
 */
export const Page = ({ navigation }: MainWorkspaceViewProps): ReactElement => {
  const { dateFormat } = useHostState('dateFormat')
  const { selectedDate, selectedDateRange } = useActiveCalendarSelection()
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
  const [search, setSearch] = useTodoSearch()
  const [pageSort, setPageSort] = usePageSort()
  const { field: sortField, dir: sortDir } = pageSort
  const [showCompleted] = useShowCompleted()
  const [statusFilter, setStatusFilter] = useStatusFilter()
  const [priorities, setPriorities] = usePriorityFilter()

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

  const today = todayIso()
  const listDef = view.kind === 'smart' ? smartListDef(view.id) : null

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
    if (priorities.length) list = list.filter((todo) => priorities.includes(todo.priority))
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
  }, [c.todos, view, showCompleted, statusFilter, priorities, search, selectedDate, selectedDateRange, today])

  const ordered = React.useMemo(() => {
    if (sortField !== 'auto') return sortTodos(filtered, sortField, sortDir)
    if (view.kind === 'smart' && view.id === 'completed') return completionTimelineSections(filtered).flatMap((section) => section.todos)
    const buckets = bucketTodos(filtered, today)
    return SECTION_ORDER.flatMap((id) => buckets[id])
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

  /** The page can assign shared groups; their definitions live in Settings. */
  const names = allGroups(groups)
  const actions: UiMenuItem[] = [
        { label: uiText('todo.fab.newTodo'), icon: <Plus />, onSelect: openTodoComposer },
        ...(names.length
          ? [
              {
                label: uiText('todo.fab.newTodoIn'),
                icon: <FolderInput />,
                submenu: names.map((name) => ({
                  label: name,
                  onSelect: () => {
                    setView({ kind: 'groups', names: [name] })
                    openTodoComposer()
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
  React.useEffect(() => { setTodoSurfaceActions(actions) })
  React.useEffect(() => () => setTodoSurfaceActions(null), [])

  return (
    <div className="todo-page">
      <div className="todo-page-appbar">
        <h1 className="todo-page-appbar-title" style={{ color: titleColor }}>{title}</h1>
        <div className="todo-search-wrap search-field">
          <Search className="search-field-icon" />
          <input
            className="search-field-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Escape') setSearch('') }}
            placeholder={uiText('todo.table.filterPlaceholder')}
            aria-label={uiText('auto.e0345e9d3092')}
          />
          {search && (
            <button className="search-field-action" type="button" onClick={() => setSearch('')} aria-label={uiText('auto.67300d0fed7c')}>
              <X />
            </button>
          )}
        </div>
        <StatusFacet />
        <PriorityFacet />
        {filteredBy && (
          <button type="button" className="todo-facet-reset" onClick={resetFilters}>
            {uiText('todo.table.reset')}
            <X />
          </button>
        )}
        {(selectedDateRange || selectedDate) && (
          <button
            type="button"
            className="todo-facet-btn active"
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
          <ColumnsButton />
          <button
            type="button"
            className="todo-page-appbar-btn todo-page-add"
            aria-label={uiText('todo.fab.newTodo')}
            title={uiText('todo.fab.newTodo')}
            onClick={openTodoComposer}
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
        />
      )}

      <TodoDetailModal c={c} />
    </div>
  )
}
