import { api } from './runtime'

/** Group creation and editing live exclusively in the app-wide Groups page. */
export function openManageGroups(): Promise<void> {
  api.workspace.openSettings('groups')
  return Promise.resolve()
}
