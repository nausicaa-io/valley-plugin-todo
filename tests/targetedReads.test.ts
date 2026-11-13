import Ajv from 'ajv'
import { describe, expect, it, vi } from 'vitest'
import { createMockValleyApi } from '@valley/plugin-testkit'
import type { PluginBackendApi, PluginBackendOperationContext, WorkflowExecutionResult } from '@valley/plugin-sdk'
import type { DataRecord, ValleyPluginManifest } from '@valley/plugin-sdk/types'
import { installTodoNotes } from './mockTodoNotes'
import { countIo } from './ioCost'
import { register } from '../src/backend'
import { registerTodoCommands } from '../src/commands'
import { loadTodos } from '../src/data'
import { searchMatcher } from '../src/search'
import { bucketTodos, SECTION_ORDER, type TodoSectionId } from '../src/sections'
import { allGroups, groupKey } from '../src/groups'
import { getGroups } from '../src/groupStore'
import type { TodoRecord } from '../src/types'
import config from '../config.json'

const NOW = '2026-11-03T08:00:00.000Z'
const day = (offset: number): string => new Date(Date.now() + offset * 86_400_000).toISOString().slice(0, 10)
const named: DataRecord[] = [
  { id: 'moss-1', title: 'Record moss growth', note: 'Use the corner shop', tags: ['field', 'moss'], dueDate: day(-1), group: 'Lab' },
  { id: 'moss-2', title: '  MOSS samples to the lab  ', note: '', tags: ['lab'], dueDate: day(0) },
  { id: 'fern', title: 'Check fern', note: 'Bring moss bag', tags: ['field'], dueDate: day(3), priority: 'high' },
  { id: 'uber', title: 'Überprüfung der Proben', note: 'ÄÖÜ notes', tags: ['Field-Notes'] },
  { id: 'done', title: 'Archive moss photos', note: '', completed: true, status: 'completed', tags: ['archive'], statusHistory: [{ from: 'open', to: 'completed', changedAt: NOW }] },
  { id: 'canceled', title: 'Cancelled trip', note: '', status: 'canceled', tags: [] },
  { id: 'untitled', title: '   ', note: 'moss but no title', tags: ['field'] },
  { id: 'linked', title: 'Linked task', note: '', urls: ['https://example.com/a'], attachments: ['Projects/a.pdf'], history: [{ startedAt: NOW, endedAt: NOW, activeMinutes: 5, pauseMinutes: 0 }], tags: ['x'] },
  { id: 'a b', title: 'Id with a space', note: '' },
  ...Array.from({ length: 130 }, (_, index) => ({ id: `filler-${String(index).padStart(3, '0')}`, title: `Filler ${index}`, note: index % 7 ? 'filler note' : 'moss filler', tags: index % 3 ? ['field'] : [], dueDate: index % 5 ? '' : day(index % 9 - 4) }))
]
const base = { completed: false, priority: 'normal', dueDate: '', note: '', createdAt: NOW, updatedAt: NOW }
const seeded = (): DataRecord[] => named.map((record) => ({ ...base, ...record }) as DataRecord)

/** The commands as they read before this change: the full projection of every task, filtered in JS. */
async function oldResolve(query: string): Promise<TodoRecord | string> {
  const todos = await loadTodos()
  const trimmed = query.trim()
  if (!trimmed) return 'Expected a todo id or title.'
  const byId = todos.find((todo) => todo.id === trimmed)
  if (byId) return byId
  const matches = todos.filter((todo) => todo.title.toLowerCase().includes(trimmed.toLowerCase()))
  if (matches.length === 0) return `No todo matching "${trimmed}".`
  if (matches.length === 1) return matches[0]
  return `Multiple todos match "${trimmed}":\n${matches.map((todo, index) => `  ${index + 1}. ${todo.title} [${todo.id}]`).join('\n')}\nRe-run with the exact id.`
}

