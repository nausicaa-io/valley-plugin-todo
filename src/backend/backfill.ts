import type { DatasetRecord, DatasetTransactionOperation, PluginBackendApi } from '@valley/plugin-sdk'
import { completionHistoryWhere, completionSources, latestCompletion } from '../completionHistory'
import { STATUS_SETTINGS_KEY } from '../model/statusModel'
import { STATUS_HISTORY_DATASET, TASKS_DATASET } from '../domain/datasets'

/** Written to plugin data once every saved task has its `completedAt`. */
export const COMPLETION_BACKFILL_MARKER = 'completed-at-v4.json'
/** Tasks per step: an `in` filter takes at most 100 values, and 100 updates stay far below the 500-operation batch limit. */
const PAGE = 100
const ATTEMPTS = 3

type BackfillApi = Pick<PluginBackendApi, 'data' | 'settings'>
type Exclusive = <T>(operation: () => Promise<T>) => Promise<T>

const isConflict = (error: unknown): boolean => !!error && typeof error === 'object' && 'code' in error && error.code === 'conflict' && !('outcomeUnknown' in error && error.outcomeUnknown === true)

/**
 * Fill `completedAt` (tasks v4) from the saved status history, once. Each step
 * runs between task writes (`exclusive`) and guards every row with its revision,
 * so a write can never interleave with a step; between steps any write the domain
 * makes already stores its own `completedAt`. Only `completedAt` is written, only
 * where it is null and a qualifying transition exists: `updatedAt`, the history
 * and every other value stay as saved. The tasks still without a `completedAt`
 * are listed first and then handled in steps that read them again, so the result
 * does not depend on how the host orders or pages ids. Interrupted runs resume,
 * because the remaining tasks still read null; the marker is written after the
 * last step.
 */
export async function backfillCompletedAt(api: BackfillApi, exclusive: Exclusive, live: () => void = () => {}): Promise<{ updated: number; skipped: boolean }> {
  live()
  if (await api.data.files.readText(COMPLETION_BACKFILL_MARKER)) return { updated: 0, skipped: true }
  // Listed between writes too, so no write can move a row across a page boundary while paging.
  const pending = await exclusive(async () => {
    const ids: string[] = []
    let cursor: string | undefined
    do {
      const page = await api.data.dataset(TASKS_DATASET).query({ select: ['id'], where: { completedAt: { isNull: true } }, limit: 1000, cursor })
      live()
      ids.push(...page.rows.map((row) => String(row.id)))
      cursor = page.cursor
    } while (cursor)
    return ids
  })
  let updated = 0
  for (let offset = 0; offset < pending.length; offset += PAGE) {
    const ids = [...new Set(pending.slice(offset, offset + PAGE))]
    for (let attempt = 1; ; attempt++) {
      live()
      try {
        updated += await exclusive(() => backfillStep(api, ids, live))
        break
      } catch (error) {
        if (!isConflict(error) || attempt >= ATTEMPTS) throw error
      }
    }
  }
  live()
  const current = await api.data.files.readTextBaseline(COMPLETION_BACKFILL_MARKER)
  live()
  if (current?.content) return { updated, skipped: false }
  const written = await api.data.files.writeTextGuarded(COMPLETION_BACKFILL_MARKER, JSON.stringify({ migration: 'completed-at-v4', finishedAt: new Date().toISOString(), updated }), current?.baseline ?? null)
  if (!written.ok) throw new Error('Could not record the completion backfill')
  return { updated, skipped: false }
}

/** One step over at most {@link PAGE} listed tasks, read again inside the step; resolves how many rows it filled. */
async function backfillStep(api: BackfillApi, listed: string[], live: () => void): Promise<number> {
  const tasks = await api.data.dataset(TASKS_DATASET).query({
    select: ['id'],
    where: { id: { in: listed }, completedAt: { isNull: true } },
    limit: PAGE,
    includeRevisions: true
  })
  live()
  if (!tasks.rows.length) return 0
  const ids = tasks.rows.map((row) => String(row.id))
  const sources = completionSources(api.settings.get()[STATUS_SETTINGS_KEY])
  const history: DatasetRecord[] = []
  let cursor: string | undefined
  do {
    const page = await api.data.dataset(STATUS_HISTORY_DATASET).query({
      select: ['taskId', 'position', 'from', 'to', 'changedAt'],
      where: { taskId: { in: ids }, ...completionHistoryWhere(sources) },
      limit: 1000,
      cursor
    })
    live()
    history.push(...page.rows)
    cursor = page.cursor
  } while (cursor)
  const byTask = new Map<string, DatasetRecord[]>()
  for (const row of history) {
    const id = String(row.taskId)
    const rows = byTask.get(id)
    if (rows) rows.push(row)
    else byTask.set(id, [row])
  }
  const operations: DatasetTransactionOperation[] = []
  const expected: { dataset: string; key: { id: string }; revision: number }[] = []
  ids.forEach((id, index) => {
    const completedAt = latestCompletion(byTask.get(id) ?? [], sources)
    if (!completedAt) return
    operations.push({ dataset: TASKS_DATASET, operation: 'update', key: { id }, values: { completedAt } })
    const revision = tasks.revisions?.[index]
    if (typeof revision === 'number') expected.push({ dataset: TASKS_DATASET, key: { id }, revision })
  })
  if (operations.length) {
    live()
    await api.data.transaction(operations, expected.length ? { expected } : undefined)
  }
  return operations.length
}

/**
 * Start the backfill when the backend starts. `ready()` resolves true once it has
 * finished (now or in an earlier session) and false when it failed; a failed run
 * starts again on the next `ready()`. `stop()` admits no further step and waits
 * for the running one.
 */
export function startCompletionBackfill(api: BackfillApi, exclusive: Exclusive): { ready(): Promise<boolean>; stop(): Promise<void> } {
  let active = true
  const live = (): void => { if (!active) throw new Error('To-Do completion backfill is stopped.') }
  let run: Promise<boolean> | null = null
  const start = (): Promise<boolean> => {
    run = backfillCompletedAt(api, exclusive, live).then(() => true, () => { run = null; return false })
    return run
  }
  start()
  return {
    ready: () => run ?? (active ? start() : Promise.resolve(false)),
    stop: async () => { active = false; await run }
  }
}
