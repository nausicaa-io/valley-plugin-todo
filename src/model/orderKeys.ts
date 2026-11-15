import type { TodoRecord } from '../types'

/**
 * Numeric sort keys for the list-order kernel (`src/wasm`). A key orders exactly
 * as the stored text does under the comparators in `sort.ts` and `sections.ts`,
 * which holds only for the canonical shapes To-Do writes; a record with any
 * other shape has no keys, and the caller sorts with those comparators instead.
 */

// One collator for every comparison: `localeCompare` with options builds a new
// collator per call, which made sorting a few thousand titles take seconds.
export const titleCollator = new Intl.Collator(undefined, { sensitivity: 'base' })

export const PRIORITY_RANK: Record<TodoRecord['priority'], number> = { high: 3, medium: 2, low: 1, normal: 0 }

export interface OrderKeys {
  /** `-1` without a due date, else `yyyymmdd * 10000 + (1 + hhmm)`; the time part is 0 for a date alone. */
  due: number
  /** `0` without a start time, else `1 + hhmm`. */
  start: number
  priority: number
  flagged: number
  completed: number
  created: number
  updated: number
  /** The title's collation class, as of `namesEpoch`; filled by {@link indexNames}. */
  names?: NameClass
  namesEpoch?: number
  /** The last completion time asked for and its key, so a repeated order parses nothing. */
  stampText?: string
  stamp?: number
}

/** A title's place in the collation order; every title that collates equal shares the object. */
export interface NameClass { key: number }

const DAY = /^\d{4}-\d{2}-\d{2}$/
const DAY_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/
const CLOCK = /^\d{2}:\d{2}$/
const INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

const clock = (value: string, at: number): number => 1 + Number(value.slice(at, at + 2)) * 100 + Number(value.slice(at + 3, at + 5))

/** `yyyymmdd` of a `YYYY-MM-DD`, or NaN for anything else. */
export function dayKey(day: string): number {
  return DAY.test(day) ? Number(day.slice(0, 4)) * 10000 + Number(day.slice(5, 7)) * 100 + Number(day.slice(8, 10)) : NaN
}

function dueKey(value: string): number {
  if (!value) return -1
  if (DAY.test(value)) return dayKey(value) * 10000
  return DAY_TIME.test(value) ? dayKey(value.slice(0, 10)) * 10000 + clock(value, 11) : NaN
}

/** Milliseconds of a `toISOString` instant, or NaN for anything else. */
export function instantKey(value: string): number {
  return INSTANT.test(value) ? Date.parse(value) : NaN
}

const keyCache = new WeakMap<object, OrderKeys | null>()

/** A record's keys, computed once per record object; null when a field is not in its canonical shape. */
export function orderKeysOf(todo: TodoRecord): OrderKeys | null {
  let keys = keyCache.get(todo)
  if (keys === undefined) {
    const start = todo.startTime ? (CLOCK.test(todo.startTime) ? clock(todo.startTime, 0) : NaN) : 0
    const built = {
      due: dueKey(todo.dueDate || ''),
      start,
      priority: PRIORITY_RANK[todo.priority],
      flagged: todo.flagged ? 1 : 0,
      completed: todo.completed ? 1 : 0,
      created: instantKey(todo.createdAt),
      updated: instantKey(todo.updatedAt)
    }
    keys = typeof todo.title === 'string' && Object.values(built).every(Number.isFinite) ? built : null
    keyCache.set(todo, keys)
  }
  return keys
}

/**
 * Where each title stands in the collation order. Titles that collate equal
 * (the collator ignores case and accents) share one number, so a comparison of
 * the numbers gives exactly `titleCollator.compare`, ties included.
 *
 * The index is kept between sorts: a new title costs one binary search instead
 * of a place in a full collation sort of every title.
 */
interface NameEntry { title: string; names: NameClass }

const NAME_GAP = 1024
/** Above this many new titles at once, sort all titles together rather than insert one by one. */
const NAME_BULK = 64
/** Titles no task carries any more are dropped once the index holds this many. */
const NAME_LIMIT = 200_000

let nameOrder: NameEntry[] = []
const nameOf = new Map<string, NameClass>()
/** Bumped whenever the classes are rebuilt, which is when a class cached on a record's keys is stale. */
let namesEpoch = 0

function renumberNames(): void {
  nameOrder.forEach((entry, index) => { entry.names.key = index * NAME_GAP })
}

function insertName(title: string): void {
  let low = 0
  let high = nameOrder.length
  while (low < high) {
    const middle = (low + high) >>> 1
    const order = titleCollator.compare(title, nameOrder[middle].title)
    if (order === 0) { nameOf.set(title, nameOrder[middle].names); return }
    if (order < 0) high = middle
    else low = middle + 1
  }
  const before = low > 0 ? nameOrder[low - 1].names.key : null
  const after = low < nameOrder.length ? nameOrder[low].names.key : null
  const names: NameClass = { key: before === null ? (after === null ? 0 : after - NAME_GAP) : after === null ? before + NAME_GAP : (before + after) / 2 }
  nameOrder.splice(low, 0, { title, names })
  nameOf.set(title, names)
  // No number is left between the neighbours: space every title out again.
  if ((before !== null && names.key <= before) || (after !== null && names.key >= after)) renumberNames()
}

/** Index `added` together with every title already known, in one collation sort. */
function rebuildNames(added: Iterable<string>): void {
  const titles = [...nameOf.keys(), ...added].sort(titleCollator.compare)
  nameOrder = []
  nameOf.clear()
  namesEpoch++
  for (const title of titles) {
    const last = nameOrder[nameOrder.length - 1]
    if (last && titleCollator.compare(last.title, title) === 0) nameOf.set(title, last.names)
    else {
      const names: NameClass = { key: nameOrder.length * NAME_GAP }
      nameOrder.push({ title, names })
      nameOf.set(title, names)
    }
  }
}

/**
 * Give every record's keys its title's collation class (`keys[i].names`), indexing titles not seen before.
 * `keys[i]` are the keys of `todos[i]`.
 */
export function indexNames(todos: readonly TodoRecord[], keys: readonly OrderKeys[]): void {
  if (nameOf.size > NAME_LIMIT) resetNameIndex()
  let missing: Set<string> | null = null
  for (let index = 0; index < keys.length; index++) {
    const own = keys[index]
    if (own.namesEpoch === namesEpoch) continue
    const names = nameOf.get(todos[index].title)
    if (names) { own.names = names; own.namesEpoch = namesEpoch }
    else (missing ??= new Set()).add(todos[index].title)
  }
  if (!missing) return
  if (missing.size > NAME_BULK) rebuildNames(missing)
  else for (const title of missing) insertName(title)
  for (let index = 0; index < keys.length; index++) {
    const own = keys[index]
    if (own.namesEpoch === namesEpoch) continue
    own.names = nameOf.get(todos[index].title)
    own.namesEpoch = namesEpoch
  }
}

/** The title's place in the collation order, once {@link indexNames} has seen it. */
export function nameKey(title: string): number {
  return nameOf.get(title)!.key
}

export function resetNameIndex(): void {
  nameOrder = []
  nameOf.clear()
  namesEpoch++
}
