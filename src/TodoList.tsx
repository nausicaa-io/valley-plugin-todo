import { React, revealRequestStore } from './runtime'
import { useVisibleRange } from './visibleRange'
import type { ReactElement } from 'react'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import type { TodoGroup } from './groups'
import type { TodoListController } from './controller'
import { TodoRow } from './TodoRow'

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

  const moveFocus = React.useCallback((from: number, delta: number): void => {
    const next = todos[Math.max(0, Math.min(todos.length - 1, from + delta))]
    if (next) show(next.id, '.todo-row')
  }, [todos, show])

  return (
    <div className="todo-list-rows" ref={visible.ref}>
      {visible.render(index => <TodoRow
        key={todos[index].id}
        todo={todos[index]}
        groups={groups}
        compact={compact}
        c={c}
        hideDate={hideDate}
        onMoveFocus={delta => moveFocus(index, delta)}
      />)}
    </div>
  )
}