const setupCommands = (records = seeded()) => {
  const { mock } = installTodoNotes(records, {}, {}, {})
  registerTodoCommands(mock.api)
  return { mock, run: <T>(id: string, input: Record<string, unknown>) => mock.api.commands.execute(id, input) as Promise<{ ok: true; value: T } | { ok: false; error: { kind: string; message: string } }> }
}

describe('commands read only what they need (same results as a read of every task)', () => {
  it('search returns the same tasks in the same order, at most 20', async () => {
    const { run } = setupCommands()
    for (const query of ['moss', 'MOSS', '#field', '#fi moss', '#field-notes', '#field #lab', 'über', 'ÄÖÜ', 'a', 'filler', '', 'no such thing', '#nothing', 'moss but no title']) {
      const matches = searchMatcher(query)
      const expected = (await loadTodos()).filter((todo) => matches(todo.tags, todo.title, todo.note)).slice(0, 20)
      const result = await run<TodoRecord[]>('todo:search', { query: query || ' ' })
      if (!query.trim()) { expect(result.ok, query).toBe(false); continue }
      expect(result.ok && result.value, query).toEqual(expected)
    }
  })

  it('list returns the same tasks for every query and section, including past 100 matches', async () => {
    const { run } = setupCommands()
    const sections = ['', 'overdue', 'today', 'upcoming', 'someday', 'completed']
    for (const q of ['', 'moss', '#field', 'filler', '#field filler', 'no such thing', ' ', 'über']) {
      for (const section of sections) {
        let expected = await loadTodos()
        if (q) {
          const matches = searchMatcher(q)
          expected = expected.filter((todo) => matches(todo.tags, todo.title, todo.note))
        }
        if (section && (SECTION_ORDER as string[]).includes(section)) expected = bucketTodos(expected)[section as TodoSectionId]
        const result = await run<TodoRecord[]>('todo:list', { section, q })
        expect(result.ok && result.value, `${q}|${section}`).toEqual(expected)
      }
    }
  })

  it('resolves an id or title query as before: direct id, title substring, ambiguity and not-found messages', async () => {
    const { mock, run } = setupCommands()
    for (const query of ['moss-1', ' moss-1 ', 'fern', 'FERN', 'Record moss', 'moss', 'MOSS SAMPLES', 'a b', 'überprüfung', 'Überprüfung', 'untitled', 'nothing here', 'filler', 'Filler 12', 'moss-1x']) {
      const expected = await oldResolve(query)
      const result = await run<{ deleted: boolean; todo: TodoRecord }>('todo:delete', { query })
      if (typeof expected === 'string') {
        expect(result.ok, query).toBe(false)
        expect(!result.ok && result.error.message, query).toBe(expected)
      } else {
        expect(result.ok && result.value.todo, query).toEqual(expected)
        expect(result.ok && result.value.deleted).toBe(false)
      }
    }
    expect(mock.datasets.get('todo.tasks')).toHaveLength(named.length)
  })

  it('complete, reopen and cancel by title or id write, revert and reapply as before', async () => {
    const { mock, run } = setupCommands()
    const before = (await loadTodos()).find((todo) => todo.id === 'fern')!
    const completed = await run<TodoRecord>('todo:complete', { query: 'check FERN' })
    expect(completed.ok && completed.value).toMatchObject({ id: 'fern', completed: true, status: 'completed' })
    expect(mock.busUndo).toHaveLength(1)
    await mock.busUndo[0].undo()
    expect((await loadTodos()).find((todo) => todo.id === 'fern')).toMatchObject({ completed: false, status: before.status })
    const reopened = await run<TodoRecord>('todo:reopen', { query: 'moss-1' })
    expect(reopened.ok && reopened.value).toMatchObject({ id: 'moss-1', completed: false, status: 'open' })
    const missing = await run('todo:complete', { query: 'nothing here' })
    expect(!missing.ok && missing.error.message).toBe('No todo matching "nothing here".')
    const ambiguous = await run('todo:cancel', { query: 'moss' })
    expect(!ambiguous.ok && ambiguous.error.message).toContain('Multiple todos match "moss"')
  })

  it('group-list counts the same tasks per group', async () => {
    const { run } = setupCommands()
    const todos = await loadTodos()
    const expected = allGroups(getGroups()).map((name) => ({ name, count: todos.filter((todo) => groupKey(todo.group ?? '') === groupKey(name)).length }))
    const result = await run<{ name: string; count: number }[]>('todo:group-list', {})
    expect(result.ok && result.value).toEqual(expected)
  })

  it('costs one narrow scan plus one targeted read instead of a read of every dataset in full', async () => {
    const records = Array.from({ length: 2000 }, (_, index) => ({ ...base, id: `t-${String(index).padStart(4, '0')}`, title: index === 1501 ? 'The one unique heron survey' : `Survey ${index}`, note: index % 50 === 0 ? 'moss' : '', tags: index % 3 ? ['field'] : [], ...(index % 4 === 0 ? { completed: true, status: 'completed', statusHistory: [{ from: 'open', to: 'completed', changedAt: NOW }] } : {}) }) as DataRecord)
    const { mock, run } = setupCommands(records)
    const io = countIo(mock)
    const measure = async (name: string, action: () => Promise<unknown>) => {
      io.reset()
      await action()
      console.info(`[todo-optimize] ${name} at 2,000 tasks: ${JSON.stringify({ totals: io.totals(), ...io.counts })}`)
      return { totals: io.totals(), rowsRead: { ...io.counts.rowsRead } }
    }
    const full = await measure('read of every task (old path)', () => loadTodos())
    const complete = await measure('todo:complete by title', async () => { expect((await run('todo:complete', { query: 'unique heron' })).ok).toBe(true) })
    const byId = await measure('todo:delete by id', async () => { expect((await run('todo:delete', { query: 't-0007' })).ok).toBe(true) })
    const search = await measure('todo:search without tag', async () => { expect((await run<TodoRecord[]>('todo:search', { query: 'moss' })).ok).toBe(true) })
    const tagged = await measure('todo:search with tag', async () => { expect((await run<TodoRecord[]>('todo:search', { query: '#field heron' })).ok).toBe(true) })
    const groups = await measure('todo:group-list', async () => { expect((await run('todo:group-list', {})).ok).toBe(true) })
    expect(full.totals.rowsRead).toBeGreaterThanOrEqual(3800)
    expect(complete.rowsRead.status_history ?? 0).toBeLessThanOrEqual(2)
    expect(complete.rowsRead.task_tags ?? 0).toBeLessThanOrEqual(2)
    expect(complete.totals.rowsRead).toBeLessThan(2100)
    expect(byId.totals.rowsRead).toBeLessThan(20)
    expect(search.totals.calls).toBe(2 + 6)
    expect(search.rowsRead.task_tags ?? 0).toBeLessThanOrEqual(20)
    expect(tagged.rowsRead.task_tags ?? 0).toBeGreaterThanOrEqual(1300)
    expect(tagged.totals.calls).toBeLessThanOrEqual(4 + 6)
    expect(groups.totals.calls).toBe(2)
    expect(groups.totals.rowsRead).toBe(2000)
  }, 60_000)
})

