import { React, api, captureTodoScope } from './runtime'
import { loadTodoList, onTodoListChanged as onTodosChanged } from './data'
import {
  countGroupUsage,
  groupKey,
  normalizeTodoGroups,
  setGroupColorFallback,
  type TodoGroup
} from './groups'
import { LOCAL_GROUPS_KEY, mergedGroups, normalizeLocalGroups, type LocalGroup } from './localGroups'

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
