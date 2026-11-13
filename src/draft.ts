import type { TodoRecord } from './types'
import { generateId } from './lib'

export function newTodo(title: string, filePath?: string, group?: string): TodoRecord {
  const now = new Date().toISOString()
  return {
    id: generateId('todo'),
    title: title.trim(),
    completed: false,
    priority: 'normal',
    dueDate: '',
    note: '',
    tags: [],
    filePath,
    group: group?.trim() || undefined,
    createdAt: now,
    updatedAt: now
  }
}

export function basename(path: string): string {
  const parts = path.split('/')
  const last = parts[parts.length - 1] ?? ''
  return last.replace(/\.[^.]+$/, '') || last
}
