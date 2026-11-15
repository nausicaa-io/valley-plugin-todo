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
import { AGENT_TOOL_PROVIDER_V1, CALENDAR_ITEM_SOURCE_V2, type ValleyPluginApi, type ValleyPluginModule } from '@valley/plugin-sdk'
import { initRuntime } from './runtime'
import { injectStyles } from './styles'
import { registerTodoCommands } from './commands/commands'
import { registerTodoFence } from './ui/fence'
import { registerCalendarSource } from './integrations/calendarSource'
import { registerSearchCard } from './ui/searchCard'
import { AllPanel } from './ui/TodoPanel'
import { NoteTasksPanel } from './ui/NoteTasksPanel'
import { Page } from './ui/Page'
import { Settings } from './ui/Settings'
import { startReminders } from './integrations/reminderClicks'
import { startGroupUsageReporting } from './state/groupStore'
import { applyTodoVisibleState, resetViewCache } from './state/viewStore'
import { initLocalization, uiText } from './localization'
import { todoAgentTools } from './commands/agentTools'
import { startStatusVocabulary } from './state/statusStore'
import { startTaskIcons } from './ui/taskIcons'
import { startSharedTabTitle } from './state/tabs'
import { registerTodoSurfaces } from './ui/surfaces'
import { startOrderKernel } from './model/orderKernel'

export function register(api: ValleyPluginApi): () => void {
  initLocalization(api)
  const disposeRuntime = initRuntime(api)
  const disposeStyles = injectStyles()
  const disposeStatusVocabulary = startStatusVocabulary()
  const disposeTaskIcons = startTaskIcons()
  const disposeTabTitle = startSharedTabTitle()
  // Long lists are ordered by the Rust kernel once it loads; until then, and if it cannot, TypeScript orders them the same.
  const disposeOrderKernel = startOrderKernel(api)
  let deliveryWarningOpen = false
  const offDeliveryWarning = api.backend.on('records.eventDeliveryFailed', () => {
    if (deliveryWarningOpen) return
    deliveryWarningOpen = true
    void api.ui.confirm({ title: uiText('workflow.delivery.title'), message: uiText('workflow.delivery.message'), actions: [{ label: uiText('workflow.delivery.close'), value: 'close' }] }).catch(() => {}).finally(() => { deliveryWarningOpen = false })
  })
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
  // In the sandbox the first `providers()` or `subscribe()` starts the provider watch; started here so
  // `openTodoCalendar` finds this plugin's own source id synchronously.
  const offCalendarSources = api.interop.services.subscribe(CALENDAR_ITEM_SOURCE_V2, () => {})
  // We own how our hits look and behave in realm-wide search.
  const offSearchCard = registerSearchCard(api)
  // Module-managed timeouts, so a reminder still fires with every panel closed.
  const offReminders = startReminders()
  // Tell the host which groups our todos are in — a group is only deletable
  // once nothing anywhere is in it.
  const offGroupUsage = startGroupUsageReporting()

  return () => {
    offDeliveryWarning()
    disposeRuntime()
    offCommands()
    offSurfaces()
    offAgentTools()
    offFence()
    offCalendarSource()
    offCalendarSources()
    offSearchCard()
    offReminders()
    offGroupUsage()
    offLinks()
    disposeStatusVocabulary()
    disposeTaskIcons()
    disposeTabTitle()
    disposeOrderKernel()
    disposeStyles()
  }
}

const plugin: ValleyPluginModule = { register }
export default plugin
