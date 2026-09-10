import type { ValleyPluginManifest } from '@valley/plugin-sdk/types'
import { beforeEach, describe, expect, it } from 'vitest'
import { createMockValleyApi, type MockValleyApi } from '@valley/plugin-testkit'
import type { DataRecord, TodoRecord } from '@valley/plugin-sdk/types'
import { initRuntime } from '../src/runtime'
import { appendTodo, updateTodo, deleteTodo } from '../src/data'
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
