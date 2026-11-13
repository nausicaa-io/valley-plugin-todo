/** Local `YYYY-MM-DD` for a Date — never `toISOString`, which is UTC and lands
 *  on the wrong day either side of midnight. */
export function isoDay(date: Date = new Date()): string {
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${m}-${d}`
}

/** A `YYYY-MM-DD` as a local midnight Date, or null when it is not one. */
export function parseLocalDate(value: string): Date | null {
  const [y, m, d] = value.split('-').map((n) => parseInt(n, 10))
  if (!y || !m || !d) return null
  const date = new Date(y, m - 1, d)
  date.setHours(0, 0, 0, 0)
  return date
}

/** `YYYY-MM-DD` shifted by whole days, staying in local time. */
export function addDays(iso: string, days: number): string {
  const date = parseLocalDate(iso)
  if (!date) return iso
  date.setDate(date.getDate() + days)
  return isoDay(date)
}
