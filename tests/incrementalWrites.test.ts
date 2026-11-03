import { describe, expect, it, vi } from 'vitest'
import type { PluginBackendApi } from '@valley/plugin-sdk'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes } from './mockTodoNotes'
import { keyDatasetChanges } from './keyedChanges'
import { appendTodo, deleteTodo, loadTodoList, loadTodos, updateTodo } from '../src/data'
import { createTodoDomain } from '../src/domain'
import { changedTaskIds, startReminderOwner } from '../src/reminderOwner'
import type { TodoRecord } from '../src/types'

const NOW = '2026-11-03T08:00:00.000Z'
const flush = async (): Promise<void> => { for (let index = 0; index < 20; index++) await new Promise((resolve) => setTimeout(resolve, 0)) }

const task = (id: string, overrides: Partial<TodoRecord> = {}): TodoRecord => ({
  id, title: `Survey ${id}`, completed: false, priority: 'normal', dueDate: '', note: '', tags: [], createdAt: NOW, updatedAt: NOW, ...overrides
})

const seed = (count: number): DataRecord[] => Array.from({ length: count }, (_, index) => task(`seed-${index}`, { tags: index % 3 ? ['field'] : [] }) as unknown as DataRecord)

/** Count dataset rows the plugin reads, per dataset. */
function countReads(mock: ReturnType<typeof installTodoNotes>['mock']) {
  const rows = new Map<string, number>()
  const data = mock.api.data
  const dataset = data.dataset
  data.dataset = ((id: string) => {
    const handle = dataset(id)
    return { ...handle, query: async (query) => { const page = await handle.query(query); rows.set(id, (rows.get(id) ?? 0) + page.rows.length); return page } }
  }) as typeof data.dataset
  return { rows, total: () => [...rows.values()].reduce((sum, value) => sum + value, 0), reset: () => rows.clear() }
}

const summary = (records: TodoRecord[]) => records.map((record) => `${record.id}|${record.title}|${[...record.tags].sort().join(',')}|${record.completed}`).sort()

describe('incremental task list (8.10)', () => {
  it('merges keyed changes into the list and matches a full read after append, edit, completion and delete', async () => {
    const { mock } = installTodoNotes(seed(30))
    keyDatasetChanges(mock)
    await loadTodoList()
    expect(await appendTodo(task('added', { tags: ['new'] }))).toBe(true)
    const edited = (await loadTodoList()).find((record) => record.id === 'seed-4')!
    expect(await updateTodo('seed-4', { ...edited, title: 'Renamed', tags: ['moved'], updatedAt: new Date().toISOString() }, edited.updatedAt)).toBe(true)
    const completed = (await loadTodoList()).find((record) => record.id === 'seed-5')!
    expect(await updateTodo('seed-5', { ...completed, completed: true, status: 'completed', updatedAt: new Date().toISOString() }, completed.updatedAt)).toBe(true)
    expect(await deleteTodo('seed-6')).toBe(true)
    const list = await loadTodoList()
    expect(summary(list)).toEqual(summary(await loadTodos()))
    expect(list.find((record) => record.id === 'added')?.tags).toEqual(['new'])
    expect(list.find((record) => record.id === 'seed-4')).toMatchObject({ title: 'Renamed', tags: ['moved'] })
    expect(list.find((record) => record.id === 'seed-5')).toMatchObject({ completed: true, completionSummary: { changedAt: expect.any(String) } })
    expect(list.some((record) => record.id === 'seed-6')).toBe(false)
  })

  it('reads the whole list again when a change names no keys', async () => {
    const { mock } = installTodoNotes(seed(5))
    await loadTodoList()
    await mock.api.data.transaction([{ dataset: 'todo.tasks', operation: 'insert', values: { ...task('unkeyed'), tags: undefined } as never }])
    expect((await loadTodoList()).some((record) => record.id === 'unkeyed')).toBe(true)
  })

  it('makes an append cost independent of the list size at 2,000 tasks (measured before/after)', async () => {
    const measure = async (keyed: boolean) => {
      const { mock } = installTodoNotes(seed(2000))
      if (keyed) keyDatasetChanges(mock)
      const reads = countReads(mock)
      await loadTodoList()
      reads.reset()
      const started = performance.now()
      for (let index = 0; index < 10; index++) {
        expect(await appendTodo(task(`append-${index}`))).toBe(true)
        await loadTodoList()
      }
      return { rowsPerAppend: reads.total() / 10, msPerAppend: (performance.now() - started) / 10, size: (await loadTodoList()).length }
    }
    const before = await measure(false)
    const after = await measure(true)
    console.info(`[8.10] append + list refresh at 2,000 tasks: full reload ${before.rowsPerAppend} rows, ${before.msPerAppend.toFixed(1)} ms/task; incremental ${after.rowsPerAppend} rows, ${after.msPerAppend.toFixed(1)} ms/task`)
    expect(before.size).toBe(2010)
    expect(after.size).toBe(2010)
    expect(before.rowsPerAppend).toBeGreaterThanOrEqual(2000)
    expect(after.rowsPerAppend).toBeLessThanOrEqual(10)
  }, 60_000)
})

describe('incremental reminder reconcile (8.10)', () => {
  it('names changed tasks from keyed events and falls back to a full reconcile otherwise', () => {
    expect(changedTaskIds({ keys: [{ id: 'a' }, { id: 'b' }] })).toEqual(['a', 'b'])
    expect(changedTaskIds({})).toBeNull()
    expect(changedTaskIds({ keys: [{ taskId: 'a' }] })).toBeNull()
    expect(changedTaskIds({ keys: Array.from({ length: 201 }, (_, index) => ({ id: String(index) })) })).toBeNull()
  })

  it('reconciles only the changed task after an append or delete and keeps other reminders', async () => {
    const tomorrow = new Date(Date.now() + 86_400_000)
    const date = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`
    const { mock } = installTodoNotes([...seed(200), task('kept', { dueDate: date, startTime: '09:00' }) as unknown as DataRecord])
    keyDatasetChanges(mock)
    const domain = createTodoDomain(mock.api)
    const list = vi.fn(() => domain.list())
    const getMany = vi.fn((ids: string[]) => domain.getMany(ids))
    const scheduled = vi.spyOn(mock.api.notifications, 'schedule')
    const cancelled = vi.spyOn(mock.api.notifications, 'cancel')
    const api = {
      ...mock.api,
      lifecycle: { onResume: () => () => {} },
      notifications: { ...mock.api.notifications, onOccurrence: () => () => {} },
      i18n: { t: (key: string) => key },
      rpc: { handle: () => () => {}, emit: vi.fn() }
    } as unknown as PluginBackendApi
    const stop = startReminderOwner(api, list, undefined, getMany)
    await flush()
    expect(list).toHaveBeenCalledTimes(1)
    expect(scheduled.mock.calls.map(([key]) => key)).toEqual(['reminder:kept:10'])
    await domain.append(task('fresh', { dueDate: date, startTime: '10:00' }))
    await flush()
    expect(list).toHaveBeenCalledTimes(1)
    expect(getMany).toHaveBeenLastCalledWith(['fresh'])
    expect(scheduled.mock.calls.map(([key]) => key)).toEqual(['reminder:kept:10', 'reminder:fresh:10'])
    expect(await domain.remove('fresh')).toBe(true)
    await flush()
    expect(list).toHaveBeenCalledTimes(1)
    expect(cancelled.mock.calls.map(([key]) => key)).toEqual(['reminder:fresh:10'])
    expect(JSON.parse((await mock.api.data.files.readText('reminder-state.json'))!).keys).toEqual(['reminder:kept:10'])
    await stop()
  })
})
