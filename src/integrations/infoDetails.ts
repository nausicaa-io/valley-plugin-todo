import { WORKSPACE_DETAILS_V1, type WorkspaceDetailItem, type WorkspaceDetailValue, type WorkspaceDetailsProvider } from '@valley/plugin-sdk'
import { api } from '../runtime'
import type { TodoRecord } from '../types'
import { englishText, uiText } from '../localization'
import { isoDay } from '../model/sort'
import { endOfWeek } from '../model/views'
import { getSharedTodos, onSharedTodos } from '../state/sharedTodos'

/**
 * To-Do's Footer details (14 Nov): the title and six counts, to do and
 * completed for Today, This week and All. Nothing else is offered. Each count
 * reads "name · number" in the footer; Info lists the same six as rows, with
 * the bare number beside the name.
 */
const PERIODS = ['today', 'week', 'all'] as const
const COUNT_ROWS = PERIODS.flatMap((period) => [`${period}Todo`, `${period}Completed`])

const countItem = (id: string): WorkspaceDetailItem => ({ id, label: englishText(`todo.info.${id}`), labelKey: `todo.info.${id}`, kind: 'text' })

/**
 * To do and completed per period, in one walk over the tasks. Today and This
 * week are the smart lists' scopes: due on or before today, or before the end
 * of the week, overdue included.
 */
function countValues(todos: readonly TodoRecord[], today: string): Record<string, WorkspaceDetailValue> {
  const weekEnd = endOfWeek(today)
  const counts = { todayTodo: 0, todayCompleted: 0, weekTodo: 0, weekCompleted: 0, allTodo: 0, allCompleted: 0 }
  for (const todo of todos) {
    const state = todo.completed ? 'Completed' : 'Todo'
    counts[`all${state}`]++
    const due = todo.dueDate ? todo.dueDate.slice(0, 10) : ''
    if (!due) continue
    if (due <= today) counts[`today${state}`]++
    if (due <= weekEnd) counts[`week${state}`]++
  }
  const values: Record<string, WorkspaceDetailValue> = {}
  for (const id of COUNT_ROWS) {
    const count = counts[id as keyof typeof counts]
    values[id] = { text: `${uiText(`todo.info.${id}`)} · ${count}`, value: count }
  }
  return values
}

export function registerInfoDetails(): () => void {
  const listeners = new Set<() => void>()
  let counted: { todos: readonly TodoRecord[]; today: string; language: string; snapshot: { items: Record<string, WorkspaceDetailValue> } } | null = null
  const provider: WorkspaceDetailsProvider = {
    id: 'todo.details', label: 'To-Do', labelKey: 'manifest.name', pluginViews: true,
    items: [{ id: 'title', label: 'Title', labelKey: 'details.item.title', kind: 'text' }, ...COUNT_ROWS.map(countItem)],
    defaultItems: ['title'],
    subscribe: (listener) => { listeners.add(listener); return () => { listeners.delete(listener) } },
    getSnapshot: () => {
      // The footer and the Info tab both ask after every change; they share one count per list, day and language.
      const todos = getSharedTodos(), today = isoDay(), language = api.ui.language()
      if (!counted || counted.todos !== todos || counted.today !== today || counted.language !== language) {
        counted = { todos, today, language, snapshot: { items: countValues(todos, today) } }
      }
      return counted.snapshot
    }
  }
  const off = api.interop.extensions.provide(WORKSPACE_DETAILS_V1, provider)
  const refresh = (): void => { for (const listener of [...listeners]) listener() }
  const offs = [onSharedTodos(refresh), api.subscribeState(['activePluginTab'], refresh)]
  return () => { for (const stop of offs) stop(); off(); listeners.clear() }
}
