import { React, api } from './runtime'
import { loadTodos, onChanged as onTodosChanged } from './data'
import {
  countGroupUsage,
  normalizeTodoGroups,
  type TodoGroup
} from './groups'

export function getGlobalGroups(): TodoGroup[] {
  return normalizeTodoGroups(api.getState().groups)
}

export function getGroups(): TodoGroup[] {
  return getGlobalGroups()
}

export function onGroupsChanged(cb: () => void): () => void {
  return api.subscribe(cb)
}

export function useGroups(): TodoGroup[] {
  const [groups, setGroups] = React.useState<TodoGroup[]>(getGroups)
  React.useEffect(() => api.subscribe(() => setGroups(getGroups())), [])
  return groups
}

export function startGroupUsageReporting(): () => void {
  let cancelled = false
  const push = (): void => {
    void loadTodos().then((todos) => {
      if (!cancelled) api.workspace.reportGroupUsage(countGroupUsage(todos.map((todo) => todo.group)))
    })
  }
  push()
  const off = onTodosChanged(push)
  return () => {
    cancelled = true
    off()
    api.workspace.reportGroupUsage({})
  }
}
