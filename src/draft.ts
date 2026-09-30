import type { TodoRecord } from '@valley/plugin-sdk/types'
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

export function formatMinutes(minutes: number | undefined): string {
  if (minutes === undefined || minutes === null) return ''
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h}h` : `${h}:${String(m).padStart(2, '0')}`
}

/**
 * Recombine the two reminder inputs into the stored wall-clock string. A time
 * without a date is meaningless, so it is dropped rather than guessed at.
 */
export function composeRemindAt(date: string, time: string): string | undefined {
  const d = date.trim()
  if (!d) return undefined
  const t = time.trim()
  return t ? `${d}T${t}` : d
}

export function basename(path: string): string {
  const parts = path.split('/')
  const last = parts[parts.length - 1] ?? ''
  return last.replace(/\.[^.]+$/, '') || last
}
