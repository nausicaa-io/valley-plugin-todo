import type { ValleyPluginApi, SearchResultAction } from '@valley/plugin-sdk'
import { SEARCH_RESULT_ACTION_V1 } from '@valley/plugin-sdk'

const str = (value: unknown): string => typeof value === 'string' ? value : ''

function navigablePath(value: unknown): string {
  const path = str(value).replace(/\\/g, '/').replace(/^\.\//, '')
  return path === '.valley' || path.startsWith('.valley/') ? '' : path
}

export function registerSearchCard(pluginApi: ValleyPluginApi): () => void {
  const card: SearchResultAction = {
    cardKind: 'todo',
    open: async (record, ctx) => {
      if (str(record.id) && !ctx.newTab) {
        await pluginApi.documents.open({ pluginId: pluginApi.pluginId, sourceId: 'tasks', itemId: str(record.id) })
        return true
      }
      const filePath = navigablePath(record.filePath) || navigablePath(ctx.path)
      if (filePath) pluginApi.workspace.openFile(filePath, undefined, { newTab: ctx.newTab })
      else if (ctx.newTab) pluginApi.workspace.openMainTab({ newTab: true })
      else pluginApi.workspace.revealOwnPanel('left_sidebar')
      return true
    }
  }
  return pluginApi.interop.extensions.provide(SEARCH_RESULT_ACTION_V1, card)
}
