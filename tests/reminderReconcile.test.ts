import { describe, expect, it, vi } from 'vitest'
import type { PluginBackendApi } from '@valley/plugin-sdk'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes } from './mockTodoNotes'
import { keyDatasetChanges } from './keyedChanges'
import { countIo } from './ioCost'
import { readReminderCandidates } from '../src/backend/reminderQuery'
import { createTodoDomain } from '../src/domain'
import { reminderTimes, startReminderOwner } from '../src/reminderOwner'
import { patchForStatus } from '../src/statuses'
import type { TodoRecord } from '../src/types'

const NOW = '2026-11-03T08:00:00.000Z'
const flush = async (): Promise<void> => { for (let index = 0; index < 20; index++) await new Promise((resolve) => setTimeout(resolve, 0)) }
const day = (offset: number): string => {
  const date = new Date(Date.now() + offset * 86_400_000)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
const task = (id: string, overrides: Partial<TodoRecord> = {}): TodoRecord => ({
  id, title: `Survey ${id}`, completed: false, priority: 'normal', dueDate: '', note: '', tags: [], createdAt: NOW, updatedAt: NOW, ...overrides
})

interface Scheduled { at: number; title: string; body: string; label: string }

/** A fake notification host: the schedule it holds and every call it received. */
function startOwner(seeded: TodoRecord[], options: { state?: unknown; language?: string; settings?: Record<string, unknown> } = {}) {
  const { mock } = installTodoNotes(seeded as unknown as DataRecord[], options.settings)
  keyDatasetChanges(mock)
  const io = countIo(mock)
  const domain = createTodoDomain(mock.api)
  const host = new Map<string, Scheduled>()
  const calls: string[] = []
  let language = options.language ?? 'en'
  const schedule = vi.fn(async (key: string, at: number[], spec: { title: string; body: string; actions: { label: string }[] }) => {
    calls.push(`schedule ${key}`)
    host.set(key, { at: at[0], title: spec.title, body: spec.body, label: spec.actions[0].label })
  })
  const cancel = vi.fn(async (key: string) => { calls.push(`cancel ${key}`); host.delete(key) })
  const resumeListeners: (() => void)[] = []
  const api = {
    ...mock.api,
    lifecycle: { onResume: (listener: () => void) => { resumeListeners.push(listener); return () => {} } },
    notifications: { schedule, cancel, onOccurrence: () => () => {} },
    i18n: { t: (key: string) => `${language}:${key}`, language: () => language },
    rpc: { handle: () => () => {}, emit: vi.fn() }
  } as unknown as PluginBackendApi
  const begin = async () => {
    if (options.state !== undefined) await mock.api.data.files.writeTextGuarded('reminder-state.json', JSON.stringify(options.state), null)
    const stop = startReminderOwner(api, () => readReminderCandidates(api), undefined, (ids) => readReminderCandidates(api, ids))
    await flush()
    return stop
  }
  /** What a full read of every task schedules, computed with the same rules as before. */
  const reference = async (): Promise<Map<string, { at: number; title: string; body: string }>> => {
    const offsets = api.settings.get().reminderOffsets
    const expected = new Map<string, { at: number; title: string; body: string }>()
    for (const record of await domain.list()) {
      for (const occurrence of reminderTimes(record, Array.isArray(offsets) ? offsets as number[] : [10])) {
        expected.set(`reminder:${record.id}:${occurrence.id}`, { at: occurrence.at, title: record.title, body: record.note.trim().split('\n')[0] })
      }
    }
    return expected
  }
  const heldMatches = async (): Promise<void> => {
    const expected = await reference()
    expect([...host.keys()].sort()).toEqual([...expected.keys()].sort())
    for (const [key, value] of expected) expect(host.get(key)).toMatchObject(value)
  }
  const state = async () => JSON.parse((await mock.api.data.files.readText('reminder-state.json')) ?? 'null')
  return { mock, io, domain, host, calls, schedule, cancel, begin, heldMatches, state, resume: () => resumeListeners.forEach((listener) => listener()), setLanguage: (value: string) => { language = value } }
}

const reminded = (id: string, extra: Partial<TodoRecord> = {}): TodoRecord => task(id, { dueDate: day(2), startTime: '09:00', ...extra })

describe('reminder candidates', () => {
  it('yield the same reminder occurrences as a full read of every task', async () => {
    const records = [
      reminded('plain'),
      reminded('offsets', { reminderOffsets: [0, 15, 60] }),
      reminded('reminder-time', { startTime: undefined, reminderTime: '07:30' }),
      reminded('absolute', { remindAt: `${day(3)}T10:00` }),
      reminded('absolute-fired', { remindAt: `${day(3)}T10:00`, reminderFiredAt: NOW }),
      reminded('absolute-date', { remindAt: day(4) }),
      reminded('done', { completed: true, status: 'completed' as const }),
      reminded('canceled', { status: 'canceled' as const }),
      reminded('custom', { status: 'custom-blocked' as never }),
      reminded('no-title', { title: '   ' }),
      task('no-time', { dueDate: day(2) }),
      task('no-date', { startTime: '09:00' }),
      task('nothing'),
      reminded('note', { note: '  first line\nsecond line  ' })
    ]
    const run = startOwner(records)
    const all = await readReminderCandidates({ data: run.mock.api.data })
    const full = await run.domain.list()
    const times = (list: TodoRecord[]) => list.flatMap((record) => reminderTimes(record).map((time) => `${record.id}:${time.id}:${time.at}`))
    expect(times(all)).toEqual(times(full))
    expect(times(all).length).toBeGreaterThan(8)
    expect(all.length).toBeLessThan(full.length)
    const some = await readReminderCandidates({ data: run.mock.api.data }, ['plain', 'done', 'nothing', 'missing', 'plain'])
    expect(some.map((record) => record.id)).toEqual(['plain'])
    expect(await readReminderCandidates({ data: run.mock.api.data }, [])).toEqual([])
    const fields = ({ createdAt: _created, updatedAt: _updated, ...rest }: TodoRecord) => rest
    for (const record of all) expect(fields(record)).toEqual(fields(full.find((entry) => entry.id === record.id)!))
  })

  it('reads one filtered query on tasks and no relation dataset', async () => {
    const run = startOwner([...Array.from({ length: 300 }, (_, index) => task(`done-${index}`, { completed: true, status: 'completed' as const, tags: ['x'] })), reminded('open', { tags: ['y'] })])
    run.io.reset()
    expect((await readReminderCandidates({ data: run.mock.api.data })).map((record) => record.id)).toEqual(['open'])
    expect(run.io.counts.calls).toEqual({ 'dataset.query': 1 })
    expect(run.io.counts.rowsRead).toEqual({ tasks: 1 })
  })
})

describe('reminder reconcile', () => {
  it('keeps the host schedule equal to a full read through due, time, offsets, complete, reopen and delete', async () => {
    const run = startOwner([reminded('a'), reminded('b', { reminderOffsets: [0, 30] }), task('c'), reminded('far', { dueDate: day(20) })])
    const stop = await run.begin()
    await run.heldMatches()
    expect([...run.host.keys()].sort()).toEqual(['reminder:a:10', 'reminder:b:0', 'reminder:b:30', 'reminder:far:10'])
    const edit = (id: string, values: Partial<TodoRecord>) => run.domain.patch(id, values)
    const settle = async (): Promise<void> => { await flush(); await run.heldMatches() }

    await edit('a', { dueDate: day(5) }); await settle()
    await edit('a', { startTime: '11:15', endTime: '12:00' }); await settle()
    await edit('b', { reminderOffsets: [5] }); await settle()
    expect([...run.host.keys()].filter((key) => key.startsWith('reminder:b:')).sort()).toEqual(['reminder:b:5'])
    await edit('c', { dueDate: day(3), startTime: '08:00' }); await settle()
    await edit('a', patchForStatus('completed')); await settle()
    expect(run.host.has('reminder:a:10')).toBe(false)
    await edit('a', patchForStatus(null)); await settle()
    expect(run.host.has('reminder:a:10')).toBe(true)
    await edit('c', { remindAt: `${day(6)}T06:00` }); await settle()
    await edit('far', { title: 'Renamed far', note: 'Bring the map\nmore' }); await settle()
    expect(run.host.get('reminder:far:10')).toMatchObject({ title: 'Renamed far', body: 'Bring the map' })
    expect(await run.domain.remove('b')).toBe(true); await settle()
    await run.domain.append(reminded('d', { reminderOffsets: [0] })); await settle()
    await run.domain.append(task('e', { title: 'No reminder' })); await settle()
    await stop()
  })

  it('schedules only what changed: an unrelated edit schedules nothing, a time or text edit schedules that task once', async () => {
    const run = startOwner([reminded('a'), reminded('b'), reminded('c')])
    const stop = await run.begin()
    expect(run.schedule).toHaveBeenCalledTimes(3)
    run.calls.length = 0
    await run.domain.patch('a', { priority: 'high', flagged: true }); await flush()
    await run.domain.patch('a', { tags: ['x'] }); await flush()
    expect(run.calls).toEqual([])
    await run.domain.patch('a', { startTime: '10:00' }); await flush()
    expect(run.calls).toEqual(['schedule reminder:a:10'])
    run.calls.length = 0
    await run.domain.patch('b', { title: 'New title' }); await flush()
    expect(run.calls).toEqual(['schedule reminder:b:10'])
    run.calls.length = 0
    await run.domain.patch('c', patchForStatus('completed')); await flush()
    expect(run.calls).toEqual(['cancel reminder:c:10'])
    run.calls.length = 0
    await run.domain.patch('c', patchForStatus(null)); await flush()
    expect(run.calls).toEqual(['schedule reminder:c:10'])
    await stop()
  })

  it('reads no dataset for an unrelated settings change and reschedules only when the offsets changed in value', async () => {
    const run = startOwner([reminded('a'), reminded('b', { reminderOffsets: [0] }), ...Array.from({ length: 200 }, (_, index) => task(`seed-${index}`, { completed: index % 2 === 0, tags: ['x'] }))])
    const stop = await run.begin()
    run.io.reset(); run.calls.length = 0
    await run.mock.api.settings.set('showCompleted', true); await flush()
    await run.mock.api.settings.set('showCompleted', false); await flush()
    expect(run.io.counts.calls).toEqual({ 'settings.set': 2 })
    expect(run.io.counts.rowsRead).toEqual({})
    expect(run.calls).toEqual([])
    await run.mock.api.settings.set('reminderOffsets', [5, 30]); await flush()
    expect(run.io.counts.calls['dataset.query']).toBe(1)
    expect(Object.keys(run.io.counts.rowsRead)).toEqual(['tasks'])
    expect([...run.host.keys()].sort()).toEqual(['reminder:a:30', 'reminder:a:5', 'reminder:b:0'])
    await run.heldMatches()
    run.io.reset()
    await run.mock.api.settings.set('reminderOffsets', [5, 30]); await flush()
    expect(run.io.counts.calls).toEqual({ 'settings.set': 1 })
    await run.mock.api.settings.set('reminderOffsets', [10]); await flush()
    await run.heldMatches()
    expect([...run.host.keys()].sort()).toEqual(['reminder:a:10', 'reminder:b:0'])
    await stop()
  })

  it('resumes from an older state file without scheduled maps and keeps fired keys', async () => {
    const records = [reminded('a'), reminded('b'), reminded('fired-one'), task('gone')]
    const firedAt = new Date(`${day(2)}T09:00`).getTime() - 10 * 60_000
    const run = startOwner(records, { state: { keys: ['reminder:a:10', 'reminder:gone:10', 'reminder:fired-one:10'], fired: { 'reminder:fired-one:10': firedAt } } })
    const stop = await run.begin()
    expect(run.calls.sort()).toEqual(['cancel reminder:gone:10', 'schedule reminder:a:10', 'schedule reminder:b:10'])
    const saved = await run.state()
    expect(saved.fired).toEqual({ 'reminder:fired-one:10': firedAt })
    expect(saved.keys).toEqual(['reminder:a:10', 'reminder:b:10', 'reminder:fired-one:10'])
    expect(Object.keys(saved.scheduled).sort()).toEqual(['reminder:a:10', 'reminder:b:10'])
    await stop()

    const again = startOwner(records, { state: saved })
    await again.begin().then((halt) => halt())
    expect(again.calls).toEqual([])
  })

  it('reschedules after a restart only what changed meanwhile', async () => {
    const first = startOwner([reminded('a'), reminded('b')])
    const stopFirst = await first.begin()
    const saved = await first.state()
    await stopFirst()
    expect(saved.scheduled).toEqual({ 'reminder:a:10': expect.any(Number), 'reminder:b:10': expect.any(Number) })
    const second = startOwner([reminded('a', { startTime: '10:30' }), reminded('b')], { state: saved })
    const stop = await second.begin()
    expect(second.calls).toEqual(['schedule reminder:a:10'])
    await stop()
  })

  it('reschedules with the new texts when the language changed', async () => {
    const run = startOwner([reminded('a'), reminded('b')])
    const stop = await run.begin()
    expect(run.host.get('reminder:a:10')?.label).toBe('en:notification.open')
    run.setLanguage('de')
    await run.domain.patch('a', { title: 'Umbenannt' }); await flush()
    run.resume(); await flush()
    expect(run.host.get('reminder:a:10')?.label).toBe('de:notification.open')
    expect(run.host.get('reminder:b:10')?.label).toBe('de:notification.open')
    await stop()
  })

  it('does not write the state file when nothing changed', async () => {
    const run = startOwner([reminded('a')])
    const stop = await run.begin()
    const write = vi.spyOn(run.mock.api.data.files, 'writeTextGuarded')
    run.resume(); await flush()
    run.resume(); await flush()
    expect(write).not.toHaveBeenCalled()
    await stop()
  })
})
