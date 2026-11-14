import { React, api, captureTodoScope } from '../runtime'
import { loadTodoList } from '../data/listCache'
import { onTodoListChanged as onTodosChanged } from '../data/reads'
import {
  countGroupUsage,
  groupKey,
  invalidateGroupFamilies,
  normalizeTodoGroups,
  setGroupColorFallback,
  setGroupFamilySource,
  type TodoGroup
} from '../model/groups'
import { LOCAL_GROUPS_KEY, mergedGroups, normalizeLocalGroups, type LocalGroup } from '../model/localGroups'
import { placeGroup, resolveGroupDrop, type GroupPlacement } from '@valley/plugin-sdk/groups'

export const USE_SHARED_GROUPS_KEY = 'useSharedGroups'
export const USE_LOCAL_GROUPS_KEY = 'useLocalGroups'

/** Whether shared groups (`useSharedGroups`) and To-Do-only groups (`useLocalGroups`) are offered; both default on. */
export function getGroupKinds(): { shared: boolean; local: boolean } {
  const settings = api?.settings.get() ?? {}
  return { shared: settings[USE_SHARED_GROUPS_KEY] !== false, local: settings[USE_LOCAL_GROUPS_KEY] !== false }
}

export function getGlobalGroups(): TodoGroup[] {
  return normalizeTodoGroups(api?.getState().groups)
}

export function getLocalGroups(): LocalGroup[] {
  return normalizeLocalGroups(api?.settings.get()[LOCAL_GROUPS_KEY], getGlobalGroups())
}

export async function setLocalGroups(groups: LocalGroup[]): Promise<void> {
  await api.settings.set(LOCAL_GROUPS_KEY, normalizeLocalGroups(groups, getGlobalGroups()))
}

/** Every shared and To-Do-only group, whatever the switches say: for name checks and a task's saved group colour. */
export function getAllGroups(): TodoGroup[] {
  return mergedGroups(getGlobalGroups(), getLocalGroups())
}

/** The groups To-Do offers and lists: shared and To-Do-only groups, each only while its switch is on. */
export function getGroups(): TodoGroup[] {
  const kinds = getGroupKinds()
  return mergedGroups(kinds.shared ? getGlobalGroups() : [], kinds.local ? getLocalGroups() : [])
}

// A task in a switched-off group keeps its group's own colour.
setGroupColorFallback(getAllGroups)

// A group covers its subgroups in views, filters and counts. The families are
// read again after a change of the shared groups or of To-Do's settings.
let familiesApi: typeof api | undefined
setGroupFamilySource(() => {
  if (api && familiesApi !== api) {
    familiesApi = api
    api.subscribe(invalidateGroupFamilies)
    api.settings.subscribe(invalidateGroupFamilies)
  }
  return api ? getAllGroups() : []
})

export function onGroupsChanged(cb: () => void): () => void {
  const offState = api.subscribe(cb)
  const offSettings = api.settings.subscribe(cb)
  return () => { offState(); offSettings() }
}

export function useGroups(): TodoGroup[] {
  const [groups, setGroups] = React.useState<TodoGroup[]>(getGroups)
  React.useEffect(() => onGroupsChanged(() => setGroups(getGroups())), [])
  return groups
}

export function useAllGroups(): TodoGroup[] {
  const [groups, setGroups] = React.useState<TodoGroup[]>(getAllGroups)
  React.useEffect(() => onGroupsChanged(() => setGroups(getAllGroups())), [])
  return groups
}

export function useGroupKinds(): { shared: boolean; local: boolean } {
  const [kinds, setKinds] = React.useState(getGroupKinds)
  React.useEffect(() => api.settings.subscribe(() => setKinds(getGroupKinds())), [])
  return kinds
}

export function useLocalGroups(): LocalGroup[] {
  const [groups, setGroups] = React.useState<LocalGroup[]>(getLocalGroups)
  React.useEffect(() => onGroupsChanged(() => setGroups(getLocalGroups())), [])
  return groups
}

export const COLLAPSED_GROUPS_KEY = 'collapsedGroups'

/** Ids of the groups whose subgroups the sidebar's Groups list hides. */
export function getCollapsedGroups(): string[] {
  const saved = api?.settings.get()[COLLAPSED_GROUPS_KEY]
  return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === 'string') : []
}

/** The collapsed groups and a toggle that saves the choice. */
export function useCollapsedGroups(): [ReadonlySet<string>, (id: string) => void] {
  const [ids, setIds] = React.useState<string[]>(getCollapsedGroups)
  React.useEffect(() => api.settings.subscribe(() => setIds((current) => {
    const next = getCollapsedGroups()
    return next.length === current.length && next.every((id, index) => id === current[index]) ? current : next
  })), [])
  const toggle = React.useCallback((id: string): void => {
    const current = getCollapsedGroups()
    const next = current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]
    setIds(next)
    void api.settings.set(COLLAPSED_GROUPS_KEY, next)
  }, [])
  return [React.useMemo(() => new Set(ids), [ids]), toggle]
}

const isLocalGroup = (id: string): boolean => /^local-[a-z0-9]{1,32}$/.test(id)

/**
 * Where a group dragged in the sidebar's Groups list lands. A group moves only
 * among its own kind (shared or To-Do-only); `null` for a drop on the other
 * kind or on itself. `hiddenSubgroups` is set for a drop after a collapsed
 * group: the dragged group then lands after that group's hidden subgroups.
 */
export function groupDropPlacement(dragId: string, overId: string, position: 'before' | 'after', nest: boolean, hiddenSubgroups = false): GroupPlacement | null {
  if (isLocalGroup(dragId) !== isLocalGroup(overId)) return null
  const list: readonly { id: string; parent?: string }[] = isLocalGroup(dragId) ? getLocalGroups() : getGlobalGroups()
  const lastHidden = hiddenSubgroups && position === 'after' ? list.filter((group) => group.parent === overId).at(-1) : undefined
  return lastHidden ? resolveGroupDrop(list, dragId, lastHidden.id, 'after', false) : resolveGroupDrop(list, dragId, overId, position, nest)
}

/** Save a group's new place: a shared group in the app-wide registry, a To-Do-only group in To-Do's settings. */
export async function moveGroup(id: string, placement: GroupPlacement): Promise<void> {
  if (isLocalGroup(id)) await setLocalGroups(placeGroup(getLocalGroups(), id, placement))
  else await api.sharedState.mutateGroup({ kind: 'move', id, ...placement })
}

export function startGroupUsageReporting(): () => void {
  const scope = captureTodoScope()
  let cancelled = false
  const push = (): void => {
    void loadTodoList(scope).then((todos) => {
      scope.assertActive()
      if (cancelled) return
      const local = new Set(getLocalGroups().flatMap((group) => [group.name, ...(group.aliases ?? [])]).map(groupKey))
      scope.api.workspace.reportGroupUsage(countGroupUsage(todos.map((todo) => todo.group).filter((name) => !name || !local.has(groupKey(name)))))
    }).catch(() => {})
  }
  push()
  const off = onTodosChanged(push)
  return () => {
    cancelled = true
    off()
    scope.api.workspace.reportGroupUsage({})
  }
}
