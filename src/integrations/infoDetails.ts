import { WORKSPACE_DETAILS_V1, type WorkspaceDetailItem, type WorkspaceDetailValue, type WorkspaceDetailsProvider } from '@valley/plugin-sdk'
import { api } from '../runtime'
import type { TodoRecord } from '../types'
import { englishText, uiText } from '../localization'
import { isoDay } from '../model/sort'
import { matchesViewScope, type TodoView } from '../model/views'
import { getSharedTodos, onSharedTodos } from '../state/sharedTodos'

/**
 * To-Do's Footer details (14 Nov): the title and six counts, to do and
 * completed for Today, This week and All. Nothing else is offered. Each count
 * reads "name · number" in the footer; Info lists the same six as rows, with
 * the bare number beside the name.
 */
const PERIODS: { id: string; view: TodoView | null }[] = [
  { id: 'today', view: { kind: 'smart', id: 'today' } },
  { id: 'week', view: { kind: 'smart', id: 'week' } },
  { id: 'all', view: null }
]
const COUNT_ROWS = PERIODS.flatMap((period) => [`${period.id}Todo`, `${period.id}Completed`])

const countItem = (id: string): WorkspaceDetailItem => ({ id, label: englishText(`todo.info.${id}`), labelKey: `todo.info.${id}`, kind: 'text' })

function countValues(todos: readonly TodoRecord[], today: string): Record<string, WorkspaceDetailValue> {
  const values: Record<string, WorkspaceDetailValue> = {}
  for (const period of PERIODS) {
    const inPeriod = period.view ? todos.filter((todo) => matchesViewScope(todo, period.view as TodoView, today)) : todos
    const completed = inPeriod.filter((todo) => todo.completed).length
    for (const [id, count] of [[`${period.id}Todo`, inPeriod.length - completed], [`${period.id}Completed`, completed]] as const) {
      values[id] = { text: `${uiText(`todo.info.${id}`)} · ${count}`, value: count }
    }
  }
  return values
}

export function registerInfoDetails(): () => void {
  const listeners = new Set<() => void>()
  const provider: WorkspaceDetailsProvider = {
    id: 'todo.details', label: 'To-Do', labelKey: 'manifest.name', pluginViews: true,
    items: [{ id: 'title', label: 'Title', labelKey: 'details.item.title', kind: 'text' }, ...COUNT_ROWS.map(countItem)],
    defaultItems: ['title'],
    subscribe: (listener) => { listeners.add(listener); return () => { listeners.delete(listener) } },
    getSnapshot: () => ({ items: countValues(getSharedTodos(), isoDay()) })
  }
  const off = api.interop.extensions.provide(WORKSPACE_DETAILS_V1, provider)
  const refresh = (): void => { for (const listener of [...listeners]) listener() }
  const offs = [onSharedTodos(refresh), api.subscribeState(['activePluginTab'], refresh)]
  return () => { for (const stop of offs) stop(); off(); listeners.clear() }
}
