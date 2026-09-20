import type { ValleyPluginManifest } from '@valley/plugin-sdk/types'
import { describe, expect, it, vi } from 'vitest'
import { CALENDAR_ITEM_SOURCE_V2, type CalendarSourceItem, type CalendarItemSourcePage, type DatasetQuery, type DatasetRecord } from '@valley/plugin-sdk'
import { createMockValleyApi } from '@valley/plugin-testkit'
import todoPlugin from '../src/index'
import { registerCalendarSource } from '../src/calendarSource'
import { initRuntime, revealRequestStore as todoRevealRequestStore } from '../src/runtime'
import { getView } from '../src/viewStore'
import config from '../config.json'
const todoManifest = { id: 'todo', indexState: 'scoped' as const, datasets: config.datasets as unknown as ValleyPluginManifest['datasets'], noteDocuments: config.noteDocuments }
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
  it('pages only dated tasks in the requested range and rejects stale or mismatched cursors', async () => {
    const tasks: DatasetRecord[] = Array.from({ length: 300 }, (_, index) => ({ id: `task-${String(index).padStart(3, '0')}`, title: `Task ${index}`, dueDate: '2026-08-24', tags: [`tag-${index}`] }))
    const mock = createMockValleyApi({ manifest: todoManifest, datasets: todoDatasets([...tasks,
      { id: 'old', title: 'Old', dueDate: '2025-08-24', tags: ['old'] },
      { id: 'future', title: 'Future', dueDate: '2027-08-24' },
      { id: 'undated', title: 'Undated', dueDate: '' }
    ]) })
    const dataset = mock.api.data.dataset
    const reads: Array<{ id: string; query?: DatasetQuery }> = []
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async query => { reads.push({ id, query }); return handle.query(query) } }
    }) as typeof dataset
    const disposeRuntime = initRuntime(mock.api)
    const disposeSource = registerCalendarSource()
    const dispose = () => { disposeSource(); disposeRuntime() }
    const provider = mock.api.interop.services.providers(CALENDAR_ITEM_SOURCE_V2)[0]
    const range = { startDate: '2026-08-01', endDate: '2026-08-31', limit: 256 }
    try {
      const first = await provider.invoke('list', [range])
      expect(first.ok).toBe(true)
      const page = first.ok ? first.value as CalendarItemSourcePage : null
      expect(page?.items).toHaveLength(256)
      expect(page?.cursor).toBeTruthy()
      const next = await provider.invoke('list', [{ ...range, cursor: page!.cursor }])
      expect(next.ok && (next.value as CalendarItemSourcePage).items).toHaveLength(44)
      expect(next.ok && (next.value as CalendarItemSourcePage).revision).toBe(page!.revision)
      expect(next.ok && (next.value as CalendarItemSourcePage).cursor).toBeUndefined()
      expect(page!.items[0].tags).toEqual(['tag-0'])
      expect(reads.some(read => read.id === 'todo.focus_sessions' || read.id === 'todo.status_history')).toBe(false)
      for (const read of reads.filter(read => read.id === 'todo.tasks')) {
        expect(read.query).toMatchObject({ where: { dueDate: { gte: range.startDate } }, limit: 256 })
      }
      for (const read of reads.filter(read => read.id.startsWith('todo.task_'))) {
        const ids = (read.query?.where?.taskId as { in: string[] }).in
        expect(ids.length).toBeLessThanOrEqual(100)
        expect(ids).not.toContain('old')
      }
      expect(await provider.invoke('list', [{ ...range, endDate: '2026-09-30', cursor: page!.cursor }])).toMatchObject({ ok: false, error: { message: expect.stringContaining('another range') } })
      await dataset('todo.tasks').update({ id: 'task-299' }, { title: 'Updated' })
      expect(await provider.invoke('list', [{ ...range, cursor: page!.cursor }])).toMatchObject({ ok: false, error: { message: expect.stringContaining('stale') } })
      expect(await provider.invoke('list', [{ ...range, limit: 257 }])).toMatchObject({ ok: false })
      expect(await provider.invoke('update', ['task-000', { date: '2026-08-24', endDate: '2026-08-25' }])).toMatchObject({ ok: true, value: false })
    } finally { dispose?.() }
  })

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

    const sources = mock.api.interop.services.providers(CALENDAR_ITEM_SOURCE_V2)
    expect(sources).toHaveLength(1)
    const source = sources[0]
    expect(source.owner).toBe('todo')
    expect(source.metadata).toMatchObject({
      name: 'To-Do', version: '2.0.0', author: expect.any(String), description: expect.any(String)
    })
    expect(source.methods).toEqual(expect.arrayContaining(['open', 'configure', 'actions', 'runAction']))

    await expect(source.invoke('configure')).resolves.toEqual({ ok: true, value: undefined })
    expect(mock.api.workspace.openOwnSettings).toHaveBeenCalled()

    const listed = await source.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])
    expect(listed.ok).toBe(true)
    const items = listed.ok ? (listed.value as { items: CalendarSourceItem[] }).items : []
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
    const relisted = await source.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])
    const moved = relisted.ok ? (relisted.value as { items: CalendarSourceItem[] }).items : []
    expect(moved[0]).toMatchObject({
      date: '2026-06-09', note: 'Use the updated observation sheet.', group: 'Archive',
      location: { name: 'South trail' }
    })
    expect(moved[0].urls).toBeUndefined()
    expect(moved[0].attachments).toBeUndefined()

    // Unregistering the plugin withdraws the offer — zero crumbs.
    dispose?.()
    expect(mock.api.interop.services.providers(CALENDAR_ITEM_SOURCE_V2)).toEqual([])
  })

})
