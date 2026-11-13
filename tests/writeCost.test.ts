import { describe, expect, it } from 'vitest'
import type { PluginBackendApi } from '@valley/plugin-sdk'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes } from './mockTodoNotes'
import { keyDatasetChanges } from './keyedChanges'
import { countIo } from './ioCost'
import { loadTodoList, updateTodo } from '../src/data'
import { createTodoDomain } from '../src/domain'
import { startReminderOwner } from '../src/reminderOwner'
import { patchForStatus } from '../src/statuses'
import type { TodoRecord, TodoSession, TodoStatusChange } from '../src/types'

const NOW = '2026-11-03T08:00:00.000Z'
const flush = async (): Promise<void> => { for (let index = 0; index < 20; index++) await new Promise((resolve) => setTimeout(resolve, 0)) }
const task = (id: string, overrides: Partial<TodoRecord> = {}): TodoRecord => ({
  id, title: `Survey ${id}`, completed: false, priority: 'normal', dueDate: '', note: '', tags: [], createdAt: NOW, updatedAt: NOW, ...overrides
})
const history = (count: number): TodoStatusChange[] => Array.from({ length: count }, (_, index) => ({
  from: index % 2 ? 'completed' : 'open', to: index % 2 ? 'open' : 'completed', changedAt: new Date(Date.parse(NOW) - (count - index) * 3_600_000).toISOString()
}))
const sessions = (count: number): TodoSession[] => Array.from({ length: count }, (_, index) => ({
  startedAt: new Date(Date.parse(NOW) - (count - index) * 7_200_000).toISOString(), endedAt: new Date(Date.parse(NOW) - (count - index) * 7_200_000 + 1_500_000).toISOString(), activeMinutes: 25, pauseMinutes: 5
}))
/** The task the toggle measures: 40 status changes, 3 links, 2 attachments, 5 focus sessions. */
const heavy = (): TodoRecord => task('heavy', {
  tags: ['field', 'lab'],
  urls: ['https://example.com/a', 'https://example.com/b', 'https://example.com/c'],
  attachments: ['Projects/survey/plan.pdf', 'Projects/survey/map.png'],
  history: sessions(5),
  statusHistory: history(40)
})
const seed = (count: number): DataRecord[] => Array.from({ length: count }, (_, index) => task(`seed-${index}`, {
  tags: index % 3 ? ['field'] : [],
  ...(index % 4 === 0 ? { completed: true, status: 'completed' as const, statusHistory: history(1) } : {})
}) as unknown as DataRecord)
const report = (name: string, io: ReturnType<typeof countIo>): void => {
  console.info(`[todo-optimize] ${name}: ${JSON.stringify({ totals: io.totals(), ...io.counts })}`)
}

describe('write and read cost (todo-optimize WP0 baseline)', () => {
  it('one checkbox toggle on a task with 40 status changes, 3 links, 2 attachments and 5 sessions', async () => {
    const { mock } = installTodoNotes([heavy() as unknown as DataRecord, ...seed(20)])
    keyDatasetChanges(mock)
    const io = countIo(mock)
    const current = (await loadTodoList()).find((record) => record.id === 'heavy')!
    io.reset()
    expect(await updateTodo('heavy', { ...current, ...patchForStatus('completed'), updatedAt: new Date().toISOString() }, current.updatedAt)).toBe(true)
    report('toggle via UI updateTodo', io)
    const ui = structuredClone(io.counts)
    const committed = (await loadTodoList()).find((record) => record.id === 'heavy')!
    io.reset()
    expect((await mock.api.backend.call<{ ok: boolean }>('records.update', { id: 'heavy', record: { ...committed, ...patchForStatus(null), updatedAt: new Date().toISOString() }, expectedUpdatedAt: committed.updatedAt })).ok).toBe(true)
    report('toggle back via records.update alone', io)
    expect(ui.calls).toEqual({ 'rpc.records.update': 1, 'dataset.query': 16, 'documents.read': 1, 'documents.update': 1 })
    expect(ui.rowsWritten).toEqual({ 'task_links.delete': 3, 'task_attachments.delete': 2, 'focus_sessions.delete': 5, 'status_history.delete': 40, 'task_links.insert': 3, 'task_attachments.insert': 2, 'focus_sessions.insert': 5, 'status_history.insert': 41, 'task_tags.delete': 2, 'task_tags.insert': 2, 'tasks.update': 2 })
    expect(io.counts.calls).toEqual({ 'rpc.records.update': 1, 'dataset.query': 10, 'documents.read': 1, 'documents.update': 1 })
    expect(io.totals()).toEqual({ calls: 13, rowsRead: 105, rowsWritten: 109 })
  })

  it('a cold list load of 2,000 tasks', async () => {
    const { mock } = installTodoNotes(seed(2000))
    const io = countIo(mock)
    expect(await loadTodoList()).toHaveLength(2000)
    report('cold loadTodoList at 2,000 tasks', io)
    expect(io.totals().calls).toBeLessThanOrEqual(206)
    expect(io.totals().rowsRead).toBeLessThanOrEqual(3833)
    expect(io.totals().rowsWritten).toBe(0)
  }, 60_000)

  it('one settings change with 2,000 tasks and the backend reminder owner running', async () => {
    const { mock } = installTodoNotes(seed(2000))
    keyDatasetChanges(mock)
    const io = countIo(mock)
    const domain = createTodoDomain(mock.api)
    const api = {
      ...mock.api,
      lifecycle: { onResume: () => () => {} },
      notifications: { ...mock.api.notifications, onOccurrence: () => () => {} },
      i18n: { t: (key: string) => key },
      rpc: { handle: () => () => {}, emit: () => {} }
    } as unknown as PluginBackendApi
    const stop = startReminderOwner(api, () => domain.list(), undefined, (ids) => domain.getMany(ids))
    await flush()
    io.reset()
    await mock.api.settings.set('showCompleted', true)
    await flush()
    report('settings change (showCompleted) at 2,000 tasks', io)
    expect(io.totals().calls).toBeLessThanOrEqual(9)
    expect(io.totals().rowsRead).toBeLessThanOrEqual(3833)
    await stop()
  }, 60_000)
})
