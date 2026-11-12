/**
 * Todo record types. The shapes are shared with the host (the global search hit
 * carries a `TodoRecord`), so they live in `@valley/plugin-sdk/types` and are re-exported
 * here for the plugin's internal modules to import from one place.
 *
 * A status is either one of the SDK's built-in statuses or a status the user
 * created (`custom-…`). The tasks dataset keeps the nearest built-in in its
 * `status` column so other plugins keep reading a known value, and the custom id
 * in `customStatus`.
 */
import type {
  TodoRecord as SdkTodoRecord,
  TodoStatus as BuiltinTodoStatus,
  TodoStatusChange as SdkTodoStatusChange
} from '@valley/plugin-sdk/types'

export type { TodoPriority, TodoSession } from '@valley/plugin-sdk/types'
export type { BuiltinTodoStatus }

export type CustomStatusId = `custom-${string}`
export type TodoStatus = BuiltinTodoStatus | CustomStatusId
export type TodoStatusChange = Omit<SdkTodoStatusChange, 'from' | 'to'> & { from: TodoStatus; to: TodoStatus }
export type TodoRecord = Omit<SdkTodoRecord, 'status' | 'statusHistory'> & {
  status?: TodoStatus
  statusHistory?: TodoStatusChange[]
}
