import Ajv2020 from 'ajv/dist/2020'
import { describe, expect, it } from 'vitest'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes } from './mockTodoNotes'
import { registerTodoCommands } from '../src/commands'

function validatePublishedResults(mock: { api: import('@valley/plugin-sdk').ValleyPluginApi }): void {
  const original = mock.api.commands.register
  vi.spyOn(mock.api.commands, 'register').mockImplementation(definition => {
    const schema = (definition as typeof definition & { outputSchema?: Record<string, unknown> }).outputSchema
    expect(schema, definition.id).toBeDefined()
    const validate = new Ajv2020({ strict: false, strictSchema: true, allowUnionTypes: true, ownProperties: true, validateFormats: false }).compile(schema!)
    expect(validate({ unexpected: true }), definition.id).toBe(false)
    return original({ ...definition, run: async (input, context) => {
      const result = await definition.run(input, context)
      const value = definition.sideEffect === 'write' ? (result as { value: unknown }).value : result
      expect(validate(value), `${definition.id}: ${JSON.stringify(validate.errors)}`).toBe(true)
      return result
    } } as typeof definition)
  })
}

describe('todo commands (bus)', () => {
  it('todo:add appends a task and returns a working revert', async () => {
    const { mock } = installTodoNotes([])
    validatePublishedResults(mock)
    registerTodoCommands(mock.api)
    const r = await mock.api.commands.execute('todo:add', {
      title: 'Record moss growth',
      due: '2026-06-20',
      priority: 'high',
      note: 'Use the corner shop'
    })
    expect(r.ok).toBe(true)
    expect(mock.datasets.get('todo.tasks')?.[0]).toMatchObject({
      title: 'Record moss growth',
      dueDate: '2026-06-20',
      priority: 'high',
      note: 'Use the corner shop'
    })
    expect(mock.busUndo).toHaveLength(1)
    await mock.busUndo[0].undo()
    expect(mock.datasets.get('todo.tasks') ?? []).toHaveLength(0)
  })

  it('todo:add rejects a missing title (invalid-input)', async () => {
    const { mock } = installTodoNotes([])
    validatePublishedResults(mock)
    registerTodoCommands(mock.api)
    const r = await mock.api.commands.execute('todo:add', {})
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error.kind).toBe('invalid-input')
  })

  it('todo:complete sets the status and reverts to the prior state', async () => {
    const { mock } = installTodoNotes([{ id: 'x', title: 'Task', status: 'open', completed: false } as DataRecord])
    validatePublishedResults(mock)
    registerTodoCommands(mock.api)
    const r = await mock.api.commands.execute('todo:complete', { query: 'Task' })
    expect(r.ok).toBe(true)
    if (r.ok) expect((r.value as { status: string }).status).toBe('completed')
    expect(mock.datasets.get('todo.tasks')?.[0]).toMatchObject({ completed: true, status: 'completed' })
    await mock.busUndo[0].undo()
    expect(mock.datasets.get('todo.tasks')?.[0]).toMatchObject({ completed: false, status: 'open' })
  })

  it('status command undo restores the exact status history and redo reapplies the committed transition', async () => {
    const earlier = { from: 'open', to: 'inprogress', changedAt: '2026-01-01T00:00:00.000Z' }
    const { mock } = installTodoNotes([{ id: 'x', title: 'Task', status: 'inprogress', completed: false, statusHistory: [earlier] } as unknown as DataRecord])
    registerTodoCommands(mock.api)
    const historyRows = () => (mock.datasets.get('todo.status_history') ?? []).map(({ from, to, changedAt, position }) => ({ from, to, changedAt, position }))
    const before = historyRows()
    const taskRow = () => JSON.stringify(Object.entries(mock.datasets.get('todo.tasks')?.[0] ?? {}).filter(([key, value]) => key !== 'updatedAt' && value != null).sort(([a], [b]) => a.localeCompare(b)))
    const taskBefore = taskRow()
    for (const command of ['complete', 'done', 'reopen', 'cancel', 'pause']) {
      const r = await mock.api.commands.execute(`todo:${command}`, { query: 'x' })
      expect(r.ok, command).toBe(true)
      const applied = historyRows()
      expect(applied.length, command).toBeGreaterThanOrEqual(before.length)
      const action = mock.busUndo.at(-1)!
      expect((await action.undo()).ok, command).toBe(true)
      expect(historyRows(), command).toEqual(before)
      expect(taskRow(), command).toBe(taskBefore)
      expect((await action.redo!()).ok, command).toBe(true)
      expect(historyRows(), command).toEqual(applied)
      expect((await action.undo()).ok, command).toBe(true)
      expect(historyRows(), command).toEqual(before)
    }
  })

  it('reports a failed undo or redo of every task replacement command instead of claiming success', async () => {
    const { mock } = installTodoNotes([{ id: 'x', title: 'Task', status: 'inprogress', completed: false } as DataRecord])
    registerTodoCommands(mock.api)
    const call = mock.api.backend.call.bind(mock.api.backend)
    const refuseUpdates = () => vi.spyOn(mock.api.backend, 'call').mockImplementation(async (method, payload) => (method === 'records.update' ? { ok: false } : await call(method, payload)) as never)
    const runs: Array<[string, Record<string, unknown>]> = [['complete', { query: 'x' }], ['done', { query: 'x' }], ['reopen', { query: 'x' }], ['cancel', { query: 'x' }], ['pause', { query: 'x' }], ['status', { query: 'x', status: 'waiting' }], ['edit', { query: 'x', note: 'Changed' }]]
    for (const [command, input] of runs) {
      expect((await mock.api.commands.execute(`todo:${command}`, input)).ok, command).toBe(true)
      const action = mock.busUndo.at(-1)!
      const applied = JSON.stringify(mock.datasets.get('todo.tasks')?.[0])
      const refuse = refuseUpdates()
      await expect(action.undo(), command).rejects.toThrow('Could not restore the task.')
      expect(JSON.stringify(mock.datasets.get('todo.tasks')?.[0]), command).toBe(applied)
      refuse.mockRestore()
      expect((await action.undo()).ok, command).toBe(true)
      const restored = JSON.stringify(mock.datasets.get('todo.tasks')?.[0])
      refuseUpdates()
      await expect(action.redo!(), command).rejects.toThrow('Could not reapply the task change.')
      expect(JSON.stringify(mock.datasets.get('todo.tasks')?.[0]), command).toBe(restored)
      vi.restoreAllMocks()
      expect((await action.redo!()).ok, command).toBe(true)
    }
  })

  it('renderer-generated task ids stay unique within one millisecond', async () => {
    const { mock } = installTodoNotes([])
    registerTodoCommands(mock.api)
    vi.spyOn(Date, 'now').mockReturnValue(1_800_000_000_000)
    try {
      const [first, second] = await Promise.all([
        mock.api.commands.execute('todo:add', { title: 'First same-ms task' }),
        mock.api.commands.execute('todo:add', { title: 'Second same-ms task' })
      ])
      expect(first.ok).toBe(true)
      expect(second.ok).toBe(true)
      if (first.ok && second.ok) expect((first.value as { id: string }).id).not.toBe((second.value as { id: string }).id)
      expect(mock.datasets.get('todo.tasks')).toHaveLength(2)
    } finally { vi.restoreAllMocks() }
  })

  it('todo:list returns structured tasks filtered by a query', async () => {
    const { mock } = installTodoNotes([
      { id: 'a', title: 'Catalog fern specimen', status: 'open' } as DataRecord,
      { id: 'b', title: 'Record moss growth', status: 'open' } as DataRecord
    ])
    validatePublishedResults(mock)
    registerTodoCommands(mock.api)
    const r = await mock.api.commands.execute('todo:list', { q: 'fern' })
    expect(r.ok).toBe(true)
    if (r.ok) expect((r.value as { title: string }[]).map((t) => t.title)).toEqual(['Catalog fern specimen'])
  })

  it('validates every task mutation alias and falsey record field while preserving stale-write and removal undo rules', async () => {
    const { mock } = installTodoNotes([{ id: 'oak', title: 'Oak survey', status: 'open', completed: false } as DataRecord])
    validatePublishedResults(mock)
    registerTodoCommands(mock.api)
    const read = await mock.api.commands.execute('todo:get', { id: 'oak' })
    expect(read.ok).toBe(true)
    if (!read.ok) return
    const todo = read.value as { updatedAt: string }
    expect(await mock.api.commands.execute('todo:open', { id: 'oak' })).toMatchObject({ ok: true, value: { id: 'oak' } })
    const edited = await mock.api.commands.execute('todo:edit-fields', { id: 'oak', expectedUpdatedAt: todo.updatedAt, values: { flagged: false, note: '', tags: [], estimatedMinutes: 0, location: null } })
    expect(edited).toMatchObject({ ok: true, value: { completed: false, note: '', tags: [], estimatedMinutes: 0 } })
    expect(await mock.api.commands.execute('todo:edit-fields', { id: 'oak', expectedUpdatedAt: 'stale', values: { note: 'Refused' } })).toMatchObject({ ok: false })
    for (const command of ['complete', 'done', 'reopen', 'cancel', 'pause']) expect(await mock.api.commands.execute(`todo:${command}`, { query: 'oak' })).toMatchObject({ ok: true, value: { id: 'oak' } })
    expect(await mock.api.commands.execute('todo:status', { query: 'oak', status: 'open' })).toMatchObject({ ok: true, value: { completed: false } })
    expect(await mock.api.commands.execute('todo:edit', { query: 'oak', note: '' })).toMatchObject({ ok: true })
    expect(await mock.api.commands.execute('todo:search', { query: 'Oak' })).toMatchObject({ ok: true, value: [{ id: 'oak' }] })
    expect(await mock.api.commands.execute('todo:group-list', undefined)).toMatchObject({ ok: true })
    expect(await mock.api.commands.execute('todo:delete', { query: 'oak' })).toMatchObject({ ok: true, value: { deleted: false, deletedCount: 0 } })
    expect(await mock.api.commands.execute('todo:delete', { query: 'oak', confirm: true })).toMatchObject({ ok: true, value: { deleted: true, deletedCount: 1 } })
    await mock.busUndo.at(-1)!.undo()
    expect(await mock.api.commands.execute('todo:get', { id: 'oak' })).toMatchObject({ ok: true })
    expect(await mock.api.commands.execute('todo:open-page', undefined)).toMatchObject({ ok: true, value: null })
  })

  it('todo:open declares the optional newTab input the host sends for a Cmd-click or middle click on a task link', async () => {
    const { mock } = installTodoNotes([{ id: 'oak', title: 'Oak survey', status: 'open', completed: false } as DataRecord])
    const register = vi.spyOn(mock.api.commands, 'register')
    registerTodoCommands(mock.api)
    const open = register.mock.calls.map(([definition]) => definition).find((definition) => definition.id === 'open')
    expect((open?.input?.schema as { properties?: Record<string, unknown> } | undefined)?.properties?.newTab).toEqual({ type: 'boolean' })
    const openMainTab = vi.mocked(mock.api.workspace.openMainTab)
    expect(await mock.api.commands.execute('todo:open', { id: 'oak', newTab: true })).toMatchObject({ ok: true, value: { id: 'oak' } })
    expect(openMainTab).toHaveBeenLastCalledWith({ newTab: true })
    openMainTab.mockClear()
    expect(await mock.api.commands.execute('todo:open', { id: 'oak' })).toMatchObject({ ok: true, value: { id: 'oak' } })
    expect(await mock.api.commands.execute('todo:open', { id: 'oak', newTab: false })).toMatchObject({ ok: true, value: { id: 'oak' } })
    expect(openMainTab.mock.calls).toEqual([[], []])
    openMainTab.mockClear()
    expect(await mock.api.commands.execute('todo:open', { id: 'oak', newTab: 'yes' })).toMatchObject({ ok: false })
    expect(openMainTab).not.toHaveBeenCalled()
  })
})