function workflow(records: DataRecord[]) {
  const tasks = records.map((record) => ({ ...base, ...record, tags: undefined }))
  const mock = createMockValleyApi({
    manifest: { id: 'todo', noteDocuments: config.noteDocuments, datasets: config.datasets as unknown as ValleyPluginManifest['datasets'] },
    datasets: {
      'todo.tasks': tasks,
      'todo.task_tags': records.flatMap((record) => (Array.isArray(record.tags) ? record.tags : []).map((tag) => ({ taskId: record.id, tag }))),
      'todo.task_links': [], 'todo.task_attachments': [], 'todo.focus_sessions': [], 'todo.status_history': []
    }
  })
  const handlers = new Map<string, (input: unknown, context?: PluginBackendOperationContext) => unknown>()
  const api = { index: mock.api.index, realm: mock.api.realm, notifications: { ...mock.api.notifications, onOccurrence: () => () => {} }, lifecycle: { onResume: () => () => {} }, i18n: { t: mock.api.ui.t, language: () => 'en', onLanguageChanged: () => () => {} }, pluginId: 'todo', data: mock.api.data, documents: mock.api.documents, settings: mock.api.settings, services: { emit: vi.fn(async () => {}) }, rpc: {
    emit: vi.fn(),
    handle: (method: string, handler: (input: unknown) => unknown) => { handlers.set(method, handler); return () => { handlers.delete(method) } },
    handleOperation: (method: string, handler: (input: unknown, context: PluginBackendOperationContext) => unknown) => { handlers.set(method, async (input, context) => handler(input, context!)); return () => { handlers.delete(method) } }
  } } as unknown as PluginBackendApi
  const schemas = new Map<string, ReturnType<Ajv['compile']>>()
  api.schema = {
    compile: async ({ schema }) => { const handle = crypto.randomUUID(); schemas.set(handle, new Ajv({ strict: false, validateFormats: false, allowUnionTypes: true }).compile(schema)); return { handle, digest: handle } },
    validate: async (request) => { const validate = schemas.get(request.handle)!; return { valid: Boolean(validate('value' in request ? request.value : undefined)), issues: [] } },
    release: async (handle) => { schemas.delete(handle) }
  }
  const off = register(api)
  const context = { id: 'run-action', cancellation: new AbortController().signal, api } as unknown as PluginBackendOperationContext
  const execute = async (parameters: Record<string, unknown> = {}) => { await vi.waitFor(() => expect(handlers.has('workflow.execute')).toBe(true)); return handlers.get('workflow.execute')!({ nodeTypeId: 'task.list', parameters, items: [{ json: {} }] }, context) as Promise<WorkflowExecutionResult> }
  return { mock, execute, off }
}

