import type { ReactElement } from 'react'
import { React, api } from '../../runtime'
import {
  GripVertical,
  Plus,
  X
} from '../icons'
import { uiText } from '../../localization'
import { loadTodoList } from '../../data/listCache'
import { onTodoListChanged } from '../../data/reads'
import { USE_LOCAL_GROUPS_KEY, USE_SHARED_GROUPS_KEY, setLocalGroups, useAllGroups, useGroupKinds, useLocalGroups } from '../../state/groupStore'
import { groupKey, nextGroupColor } from '../../model/groups'
import { groupFamily, placeGroup, resolveGroupDrop, stepGroup, subgroupsOf, type GroupPlacement } from '@valley/plugin-sdk/groups'
import { LOCAL_GROUP_LIMIT, LOCAL_GROUP_NAME_MAX, newLocalGroupId, renameLocalGroup, type LocalGroup } from '../../model/localGroups'

import { CommitTextField } from './shared'

/**
 * Individual groups: To-Do-only lists beside the shared ones, edited exactly
 * like Settings → Appearance → Groups (grip, name, colour, usage, remove, and an
 * add row on the same columns). A rename keeps the old name as an alias, so
 * tasks that carry it still resolve. A group is removed only once no task uses
 * it, like a shared group.
 */
function LocalGroupsSettings(): ReactElement {
  const { Button, ColorField, IconButton, Section, useReorderDrag } = api.ui.settings
  const local = useLocalGroups()
  // Names must stay unique across both kinds, including a switched-off one.
  const groups = useAllGroups()
  const todos = useTodoGroupNames()
  const draft = React.useRef('')
  const [addKey, setAddKey] = React.useState(0)
  const [draftColor, setDraftColor] = React.useState(() => nextGroupColor(groups))
  const [duplicate, setDuplicate] = React.useState(false)
  const taken = (name: string, except?: string): boolean => groups.some((group) => group.id !== except && [group.name, ...(group.aliases ?? [])].some((candidate) => groupKey(candidate) === groupKey(name)))
  const save = (next: LocalGroup[]): void => { void setLocalGroups(next) }
  const usage = (group: LocalGroup): number => {
    const names = new Set([group.name, ...(group.aliases ?? [])].map(groupKey))
    return todos.filter((name) => names.has(groupKey(name))).length
  }
  // A group's count covers its subgroups, like a shared group's.
  const total = (group: LocalGroup): number => groupFamily(local, group).reduce((sum, member) => sum + usage(member), 0)
  // A pointer this far right of a row's left edge asks for a subgroup where the slot allows both levels.
  const NEST_OFFSET = 28
  const [nest, setNest] = React.useState(false)
  const [subgroupOf, setSubgroupOf] = React.useState<string | null>(null)
  const [subColor, setSubColor] = React.useState(() => nextGroupColor(groups))
  const [subDuplicate, setSubDuplicate] = React.useState(false)
  const subRow = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => { if (subgroupOf) subRow.current?.querySelector('input')?.focus() }, [subgroupOf])
  const place = (id: string, placement: GroupPlacement | null): void => {
    if (!placement) return
    let next: LocalGroup[]
    try { next = placeGroup(local, id, placement) } catch { return }
    if (next.every((group, index) => group.id === local[index]?.id && group.parent === local[index]?.parent)) return
    save(next)
  }
  const reorder = useReorderDrag({
    items: local,
    indicatorOnly: true,
    getId: (group) => group.id,
    getLabel: (group) => group.name,
    // Pointer drops are resolved in `dropProps`; this is the keyboard path, which keeps a group on its level.
    onReorder: (_next, move) => {
      const edge = move.position === 'before' ? local[0]?.id : local.at(-1)?.id
      place(move.activeId, stepGroup(local, move.activeId, move.position, move.overId === edge))
    }
  })
  const wantsNest = (event: React.DragEvent<HTMLElement>): boolean => event.clientX > event.currentTarget.getBoundingClientRect().left + NEST_OFFSET
  const dropProps = (group: LocalGroup): ReturnType<typeof reorder.getItemProps> => {
    const props = reorder.getItemProps(group)
    return {
      ...props,
      onDragOver: (event) => { props.onDragOver?.(event); setNest(wantsNest(event)) },
      onDrop: (event) => {
        const dragId = reorder.activeId ?? event.dataTransfer.getData('text/plain')
        if (!dragId) return
        event.preventDefault()
        const rect = event.currentTarget.getBoundingClientRect()
        place(dragId, resolveGroupDrop(local, dragId, group.id, event.clientY < rect.top + rect.height / 2 ? 'before' : 'after', wantsNest(event)))
        reorder.cancel()
      }
    }
  }
  // The insertion line sits where the group will land, indented when it lands as a subgroup.
  const target = reorder.activeId && reorder.overId && reorder.dropPosition
    ? resolveGroupDrop(local, reorder.activeId, reorder.overId, reorder.dropPosition, nest)
    : null
  const dropClass = (group: LocalGroup, index: number): string => {
    if (!target) return ''
    const nested = target.parent !== null ? ' drop-nested' : ''
    if (target.before !== null) return target.before === group.id ? ' drop-before' + nested : ''
    const scope = target.parent === null ? local : local.filter((entry) => entry.id === target.parent || entry.parent === target.parent)
    const last = scope.filter((entry) => entry.id !== reorder.activeId && entry.parent !== reorder.activeId).at(-1) ?? local[index]
    return last.id === group.id ? ' drop-after' + nested : ''
  }
  const openSubgroup = (): void => { setSubDuplicate(false); setSubColor(nextGroupColor(groups)) }
  const addSubgroup = (value: string): void => {
    const name = value.trim().slice(0, LOCAL_GROUP_NAME_MAX)
    if (!subgroupOf || !name || local.length >= LOCAL_GROUP_LIMIT) { setSubgroupOf(null); return }
    if (taken(name)) { setSubDuplicate(true); return }
    const created: LocalGroup = { id: newLocalGroupId(), name, color: subColor }
    try { save(placeGroup([...local, created], created.id, { parent: subgroupOf, before: null })) } catch { /* the group it belonged under is gone */ }
    setSubgroupOf(null)
  }
  const add = (): void => {
    const name = draft.current.trim().slice(0, LOCAL_GROUP_NAME_MAX)
    if (!name || local.length >= LOCAL_GROUP_LIMIT) return
    if (taken(name)) { setDuplicate(true); return }
    const created: LocalGroup = { id: newLocalGroupId(), name, color: draftColor }
    save([...local, created])
    draft.current = ''
    setDuplicate(false)
    setDraftColor(nextGroupColor([...groups, created]))
    setAddKey((key) => key + 1)
  }
  const rename = (group: LocalGroup, value: string): void => {
    if (!value.trim() || value.trim() === group.name || taken(value, group.id)) return
    save(local.map((candidate) => candidate.id === group.id ? renameLocalGroup(candidate, value) : candidate))
  }
  return (
    <Section>
      <div className="settings-path-row settings-groups-row">
      <span className="settings-toggle-text">
        <span className="settings-toggle-title">{uiText('todo.settings.localGroups')}</span>
        <span className="settings-toggle-desc">{uiText('todo.settings.localGroupsDesc')}</span>
      </span>
      <div className="settings-colorrules settings-groups todo-local-groups" role="list" aria-label={uiText('todo.settings.localGroups')}>
        {local.map((group, index) => {
          // Host-drawn controls are matched to their slot, so a moved row
          // remounts them; otherwise they keep the values of the row that was there.
          const slot = `${group.id}@${index}`
          const handleProps = reorder.getHandleProps(group)
          const subgroups = subgroupsOf(local, group.id).length
          const count = group.parent ? usage(group) : total(group)
          const blocked = count > 0 || subgroups > 0
          const draftHere = subgroupOf !== null && (local[index + 1]?.parent ?? null) !== subgroupOf
            && (group.id === subgroupOf || group.parent === subgroupOf)
          return (
            <React.Fragment key={group.id}>
            <div
              role="listitem"
              className={'settings-colorrule-row' + (group.parent ? ' settings-group-sub' : '') + dropClass(group, index)}
              {...dropProps(group)}
            >
              <button {...handleProps} className={(handleProps.className ?? '') + ' settings-colorrule-grip'}>
                <GripVertical />
              </button>
              <CommitTextField
                key={`name:${group.id}:${group.name}`}
                className="settings-colorrule-key"
                initial={group.name}
                ariaLabel={uiText('todo.settings.localGroupName')}
                onCommit={(value) => rename(group, value)}
              />
              <ColorField
                key={`color:${slot}`}
                value={group.color}
                onChange={(color) => save(local.map((candidate) => candidate.id === group.id ? { ...candidate, color } : candidate))}
                ariaLabel={uiText('todo.settings.localGroupColor', { p0: group.name })}
              />
              {group.parent
                ? <span aria-hidden="true" />
                : (
                  <IconButton
                    key={`addsub:${slot}`}
                    className="settings-group-addsub"
                    ariaLabel={uiText('todo.settings.localSubgroupAddTo', { p0: group.name })}
                    title={uiText('todo.settings.localSubgroupAdd')}
                    onClick={() => { openSubgroup(); setSubgroupOf(group.id) }}
                  >
                    <Plus />
                  </IconButton>
                )}
              <span
                className="settings-group-usage"
                aria-label={uiText('todo.settings.localGroupUsage', { count })}
                title={uiText('todo.settings.localGroupUsage', { count })}
              >{count}</span>
              {/* aria-disabled, not disabled, like the shared list: the hint
                  explaining why removal is refused stays reachable on hover. */}
              <IconButton
                key={`remove:${slot}`}
                className="settings-colormap-remove"
                aria-disabled={blocked || undefined}
                ariaLabel={uiText('todo.settings.localGroupDelete', { p0: group.name })}
                title={count > 0 ? uiText('todo.settings.localGroupRemoveBlocked', { count }) : subgroups > 0 ? uiText('todo.settings.localGroupRemoveSubgroups') : uiText('todo.settings.localGroupRemove')}
                onClick={() => { if (!blocked) save(local.filter((candidate) => candidate.id !== group.id)) }}
              >
                <X />
              </IconButton>
            </div>
            {draftHere && (
              <div ref={subRow} className="settings-colorrule-row settings-group-sub">
                <span className="settings-colorrule-grip settings-colorrule-grip-placeholder" aria-hidden="true" />
                <CommitTextField
                  className="settings-colorrule-key"
                  initial=""
                  invalid={subDuplicate}
                  placeholder={uiText('todo.settings.localSubgroupNew')}
                  ariaLabel={uiText('todo.settings.localSubgroupNew')}
                  onType={() => setSubDuplicate(false)}
                  onCommit={addSubgroup}
                />
                <ColorField
                  key={`sub-color:${subgroupOf}`}
                  value={subColor}
                  onChange={setSubColor}
                  ariaLabel={uiText('todo.settings.localGroupNewColor')}
                />
              </div>
            )}
            </React.Fragment>
          )
        })}
        {reorder.liveRegion}
        <div className="settings-colorrule-row settings-colorrule-add">
          <span className="settings-colorrule-grip settings-colorrule-grip-placeholder" aria-hidden="true" />
          <CommitTextField
            key={`add:${addKey}`}
            className="settings-colorrule-key"
            initial=""
            invalid={duplicate}
            placeholder={uiText('todo.settings.localGroupNew')}
            ariaLabel={uiText('todo.settings.localGroupNew')}
            onType={(value) => { draft.current = value; setDuplicate(false) }}
            onCommit={(value) => { draft.current = value }}
            onEnter={add}
          />
          <ColorField
            key={`add-color:${addKey}`}
            value={draftColor}
            onChange={setDraftColor}
            ariaLabel={uiText('todo.settings.localGroupNewColor')}
          />
          <span aria-hidden="true" />
          <span className="settings-colorrule-add-action">
            <span className="settings-button settings-button--medium settings-colorrule-add-sizer" aria-hidden="true">{uiText('todo.settings.localGroupAdd')}</span>
            <Button type="button" className="settings-colormap-add-btn" disabled={local.length >= LOCAL_GROUP_LIMIT} onClick={add}>{uiText('todo.settings.localGroupAdd')}</Button>
          </span>
        </div>
        {(duplicate || subDuplicate) && <span className="settings-empty-text">{uiText('todo.settings.localGroupDuplicate')}</span>}
      </div>
      </div>
    </Section>
  )
}

