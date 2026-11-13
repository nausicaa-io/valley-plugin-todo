import { describe, expect, it, vi } from 'vitest'
import type { PluginBackendApi } from '@valley/plugin-sdk'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes } from './mockTodoNotes'
import { keyDatasetChanges } from './keyedChanges'
import { countIo } from './ioCost'
import { loadTodoList, updateTodo } from '../src/data'
import { readReminderCandidates } from '../src/backend/reminderQuery'
import { createTodoDomain } from '../src/domain'
import { backfillCompletedAt } from '../src/backend/backfill'
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

describe('write and read cost (todo-optimize; before/after in Work/lanes/todo-optimize/baseline.md)', () => {
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
    // The undo snapshot is the `previous` record update returns: the UI reads nothing itself.
    expect(ui.calls).toEqual({ 'rpc.records.update': 1, 'dataset.query': 6, 'documents.read': 1, 'documents.update': 1 })
    expect(ui.rowsWritten).toEqual({ 'status_history.insert': 1, 'task_tags.delete': 2, 'task_tags.insert': 2, 'tasks.update': 2 })
    expect(io.counts.calls).toEqual({ 'rpc.records.update': 1, 'dataset.query': 6, 'documents.read': 1, 'documents.update': 1 })
    expect(io.totals()).toEqual({ calls: 9, rowsRead: 54, rowsWritten: 7 })
  })

  it('a cold list load of 2,000 tasks', async () => {
    const { mock } = installTodoNotes(seed(2000))
    const io = countIo(mock)
    expect(await loadTodoList()).toHaveLength(2000)
    report('cold loadTodoList at 2,000 tasks', io)
    // The completion time comes from the task row: no status-history aggregates or detail pages.
    // One host snapshot per page round (tasks and tags have two pages at 2,000 tasks).
    expect(io.counts.calls).toEqual({ 'rpc.records.completionReady': 1, 'data.snapshot': 2 })
    expect(io.totals()).toEqual({ calls: 3, rowsRead: 3333, rowsWritten: 0 })
  }, 60_000)

  it('the one-time completedAt backfill of 2,000 tasks (500 with a completion)', async () => {
    const { mock } = installTodoNotes(seed(2000))
    const io = countIo(mock)
    const domain = createTodoDomain(mock.api)
    expect(await backfillCompletedAt(mock.api, domain.exclusive)).toEqual({ updated: 500, skipped: false })
    report('completedAt backfill at 2,000 tasks', io)
    expect(io.counts.calls).toEqual({ 'dataset.query': 42, 'data.transaction': 20 })
    expect(io.counts.rowsWritten).toEqual({ 'tasks.update': 500 })
    io.reset()
    expect(await backfillCompletedAt(mock.api, domain.exclusive)).toEqual({ updated: 0, skipped: true })
    expect(io.totals()).toEqual({ calls: 0, rowsRead: 0, rowsWritten: 0 })
  }, 60_000)

  it('one settings change with 2,000 tasks and the backend reminder owner running', async () => {
    const { mock } = installTodoNotes(seed(2000))
    keyDatasetChanges(mock)
    const io = countIo(mock)
    const api = {
      ...mock.api,
      lifecycle: { onResume: () => () => {} },
      notifications: { ...mock.api.notifications, onOccurrence: () => () => {} },
      i18n: { t: (key: string) => key },
      rpc: { handle: () => () => {}, emit: () => {} }
    } as unknown as PluginBackendApi
    const stop = startReminderOwner(api, () => readReminderCandidates(api), undefined, (ids) => readReminderCandidates(api, ids))
    await flush()
    io.reset()
    await mock.api.settings.set('showCompleted', true)
    await flush()
    report('settings change (showCompleted) at 2,000 tasks', io)
    expect(io.counts.calls).toEqual({ 'settings.set': 1 })
    expect(io.totals()).toEqual({ calls: 1, rowsRead: 0, rowsWritten: 0 })
    io.reset()
    await mock.api.settings.set('reminderOffsets', [5])
    await flush()
    report('reminder offsets change at 2,000 tasks', io)
    expect(io.counts.calls).toEqual({ 'settings.set': 1, 'dataset.query': 1 })
    expect(io.totals()).toEqual({ calls: 2, rowsRead: 0, rowsWritten: 0 })
    await stop()
  }, 60_000)

  it('the reminder owner reads one narrow query for an edited task and schedules nothing for an unrelated edit', async () => {
    const run = async (withOwner: boolean, values: Partial<TodoRecord>) => {
      const dated = Array.from({ length: 20 }, (_, index) => task(`due-${index}`, { dueDate: '2099-01-01', startTime: '09:00' }))
      const { mock } = installTodoNotes([...dated, ...seed(2000)] as unknown as DataRecord[])
      keyDatasetChanges(mock)
      const domain = createTodoDomain(mock.api)
      const schedule = vi.fn(async () => {})
      const api = {
        ...mock.api,
        lifecycle: { onResume: () => () => {} },
        notifications: { schedule, cancel: async () => {}, onOccurrence: () => () => {} },
        i18n: { t: (key: string) => key },
        rpc: { handle: () => () => {}, emit: () => {} }
      } as unknown as PluginBackendApi
      const stop = withOwner ? startReminderOwner(api, () => readReminderCandidates(api), undefined, (ids) => readReminderCandidates(api, ids)) : async () => {}
      await flush()
      const io = countIo(mock)
      schedule.mockClear()
      await domain.patch('due-3', values)
      await flush()
      await stop()
      return { io, scheduled: schedule.mock.calls.length }
    }
    for (const [name, values, scheduled] of [['priority', { priority: 'high' as const }, 0], ['title', { title: 'Renamed' }, 1]] as const) {
      const bare = await run(false, values)
      const owned = await run(true, values)
      const extra = { calls: owned.io.totals().calls - bare.io.totals().calls, rowsRead: owned.io.totals().rowsRead - bare.io.totals().rowsRead }
      console.info(`[todo-optimize] reminder owner after a ${name} edit at 2,020 tasks: ${JSON.stringify({ ...extra, scheduled: owned.scheduled })}`)
      expect(extra).toEqual({ calls: 1, rowsRead: 1 })
      expect(owned.scheduled).toBe(scheduled)
    }
  }, 60_000)
})
