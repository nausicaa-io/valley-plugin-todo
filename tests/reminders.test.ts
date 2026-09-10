import { describe, expect, it } from 'vitest'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import { dueReminders, reminderAt, reminderSpec } from '../src/reminders'

function todo(overrides: Partial<TodoRecord> = {}): TodoRecord {
  return {
    id: 't1',
    title: 'Habitat survey 9',
    completed: false,
    priority: 'normal',
    dueDate: '',
    note: '',
    tags: [],
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-08-01T00:00:00.000Z',
    ...overrides
  }
}

/** Local wall-clock epoch ms, matching how `reminderAt` builds its Date. */
const at = (y: number, m: number, d: number, hh = 0, mm = 0): number =>
  new Date(y, m - 1, d, hh, mm, 0, 0).getTime()

describe('reminderAt', () => {
  it('reads a date+time as local wall clock, not UTC', () => {
    expect(reminderAt(todo({ remindAt: '2026-08-10T09:00' }))).toBe(at(2026, 8, 10, 9, 0))
  })

  it('fires a date-only reminder at the start of that day', () => {
    expect(reminderAt(todo({ remindAt: '2026-08-10' }))).toBe(at(2026, 8, 10, 0, 0))
  })

  it('is null without a reminder, once fired, or when the todo is done', () => {
    expect(reminderAt(todo())).toBeNull()
    expect(
      reminderAt(todo({ remindAt: '2026-08-10T09:00', reminderFiredAt: '2026-08-10T09:00:01.000Z' }))
    ).toBeNull()
    expect(reminderAt(todo({ remindAt: '2026-08-10T09:00', completed: true }))).toBeNull()
  })

  it('refuses a value that is not local wall clock rather than half-parsing it', () => {
    // A full ISO instant would otherwise be read as the wrong hour.
    expect(reminderAt(todo({ remindAt: '2026-08-10T09:00:00.000Z' }))).toBeNull()
    expect(reminderAt(todo({ remindAt: 'tomorrow' }))).toBeNull()
  })
})

describe('dueReminders', () => {
  const now = at(2026, 8, 10, 12, 0)

  it('arms a reminder at its absolute moment, however far out', () => {
    // No horizon any more: main persists the schedule and re-arms it at vault
    // open, so there is nothing left for a horizon to protect against.
    const soon = todo({ id: 'soon', remindAt: '2026-08-10T18:00' })
    const farOff = todo({ id: 'far', remindAt: '2026-09-01T09:00' })
    const { settled, upcoming } = dueReminders([soon, farOff], now)
    expect(settled).toEqual([])
    expect(upcoming.map((u) => u.todo.id)).toEqual(['soon', 'far'])
    expect(upcoming[0].at).toBe(at(2026, 8, 10, 18, 0))
    expect(upcoming[1].at).toBe(at(2026, 9, 1, 9, 0))
  })

  it('settles a moment that has passed instead of re-raising it', () => {
    // The host owned that moment — it fired on time, late off a sleep, or once
    // as a missed notification at vault open. Raising it here as well is the
    // same reminder twice.
    const missed = todo({ id: 'missed', remindAt: '2026-08-10T08:00' })
    const { settled, upcoming } = dueReminders([missed], now)
    expect(settled.map((t) => t.id)).toEqual(['missed'])
    expect(upcoming).toEqual([])
  })

  it('never re-reports one that already fired', () => {
    const fired = todo({
      id: 'fired',
      remindAt: '2026-08-10T08:00',
      reminderFiredAt: '2026-08-10T08:00:02.000Z'
    })
    expect(dueReminders([fired], now)).toEqual({ settled: [], upcoming: [] })
  })

  it('treats the exact moment as settled, not as upcoming', () => {
    const exact = todo({ id: 'exact', remindAt: '2026-08-10T12:00' })
    expect(dueReminders([exact], now).settled.map((t) => t.id)).toEqual(['exact'])
  })
})

describe('reminderSpec', () => {
  it('takes the body from the first line of the note', () => {
    const spec = reminderSpec(todo({ note: 'Bring the tape measure\nand the clipboard' }))
    expect(spec).toEqual({ title: 'Habitat survey 9', body: 'Bring the tape measure' })
  })

  it('falls back to a generic body rather than an empty banner', () => {
    expect(reminderSpec(todo({ note: '   ' })).body).toBe('Reminder')
  })
})
