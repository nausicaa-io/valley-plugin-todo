import { api } from './runtime'

export function openManageGroups(): Promise<void> {
  api.workspace.openOwnSettings()
  return Promise.resolve()
}
