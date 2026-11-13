import type { ValleyPluginManifest } from '@valley/plugin-sdk/types'
import { beforeEach, describe, expect, it } from 'vitest'
import { createMockValleyApi, type MockValleyApi } from './harness'
import type { DataRecord, TodoRecord } from '@valley/plugin-sdk/types'
import { initRuntime } from '../src/runtime'
import { appendTodo, updateTodo, deleteTodo } from '../src/data/undo'
import { loadTodo } from '../src/data/reads'
import { loadTodoList } from '../src/data/listCache'
import config from '../config.json'

function makeTodo(overrides: Partial<TodoRecord> = {}): TodoRecord {
  return {
    id: 'todo_1',
    title: 'Review survey',
    completed: false,
    priority: 'normal',
    tags: [],
    createdAt: '2026-06-01T00:00:00.000Z',
    updatedAt: '2026-06-01T00:00:00.000Z',
    ...overrides
  } as TodoRecord
}

let todoMock: MockValleyApi
const todoRecords = (): DataRecord[] => todoMock.datasets.get('todo.tasks') ?? []
beforeEach(() => {
  todoMock = createMockValleyApi({ manifest: { id: 'todo', datasets: config.datasets as unknown as ValleyPluginManifest['datasets'], noteDocuments: config.noteDocuments }, datasets: { 'todo.tasks': [] } })
  initRuntime(todoMock.api)
})

describe('undoable todo records', () => {
  it('append → undo deletes the same id; redo re-appends', async () => {
    const todo = makeTodo()
    expect(await appendTodo(todo)).toBe(true)
    const actions = todoMock.undoActions
    expect(actions).toHaveLength(1)
    expect(actions[0].label).toContain('Review survey')

    expect((await actions[0].undo()).ok).toBe(true)
    expect(todoRecords()).toHaveLength(0)

    expect((await actions[0].redo!()).ok).toBe(true)
    expect(todoRecords()).toHaveLength(1)
    expect(todoRecords()[0].id).toBe('todo_1')
  })

  it('update → undo restores the previous record', async () => {
    await appendTodo(makeTodo())
    todoMock.undoActions.length = 0

    await updateTodo('todo_1', makeTodo({ title: 'Renamed task', completed: true }))
    expect(todoRecords()[0].title).toBe('Renamed task')
    const actions = todoMock.undoActions
    expect(actions).toHaveLength(1)

    expect((await actions[0].undo()).ok).toBe(true)
    expect(todoRecords()[0].title).toBe('Review survey')
    expect(todoRecords()[0].completed).toBe(false)

    expect((await actions[0].redo!()).ok).toBe(true)
    expect(todoRecords()[0].title).toBe('Renamed task')
  })

  it('update of a list record → undo restores what the owner replaced, sessions and links included, without a UI pre-read', async () => {
    const session = { startedAt: '2026-06-01T08:00:00.000Z', endedAt: '2026-06-01T08:25:00.000Z', activeMinutes: 25, pauseMinutes: 5 }
    await appendTodo(makeTodo({ urls: ['https://example.com/plan'], history: [session], actualMinutes: 25 }))
    todoMock.undoActions.length = 0
    const before = await loadTodo('todo_1')
    const [listed] = await loadTodoList()
    const reads: string[] = []
    const dataset = todoMock.api.data.dataset
    todoMock.api.data.dataset = ((id: string) => { const handle = dataset(id); return { ...handle, query: (query) => { reads.push(id); return handle.query(query) } } }) as typeof dataset
    expect(await updateTodo('todo_1', { ...listed, title: 'Renamed task', urls: [] })).toBe(true)
    expect(reads.filter((id) => id === 'todo.focus_sessions')).toHaveLength(1)
    todoMock.api.data.dataset = dataset
    expect(await loadTodo('todo_1')).toMatchObject({ title: 'Renamed task', history: [session] })
    expect((await todoMock.undoActions[0].undo()).ok).toBe(true)
    const restored = await loadTodo('todo_1')
    expect({ ...restored, updatedAt: undefined }).toEqual({ ...before, updatedAt: undefined })
    expect((await todoMock.undoActions[0].redo!()).ok).toBe(true)
    expect(await loadTodo('todo_1')).toMatchObject({ title: 'Renamed task', history: [session] })
    expect((await loadTodo('todo_1'))?.urls).toBeUndefined()
  })

  it('delete → undo re-appends the captured record', async () => {
    await appendTodo(makeTodo())
    todoMock.undoActions.length = 0

    expect(await deleteTodo('todo_1')).toBe(true)
    expect(todoRecords()).toHaveLength(0)
    const actions = todoMock.undoActions
    expect(actions).toHaveLength(1)
    expect(actions[0].label).toContain('Delete todo')

    expect((await actions[0].undo()).ok).toBe(true)
    expect(todoRecords()[0].title).toBe('Review survey')
  })
})
