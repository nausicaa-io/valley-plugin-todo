/**
 * Todo record types. The shapes are shared with the host (the global search hit
 * carries a `TodoRecord`), so they live in `@valley/plugin-sdk/types` and are re-exported
 * here for the plugin's internal modules to import from one place.
 */
export type {
  TodoPriority,
  TodoRecord,
  TodoStatus,
  TodoStatusChange,
  TodoSession
} from '@valley/plugin-sdk/types'