/**
 * Shared groups and To-Do-only groups, each behind its own switch. A kind
 * that is off is neither offered nor listed in To-Do; tasks keep their group.
 */
export function GroupsSettings(): ReactElement {
  const { GroupsEditor, Row, Section, Toggle } = api.ui.settings
  const kinds = useGroupKinds()
  return (
    <>
      <Section>
        <Row title={uiText('todo.settings.useSharedGroups')} description={uiText('todo.settings.useSharedGroupsDesc')}>
          <Toggle checked={kinds.shared} label={uiText('todo.settings.useSharedGroups')} onChange={(on) => { void api.settings.set(USE_SHARED_GROUPS_KEY, on) }} />
        </Row>
        <Row title={uiText('todo.settings.useLocalGroups')} description={uiText('todo.settings.useLocalGroupsDesc')}>
          <Toggle checked={kinds.local} label={uiText('todo.settings.useLocalGroups')} onChange={(on) => { void api.settings.set(USE_LOCAL_GROUPS_KEY, on) }} />
        </Row>
      </Section>
      {kinds.shared && (
        <Section>
          <GroupsEditor />
        </Section>
      )}
      {kinds.local && <LocalGroupsSettings />}
    </>
  )
}

/** The group name each task carries, kept current, for the usage counts. */
function useTodoGroupNames(): string[] {
  const [names, setNames] = React.useState<string[]>([])
  React.useEffect(() => {
    let active = true
    const load = (): void => { void loadTodoList().then((todos) => { if (active) setNames(todos.flatMap((todo) => todo.group ? [todo.group] : [])) }).catch(() => {}) }
    load()
    const off = onTodoListChanged(load)
    return () => { active = false; off() }
  }, [])
  return names
}
