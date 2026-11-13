import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'
import type { DatasetRecord, DatasetTransactionOperation } from '@valley/plugin-sdk'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes } from './mockTodoNotes'
import { backfillCompletedAt, COMPLETION_BACKFILL_MARKER } from '../src/backend/backfill'
import { readCompletionSummaries } from '../src/domain/completion'
import { allStatuses } from '../src/state/statusStore'
import { loadTodoList } from '../src/data/reads'
import { createTodoDomain } from '../src/domain/writer'
import { completionTimestamp } from '../src/model/sections'
import { patchForStatus } from '../src/state/statusStore'
import type { TodoRecord } from '../src/types'
import CONFIG from '../config.json'

const T = (day: number, hour = 12): string => `2026-06-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:00:00.000Z`
const DATASETS = ['todo.tasks', 'todo.task_tags', 'todo.task_links', 'todo.task_attachments', 'todo.focus_sessions', 'todo.status_history']
const SETTINGS = { statuses: { custom: [{ id: 'custom-shipped', label: 'Shipped', done: true }, { id: 'custom-review', label: 'Review', done: false }] } }

/** v3-shaped saved rows: tasks without `completedAt`, history rows as an older build stored them (gaps and invalid rows included). */
function v3Rows(extra = 0): DataRecord[] {
  const row = (id: string, values: Record<string, unknown>, statusHistory: unknown[] = []) => ({
    id, title: `Survey ${id}`, completed: false, priority: 'normal', dueDate: '', note: `Notes ${id}`, tags: ['field'],
    createdAt: T(1), updatedAt: T(20, 8), statusHistory, ...values
  }) as unknown as DataRecord
  return [
    row('done', { completed: true, status: 'completed' }, [{ from: 'open', to: 'completed', changedAt: T(2) }]),
    row('twice', { completed: true, status: 'completed' }, [{ from: 'open', to: 'completed', changedAt: T(2) }, { from: 'completed', to: 'open', changedAt: T(3) }, { from: 'open', to: 'completed', changedAt: T(4) }]),
    row('reopened', { status: 'open' }, [{ from: 'open', to: 'completed', changedAt: T(5) }, { from: 'completed', to: 'open', changedAt: T(6) }]),
    row('canceled', { completed: true, status: 'canceled' }, [{ from: 'inprogress', to: 'canceled', changedAt: T(7) }]),
    row('fromCustom', { completed: true, status: 'completed' }, [{ from: 'custom-review', to: 'completed', changedAt: T(8) }]),
    row('customDone', { completed: true, status: 'completed', customStatus: 'custom-shipped' }, [{ from: 'open', to: 'custom-shipped', changedAt: T(9) }]),
    row('deletedCustom', { completed: true, status: 'completed' }, [{ from: 'open', to: 'completed', changedAt: T(10) }, { from: 'custom-gone', to: 'completed', changedAt: T(11) }]),
    row('invalid', { completed: true, status: 'completed' }, [{ from: 'open', to: 'completed', changedAt: T(12) }, { from: 'completed', to: 'completed', changedAt: T(13) }, { from: 'invalid', to: 'canceled', changedAt: T(13) }, { from: 'open', to: 'completed', changedAt: '' }]),
    row('legacy', { completed: true, status: 'completed', updatedAt: T(14) }),
    row('waiting', { status: 'waiting' }, [{ from: 'open', to: 'waiting', changedAt: T(15) }]),
    ...Array.from({ length: extra }, (_, index) => row(`bulk-${index}`, index % 3 ? { completed: true, status: 'completed' } : {}, index % 3 ? [{ from: 'open', to: index % 2 ? 'completed' : 'canceled', changedAt: new Date(Date.parse(T(16)) + index * 60_000).toISOString() }] : []))
  ]
}

/** Remove a position so the stored rows have a gap, as a hand edit or an older build could leave them. */
function gap(mock: ReturnType<typeof installTodoNotes>['mock'], taskId: string): void {
  const rows = mock.datasets.get('todo.status_history')!
  for (const row of rows) if (row.taskId === taskId && Number(row.position) >= 1) row.position = Number(row.position) + 1
}

