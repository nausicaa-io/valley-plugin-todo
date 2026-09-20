/**
 * To-Do — the structured task tracker as a fully disk-loaded plugin. Tasks live
 * in the plugin-owned durable SQLite store; mutations register with
 * the core ⌘Z stack via `api.undo`; the optional calendar day-filter consumes
 * only the mounted right-sidebar Calendar's SDK shared-context selection.
 *
 * Three views: `todo.panel` (left_sidebar — the task browser, grouped into the
 * user's lists), `todo.page` (main_workspace — the full task-manager page) and
 * `todo.file` (right_sidebar — structured todos linked to the active attachment).
 */
import { AGENT_TOOL_PROVIDER_V1, type ValleyPluginApi, type ValleyPluginModule } from '@valley/plugin-sdk'
import { initRuntime } from './runtime'
import { injectStyles } from './styles'
import { registerTodoCommands } from './commands'
import { registerTodoFence } from './fence'
import { registerCalendarSource } from './calendarSource'
import { registerSearchCard } from './searchCard'
import { AllPanel } from './TodoPanel'
import { NoteTasksPanel } from './NoteTasksPanel'
import { Page } from './Page'
import { Settings } from './Settings'
import { startReminders } from './reminders'
import { startGroupUsageReporting } from './groupStore'
import { applyTodoVisibleState, resetViewCache } from './viewStore'
import { initLocalization } from './localization'
import { todoAgentTools } from './agentTools'
import { startStatusVocabulary } from './statuses'
import { registerTodoSurfaces } from './surfaces'

export function register(api: ValleyPluginApi): () => void {
  initLocalization(api)
  const disposeRuntime = initRuntime(api)
  const disposeStyles = injectStyles()
  const disposeStatusVocabulary = startStatusVocabulary()
  resetViewCache()
  const offLinks = api.workspace.onOpenOwnLink((state) => {
    applyTodoVisibleState(state)
  })
  api.registerView('todo.panel', AllPanel)
  api.registerView('todo.file', NoteTasksPanel)
  api.registerView('todo.page', Page)
  api.registerView('todo.settings', Settings)

  const offCommands = registerTodoCommands(api)
  const offSurfaces = registerTodoSurfaces(api)
  const offAgentTools = api.interop.services.provide(AGENT_TOOL_PROVIDER_V1, todoAgentTools(api))
  const offFence = registerTodoFence()
  // Offer our dated tasks to any calendar surface. Nothing here names Calendar;
  // if no consumer is installed the registration simply goes unread.
  const offCalendarSource = registerCalendarSource()
  // We own how our hits look and behave in vault-wide search.
  const offSearchCard = registerSearchCard(api)
  // Module-managed timeouts, so a reminder still fires with every panel closed.
  const offReminders = startReminders()
  // Tell the host which groups our todos are in — a group is only deletable
  // once nothing anywhere is in it.
  const offGroupUsage = startGroupUsageReporting()

  return () => {
    disposeRuntime()
    offCommands()
    offSurfaces()
    offAgentTools()
    offFence()
    offCalendarSource()
    offSearchCard()
    offReminders()
    offGroupUsage()
    offLinks()
    disposeStatusVocabulary()
    disposeStyles()
  }
}

const plugin: ValleyPluginModule = { register }
export default plugin
