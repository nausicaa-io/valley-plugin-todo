import { React, api, captureTodoScope } from './runtime'
import { loadTodoList, onTodoListChanged as onTodosChanged } from './data'
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
  const scope = captureTodoScope()
  let cancelled = false
  const push = (): void => {
    void loadTodoList(scope).then((todos) => {
      scope.assertActive()
      if (!cancelled) scope.api.workspace.reportGroupUsage(countGroupUsage(todos.map((todo) => todo.group)))
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
