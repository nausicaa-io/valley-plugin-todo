import { api } from '../runtime'

/** The task icon a status wears, read straight from settings so icons.tsx stays free of the status module. */
export function statusIconName(status: string): string | undefined {
  const raw = api?.settings.get().statuses as { icons?: Record<string, unknown> } | undefined
  const name = raw?.icons?.[status]
  return typeof name === 'string' && name ? name : undefined
}
