import * as React from 'react'
import { METADATA_PANEL_SEGMENT_V1, PLUGIN_SURFACE_V1 } from '@valley/plugin-sdk'
import { registerTodoSurfaces } from '../src/surfaces'
import type { ValleyPluginManifest, DataRecord } from '@valley/plugin-sdk/types'
import type { GroupUsage } from '@valley/plugin-sdk/groups'
import { createMockValleyApi, type MockValleyApi } from '@valley/plugin-testkit'
import { initRuntime } from '../src/runtime'
import { resetViewCache } from '../src/viewStore'
import CONFIG from '../config.json'

export interface TodoNotesMock {
  /** Live task rows in `todo.tasks` (mutated by the CRUD methods). */
  records: DataRecord[]
  /** The underlying mock ValleyApi (settings, undo actions, etc.). */
  mock: MockValleyApi
}

/**
 * Install a mock `ValleyPluginApi` for Todo's isolated datasets and focus
 * modules. Legacy JSONL conversion is covered by the dataset importer tests.
 */
export function installTodoNotes(
  initial: DataRecord[] = [],
  settings: Record<string, unknown> = {},
  /** The host's shared group tally — what gates deleting a group. */
  groupUsage: GroupUsage = {},
  host: { activePath?: string | null } = {}
): TodoNotesMock {
  const { groups, ...pluginSettings } = settings
  const tasks = initial
    .filter((record) => !record.source)
    .map((record) => ({
      completed: false,
      priority: 'normal',
      dueDate: '',
      note: '',
      createdAt: '1970-01-01T00:00:00.000Z',
      updatedAt: '1970-01-01T00:00:00.000Z',
      ...record,
      tags: undefined,
      urls: undefined,
      attachments: undefined,
      history: undefined,
      statusHistory: undefined
    }))
  const relationRows = <T>(field: string, build: (taskId: string, value: unknown, position: number) => T): T[] =>
    initial.flatMap((record) => Array.isArray(record[field])
      ? record[field].map((value, position) => build(String(record.id), value, position))
      : [])
  const mock = createMockValleyApi({
    manifest: { id: 'todo', indexState: 'scoped', noteDocuments: CONFIG.noteDocuments, datasets: CONFIG.datasets as unknown as ValleyPluginManifest['datasets'] },
    datasets: {
      'todo.tasks': tasks,
      'todo.task_tags': relationRows('tags', (taskId, tag) => ({ taskId, tag })),
      'todo.task_links': relationRows('urls', (taskId, url, position) => ({ taskId, position, url })),
      'todo.task_attachments': relationRows('attachments', (taskId, path, position) => ({ taskId, position, path })),
      'todo.focus_sessions': relationRows('history', (taskId, value, position) => ({ taskId, position, ...(value as object) })),
      'todo.status_history': relationRows('statusHistory', (taskId, value, position) => ({ taskId, position, ...(value as object) }))
    },
    settings: pluginSettings,
    activePath: host.activePath,
    groups: Array.isArray(groups) ? groups : [],
    groupUsage
  })
  initRuntime(mock.api)
  resetViewCache()
  registerTodoSurfaces(mock.api)
  return {
    get records(): DataRecord[] {
      return mock.datasets.get('todo.tasks') ?? []
    },
    mock
  }
}

export function TodoPropertiesHost({ mock }: { mock: MockValleyApi }): React.ReactElement | null {
  const provider = mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'main_workspace')!.extension
  const serial = React.useSyncExternalStore(provider.subscribe, () => { const snapshot = provider.getSnapshot(); return JSON.stringify({ view: snapshot.view, item: snapshot.item }) }, () => '{}')
  const snapshot = JSON.parse(serial)
  if (!snapshot.item) return null
  const segment = mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1)[0].extension
  return React.createElement('section', { 'aria-label': 'Task properties' }, segment.render({ relPath: '', kind: 'unsupported', subject: { pluginId: 'todo', surface: 'main_workspace', view: snapshot.view, item: snapshot.item } }))
}
