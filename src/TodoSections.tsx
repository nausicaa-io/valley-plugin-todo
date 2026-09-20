import type { ReactElement } from 'react'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import { React, revealRequestStore } from './runtime'
import type { TodoListController } from './controller'
import { useVisibleRange } from './visibleRange'

export function TodoSections<T extends { key: string; todos: TodoRecord[] }>({ sections, c, compact = false, className, estimate, layoutKey, children }: {
  sections: readonly T[]
  c: TodoListController
  compact?: boolean
  className?: string
  estimate?: (section: T) => number
  layoutKey?: unknown
  children(section: T): ReactElement
}): ReactElement {
  const reveals = revealRequestStore()
  const reveal = React.useSyncExternalStore(reveals.subscribe, reveals.get, reveals.get)
  const ids = React.useMemo(() => sections.map(section => section.key), [sections])
  const [dragged, setDragged] = React.useState<string | null>(null)
  const retained = new Set([c.editingId, c.menuId, c.lastCreatedId, reveal?.todoId, dragged].filter(Boolean))
  const pinned = sections.filter(section => section.todos.some(todo => retained.has(todo.id))).map(section => section.key)
  const height = React.useCallback((_id: string, index: number) => estimate?.(sections[index]) ?? 32 + sections[index].todos.length * (compact ? 52 : 84), [sections, compact, estimate])
  const visible = useVisibleRange(React, { ids, estimate: height, pinned, layoutKey: layoutKey ?? compact })
  const show = visible.show
  React.useLayoutEffect(() => {
    if (!reveal) return
    const section = sections.find(section => section.todos.some(todo => todo.id === reveal.todoId))
    if (section) show(section.key)
  }, [reveal, sections, show])
  return <div className={className} data-visible-sections={sections.length > 80 || undefined} ref={visible.ref} onDragStartCapture={event => setDragged((event.target as HTMLElement).closest<HTMLElement>('[data-todo-id]')?.dataset.todoId ?? null)} onDragEndCapture={() => setDragged(null)}>{visible.render(index => React.cloneElement(children(sections[index]), { 'data-visible-key': ids[index] }))}</div>
}