function setup(extra = 0) {
  const notes = installTodoNotes(v3Rows(extra), SETTINGS)
  gap(notes.mock, 'twice')
  const domain = createTodoDomain(notes.mock.api)
  const snapshot = (): Record<string, DatasetRecord[]> => Object.fromEntries(DATASETS.map((id) => [id, structuredClone(notes.mock.datasets.get(id) ?? [])]))
  const withoutCompletedAt = (rows: DatasetRecord[]) => rows.map(({ completedAt: _completedAt, ...rest }) => rest)
  const oldCompletions = async (): Promise<Map<string, string | null>> => {
    const ids = (notes.mock.datasets.get('todo.tasks') ?? []).map((row) => String(row.id))
    const summaries = await readCompletionSummaries(notes.mock.api, ids, () => {}, () => allStatuses())
    return new Map(ids.map((id) => [id, summaries.get(id)?.changedAt ?? null]))
  }
  const stored = (): Map<string, unknown> => new Map((notes.mock.datasets.get('todo.tasks') ?? []).map((row) => [String(row.id), row.completedAt ?? null]))
  return { ...notes, domain, snapshot, withoutCompletedAt, oldCompletions, stored }
}

describe('completedAt backfill (tasks v4)', () => {
  it('declares an additive v4: one nullable column, one index, one migration from v3', () => {
    const tasks = CONFIG.datasets.find((dataset) => dataset.id === 'tasks')!
    expect(tasks.version).toBe(4)
    expect(tasks.columns.completedAt).toEqual({ type: 'datetime', nullable: true })
    expect(tasks.indexes).toContainEqual({ id: 'reminder', columns: ['completed', 'remindAt'] })
    const migration = CONFIG.datasetMigrations.find((entry) => entry.id === 'completed-at-v4')!
    expect(migration).toMatchObject({ store: 'durable', fromVersion: 3, toVersion: 4 })
    expect(migration.steps).toEqual([
      { operation: 'add-column', dataset: 'tasks', column: 'completedAt', definition: { type: 'datetime', nullable: true } },
      { operation: 'create-index', dataset: 'tasks', index: { id: 'reminder', columns: ['completed', 'remindAt'] } }
    ])
    expect(CONFIG.datasetMigrations.map((entry) => [entry.fromVersion, entry.toVersion])).toEqual([[1, 2], [2, 3], [3, 4]])
  })

  it('keeps every saved value and fills completedAt with exactly what the history read returned', async () => {
    const { mock, domain, snapshot, withoutCompletedAt, oldCompletions, stored } = setup(250)
    const before = snapshot()
    const expected = await oldCompletions()
    const shownBefore = new Map((mock.datasets.get('todo.tasks') ?? []).map((row) => [String(row.id), expected.get(String(row.id))! || String(row.updatedAt) || String(row.createdAt)]))
    const result = await backfillCompletedAt(mock.api, domain.exclusive)
    const after = snapshot()
    for (const id of DATASETS.filter((dataset) => dataset !== 'todo.tasks')) expect(after[id]).toEqual(before[id])
    expect(withoutCompletedAt(after['todo.tasks'])).toEqual(withoutCompletedAt(before['todo.tasks']))
    expect(stored()).toEqual(expected)
    expect(result).toEqual({ updated: [...expected.values()].filter(Boolean).length, skipped: false })
    expect(Object.fromEntries([...stored()].filter(([id]) => !id.startsWith('bulk-')))).toEqual({
      done: T(2), twice: T(4), reopened: T(5), canceled: T(7), fromCustom: T(8), customDone: null,
      deletedCustom: T(10), invalid: T(12), legacy: null, waiting: null
    })
    const list = await loadTodoList()
    expect(new Map(list.map((record) => [record.id, completionTimestamp(record)]))).toEqual(shownBefore)
    expect(JSON.parse(await mock.api.data.files.readText(COMPLETION_BACKFILL_MARKER) ?? '{}')).toMatchObject({ migration: 'completed-at-v4', updated: result.updated })
  })

  it('runs once, and an unmarked second run writes nothing', async () => {
    const { mock, domain, snapshot } = setup(30)
    await backfillCompletedAt(mock.api, domain.exclusive)
    const once = snapshot()
    const transactions: unknown[] = []
    const transaction = mock.api.data.transaction.bind(mock.api.data)
    mock.api.data.transaction = ((operations, options) => { transactions.push(operations); return transaction(operations, options) }) as typeof transaction
    expect(await backfillCompletedAt(mock.api, domain.exclusive)).toEqual({ updated: 0, skipped: true })
    const marker = await mock.api.data.files.readTextBaseline(COMPLETION_BACKFILL_MARKER)
    await mock.api.data.files.writeTextGuarded(COMPLETION_BACKFILL_MARKER, '', marker!.baseline)
    expect(await backfillCompletedAt(mock.api, domain.exclusive)).toEqual({ updated: 0, skipped: false })
    expect(transactions).toEqual([])
    expect(snapshot()).toEqual(once)
  })

  it('resumes an interrupted run and ends where an uninterrupted run ends', async () => {
    const reference = setup(250)
    await backfillCompletedAt(reference.mock.api, reference.domain.exclusive)
    const { mock, domain, snapshot, stored } = setup(250)
    let steps = 0
    const transaction = mock.api.data.transaction.bind(mock.api.data)
    mock.api.data.transaction = ((operations, options) => {
      if (++steps === 2) throw new Error('Realm closed')
      return transaction(operations, options)
    }) as typeof transaction
    await expect(backfillCompletedAt(mock.api, domain.exclusive)).rejects.toThrow('Realm closed')
    expect(await mock.api.data.files.readText(COMPLETION_BACKFILL_MARKER)).toBeNull()
    const partial = [...stored().values()].filter(Boolean).length
    expect(partial).toBeGreaterThan(0)
    expect(partial).toBeLessThan([...reference.stored().values()].filter(Boolean).length)
    const resumed = await backfillCompletedAt(mock.api, domain.exclusive)
    expect(resumed.updated + partial).toBe([...reference.stored().values()].filter(Boolean).length)
    expect(stored()).toEqual(reference.stored())
    expect(snapshot()['todo.tasks']).toEqual(reference.snapshot()['todo.tasks'])
  })

  it('guards each row by revision and retries a step a foreign write overtook', async () => {
    const { mock, domain, stored } = setup()
    let first = true
    const transaction = mock.api.data.transaction.bind(mock.api.data)
    mock.api.data.transaction = (async (operations, options) => {
      if (first && options?.expected?.length) {
        first = false
        await mock.api.data.dataset('todo.tasks').update({ id: 'done' }, { title: 'Survey done (renamed elsewhere)' })
      }
      return transaction(operations, options)
    }) as typeof transaction
    const result = await backfillCompletedAt(mock.api, domain.exclusive)
    expect(first).toBe(false)
    expect(stored().get('done')).toBe(T(2))
    expect(result.updated).toBe(7)
  })

  it('never interleaves a step with a task write, and writes keep completedAt themselves', async () => {
    const { mock, domain, stored, oldCompletions } = setup(250)
    const run = backfillCompletedAt(mock.api, domain.exclusive)
    const edits = ['reopened', 'legacy', 'bulk-4', 'waiting'].map((id) => domain.patch(id, (current) => ({ ...patchForStatus(current.completed ? null : 'completed'), title: `${current.title}!` })))
    await Promise.all([run, ...edits])
    expect(stored()).toEqual(await oldCompletions())
    expect(stored().get('legacy')).toBeNull()
    expect(stored().get('reopened')).not.toBe(T(5))
  })
})

