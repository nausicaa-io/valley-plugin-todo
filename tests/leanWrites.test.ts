import { describe, expect, it, vi } from 'vitest'
import type { DatasetRecord, DatasetTransactionOperation } from '@valley/plugin-sdk'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes } from './mockTodoNotes'
import { editTodoValues } from '../src/commands/commands'
import { loadTodo } from '../src/data/reads'
import { loadTodoList } from '../src/data/listCache'
import { updateTodo } from '../src/data/undo'
import { createTodoDomain } from '../src/domain/writer'
import { relationWrites } from '../src/domain/records'
import { patchForStatus } from '../src/state/statusStore'
import type { TodoRecord, TodoStatusChange } from '../src/types'

const NOW = '2026-11-03T08:00:00.000Z'
const RELATIONS = ['todo.task_links', 'todo.task_attachments', 'todo.focus_sessions', 'todo.status_history']
const history = (count: number): TodoStatusChange[] => Array.from({ length: count }, (_, index) => ({
  from: index % 2 ? 'completed' : 'open', to: index % 2 ? 'open' : 'completed', changedAt: new Date(Date.parse(NOW) - (count - index) * 3_600_000).toISOString()
}))
const heavy = (): TodoRecord => ({
  id: 'heavy', title: 'Survey heavy', completed: false, priority: 'normal', dueDate: '', note: 'Field notes', tags: ['field'], createdAt: NOW, updatedAt: NOW,
  urls: ['https://example.com/a', 'https://example.com/b', 'https://example.com/c'],
  attachments: ['Projects/survey/plan.pdf', 'Projects/survey/map.png'],
  history: Array.from({ length: 5 }, (_, index) => ({ startedAt: `2026-11-0${index + 1}T08:00:00.000Z`, endedAt: `2026-11-0${index + 1}T08:25:00.000Z`, activeMinutes: 25, pauseMinutes: 5 })),
  statusHistory: history(40)
})

function setup() {
  const { mock } = installTodoNotes([heavy() as unknown as DataRecord])
  const publish = vi.fn(async (_event: string, _payload: unknown) => {})
  const domain = createTodoDomain(mock.api, publish)
  const operations: DatasetTransactionOperation[][] = []
  const update = mock.api.documents.update.bind(mock.api.documents)
  mock.api.documents.update = (async (ref, change) => {
    operations.push((change.operations ?? []) as DatasetTransactionOperation[])
    return update(ref, change)
  }) as typeof mock.api.documents.update
  /** The relation writes of the last documents.update (the task row update left out). */
  const lastRelationWrites = () => (operations.at(-1) ?? []).filter((operation) => operation.dataset !== 'todo.tasks')
  /** Stored relation rows of a task, by dataset, in position order. */
  const stored = (id = 'heavy'): Record<string, DatasetRecord[]> => Object.fromEntries(RELATIONS.map((dataset) => [dataset, (mock.datasets.get(dataset) ?? [])
    .filter((row) => row.taskId === id).map((row) => ({ ...row })).sort((a, b) => Number(a.position) - Number(b.position))]))
  return { mock, domain, publish, operations, lastRelationWrites, stored }
}

/** What the previous writer stored: every relation row deleted, then the record's rows inserted from position 0. */
function rewritten(record: TodoRecord): Record<string, DatasetRecord[]> {
  const inserts = relationWrites(record, false)
  return Object.fromEntries(RELATIONS.map((dataset) => [dataset, inserts.filter((operation) => operation.dataset === dataset).map((operation) => operation.values as DatasetRecord)]))
}

