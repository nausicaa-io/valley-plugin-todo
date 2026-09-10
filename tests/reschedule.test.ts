import { describe, expect, it } from 'vitest'
import { rescheduleActions, thisWeekend } from '../src/reschedule'

// 2026-08-13 is a Thursday, which makes every weekday case reachable by offset.
const THU = '2026-08-13'
const FRI = '2026-08-14'
const SAT = '2026-08-15'
const SUN = '2026-08-16'

const ids = (dueDate: string, today = THU): string[] =>
  rescheduleActions(dueDate, today).map((a) => a.id)

describe('thisWeekend', () => {
  it('is the coming Saturday, always strictly in the future', () => {
    expect(thisWeekend('2026-08-10')).toBe('2026-08-15') // Mon → Sat
    expect(thisWeekend(THU)).toBe(SAT)
    expect(thisWeekend(FRI)).toBe(SAT)
  })

  it('is Sunday on a Saturday — "the day after tomorrow" is not this weekend', () => {
    expect(thisWeekend(SAT)).toBe(SUN)
  })

  it('is next Saturday on a Sunday', () => {
    expect(thisWeekend(SUN)).toBe('2026-08-22')
  })
})

describe('rescheduleActions', () => {
  it('offers Tomorrow · This weekend · Date for an overdue todo', () => {
    expect(ids('2020-01-01')).toEqual(['tomorrow', 'weekend', 'pick'])
  })

  it('offers Tomorrow · This weekend · Date for one due today', () => {
    expect(ids(THU)).toEqual(['tomorrow', 'weekend', 'pick'])
  })

  it('offers only This weekend · Date for one due tomorrow', () => {
    expect(ids(FRI)).toEqual(['weekend', 'pick'])
  })

  it('offers the same three for a later or undated todo', () => {
    expect(ids('2026-12-01')).toEqual(['tomorrow', 'weekend', 'pick'])
    expect(ids('')).toEqual(['tomorrow', 'weekend', 'pick'])
  })

  it('never offers more than three buttons', () => {
    for (const due of ['', THU, FRI, SAT, SUN, '2020-01-01', '2026-12-01']) {
      for (const today of [THU, FRI, SAT, SUN]) {
        expect(rescheduleActions(due, today).length).toBeLessThanOrEqual(3)
      }
    }
  })

  it('drops an action that resolves to the date the todo already has', () => {
    // Due on the coming Saturday: "This weekend" would be a no-op.
    expect(ids(SAT)).not.toContain('weekend')
    // Due tomorrow: so would "Tomorrow".
    expect(ids('2026-12-01', THU)).toContain('tomorrow')
    expect(ids(FRI, THU)).not.toContain('tomorrow')
  })

  it('never offers Today — the tray is for pushing a todo out, not pulling it in', () => {
    for (const due of ['', THU, FRI, SAT, SUN, '2020-01-01', '2026-12-01']) {
      expect(ids(due)).not.toContain('today')
    }
  })

  it('collapses two actions that name the same day', () => {
    // On a Friday, Tomorrow and This weekend are both Saturday.
    const actions = rescheduleActions('', FRI)
    const dates = actions.filter((a) => a.date).map((a) => a.date)
    expect(new Set(dates).size).toBe(dates.length)
  })

  it('drops This weekend on a Saturday, where Tomorrow already says Sunday', () => {
    expect(ids('2020-01-01', SAT)).toEqual(['tomorrow', 'pick'])
  })

  it('always keeps the date picker, which can never be a no-op', () => {
    for (const due of ['', THU, FRI, SAT, '2020-01-01', '2026-12-01']) {
      const pick = rescheduleActions(due, THU).find((a) => a.id === 'pick')
      expect(pick).toBeDefined()
      expect(pick!.date).toBeNull()
    }
  })

  it('gives every action a label key rather than a resolved string', () => {
    for (const action of rescheduleActions('', THU)) {
      expect(action.labelKey).toMatch(/^todo\.swipe\./)
    }
  })
})