describe('completedAt on every write', () => {
  it('stays equal to the history rule through UI edits, Workflow patches, restores, cancels, custom statuses and done-setting changes', async () => {
    const { mock, domain, stored, oldCompletions } = setup()
    await backfillCompletedAt(mock.api, domain.exclusive)
    const check = async () => expect(stored()).toEqual(await oldCompletions())
    const snapshotOf = async (id: string): Promise<TodoRecord> => (await domain.get(id))!
    await domain.append({ id: 'fresh', title: 'Fresh survey', completed: false, priority: 'normal', dueDate: '', note: '', tags: [], createdAt: T(20), updatedAt: T(20) })
    await check()
    await domain.append({ id: 'imported', title: 'Imported survey', completed: true, status: 'completed', priority: 'normal', dueDate: '', note: '', tags: [], createdAt: T(20), updatedAt: T(20), statusHistory: [{ from: 'open', to: 'completed', changedAt: T(19) }] })
    await check()
    expect(stored().get('imported')).toBe(T(19))
    const before = await snapshotOf('done')
    await domain.patch('done', patchForStatus(null)); await check()
    await domain.patch('done', patchForStatus('canceled')); await check()
    await domain.patch('fresh', patchForStatus('completed')); await check()
    await domain.patch('fresh', patchForStatus('custom-review', SETTINGS.statuses as never)); await check()
    await domain.patch('fresh', patchForStatus('completed')); await check()
    expect(stored().get('fresh')).toBe(mock.datasets.get('todo.status_history')!.filter((row) => row.taskId === 'fresh').at(-1)!.changedAt)
    await domain.patch('waiting', { title: 'Renamed only' }); await check()
    await domain.update('done', before, undefined, undefined, undefined, undefined, { exactStatusHistory: true }); await check()
    expect(stored().get('done')).toBe(T(2))
    await mock.api.settings.set('statuses', { ...SETTINGS.statuses, done: { waiting: true } })
    await domain.patch('waiting', patchForStatus('waiting', { custom: SETTINGS.statuses.custom as never, done: { waiting: true } })); await check()
    await domain.patch('customDone', patchForStatus('completed')); await check()
    expect(stored().get('customDone')).toBe(mock.datasets.get('todo.status_history')!.filter((row) => row.taskId === 'customDone').at(-1)!.changedAt)
    const ops: DatasetTransactionOperation[][] = []
    const update = mock.api.documents.update.bind(mock.api.documents)
    mock.api.documents.update = ((ref, change) => { ops.push((change.operations ?? []) as DatasetTransactionOperation[]); return update(ref, change) }) as typeof update
    await domain.patch('twice', { priority: 'high' })
    expect(ops[0][0]).toMatchObject({ dataset: 'todo.tasks', operation: 'update', values: { completedAt: T(4) } })
    await check()
  })
})

