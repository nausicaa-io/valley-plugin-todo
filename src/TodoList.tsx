import { React, revealRequestStore } from './runtime'
import { useVisibleRange } from './visibleRange'
import type { DragEvent, ReactElement } from 'react'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import type { TodoGroup } from './groups'
import type { TodoListController } from './controller'
import { TodoRow } from './TodoRow'
import { buildTodoTree, canOutdent, canReparent, indentPatch, outdentPatch, type TodoTreeRow } from './tree'

/**
 * A run of rows, nested.
 *
 * Both surfaces render through this rather than mapping `TodoRow` themselves,
 * because indentation is a property of the *list*, not of a row: what a todo
 * indents under is whatever is drawn above it, so only the thing holding the
 * ordered array can answer it. Keeping that in one place is what stops the
 * sidebar and the page from disagreeing about a todo's parent.
 */
export const TodoList = ({
  todos,
  groups,
  compact,
  hideDate = false,
  c
}: {
  todos: TodoRecord[]
  groups: TodoGroup[]
  compact: boolean
  /** A date section header already names the day — don't repeat it per row. */
  hideDate?: boolean
  c: TodoListController
}): ReactElement => {
  const rows: TodoTreeRow[] = React.useMemo(() => buildTodoTree(todos), [todos])
  const [draggedId, setDraggedId] = React.useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = React.useState<string | null>(null)
  const reveals = revealRequestStore()
  const reveal = React.useSyncExternalStore(reveals.subscribe, reveals.get, reveals.get)
  const ids = React.useMemo(() => rows.map(row => row.todo.id), [rows])
  const visible = useVisibleRange(React, { ids, estimate: compact ? 52 : 84, enabled: c.todos.length > 80, layoutKey: compact, pinned: [c.editingId, c.menuId, draggedId, dropTargetId, c.lastCreatedId, reveal?.todoId] })
  const show = visible.show
  React.useLayoutEffect(() => {
    if (reveal && ids.includes(reveal.todoId)) show(reveal.todoId)
  }, [reveal, ids, show])

  const clearDrag = React.useCallback((): void => {
    setDraggedId(null)
    setDropTargetId(null)
  }, [])

  const canDropOn = React.useCallback((targetId: string): boolean => {
    return !!draggedId && draggedId !== targetId && canReparent(c.todos, draggedId, targetId)
  }, [c.todos, draggedId])

  const startDrag = React.useCallback((id: string, e: DragEvent<HTMLElement>): void => {
    setDraggedId(id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
  }, [])

  const dragOver = React.useCallback((id: string, e: DragEvent<HTMLElement>): void => {
    if (!canDropOn(id)) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDropTargetId(id)
  }, [canDropOn])

  const dragLeave = React.useCallback((id: string, e: DragEvent<HTMLElement>): void => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    if (dropTargetId === id) setDropTargetId(null)
  }, [dropTargetId])

  const drop = React.useCallback((id: string, e: DragEvent<HTMLElement>): void => {
    e.preventDefault()
    if (canDropOn(id) && draggedId) void c.patchTodo(draggedId, { parentId: id })
    clearDrag()
  }, [c, canDropOn, clearDrag, draggedId])

  const moveFocus = React.useCallback((from: number, delta: number): void => {
    const next = rows[Math.max(0, Math.min(rows.length - 1, from + delta))]
    if (next) show(next.todo.id, '.todo-row')
  }, [rows, show])

  return (
    <div className="todo-list-rows" ref={visible.ref}>
      {visible.render(index => {
        const row = rows[index]
        const patch = indentPatch(rows, index)
        return (
          <TodoRow
            key={row.todo.id}
            todo={row.todo}
            groups={groups}
            compact={compact}
            c={c}
            depth={row.depth}
            hideDate={hideDate}
            canIndent={!!patch}
            canOutdent={canOutdent(todos, row.todo.id)}
            onIndent={patch ? () => void c.patchTodo(row.todo.id, patch) : undefined}
            onOutdent={() => {
              const next = outdentPatch(todos, row.todo.id)
              if (next) void c.patchTodo(row.todo.id, next)
            }}
            onMoveFocus={(delta) => moveFocus(index, delta)}
            draggable
            dropTarget={dropTargetId === row.todo.id}
            onDragStart={(e) => startDrag(row.todo.id, e)}
            onDragOver={(e) => dragOver(row.todo.id, e)}
            onDragLeave={(e) => dragLeave(row.todo.id, e)}
            onDrop={(e) => drop(row.todo.id, e)}
            onDragEnd={clearDrag}
          />
        )
      })}
    </div>
  )
}