describe('workflow task.list reads only what it needs (same items as a read of every task)', () => {
  it('returns the same items for every filter and limit, with and without the targeted read', async () => {
    const h = workflow(seeded().map((record) => (record.id === 'canceled' ? { ...record, status: 'canceled' } : record)))
    const everything = (await h.execute({ limit: 1000 })).items.map((item) => item.json)
    expect(everything.length).toBeGreaterThan(100)
    const wanted = (query: string | undefined, completed: boolean | undefined) => everything.filter((record) => (!query || `${record.title}\n${record.note}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())) && (completed === undefined || record.completed === completed))
    for (const [query, completed, limit] of [
      [undefined, undefined, 100], [undefined, true, 100], [undefined, false, 5], ['moss', undefined, 100], ['MOSS', false, 100], ['moss', true, 100],
      ['filler', undefined, 100], ['filler', undefined, 1000], ['filler', undefined, 7], ['über', undefined, 100], ['nothing here', undefined, 100], ['', undefined, 3], [undefined, undefined, 1000]
    ] as [string | undefined, boolean | undefined, number][]) {
      const result = await h.execute({ limit, ...(query === undefined ? {} : { query }), ...(completed === undefined ? {} : { completed }) })
      expect(result.items.map((item) => item.json), `${query}|${completed}|${limit}`).toEqual(wanted(query || undefined, completed).slice(0, limit))
    }
    h.off()
  })

  it('reads the task rows narrowly and loads only the kept tasks', async () => {
    const records = Array.from({ length: 2000 }, (_, index) => ({ ...base, id: `t-${String(index).padStart(4, '0')}`, title: `Survey ${index}`, note: index % 100 === 0 ? 'moss' : '', tags: index % 3 ? ['field'] : [] }) as DataRecord)
    const h = workflow(records)
    const io = countIo(h.mock)
    await h.execute({ query: 'moss', limit: 5 })
    io.reset()
    expect((await h.execute({ query: 'moss', limit: 5 })).items).toHaveLength(5)
    console.info(`[todo-optimize] workflow task.list (limit 5) at 2,000 tasks: ${JSON.stringify({ totals: io.totals(), ...io.counts })}`)
    expect(io.counts.calls['dataset.query']).toBe(2 + 6)
    expect(io.totals().rowsRead).toBeLessThanOrEqual(2000 + 5 + 4)
    h.off()
  })
})