describe('the v3 → v4 migration on a saved SQLite store', () => {
  it('adds completedAt and the reminder index the way the host applies the declared steps, keeping every row', () => {
    // Through require: Vite drops the `node:` prefix of a dynamic import, and `sqlite` alone does not resolve.
    const { DatabaseSync } = createRequire(import.meta.url)('node:sqlite') as typeof import('node:sqlite')
    const db = new DatabaseSync(':memory:')
    const quoted = (name: string): string => `"${name.replace(/"/g, '""')}"`
    const sqlType = (type: string): string => type === 'integer' || type === 'boolean' ? 'INTEGER' : type === 'real' ? 'REAL' : 'TEXT'
    const tasks = CONFIG.datasets.find((dataset) => dataset.id === 'tasks')!
    const v3 = Object.entries(tasks.columns).filter(([name]) => name !== 'completedAt') as [string, { type: string; nullable?: boolean }][]
    db.exec(`CREATE TABLE tasks (${v3.map(([name, column]) => `${quoted(name)} ${sqlType(column.type)}${column.nullable ? '' : ' NOT NULL'}`).join(', ')}, PRIMARY KEY ("id"))`)
    const rows = v3Rows(5).map((record) => Object.fromEntries(v3.map(([name, column]) => {
      const value = (record as Record<string, unknown>)[name]
      return [name, value === undefined ? null : column.type === 'boolean' ? Number(value) : column.type === 'json' ? JSON.stringify(value) : value]
    })))
    const insert = db.prepare(`INSERT INTO tasks (${v3.map(([name]) => quoted(name)).join(', ')}) VALUES (${v3.map(() => '?').join(', ')})`)
    for (const row of rows) insert.run(...v3.map(([name]) => row[name] as string | number | null))
    const before = db.prepare('SELECT * FROM tasks ORDER BY id').all()
    const migration = CONFIG.datasetMigrations.find((entry) => entry.id === 'completed-at-v4')!
    for (const step of migration.steps) {
      if (step.operation === 'add-column') db.exec(`ALTER TABLE tasks ADD COLUMN ${quoted(step.column!)} ${sqlType(step.definition!.type)}${step.definition!.nullable ? '' : ' NOT NULL'}`)
      else if (step.operation === 'create-index') db.exec(`CREATE INDEX IF NOT EXISTS ${quoted(`tasks_${step.index!.id}`)} ON tasks (${step.index!.columns.map(quoted).join(', ')})`)
      else throw new Error(`Unexpected step ${step.operation}`)
    }
    const after = db.prepare('SELECT * FROM tasks ORDER BY id').all() as Record<string, unknown>[]
    expect(after.map(({ completedAt: _completedAt, ...rest }) => rest)).toEqual(before)
    expect(after.every((row) => row.completedAt === null)).toBe(true)
    expect(db.prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'tasks_reminder'").all()).toHaveLength(1)
    db.close()
  })
})
