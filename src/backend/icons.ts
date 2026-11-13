import type { PluginBackendApi } from '@valley/plugin-sdk'
import type { TaskIconsResult } from '../domain/rpc'
import { DEFAULT_TODO_ICONS } from './iconDefaults'

/** To-Do's own status icons as SVG source by name: the bundled set is seeded once, files the user adds or edits are kept. */
export async function readTodoIcons(api: PluginBackendApi): Promise<TaskIconsResult> {
  const grant = await api.storage.open({ area: 'metadata', path: 'assets/icons/todo-icon', kind: 'directory', mode: 'write' })
  const location = (path: string) => ({ handle: grant.handle, path })
  try {
    await api.storage.mkdir(location(''))
    for (const [name, svg] of Object.entries(DEFAULT_TODO_ICONS)) {
      if (!await api.storage.stat(location(`${name}.svg`))) await api.storage.write(location(`${name}.svg`), svg)
    }
    const icons: Record<string, string> = {}
    let bytes = 0
    for (const entry of await api.storage.list(location(''))) {
      if (entry.kind !== 'file' || !/^[^/\\]+\.svg$/i.test(entry.name) || entry.size > 64_000 || bytes + entry.size > 1_000_000) continue
      try { icons[entry.name.slice(0, -4)] = await api.storage.read(location(entry.name)); bytes += entry.size } catch { /* skip unreadable */ }
    }
    return { icons }
  } finally { await api.storage.close(grant.handle).catch(() => {}) }
}
