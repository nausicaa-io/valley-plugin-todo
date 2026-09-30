/**
 * ```todo``` code block — an interactive checklist embedded in a note.
 *
 *   ```todo
 *   tag: #habitats
 *   status: open        (open | completed | all)
 *   due: week           (today | week | overdue)
 *   limit: 8
 *   ```
 *
 * Checking a box completes the real todo (optimistic, with ⌘Z via the todo
 * data layer); the header opens the To-Do page.
 */
import codeBlockExamples from './codeBlockExamples.json'
import { React, api, captureTodoScope } from './runtime'
import type { FC } from 'react'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import { fenceInt, parseFenceParams } from '@valley/plugin-sdk/fenceParams'
import { loadTodoList, onTodoListChanged, updateTodo } from './data'
import { PRIORITIES } from './sort'
import { uiText } from './localization'

const STYLE_ID = 'notes-todo-fence-styles'

function ensureStyles(): void {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
.todo-fence { margin: 0.75em 0; border: 1px solid var(--border-light); border-radius: var(--radius); background: var(--container-color); overflow: hidden; }
.todo-fence-head { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid var(--border-light); cursor: pointer; }
.todo-fence-head .t { font-weight: 600; color: var(--title-color); }
.todo-fence-head .c { font-size: var(--small-font-size); color: var(--text-secondary); }
.todo-fence-row { display: flex; align-items: center; gap: 8px; padding: 6px 12px; }
.todo-fence-row:hover { background: var(--hover-bg); }
/* The same painted round check as the panel rows — the fence has its own
   stylesheet, so this is a deliberate port, not inheritance. */
.todo-fence-row input[type='checkbox'] {
  appearance: none; -webkit-appearance: none; box-sizing: border-box;
  flex: none; width: 16px; height: 16px;
  display: inline-grid; place-content: center;
  border: 1.5px solid color-mix(in srgb, var(--text-secondary) 55%, transparent);
  border-radius: 50%; background: transparent; cursor: pointer;
}
.todo-fence-row input[type='checkbox']:hover { border-color: var(--accent-color); }
.todo-fence-row input[type='checkbox']:checked { border-color: var(--accent-color); background: var(--accent-color); }
.todo-fence-row input[type='checkbox']:checked::after {
  content: ''; width: 9px; height: 9px; background: #fff;
  clip-path: polygon(14% 47%, 5% 58%, 39% 90%, 96% 22%, 85% 12%, 37% 69%);
}
.todo-fence-row .t { flex: 1; min-width: 0; color: var(--text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.todo-fence-row.done .t { text-decoration: line-through; color: var(--text-secondary); }
.todo-fence-row .pri { flex: none; font-weight: 700; }
.todo-fence-row .pri-low { color: var(--text-tertiary); }
.todo-fence-row .pri-medium { color: var(--neutral-color); }
.todo-fence-row .pri-high { color: var(--negative-color); }
.todo-fence-row .due { flex: none; font-size: var(--small-font-size); color: var(--text-secondary); }
.todo-fence-row .due.overdue { color: var(--negative-color); }
.todo-fence-row .tag { flex: none; font-size:0.6875rem; padding: 0 6px; border-radius: 999px; background: var(--accent-tint-bg); color: var(--accent-tint-text); }
.todo-fence-empty { padding: 10px 12px; color: var(--text-secondary); font-size: var(--small-font-size); }
`
  document.head.appendChild(style)
}

const isoToday = (): string => {
  const d = new Date()
  const p = (n: number): string => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

const isoInDays = (days: number): string => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const p = (n: number): string => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

interface FenceFilter {
  tag: string | null
  status: 'open' | 'completed' | 'all'
  due: 'today' | 'week' | 'overdue' | null
  limit: number
}

export function filterFenceTodos(todos: TodoRecord[], filter: FenceFilter): TodoRecord[] {
  const today = isoToday()
  const weekEnd = isoInDays(7)
  const wantedTag = filter.tag ? filter.tag.replace(/^#/, '').toLowerCase() : null
  return todos
    .filter((todo) => {
      if (filter.status === 'open' && todo.completed) return false
      if (filter.status === 'completed' && !todo.completed) return false
      if (wantedTag && !todo.tags.some((t) => t.replace(/^#/, '').toLowerCase() === wantedTag)) return false
      if (filter.due === 'today' && todo.dueDate !== today) return false
      if (filter.due === 'week' && (!todo.dueDate || todo.dueDate > weekEnd)) return false
      if (filter.due === 'overdue' && (!todo.dueDate || todo.dueDate >= today || todo.completed)) return false
      return true
    })
    .sort((a, b) => (a.dueDate || '9999').localeCompare(b.dueDate || '9999'))
    .slice(0, filter.limit)
}

const TodoFence: FC<{ code: string }> = ({ code }) => {
  const [todos, setTodos] = React.useState<TodoRecord[] | null>(null)
  React.useEffect(() => {
    const scope = captureTodoScope()
    let alive = true
    const reload = (): void => {
      void loadTodoList(scope).then((records) => {
        scope.assertActive()
        if (alive) setTodos(records)
      }).catch(() => {})
    }
    reload()
    const off = onTodoListChanged(reload)
    return () => {
      alive = false
      off()
    }
  }, [])

  const params = parseFenceParams(code)
  const rawStatus = (params.values.status ?? 'open').toLowerCase()
  const rawDue = (params.values.due ?? '').toLowerCase()
  const filter: FenceFilter = {
    tag: params.values.tag ?? params.bare ?? null,
    status: rawStatus === 'completed' ? 'completed' : rawStatus === 'all' ? 'all' : 'open',
    due: rawDue === 'today' || rawDue === 'week' || rawDue === 'overdue' ? rawDue : null,
    limit: fenceInt(params, 'limit', 100) ?? 10
  }

  if (!todos) return <div className="todo-fence-empty">{uiText('auto.33ce417454bf')}</div>
  const shown = filterFenceTodos(todos, filter)
  const today = isoToday()

  const toggle = (todo: TodoRecord): void => {
    const next: TodoRecord = {
      ...todo,
      completed: !todo.completed,
      status: !todo.completed ? 'completed' : 'open'
    }
    setTodos((prev) => (prev ? prev.map((t) => (t.id === todo.id ? next : t)) : prev))
    void updateTodo(todo.id, next)
  }

  return (
    <>
      <div
        className="todo-fence-head"
        onClick={(e) => api.workspace.openMainTab({ newTab: api.ui.hasModKey(e) })}
        title={uiText('auto.edbe7ad07b4a')}
      >
        <span className="t">To-Do{filter.tag ? ` · #${filter.tag.replace(/^#/, '')}` : ''}</span>
        <span className="c">
          {shown.length}
          {filter.due ? ` · ${filter.due}` : ''}
        </span>
      </div>
      {shown.length === 0 && <div className="todo-fence-empty">{uiText('auto.a93c9cdad41c')}</div>}
      {shown.map((todo) => (
        <div key={todo.id} className={`todo-fence-row ${todo.completed ? 'done' : ''}`}>
          <input type="checkbox" checked={todo.completed} onChange={() => toggle(todo)} aria-label={todo.title} />
          {todo.priority !== 'normal' && (
            <span className={`pri pri-${todo.priority}`}>
              {PRIORITIES.find((p) => p.id === todo.priority)?.symbol}
            </span>
          )}
          <span className="t">{todo.title}</span>
          {todo.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">
              #{tag.replace(/^#/, '')}
            </span>
          ))}
          {todo.dueDate && (
            <span className={`due ${!todo.completed && todo.dueDate < today ? 'overdue' : ''}`}>{todo.dueDate}</span>
          )}
        </div>
      ))}
    </>
  )
}

/** Register the ```todo``` fence; returns the unregister fn. */
export function registerTodoFence(): () => void {
  const off = api.markdown.registerCodeBlockRenderer('todo', (code, el) => {
    ensureStyles()
    el.classList.add('todo-fence')
    return api.ui.renderReact(el, <TodoFence code={code} />)
  }, { examples: codeBlockExamples.todo })
  return () => {
    off()
    document.getElementById(STYLE_ID)?.remove()
  }
}
