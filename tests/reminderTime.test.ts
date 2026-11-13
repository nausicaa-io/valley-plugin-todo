import { describe, expect, it } from 'vitest'
import { formatReminderTime, parseReminderTime } from '../src/ReminderOffsets'

describe('reminder time', () => {
  it('accepts hh:mm up to one week and rejects illegal times', () => {
    expect(parseReminderTime('0:15')).toBe(15)
    expect(parseReminderTime('01:30')).toBe(90)
    expect(parseReminderTime('168:00')).toBe(10080)
    for (const bad of ['', '1', '1:5', '1:60', '12:3a', '-1:00', '168:01', '1:00:00', '::']) expect(parseReminderTime(bad)).toBeNull()
  })

  it('formats minutes back to hh:mm', () => {
    expect(formatReminderTime(90)).toBe('01:30')
    expect(formatReminderTime(5)).toBe('00:05')
  })
})
