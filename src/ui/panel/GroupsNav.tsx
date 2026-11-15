import { React } from '../../runtime'
import type { DragEvent, ReactElement } from 'react'
import { ChevronDown, ChevronRight, ChevronsDownUp, ChevronsUpDown } from '../icons'
import { groupDropPlacement, moveGroup, useCollapsedGroups, type useGroups } from '../../state/groupStore'
import type { TodoGroup } from '../../model/groups'
import { uiText } from '../../localization'

/**
 * The sidebar's Groups list: a group with subgroups folds, and rows drag to a
 * new place. `row` draws one group's list row; the fold chevron and the drag
 * handling around it live here.
 */
export function GroupsNav({ groups, row }: {
  groups: ReturnType<typeof useGroups>
  row: (group: TodoGroup) => ReactElement
}): ReactElement {
  const [collapsedGroups, toggleCollapsedGroup, setCollapsedGroups] = useCollapsedGroups()
  const foldableGroups = React.useMemo(() => groups.filter((group) => groups.some((candidate) => candidate.parent === group.id)).map((group) => group.id), [groups])
  const allGroupsFolded = foldableGroups.length > 0 && foldableGroups.every((id) => collapsedGroups.has(id))
  const draggedGroup = React.useRef<{ id: string; x: number } | null>(null)
  // The last place the insertion line showed: a drop in the gap between two rows or on the title lands there.
  const pendingGroupDrop = React.useRef<Parameters<typeof moveGroup>[1] | null>(null)
  const [groupDrop, setGroupDrop] = React.useState<{ id: string; position: 'before' | 'after'; nested: boolean } | null>(null)

  return (
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
            {row(group)}
          </div>
        )
      })}
    </div>
  )
}
