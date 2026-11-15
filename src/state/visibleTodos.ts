import type { TodoPriority, TodoRecord } from '../types'
import { todoSearchMatcher } from '../model/search'
import { matchesVisibleView, type TodoView } from '../model/views'
import { matchesStatusFilter, type TodoStatusFilter } from './statusStore'

/** Everything that decides which tasks the sidebar list and the page table show. */
export interface VisibleTodoFilter {
  view: TodoView
  showCompleted: boolean
  today: string
  statusFilter: TodoStatusFilter
  /** The page's priority filter; empty or absent shows every priority. */
  priorities?: readonly TodoPriority[]
  search: string
  /** The Calendar sidebar's selected day or range: only tasks due in it are shown. */
  selectedDate: string | null
  selectedDateRange: { start: string; end: string } | null
}

/** The tasks a surface shows, in their given order: one walk, each active filter one test. */
export function filterVisibleTodos<T extends TodoRecord>(todos: readonly T[], filter: VisibleTodoFilter): T[] {
  const { view, showCompleted, today, statusFilter, priorities } = filter
  const matchesText = filter.search.trim() ? todoSearchMatcher(filter.search) : null
  const from = filter.selectedDateRange?.start ?? filter.selectedDate
  const to = filter.selectedDateRange?.end ?? filter.selectedDate
  return todos.filter((todo) => {
    if (!matchesVisibleView(todo, view, showCompleted, today)) return false
    if (statusFilter !== 'all' && !matchesStatusFilter(todo, statusFilter)) return false
    if (priorities?.length && !priorities.includes(todo.priority)) return false
    if (matchesText && !matchesText(todo)) return false
    if (!from || !to) return true
    const due = todo.dueDate?.slice(0, 10)
    return !!due && due >= from && due <= to
  })
}
