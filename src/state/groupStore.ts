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

function getGlobalGroups(): TodoGroup[] {
  return normalizeTodoGroups(api?.getState().groups)
}

const savedLocalGroups = (): LocalGroup[] => normalizeLocalGroups(api?.settings.get()[LOCAL_GROUPS_KEY], getGlobalGroups())

/**
 * The To-Do-only groups just saved, shown until the settings hold them. Saving
 * is a round trip, and a colour, name or place that only changed when it came
 * back made To-Do-only groups feel slower than shared ones.
 */
let unsavedLocalGroups: { groups: LocalGroup[] } | null = null
const localGroupListeners = new Set<() => void>()

function showLocalGroups(next: typeof unsavedLocalGroups): void {
  unsavedLocalGroups = next
  invalidateGroupFamilies()
  for (const listener of [...localGroupListeners]) listener()
}

function getLocalGroups(): LocalGroup[] {
  return unsavedLocalGroups?.groups ?? savedLocalGroups()
}

export async function setLocalGroups(groups: LocalGroup[]): Promise<void> {
  const shown = { groups: normalizeLocalGroups(groups, getGlobalGroups()) }
  showLocalGroups(shown)
  // Only the latest save decides when the saved value takes over again.
  const settle = (): void => { if (unsavedLocalGroups === shown) showLocalGroups(null) }
  try {
    await api.settings.set(LOCAL_GROUPS_KEY, shown.groups)
  } catch (error) {
    settle()
    throw error
  }
  if (JSON.stringify(savedLocalGroups()) === JSON.stringify(shown.groups)) { settle(); return }
  // The save is accepted but the settings have not reported it yet: wait for that report, a moment at most.
  const done = (): void => { off(); clearTimeout(timer); settle() }
  const off = api.settings.subscribe(done)
  const timer = setTimeout(done, 2000)
}

const GROUP_ORDER_KEY = 'groupOrder'

/**
 * To-Do's own order of the top-level groups, set by dragging in the sidebar's
 * Groups list: shared and To-Do-only groups in one sequence. A group the order
 * does not name yet comes after the named ones, shared before To-Do-only.
 * Subgroups stay behind their group in their owner's order.
 */
function inListOrder(groups: TodoGroup[]): TodoGroup[] {
  const saved = api?.settings.get()[GROUP_ORDER_KEY]
  const order = Array.isArray(saved) ? saved.filter((id): id is string => typeof id === 'string') : []
  if (!order.length) return groups
  const rank = new Map(order.map((id, index) => [id, index]))
  return groups
    .filter((group) => group.parent === undefined)
    .map((group, index) => ({ group, at: rank.get(group.id) ?? order.length + index }))
    .sort((a, b) => a.at - b.at)
    .flatMap(({ group }) => [group, ...groups.filter((candidate) => candidate.parent === group.id)])
}

/** Every shared and To-Do-only group, whatever the switches say: for name checks and a task's saved group colour. */
export function getAllGroups(): TodoGroup[] {
  return inListOrder(mergedGroups(getGlobalGroups(), getLocalGroups()))
}

/** The groups To-Do offers and lists: shared and To-Do-only groups, each only while its switch is on. */
export function getGroups(): TodoGroup[] {
  const kinds = getGroupKinds()
  return inListOrder(mergedGroups(kinds.shared ? getGlobalGroups() : [], kinds.local ? getLocalGroups() : []))
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
  localGroupListeners.add(cb)
  return () => { offState(); offSettings(); localGroupListeners.delete(cb) }
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

const COLLAPSED_GROUPS_KEY = 'collapsedGroups'

/** Ids of the groups whose subgroups the sidebar's Groups list hides. */
function getCollapsedGroups(): string[] {
  const saved = api?.settings.get()[COLLAPSED_GROUPS_KEY]
  return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === 'string') : []
}

/** The collapsed groups, a toggle for one group and a setter for all of them; each saves the choice. */
export function useCollapsedGroups(): [ReadonlySet<string>, (id: string) => void, (ids: string[]) => void] {
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
  const setAll = React.useCallback((next: string[]): void => {
    setIds(next)
    void api.settings.set(COLLAPSED_GROUPS_KEY, next)
  }, [])
  return [React.useMemo(() => new Set(ids), [ids]), toggle, setAll]
}

const isLocalGroup = (id: string): boolean => /^local-[a-z0-9]{1,32}$/.test(id)

/**
 * Where a group dragged in the sidebar's Groups list lands. `sideways` is the
 * pointer's travel since the drag began: to the right asks for a subgroup, to
 * the left for the top level, and without either the group keeps its level
 * where the slot allows both. A group never becomes a subgroup of the other
 * kind (shared or To-Do-only): such a drop lands after that group's subgroups.
 * `hiddenSubgroups` is set for a drop after a collapsed group, which lands
 * after its hidden subgroups. `null` for a drop on the dragged group itself.
 */
export function groupDropPlacement(dragId: string, overId: string, position: 'before' | 'after', sideways: -1 | 0 | 1, hiddenSubgroups = false): GroupPlacement | null {
  const list = getGroups()
  const dragged = list.find((group) => group.id === dragId)
  if (!dragged) return null
  const nest = sideways > 0 || (sideways === 0 && dragged.parent !== undefined)
  const lastHidden = hiddenSubgroups && position === 'after' ? list.filter((group) => group.parent === overId).at(-1) : undefined
  const placement = lastHidden ? resolveGroupDrop(list, dragId, lastHidden.id, 'after', false) : resolveGroupDrop(list, dragId, overId, position, nest)
  if (!placement || placement.parent === null || isLocalGroup(placement.parent) === isLocalGroup(dragId)) return placement
  const rest = list.filter((group) => group.id !== dragId && group.parent !== dragId)
  const after = rest.slice(rest.findIndex((group) => group.id === placement.parent) + 1).find((group) => group.parent === undefined)
  return { parent: null, before: after?.id ?? null }
}

/**
 * Save a dragged group's new place. The order of the top-level groups is
 * To-Do's own (`groupOrder`), so shared and To-Do-only groups mix freely here
 * without changing the order other plugins see. A subgroup's group and its
 * place among the subgroups belong to the group's owner: the shared registry
 * or To-Do's own groups.
 */
export async function moveGroup(id: string, placement: GroupPlacement): Promise<void> {
  const inOwner = async (target: GroupPlacement): Promise<void> => {
    if (isLocalGroup(id)) await setLocalGroups(placeGroup(getLocalGroups(), id, target))
    else await api.sharedState.mutateGroup({ kind: 'move', id, ...target })
  }
  if (placement.parent !== null) { await inOwner(placement); return }
  const all = getAllGroups()
  const top = all.filter((group) => group.parent === undefined && group.id !== id).map((group) => group.id)
  const at = placement.before === null ? -1 : top.indexOf(placement.before)
  top.splice(at < 0 ? top.length : at, 0, id)
  await api.settings.set(GROUP_ORDER_KEY, top)
  if (all.find((group) => group.id === id)?.parent !== undefined) await inOwner({ parent: null, before: null })
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
