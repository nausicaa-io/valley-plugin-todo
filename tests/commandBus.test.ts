import { describe, expect, it } from 'vitest'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes } from './mockTodoNotes'
import { registerTodoCommands } from '../src/commands'

describe('todo commands (bus)', () => {
  it('todo:add appends a task and returns a working revert', async () => {
    const { mock } = installTodoNotes([])
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
    registerTodoCommands(mock.api)
    const r = await mock.api.commands.execute('todo:add', {})
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error.kind).toBe('invalid-input')
  })

  it('todo:complete sets the status and reverts to the prior state', async () => {
    const { mock } = installTodoNotes([{ id: 'x', title: 'Task', status: 'open', completed: false } as DataRecord])
    registerTodoCommands(mock.api)
    const r = await mock.api.commands.execute('todo:complete', { query: 'Task' })
    expect(r.ok).toBe(true)
    if (r.ok) expect((r.value as { status: string }).status).toBe('completed')
    expect(mock.datasets.get('todo.tasks')?.[0]).toMatchObject({ completed: true, status: 'completed' })
    await mock.busUndo[0].undo()
    expect(mock.datasets.get('todo.tasks')?.[0]).toMatchObject({ completed: false, status: 'open' })
  })

  it('todo:list returns structured tasks filtered by a query', async () => {
    const { mock } = installTodoNotes([
      { id: 'a', title: 'Catalog fern specimen', status: 'open' } as DataRecord,
      { id: 'b', title: 'Record moss growth', status: 'open' } as DataRecord
    ])
    registerTodoCommands(mock.api)
    const r = await mock.api.commands.execute('todo:list', { q: 'fern' })
    expect(r.ok).toBe(true)
    if (r.ok) expect((r.value as { title: string }[]).map((t) => t.title)).toEqual(['Catalog fern specimen'])
  })
})
