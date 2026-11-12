import { React, api } from './runtime'
import { useHostState } from './hooks'
import { uiText } from './localization'
import { parseView, serializeView, smartListDef, type TodoView } from './views'
import { setView, useView } from './viewStore'

/**
 * To-Do main tabs. The tab without an instance shows the shared, persisted view, as it always has. A ⌘-click (or middle
 * click) on a list opens a tab pinned to that list: its instanceId is `list:` plus the serialized view. A pinned tab's
 * list follows from its instanceId alone, so switching lists while it is focused moves only that tab and never touches the
 * persisted view.
 */
const PINNED_PREFIX = 'list:'

export const opensInNewTab = (event: { metaKey: boolean; ctrlKey: boolean; button?: number }): boolean => api.ui.hasModKey(event) || event.button === 1

export const viewTabInstance = (view: TodoView): string => `${PINNED_PREFIX}${serializeView(view)}`

/** The list a main tab is pinned to, or null for the tab without an instance. */
export function pinnedView(instanceId: string | undefined): TodoView | null {
  return instanceId?.startsWith(PINNED_PREFIX) ? parseView(instanceId.slice(PINNED_PREFIX.length)) : null
}

type ActiveTab = { pluginId: string; instanceId?: string } | null | undefined
const focusedInstance = (active: ActiveTab): string | undefined => active?.pluginId === api.pluginId ? active.instanceId : undefined

export function viewTitle(view: TodoView): string {
  if (view.kind === 'groups') {
    return view.names.length === 1 && !view.includeUngrouped
      ? view.names[0]
      : uiText('todo.view.selectedGroups', { count: view.names.length + (view.includeUngrouped ? 1 : 0) })
  }
  if (view.kind === 'tag') return `#${view.name}`
  if (view.kind === 'nogroup') return uiText('todo.chip.noGroup')
  return uiText(smartListDef(view.id).labelKey)
}

/** Show a list in a tab pinned to it: `newTab` always opens one, otherwise its tab is revealed or the active tab takes it. */
export function openViewTab(view: TodoView, newTab: boolean): void {
  api.workspace.openMainTab({ instanceId: viewTabInstance(view), title: viewTitle(view), newTab })
}

/**
 * Switch the list the user is looking at: ⌘-click opens it in a new pinned tab, a plain pick moves a focused pinned tab
 * to it, and otherwise it becomes the shared view.
 */
export function showView(view: TodoView, newTab = false): void {
  if (newTab || pinnedView(focusedInstance(api.getState().activePluginTab))) openViewTab(view, newTab)
  else setView(view)
}

/** The list of the focused To-Do tab: its pinned list, or the shared view. */
export function useShownView(): TodoView {
  const shared = useView()
  const { activePluginTab } = useHostState('activePluginTab')
  const instance = focusedInstance(activePluginTab)
  return React.useMemo(() => pinnedView(instance), [instance]) ?? shared
}
