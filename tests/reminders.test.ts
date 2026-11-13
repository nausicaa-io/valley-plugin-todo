import { reminderTimes } from '../src/backend/reminders'
import { expect, it } from 'vitest'

it('supports distinct minute/hour offsets and requires an explicit time for date-only tasks', () => {
  const record = { id: 'fern', title: 'Fern survey', completed: false, dueDate: '2026-09-30', startTime: '10:00', reminderOffsets: [0, 10, 120] } as Parameters<typeof reminderTimes>[0]
  expect(reminderTimes(record).map(value => value.at)).toEqual([0, 10, 120].map(minutes => new Date('2026-09-30T10:00').getTime() - minutes * 60000))
  expect(reminderTimes({ ...record, startTime: undefined })).toEqual([])
  expect(reminderTimes({ ...record, startTime: undefined, reminderTime: '09:00' })).toHaveLength(3)
  expect(reminderTimes({ ...record, completed: true })).toEqual([])
  expect(reminderTimes({ ...record, reminderOffsets: [] })).toEqual([])
  expect(() => reminderTimes({ ...record, reminderOffsets: [10, 10] })).toThrow('Invalid reminder offsets')
  expect(reminderTimes({ ...record, remindAt: '2026-09-30T08:00:00Z' })).toEqual([{ id: 'absolute', at: Date.parse('2026-09-30T08:00:00Z') }])
  expect(reminderTimes({ ...record, remindAt: '2026-09-30T08:00:00Z', reminderFiredAt: '2026-09-30T08:00:00Z' })).toEqual([])
})
