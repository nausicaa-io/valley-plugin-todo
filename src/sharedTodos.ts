import type { TodoRecord } from '@valley/plugin-sdk/types'
import { api } from './runtime'

/**
 * Shared in-memory todo list so every panel instance stays in sync. The host
 * runtime preserves it across module re-imports and clears it on unload.
 */
export type Listener = (todos: TodoRecord[]) => void

interface SharedTodoStore {
  todos: TodoRecord[]
  listeners: Set<Listener>
}

const STORE_KEY = 'todo.sharedTodos'

function store(): SharedTodoStore {
  return api.runtime.getOrCreate(STORE_KEY, () => ({ todos: [], listeners: new Set() }))
}

export function getSharedTodos(): TodoRecord[] {
  return store().todos
}

export function setSharedTodos(todos: TodoRecord[]): void {
  const s = store()
  s.todos = todos
  for (const fn of s.listeners) fn(todos)
}

export function onSharedTodos(fn: Listener): () => void {
  const s = store()
  s.listeners.add(fn)
  return () => {
    s.listeners.delete(fn)
  }
}
