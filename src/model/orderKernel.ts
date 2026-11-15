import type { ValleyPluginApi } from '@valley/plugin-sdk'
import type { TodoRecord } from '../types'
import { dayKey, indexNames, instantKey, orderKeysOf, type OrderKeys } from './orderKeys'

/**
 * The list-order kernel: the Rust module in `src/wasm` sorts and sections a
 * task list from numeric keys. It answers exactly what the comparators in
 * `sort.ts` and `sections.ts` answer; they remain the definition, and every
 * caller falls back to them when {@link kernelOrder} returns null.
 */

/** The kernel's order codes (`order::Mode` in src/wasm/src/order.rs). */
const MODES = { name: 0, priority: 1, flagged: 2, due: 3, created: 4, updated: 5, sections: 6, completion: 7, stamp: 8 } as const
export type OrderMode = keyof typeof MODES

/** Numbers per task (`order::COLUMNS`), in `order::Row` order. */
const COLUMNS = 9
const SECTIONS = 5
/** Below this a list sorts faster in place than through the kernel's buffers. */
const MIN_TASKS = 32
/** Rows and results must fit the module's 16 MiB memory (`memoryPagesMax` 256); longer lists sort in TypeScript. */
const MAX_TASKS = 100_000

/**
 * Orders `count` rows that `fill` writes. The returned views are valid until
 * the next call; null when the kernel refuses the rows.
 */
export type OrderKernel = (count: number, fill: (rows: Float64Array) => void, mode: number, descending: boolean, today: number) => { order: Uint32Array; sections: Uint32Array } | null

interface OrderExports {
  order_rows(tasks: number): number
  order_run(tasks: number, mode: number, descending: number, today: number): number
  order_output(): number
  order_sections(): number
  order_reset(): void
}

const MODULE_ID = 'order'
const EXPORTS: (keyof OrderExports)[] = ['order_rows', 'order_run', 'order_output', 'order_sections', 'order_reset']

let kernel: OrderKernel | null = null

export function installOrderKernel(next: OrderKernel | null): void {
  kernel = next
}

/** Instantiates the declared `order` module through `api.wasm`. */
export async function loadOrderKernel(api: Pick<ValleyPluginApi, 'wasm'>): Promise<OrderKernel> {
  const env: { memory?: WebAssembly.Memory } = {}
  const instance = await api.wasm.instantiate(MODULE_ID, { env }) as unknown as { exports: Record<string, unknown> }
  const memory = env.memory
  if (!memory) throw new Error('order module memory was not handed over')
  for (const name of EXPORTS) if (typeof instance.exports[name] !== 'function') throw new Error(`order module lacks ${name}`)
  const k = instance.exports as unknown as OrderExports
  return (count, fill, mode, descending, today) => {
    // A call may grow the memory and detach its buffer, so each view is taken after the call that sizes it.
    const rowsAt = k.order_rows(count)
    fill(new Float64Array(memory.buffer, rowsAt, count * COLUMNS))
    if (!k.order_run(count, mode, descending ? 1 : 0, today)) return null
    const orderAt = k.order_output()
    const sectionsAt = k.order_sections()
    return { order: new Uint32Array(memory.buffer, orderAt, count), sections: new Uint32Array(memory.buffer, sectionsAt, SECTIONS) }
  }
}

/** Starts loading the kernel when the package declares it; the returned function stops using it. */
export function startOrderKernel(api: Pick<ValleyPluginApi, 'wasm'>): () => void {
  let disposed = false
  if (api.wasm?.list().some((module) => module.id === MODULE_ID)) {
    void loadOrderKernel(api).then(
      (loaded) => { if (!disposed) installOrderKernel(loaded) },
      (error: unknown) => console.warn('To-Do order kernel unavailable; sorting in TypeScript', error)
    )
  }
  return () => {
    disposed = true
    installOrderKernel(null)
  }
}

export interface KernelOrderOptions<T> {
  descending?: boolean
  /** `YYYY-MM-DD`; the sectioned order splits the list around it. */
  today?: string
  /** The completion time of a task, for the two completion orders. */
  stamp?: (todo: T) => string
}

/**
 * `todos` in the given order and, for `sections`, the five section sizes
 * (Overdue, Today, Upcoming, Someday, Completed). Null when the kernel is not
 * loaded, the list is too short or too long for it, or a task holds a value
 * outside the canonical shapes the keys cover.
 */
export function kernelOrder<T extends TodoRecord>(todos: readonly T[], mode: OrderMode, options: KernelOrderOptions<T> = {}): { ordered: T[]; sections: number[] } | null {
  const count = todos.length
  if (!kernel || count < MIN_TASKS || count > MAX_TASKS) return null
  const today = mode === 'sections' ? dayKey(options.today ?? '') : 0
  if (Number.isNaN(today)) return null
  const keys: OrderKeys[] = new Array(count)
  const stamp = options.stamp
  for (let index = 0; index < count; index++) {
    const found = orderKeysOf(todos[index])
    if (!found) return null
    keys[index] = found
    if (!stamp) continue
    const text = stamp(todos[index])
    if (found.stampText !== text) { found.stampText = text; found.stamp = instantKey(text) }
    if (Number.isNaN(found.stamp)) return null
  }
  indexNames(todos, keys)
  const result = kernel(count, (rows) => {
    for (let index = 0, at = 0; index < count; index++, at += COLUMNS) {
      const row = keys[index]
      rows[at] = row.due
      rows[at + 1] = row.start
      rows[at + 2] = row.priority
      rows[at + 3] = row.flagged
      rows[at + 4] = row.completed
      rows[at + 5] = row.created
      rows[at + 6] = row.updated
      rows[at + 7] = stamp ? row.stamp! : 0
      rows[at + 8] = row.names!.key
    }
  }, MODES[mode], options.descending === true, today)
  if (!result) return null
  const ordered: T[] = new Array(count)
  for (let index = 0; index < count; index++) ordered[index] = todos[result.order[index]]
  return { ordered, sections: [...result.sections] }
}
