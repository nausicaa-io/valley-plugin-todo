import { afterEach, describe, expect, it, vi } from 'vitest'
import type { DatasetRecord } from '@valley/plugin-sdk'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes } from './mockTodoNotes'
import { isTodoListRecord, type TodoListRecord } from '../src/domain/completion'
import { loadTodo, onChanged, onTodoListChanged } from '../src/data/reads'
import { loadTodoList } from '../src/data/listCache'
import { rawUpdate } from '../src/data/client'
import { updateTodo } from '../src/data/undo'
import { type DocumentRevision } from '../src/domain/rpc'
import { api } from '../src/runtime'
import { patchForStatus } from '../src/state/statusStore'
import type { TodoRecord } from '../src/types'

const NOW = '2026-11-03T08:00:00.000Z'
const DATASETS = ['todo.tasks', 'todo.task_tags', 'todo.task_links', 'todo.task_attachments', 'todo.focus_sessions', 'todo.status_history']
const GROUPS = [{ id: 'fungi', name: 'Fungi', aliases: ['Mycology'], color: 'palette:green' }]
const seed = (): DataRecord[] => [
  {
    id: 'survey', title: 'Survey the slope', completed: false, priority: 'normal', dueDate: '2026-11-04', note: 'Bring the kit', tags: ['field', 'lab'],
    group: 'Mycology', createdAt: NOW, updatedAt: NOW,
    urls: ['https://example.com/a'], attachments: ['Projects/slope/plan.pdf'],
    history: [{ startedAt: NOW, endedAt: '2026-11-03T08:25:00.000Z', activeMinutes: 25, pauseMinutes: 5 }],
    statusHistory: [{ from: 'open', to: 'waiting', changedAt: NOW }, { from: 'waiting', to: 'open', changedAt: '2026-11-03T09:00:00.000Z' }]
  } as unknown as DataRecord,
  { id: 'other', title: 'Label the samples', completed: false, priority: 'low', dueDate: '', note: '', tags: [], createdAt: NOW, updatedAt: NOW } as unknown as DataRecord
]

/** `updateTodo` as it was before WP4: the UI read the whole task first for the undo snapshot. */
async function legacyUpdateTodo(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision): Promise<boolean> {
  const prev = await loadTodo(id)
  const next = isTodoListRecord(record) ? { ...record, history: record.history === undefined ? prev?.history : record.history } : record
  if (isTodoListRecord(next)) {
    delete (next as Partial<TodoListRecord>).historyLoaded
    delete (next as Partial<TodoListRecord>).completionSummary
  }
  const ok = await rawUpdate(id, next, expectedUpdatedAt, documentRevision)
  if (ok && prev) api.undo.push({ label: prev.title, undo: async () => ({ ok: await rawUpdate(id, prev) }), redo: async () => ({ ok: await rawUpdate(id, next) }) })
  return ok
}

const stored = (mock: ReturnType<typeof installTodoNotes>['mock']): Record<string, DatasetRecord[]> => Object.fromEntries(DATASETS.map((id) => [id, structuredClone(mock.datasets.get(id) ?? [])]))

afterEach(() => { vi.useRealTimers() })

