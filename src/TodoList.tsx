import { React, revealRequestStore } from './runtime'
import { useVisibleRange } from './visibleRange'
import type { ReactElement } from 'react'
import type { TodoRecord } from './types'
import type { TodoGroup } from './groups'
import type { TodoListController } from './controller'
import { TodoRow, useRowEnv, useStructuralValue } from './TodoRow'

export const TodoList = ({ todos, groups, compact, hideDate = false, c }: {
  todos: TodoRecord[]
  groups: TodoGroup[]
  compact: boolean
  hideDate?: boolean
  c: TodoListController
}): ReactElement => {
  const reveals = revealRequestStore()
  const reveal = React.useSyncExternalStore(reveals.subscribe, reveals.get, reveals.get)
  const ids = React.useMemo(() => todos.map(todo => todo.id), [todos])
  const visible = useVisibleRange(React, { ids, estimate: compact ? 52 : 84, enabled: todos.length > 80, layoutKey: compact, pinned: [c.editingId, c.menuId, c.lastCreatedId, reveal?.todoId] })
  const show = visible.show
  React.useLayoutEffect(() => {
    if (reveal && ids.includes(reveal.todoId)) show(reveal.todoId)
  }, [reveal, ids, show])

  const env = useRowEnv()
  const rowGroups = useStructuralValue(groups)
  const todosRef = React.useRef(todos)
  todosRef.current = todos
  const moveFocus = React.useCallback((id: string, delta: number): void => {
    const list = todosRef.current
    const from = list.findIndex(todo => todo.id === id)
    const next = list[Math.max(0, Math.min(list.length - 1, from + delta))]
    if (next) show(next.id, '.todo-row')
  }, [show])

  return (
    <div className="todo-list-rows" ref={visible.ref}>
      {visible.render(index => <TodoRow
        key={todos[index].id}
        todo={todos[index]}
        groups={rowGroups}
        compact={compact}
        actions={c.actions}
        pending={c.pendingIds.has(todos[index].id)}
        env={env}
        hideDate={hideDate}
        onMoveFocus={moveFocus}
      />)}
    </div>
  )
}
