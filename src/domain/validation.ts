import type { TodoPriority } from '../types'

export const TODO_PRIORITIES: TodoPriority[] = ['normal', 'low', 'medium', 'high']

export function isTodoPriority(value: unknown): value is TodoPriority {
  return typeof value === 'string' && (TODO_PRIORITIES as string[]).includes(value)
}

/** `HH:mm`, 00:00–23:59. */
export function isClockTime(value: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
}

/** At most 16 distinct whole minutes before the task, each up to a week. */
export function validReminderOffsets(offsets: unknown): offsets is number[] {
  return Array.isArray(offsets) && offsets.length <= 16 && !offsets.some(value => !Number.isInteger(value) || value < 0 || value > 10080) && new Set(offsets).size === offsets.length
}