describe('UI read layer (todo-optimize WP4)', () => {
  it.each([
    ['a list record (sessions omitted)', async () => (await loadTodoList()).find((record) => record.id === 'survey')! as TodoRecord, (record: TodoRecord) => ({ ...record, title: 'Survey the north slope', ...patchForStatus('completed'), updatedAt: '2026-11-03T10:00:00.000Z' })],
    ['a full record', async () => (await loadTodo('survey'))!, (record: TodoRecord) => ({ ...record, group: 'Fungi', priority: 'high' as const, history: [], updatedAt: '2026-11-03T10:00:00.000Z' })]
  ])('saves, undoes and redoes %s to exactly the rows the UI pre-read produced', async (_name, read, edit) => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-03T10:00:00.000Z'))
    const run = async (update: (record: TodoRecord) => Promise<boolean>) => {
      const { mock } = installTodoNotes(seed(), { groups: GROUPS })
      const current = await read()
      const steps: Record<string, DatasetRecord[]>[] = []
      expect(await update(edit(current))).toBe(true)
      steps.push(stored(mock))
      const action = mock.undoActions.at(-1)!
      vi.setSystemTime(new Date('2026-11-03T11:00:00.000Z'))
      expect((await action.undo()).ok).toBe(true)
      steps.push(stored(mock))
      vi.setSystemTime(new Date('2026-11-03T12:00:00.000Z'))
      expect((await action.redo!()).ok).toBe(true)
      steps.push(stored(mock))
      vi.setSystemTime(new Date('2026-11-03T10:00:00.000Z'))
      return { steps, label: action.label }
    }
    const reference = await run((record) => legacyUpdateTodo(record.id, record))
    const optimised = await run((record) => updateTodo(record.id, record))
    expect(optimised.steps).toEqual(reference.steps)
    expect(optimised.steps[1]['todo.tasks'].find((row) => row.id === 'survey')).toMatchObject({ group: 'Fungi', title: 'Survey the slope' })
  })

  it('reads nothing in the UI before an edit and takes the undo snapshot from records.update', async () => {
    const { mock } = installTodoNotes(seed(), { groups: GROUPS })
    const [current] = await loadTodoList()
    const queries: string[] = []
    const dataset = mock.api.data.dataset
    const snapshot = vi.spyOn(mock.api.data, 'snapshot')
    mock.api.data.dataset = ((id: string) => { const handle = dataset(id); return { ...handle, query: (query) => { queries.push(id); return handle.query(query) } } }) as typeof dataset
    const call = vi.spyOn(mock.api.backend, 'call')
    expect(await updateTodo(current.id, { ...current, title: 'Renamed' })).toBe(true)
    expect(snapshot).not.toHaveBeenCalled()
    expect(call.mock.calls.map(([method]) => method)).toEqual(['records.update'])
    expect(queries.length).toBe(6)
    expect(mock.undoActions.at(-1)!.label).toContain(current.title)
  })

  it('registers no undo for a refused save', async () => {
    const { mock } = installTodoNotes(seed())
    const [current] = await loadTodoList()
    expect(await updateTodo(current.id, { ...current, title: 'Renamed' }, 'stale-timestamp')).toBe(false)
    expect(mock.undoActions).toEqual([])
  })

  it('calls a list listener once for one edit that touches several datasets, and never after unsubscribing', async () => {
    const { mock } = installTodoNotes(seed())
    const list = vi.fn()
    const all = vi.fn()
    const offList = onTodoListChanged(list)
    const offAll = onChanged(all)
    const [current] = await loadTodoList()
    list.mockClear(); all.mockClear()
    expect(await updateTodo(current.id, { ...current, ...patchForStatus('completed'), urls: ['https://example.com/b'], tags: ['moss'] })).toBe(true)
    await Promise.resolve()
    expect(list).toHaveBeenCalledTimes(1)
    expect(all).toHaveBeenCalledTimes(1)
    void mock.api.data.dataset('todo.task_tags').insert({ taskId: 'other', tag: 'late' })
    offList()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(list).toHaveBeenCalledTimes(1)
    offAll()
  })

  it('does not watch status history for the list: every history write updates the task row too', async () => {
    const { mock } = installTodoNotes(seed())
    const dataset = mock.api.data.dataset
    const watched: string[] = []
    mock.api.data.dataset = ((id: string) => { const handle = dataset(id); return { ...handle, subscribe: (listener) => { watched.push(id); return handle.subscribe(listener) } } }) as typeof dataset
    const list = vi.fn()
    const off = onTodoListChanged(list)
    const [current] = (await loadTodoList()).filter((record) => record.id === 'survey')
    expect(watched.length).toBeGreaterThan(0)
    expect(watched).not.toContain('todo.status_history')
    const rows = (): number => (mock.datasets.get('todo.status_history') ?? []).length
    const before = rows()
    const writes: string[][] = []
    const update = mock.api.documents.update.bind(mock.api.documents)
    mock.api.documents.update = ((ref, change) => { writes.push((change.operations ?? []).map((operation) => operation.dataset)); return update(ref, change) }) as typeof update
    expect(await updateTodo(current.id, { ...current, ...patchForStatus('waiting') })).toBe(true)
    await Promise.resolve()
    expect(rows()).toBe(before + 1)
    expect(writes).toEqual([['todo.tasks', 'todo.status_history']])
    expect(list).toHaveBeenCalledTimes(1)
    off()
  })

  it('reads query by query when the host refuses a snapshot as too large, with the same result', async () => {
    installTodoNotes(seed(), { groups: GROUPS })
    const expected = { todo: await loadTodo('survey'), list: await loadTodoList() }
    const { mock } = installTodoNotes(seed(), { groups: GROUPS })
    const refused = vi.fn(async () => { throw Object.assign(new Error('Dataset response exceeds 8 MiB'), { code: 'limit-exceeded' }) })
    mock.api.data.snapshot = refused as unknown as typeof mock.api.data.snapshot
    expect(await loadTodo('survey')).toEqual(expected.todo)
    expect(await loadTodoList()).toEqual(expected.list)
    expect(refused).toHaveBeenCalled()
  })
})
