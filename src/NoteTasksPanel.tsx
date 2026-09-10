import type { ReactElement } from 'react'
import type { TodoStatus } from '@valley/plugin-sdk/types'
import { normalizeRelPathOpt } from '@valley/plugin-sdk/paths'
import { React, api, useTodoRevealRequest } from './runtime'
import { useHostState } from './hooks'
import { uiText } from './localization'
import { useTodoListController } from './controller'
import { TodoDetailModal } from './TodoDetail'
import { PanelDateList } from './PanelDateList'
import { GroupFilterPopover, PanelSortPopover, sortFieldGlyph } from './TodoPanel'
import { CircleCheck, ComfortableView, CompactView, GroupGlyph, SortAscending, SortDescending, TodoStatusGlyph } from './icons'
import { useGroups } from './groupStore'
import { allGroups, groupKey } from './groups'
import { matchesStatusFilter, useStatusVocabulary, type TodoStatusFilter } from './statuses'
import { useDateBreakdown, usePanelPresentation } from './viewStore'
import { SORT_LABEL_KEYS, type SortDir, type SortField } from './sort'
import { openManageGroups } from './GroupEditor'

function LocalStatusPopover({
  showCompleted,
  setShowCompleted,
  filter,
  setFilter
}: {
  showCompleted: boolean
  setShowCompleted: (show: boolean) => void
  filter: TodoStatusFilter
  setFilter: (filter: TodoStatusFilter) => void
}): ReactElement {
  const defs = useStatusVocabulary()
  const active = defs.map((status) => status.id)
  const selected = filter === 'all' ? active : filter
  const toggle = (status: TodoStatus): void => {
    const next = selected.includes(status)
      ? selected.filter((candidate) => candidate !== status)
      : active.filter((candidate) => selected.includes(candidate) || candidate === status)
    if (next.length) setFilter(next.length === active.length ? 'all' : next as [TodoStatus, ...TodoStatus[]])
  }
  return (
    <div className="todo-filter-popover-body">
      <div className="todo-completed-row">
        <span>{uiText('todo.filters.completed')}</span>
        <div className="todo-completed-choices">
          <button type="button" className={`todo-completed-choice${!showCompleted ? ' active' : ''}`} onClick={() => setShowCompleted(false)}>{uiText('todo.completed.hide')}</button>
          <button type="button" className={`todo-completed-choice${showCompleted ? ' active' : ''}`} onClick={() => setShowCompleted(true)}>{uiText('todo.completed.showAll')}</button>
        </div>
      </div>
      <div className="todo-status-filter-menu local">
        {defs.map((status) => (
          <button
            key={status.id}
            type="button"
            className="todo-status-filter-option"
            aria-pressed={selected.includes(status.id)}
            onClick={() => toggle(status.id)}
          >
            <span className="todo-status-filter-check">{selected.includes(status.id) ? '✓' : ''}</span>
            <span className="todo-status-filter-glyph"><TodoStatusGlyph status={status.id === 'open' ? null : status.id} dotCls={status.cls} /></span>
            <span>{uiText(status.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/** Structured To-Dos linked to the attachment currently open in the workspace. */
export const NoteTasksPanel = (): ReactElement => {
  const { activePath, indexEntries, weekStart } = useHostState()
  const path = normalizeRelPathOpt(activePath) ?? ''
  const groups = useGroups()
  const dateBreakdown = useDateBreakdown()
  const [presentation, patchPresentation] = usePanelPresentation('attachment')
  const { showCompleted, statusFilter, compact, sortField, sortDir, groupNames: selectedGroups, includeUngrouped } = presentation
  const setShowCompleted = (value: boolean): void => patchPresentation({ showCompleted: value })
  const setStatusFilter = (value: TodoStatusFilter): void => patchPresentation({ statusFilter: value })
  const setSortField = (value: SortField): void => patchPresentation({ sortField: value })
  const setSortDir = (value: SortDir): void => patchPresentation({ sortDir: value })
  const c = useTodoListController(sortField, sortDir, 'right_sidebar')
  useTodoRevealRequest(c.openDetail)

  const groupNames = React.useMemo(() => allGroups(groups), [groups])
  const hasUngrouped = React.useMemo(() => c.todos.some((todo) => !todo.group), [c.todos])
  const linked = React.useMemo(() => c.ordered.filter((todo) => {
    const matches = normalizeRelPathOpt(todo.filePath) === path || (todo.attachments ?? []).some((attachment) => normalizeRelPathOpt(attachment) === path)
    if (!matches || (!showCompleted && todo.completed)) return false
    if (selectedGroups.length || includeUngrouped) {
      if (!todo.group && !includeUngrouped) return false
      if (todo.group && !new Set(selectedGroups.map(groupKey)).has(groupKey(todo.group))) return false
    }
    return matchesStatusFilter(todo, statusFilter)
  }), [c.ordered, path, showCompleted, statusFilter, selectedGroups, includeUngrouped])

  const openGroups = (anchor: HTMLElement): void => {
    void api.ui.openPopover(
      ({ close }) => (
        <GroupFilterPopover
          todos={c.todos}
          groups={groups}
          names={groupNames}
          hasUngrouped={hasUngrouped}
          selected={selectedGroups}
          includeUngrouped={includeUngrouped}
          onChange={(groupNames, nextUngrouped) => patchPresentation({ groupNames, includeUngrouped: nextUngrouped })}
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

  const openStatus = (anchor: HTMLElement): void => {
    void api.ui.openPopover(
      () => <LocalStatusPopover showCompleted={showCompleted} setShowCompleted={setShowCompleted} filter={statusFilter} setFilter={setStatusFilter} />,
      { anchor, align: 'end' },
      { className: 'todo-filter-popover', ariaLabel: uiText('todo.filters.statusAndCompleted') }
    )
  }
  const openSort = (anchor: HTMLElement): void => {
    void api.ui.openPopover(
      () => <PanelSortPopover sortField={sortField} setSortField={setSortField} sortDir={sortDir} setSortDir={setSortDir} />,
      { anchor, align: 'end' },
      { className: 'todo-sort-popover', ariaLabel: uiText('auto.63e08dc2a4e3') }
    )
  }

  return (
    <div className="todo-panel note-tasks-panel">
      <header className="panel-header">
        <span className="panel-title">{uiText('todo.attachmentTasks.title')}</span>
        <div className="todo-header-actions">
          <button className={`todo-menu-btn todo-groups-menu-btn${selectedGroups.length || includeUngrouped ? ' active' : ''}`} type="button" aria-label={uiText('todo.view.groups')} title={uiText('todo.view.groups')} onClick={(event) => openGroups(event.currentTarget)}><GroupGlyph /></button>
          <button className={`todo-menu-btn todo-status-menu-btn${showCompleted || statusFilter !== 'all' ? ' active' : ''}`} type="button" aria-label={uiText('todo.filters.statusAndCompleted')} title={uiText('todo.filters.statusAndCompleted')} onClick={(event) => openStatus(event.currentTarget)}><CircleCheck /></button>
          <button className="todo-menu-btn todo-density-menu-btn" type="button" aria-pressed={compact} aria-label={uiText('auto.e3719eae891e')} onClick={() => patchPresentation({ compact: !compact })}>{compact ? <CompactView /> : <ComfortableView />}</button>
          <button className="todo-menu-btn todo-sort-menu-btn" type="button" aria-label={uiText('auto.63e08dc2a4e3')} title={`${sortDir === 'asc' ? uiText('auto.4fee0a06b6e4') : uiText('auto.01e635f27ec2')} · ${uiText(SORT_LABEL_KEYS[sortField])}`} onClick={(event) => openSort(event.currentTarget)}>{sortDir === 'asc' ? <SortAscending /> : <SortDescending />}{sortFieldGlyph(sortField)}</button>
        </div>
      </header>
      <div className="todo-list">
        {c.loading ? (
          <div className="right-sidebar-empty"><p>{uiText('auto.b5868978587a')}</p></div>
        ) : !path ? (
          <div className="right-sidebar-empty"><p>{uiText('todo.attachmentTasks.noFile')}</p></div>
        ) : linked.length ? (
          <PanelDateList todos={linked} groups={groups} compact={compact} controller={c} mode={dateBreakdown} weekStart={weekStart} />
        ) : (
          <div className="right-sidebar-empty"><p>{uiText('todo.attachmentTasks.none')}</p></div>
        )}
      </div>
      <TodoDetailModal c={c} indexEntries={indexEntries} />
    </div>
  )
}
