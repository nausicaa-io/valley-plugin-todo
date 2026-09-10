import type { ValleyPluginManifest } from '@valley/plugin-sdk/types'
import { describe, expect, it, vi } from 'vitest'
import { CALENDAR_ITEM_SOURCE_V1, type CalendarSourceItem, type DatasetRecord } from '@valley/plugin-sdk'
import { createMockValleyApi } from '@valley/plugin-testkit'
import todoPlugin from '../src/index'
import { revealRequestStore as todoRevealRequestStore } from '../src/runtime'
import { getView } from '../src/viewStore'
import config from '../config.json'
const todoManifest = { id: 'todo', datasets: config.datasets as unknown as ValleyPluginManifest['datasets'], noteDocuments: config.noteDocuments }
function todoDatasets(records: DatasetRecord[]): Record<string, DatasetRecord[]> {
  return {
    'todo.tasks': records.map(({ tags: _tags, urls: _urls, attachments: _attachments, ...record }) => ({ createdAt: '2026-06-01T00:00:00.000Z', updatedAt: '2026-06-01T00:00:00.000Z', ...record })),
    'todo.task_tags': records.flatMap((record) =>
      Array.isArray(record.tags) ? record.tags.map((tag) => ({ taskId: record.id, tag })) : []
    ),
    'todo.task_links': records.flatMap((record) =>
      Array.isArray(record.urls) ? record.urls.map((url, position) => ({ taskId: record.id, position, url })) : []
    ),
    'todo.task_attachments': records.flatMap((record) =>
      Array.isArray(record.attachments) ? record.attachments.map((path, position) => ({ taskId: record.id, position, path })) : []
    )
  }
}

describe('todo plugin registration', () => {
  it('registers its slot views, the open-page command, and disposes cleanly', () => {
    const mock = createMockValleyApi({ manifest: todoManifest })
    const registerView = mock.api.registerView as ReturnType<typeof vi.fn>

    const dispose = todoPlugin.register(mock.api)

    const keys = registerView.mock.calls.map((c) => c[0])
    expect(keys).toEqual(expect.arrayContaining(['todo.panel', 'todo.file', 'todo.page']))
    // No footer view: the focus timer was removed, so Todo claims no footer slot.
    expect(keys).not.toContain('todo.focus')
    expect(mock.commands.map((c) => c.id)).toContain('open-page')

    // The open-page command opens the plugin's main workspace tab.
    mock.commands.find((c) => c.id === 'open-page')?.run(undefined, { caller: 'plugin' })
    expect(mock.api.workspace.openMainTab).toHaveBeenCalled()

    expect(typeof dispose).toBe('function')
    dispose?.()
    expect(mock.commands).toHaveLength(0) // command unregistered
  })
})

describe('calendar item source interoperability', () => {
  it('Todo offers a calendar item source that round-trips through its own schema', async () => {
    const seededTasks: DatasetRecord[] = [
          { id: 't1', title: 'Observe lichen growth', completed: false, priority: 'high',
            dueDate: '2026-06-08', startTime: '08:00', tags: ['fungi'], group: 'Field Work',
            note: 'Bring the hand lens and record the shaded plot.',
            location: { name: 'North trail', lat: 47.3769, lng: 8.5417 },
            urls: ['https://example.com/lichen'], attachments: ['Archive/field-notes.md'] },
          { id: 't3', title: 'All-day fungal survey', completed: false, priority: 'normal',
            dueDate: '2026-06-10' },
          // No due date ⇒ not a dated item, so it must not reach the grid.
          { id: 't2', title: 'Undated observation', completed: false, priority: 'normal', dueDate: '' }
        ]
    const mock = createMockValleyApi({
      manifest: todoManifest,
      datasets: todoDatasets(seededTasks)
    })
    const dispose = todoPlugin.register(mock.api)

    const sources = mock.api.interop.services.providers(CALENDAR_ITEM_SOURCE_V1)
    expect(sources).toHaveLength(1)
    const source = sources[0]
    expect(source.owner).toBe('todo')
    expect(source.metadata).toMatchObject({
      name: 'To-Do', version: '2.0.0', author: expect.any(String), description: expect.any(String)
    })
    expect(source.methods).toEqual(expect.arrayContaining(['open', 'configure', 'actions', 'runAction']))

    await expect(source.invoke('configure')).resolves.toEqual({ ok: true, value: undefined })
    expect(mock.api.workspace.openOwnSettings).toHaveBeenCalled()

    const listed = await source.invoke('list')
    expect(listed.ok).toBe(true)
    const items = listed.ok ? listed.value as CalendarSourceItem[] : []
    expect(items.map((i) => i.id)).toEqual(['t1', 't3'])
    expect(items[0]).toMatchObject({
      icon: 'list-todo',
      title: 'Observe lichen growth', date: '2026-06-08', startTime: '08:00',
      group: 'Field Work', note: 'Bring the hand lens and record the shaded plot.',
      location: { name: 'North trail', lat: 47.3769, lng: 8.5417 },
      urls: ['https://example.com/lichen'], attachments: ['Archive/field-notes.md']
    })
    expect(items[1]).toMatchObject({ title: 'All-day fungal survey', date: '2026-06-10' })
    expect(items[1].startTime).toBeUndefined()

    const menu = await source.invoke('actions', ['t1'])
    expect(menu.ok && menu.value).toMatchObject([
      { id: 'open-todo', label: 'Open in To-Do', icon: 'checklist' },
      { id: 'edit', label: 'Edit', icon: 'edit' },
      { id: 'open-attachment', label: 'Attachment', submenu: [{ id: 'attachment:Archive/field-notes.md' }] },
      { id: 'open-link', label: 'Link', submenu: [{ id: 'url:https://example.com/lichen' }] }
    ])

    await expect(source.invoke('open', ['t1'])).resolves.toEqual({ ok: true, value: undefined })
    expect(mock.api.workspace.revealOwnPanel).toHaveBeenCalledWith('left_sidebar')
    expect(getView()).toEqual({ kind: 'smart', id: 'all' })
    expect(todoRevealRequestStore().get()).toMatchObject({ todoId: 't1', mode: 'focus' })

    // A "moved to this day" patch is applied by the provider, in its own schema.
    await expect(source.invoke('update', [items[0].id, {
      date: '2026-06-09', note: 'Use the updated observation sheet.', group: 'Archive',
      location: { name: 'South trail' }, urls: [], attachments: []
    }])).resolves.toEqual({
      ok: true,
      value: true
    })
    const relisted = await source.invoke('list')
    const moved = relisted.ok ? relisted.value as CalendarSourceItem[] : []
    expect(moved[0]).toMatchObject({
      date: '2026-06-09', note: 'Use the updated observation sheet.', group: 'Archive',
      location: { name: 'South trail' }
    })
    expect(moved[0].urls).toBeUndefined()
    expect(moved[0].attachments).toBeUndefined()

    // Unregistering the plugin withdraws the offer — zero crumbs.
    dispose?.()
    expect(mock.api.interop.services.providers(CALENDAR_ITEM_SOURCE_V1)).toEqual([])
  })

})
