import { addDays, isoDay, parseLocalDate } from './sort'

/**
 * The quick-reschedule actions a row's right-swipe offers: Tomorrow, This
 * weekend, Date.
 *
 * Pure and table-driven, because the whole point is that the tray adapts. It
 * used to branch on how the todo's due date related to today; it no longer
 * needs to, because the two filters below already drop every no-op the branch
 * existed to avoid — a todo due tomorrow is not offered "Tomorrow", and on a
 * Friday "This weekend" collapses into it. Offering a no-op is worse than
 * offering nothing; it looks like the app did something.
 */
export type RescheduleId = 'tomorrow' | 'weekend' | 'pick'

export interface RescheduleAction {
  id: RescheduleId
  labelKey: string
  /** The date it sets, or null for `pick` (which opens the date panel). */
  date: string | null
}

const LABEL_KEYS: Record<RescheduleId, string> = {
  tomorrow: 'todo.swipe.tomorrow',
  weekend: 'todo.swipe.thisWeekend',
  pick: 'todo.swipe.date'
}

/**
 * Offered left to right. Never more than three — a tray wider than that leaves
 * no row visible to swipe back.
 */
const OFFERED: RescheduleId[] = ['tomorrow', 'weekend', 'pick']

/**
 * The coming Saturday — "this weekend" means the next one that has not started,
 * so it is always strictly in the future. On a Saturday it would resolve to the
 * day after tomorrow, which no one reads as *this* weekend, so Sunday is the
 * honest answer there; `rescheduleActions` then drops it when Tomorrow already
 * says the same date.
 */
export function thisWeekend(today: string = isoDay(new Date())): string {
  const date = parseLocalDate(today)
  if (!date) return today
  const day = date.getDay() // 0 Sun … 6 Sat
  const ahead = day === 6 ? 1 : (6 - day + 7) % 7 || 7
  return addDays(today, ahead)
}

/**
 * The tray for a todo, left to right.
 *
 * Two filters make it honest: an action resolving to the date the todo already
 * has is dropped, and two actions resolving to the *same* date collapse to the
 * first (Tomorrow and This weekend name one day on a Friday).
 */
export function rescheduleActions(
  dueDate: string,
  today: string = isoDay(new Date())
): RescheduleAction[] {
  const current = dueDate.slice(0, 10)
  const resolve = (id: RescheduleId): string | null => {
    if (id === 'tomorrow') return addDays(today, 1)
    if (id === 'weekend') return thisWeekend(today)
    return null
  }
  const seen = new Set<string>()
  const out: RescheduleAction[] = []
  for (const id of OFFERED) {
    const date = resolve(id)
    if (date !== null) {
      if (date === current || seen.has(date)) continue
      seen.add(date)
    }
    out.push({ id, labelKey: LABEL_KEYS[id], date })
  }
  return out
}