describe('lean task writes (todo-optimize WP1)', () => {
  it('issues no relation writes when links, attachments, sessions and status are unchanged', async () => {
    const { domain, lastRelationWrites, stored } = setup()
    const before = stored()
    const record = await domain.patch('heavy', { title: 'Survey renamed', note: 'New notes', priority: 'high' })
    expect(lastRelationWrites()).toEqual([])
    expect(stored()).toEqual(before)
    expect(stored()).toEqual(rewritten(record))
  })

  it('appends exactly one status-history row per status change and never rewrites earlier rows', async () => {
    const { domain, lastRelationWrites, stored } = setup()
    const original = stored()['todo.status_history']
    let record = await domain.patch('heavy', patchForStatus('completed'))
    expect(lastRelationWrites()).toEqual([{ dataset: 'todo.status_history', operation: 'insert', values: { taskId: 'heavy', position: 40, from: 'open', to: 'completed', changedAt: expect.any(String) } }])
    record = await domain.patch('heavy', { title: 'Between changes' })
    expect(lastRelationWrites()).toEqual([])
    record = await domain.patch('heavy', patchForStatus(null))
    expect(lastRelationWrites()).toEqual([{ dataset: 'todo.status_history', operation: 'insert', values: { taskId: 'heavy', position: 41, from: 'completed', to: 'open', changedAt: expect.any(String) } }])
    record = await domain.patch('heavy', patchForStatus('canceled'))
    const rows = stored()['todo.status_history']
    expect(rows).toHaveLength(43)
    expect(rows.slice(0, 40)).toEqual(original)
    expect(rows.map((row) => row.position)).toEqual(Array.from({ length: 43 }, (_, index) => index))
    expect(rows.slice(40).map(({ from, to }) => `${from}>${to}`)).toEqual(['open>completed', 'completed>open', 'open>canceled'])
    expect(stored()).toEqual(rewritten(record))
  })

  it('keeps completedAt on the task row in the same update, so the history is never read for it', async () => {
    const { mock, domain, operations, lastRelationWrites } = setup()
    const taskUpdate = () => (operations.at(-1) ?? []).find((operation) => operation.dataset === 'todo.tasks')!
    const row = () => mock.datasets.get('todo.tasks')!.find((task) => task.id === 'heavy')!
    const earlier = mock.datasets.get('todo.status_history')!.filter((entry) => entry.to === 'completed').at(-1)!.changedAt
    await domain.patch('heavy', { title: 'Renamed only' })
    expect(lastRelationWrites()).toEqual([])
    expect(taskUpdate().values).toMatchObject({ completedAt: earlier })
    await domain.patch('heavy', patchForStatus('completed'))
    const appended = lastRelationWrites()[0].values as DatasetRecord
    expect(taskUpdate().values).toMatchObject({ completedAt: appended.changedAt })
    await domain.patch('heavy', patchForStatus(null))
    expect(row().completedAt).toBe(appended.changedAt)
  })

  it('writes only the changed positions of links, attachments and sessions and stores what a full rewrite stores', async () => {
    const { domain, lastRelationWrites, stored } = setup()
    let record = await domain.patch('heavy', { urls: ['https://example.com/a', 'https://example.com/c'] })
    expect(lastRelationWrites()).toEqual([
      { dataset: 'todo.task_links', operation: 'delete', key: { taskId: 'heavy', position: 2 } },
      { dataset: 'todo.task_links', operation: 'update', key: { taskId: 'heavy', position: 1 }, values: { url: 'https://example.com/c' } }
    ])
    expect(stored()).toEqual(rewritten(record))
    record = await domain.patch('heavy', (current) => ({ history: [...current.history!, { startedAt: '2026-11-07T08:00:00.000Z', endedAt: '2026-11-07T08:50:00.000Z', activeMinutes: 50, pauseMinutes: 0 }] }))
    expect(lastRelationWrites()).toEqual([{ dataset: 'todo.focus_sessions', operation: 'insert', values: { taskId: 'heavy', position: 5, startedAt: '2026-11-07T08:00:00.000Z', endedAt: '2026-11-07T08:50:00.000Z', activeMinutes: 50, pauseMinutes: 0 } }])
    record = await domain.patch('heavy', { attachments: undefined, ...patchForStatus('completed') })
    expect(lastRelationWrites().map(({ dataset, operation, key }) => `${dataset}:${operation}:${(key as { position?: number } | undefined)?.position ?? ''}`)).toEqual(['todo.task_attachments:delete:0', 'todo.task_attachments:delete:1', 'todo.status_history:insert:'])
    expect(stored()).toEqual(rewritten(record))
  })

  it('stores what a full rewrite stores when saved positions have gaps or a row is invalid', async () => {
    const { mock, domain, stored } = setup()
    const rows = mock.datasets.get('todo.status_history')!
    rows.splice(0, rows.length,
      { taskId: 'heavy', position: 0, from: 'open', to: 'completed', changedAt: '2026-10-01T08:00:00.000Z' },
      { taskId: 'heavy', position: 3, from: 'completed', to: 'completed', changedAt: '2026-10-02T08:00:00.000Z' },
      { taskId: 'heavy', position: 7, from: 'completed', to: 'open', changedAt: '2026-10-03T08:00:00.000Z' })
    const record = await domain.patch('heavy', patchForStatus('completed'))
    expect(stored()).toEqual(rewritten(record))
    expect(stored()['todo.status_history'].map(({ position, from, to }) => `${position}:${from}>${to}`)).toEqual(['0:open>completed', '1:completed>open', '2:open>completed'])
  })

  it('reads the task and its relations once per update and returns the previous record', async () => {
    const { mock } = setup()
    const before = (await loadTodo('heavy'))!
    const query = vi.spyOn(mock.api.data, 'dataset')
    const result = await mock.api.backend.call<{ ok: boolean; record: TodoRecord; previous: TodoRecord }>('records.update', { id: 'heavy', record: { ...before, title: 'Renamed', updatedAt: new Date().toISOString() }, expectedUpdatedAt: before.updatedAt })
    expect(result.ok).toBe(true)
    expect(result.previous).toEqual(before)
    expect(result.record.title).toBe('Renamed')
    expect(query.mock.calls.map(([id]) => id).sort()).toEqual(['todo.focus_sessions', 'todo.status_history', 'todo.task_attachments', 'todo.task_links', 'todo.task_tags', 'todo.tasks'])
  })

  it('restores the previous state through UI undo and redo', async () => {
    const { mock, stored } = setup()
    const before = (await loadTodo('heavy'))!
    const current = (await loadTodoList()).find((record) => record.id === 'heavy')!
    expect(await updateTodo('heavy', { ...current, ...patchForStatus('completed'), urls: ['https://example.com/z'], updatedAt: new Date().toISOString() }, current.updatedAt)).toBe(true)
    const action = mock.undoActions.at(-1)!
    expect((await action.undo()).ok).toBe(true)
    const undone = (await loadTodo('heavy'))!
    expect({ ...undone, updatedAt: undefined, statusHistory: undefined }).toEqual({ ...before, updatedAt: undefined, statusHistory: undefined })
    expect(undone.statusHistory!.slice(0, 40)).toEqual(before.statusHistory)
    expect(undone.statusHistory!.slice(40).map(({ from, to }) => `${from}>${to}`)).toEqual(['open>completed', 'completed>open'])
    expect(stored()).toEqual(rewritten(undone))
    expect((await action.redo!()).ok).toBe(true)
    const redone = (await loadTodo('heavy'))!
    expect(redone).toMatchObject({ completed: true, status: 'completed', urls: ['https://example.com/z'] })
    expect(stored()).toEqual(rewritten(redone))
  })

  it('restores the exact previous rows through a command revert and reapplies the committed ones', async () => {
    const { stored } = setup()
    const rowsBefore = stored()
    const before = (await loadTodo('heavy'))!
    const result = await editTodoValues('heavy', { status: 'completed', attachments: ['Projects/survey/plan.pdf'] })
    const rowsCommitted = stored()
    expect(rowsCommitted['todo.status_history']).toHaveLength(41)
    await result.revert.run()
    expect(stored()).toEqual(rowsBefore)
    expect({ ...(await loadTodo('heavy'))!, updatedAt: undefined }).toEqual({ ...before, updatedAt: undefined })
    await result.revert.reapply()
    expect(stored()).toEqual(rowsCommitted)
  })

  it('refuses a stale document revision or timestamp without writing anything', async () => {
    const { domain, publish, operations, stored } = setup()
    const first = await domain.update('heavy', { ...(await domain.get('heavy'))!, title: 'First' })
    expect(first.ok).toBe(true)
    const stale = { expectedRevision: first.documentRevision!.expectedRevision, realmGeneration: first.documentRevision!.realmGeneration }
    await domain.patch('heavy', { title: 'Second' })
    const rows = stored()
    publish.mockClear()
    const calls = operations.length
    await expect(domain.update('heavy', { ...(await domain.get('heavy'))!, ...patchForStatus('completed') }, undefined, stale)).rejects.toThrow('Document revision changed')
    expect(stored()).toEqual(rows)
    expect((await domain.get('heavy'))?.title).toBe('Second')
    expect(await domain.update('heavy', { ...(await domain.get('heavy'))!, title: 'Late' }, 'stale')).toEqual({ ok: false })
    expect(operations).toHaveLength(calls + 1)
    expect(stored()).toEqual(rows)
    expect(publish).not.toHaveBeenCalled()
  })
})
