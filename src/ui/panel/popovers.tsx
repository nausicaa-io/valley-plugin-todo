import { React } from '../../runtime'
import type { ReactElement } from 'react'
import type { TodoRecord } from '../../types'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { CalendarClock, CreatedSortGlyph, Flag, NameSortGlyph, PriorityGlyph, SortAscending, SortDescending, UpdatedSortGlyph } from '../icons'
import type { useGroups } from '../../state/groupStore'
import { groupColorFor, isSubgroupName } from '../../model/groups'
import { countForGroup, groupCounts } from '../../model/views'
import { SORT_LABEL_KEYS, type SortDir, type SortField } from '../../model/sort'
import { uiText } from '../../localization'

/** The sort and group popovers of the narrow panels (the To-Do sidebar and the note's task panel). */

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
