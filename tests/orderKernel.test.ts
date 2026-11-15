import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { createMockValleyApi, loadPackageWasm } from '@valley/plugin-testkit'
import type { TodoRecord } from '../src/types'
import { initRuntime } from '../src/runtime'
import { installOrderKernel, kernelOrder, loadOrderKernel, type OrderKernel } from '../src/model/orderKernel'
import { indexNames, nameKey, resetNameIndex, titleCollator } from '../src/model/orderKeys'
import { sortTodos, type SortDir, type SortField } from '../src/model/sort'
import { SECTION_ORDER, bucketTodos, completionTimelineSections, completionTimestamp, newestCompletionFirst } from '../src/model/sections'

let kernel: OrderKernel

beforeAll(async () => {
  const module = await loadPackageWasm(process.cwd(), 'order')
  const mock = createMockValleyApi({ manifest: { id: 'todo' }, wasm: { modules: [module] } })
  initRuntime(mock.api)
  kernel = await loadOrderKernel(mock.api)
})

afterEach(() => {
  installOrderKernel(null)
  resetNameIndex()
})

function rng(seed: number): () => number {
  let s = seed >>> 0 || 1
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 0x100000000 }
}

const TITLES = ['apple', 'Apple', 'APPLE', 'éclair', 'Eclair', 'eclair', 'Zebra', 'zebra', 'straße', 'Strasse', 'Ärger', 'arger', 'İstanbul', 'istanbul', 'ΣΑΣ', 'σας', '10 items', '9 items', '', ' lead', 'Über', 'uber', 'naïve', 'naive', 'co-op', 'coop', '😀 party', 'Öl', 'ol']
const DAYS = ['2026-05-01', '2026-05-02', '2026-05-03', '2026-04-30', '2025-12-31', '2027-01-01', '2026-05-10']
const TIMES = ['00:00', '08:05', '09:00', '09:30', '23:59']
const PRIORITIES = ['normal', 'low', 'medium', 'high'] as const
const TODAY = '2026-05-02'

function fixture(count: number, seed: number): TodoRecord[] {
  const next = rng(seed)
  const pick = <T,>(values: readonly T[]): T => values[Math.floor(next() * values.length)]
  const instant = (): string => new Date(Date.UTC(2026, 0, 1) + Math.floor(next() * 40) * 3_600_000 + Math.floor(next() * 3) * 500).toISOString()
  return Array.from({ length: count }, (_, index) => {
    const dated = next() < 0.7
    const completed = next() < 0.35
    const changedAt = instant()
    return {
      id: `t${index}`,
      title: `${pick(TITLES)}${next() < 0.4 ? '' : ` ${Math.floor(next() * 6)}`}`,
      note: '',
      tags: [],
      completed,
      status: completed ? 'completed' : undefined,
      priority: pick(PRIORITIES),
      dueDate: dated ? `${pick(DAYS)}${next() < 0.3 ? `T${pick(TIMES)}` : ''}` : '',
      startTime: next() < 0.4 ? pick(TIMES) : undefined,
      flagged: next() < 0.2 || undefined,
      statusHistory: completed && next() < 0.8 ? [{ from: 'open', to: next() < 0.9 ? 'completed' : 'canceled', changedAt }] : undefined,
      createdAt: instant(),
      updatedAt: instant()
    } as TodoRecord
  })
}

const ids = (todos: TodoRecord[]): string[] => todos.map((todo) => todo.id)
const withKernel = <T,>(run: () => T): T => { installOrderKernel(kernel); try { return run() } finally { installOrderKernel(null) } }

describe('order kernel', () => {
  const FIELDS: SortField[] = ['due', 'priority', 'flagged', 'updated', 'created', 'name']
  const DIRS: SortDir[] = ['asc', 'desc']

  it('sorts every field and direction exactly as the comparators do, ties included', () => {
    for (const [count, seed] of [[32, 1], [33, 2], [200, 3], [1500, 4], [1500, 5]] as const) {
      const todos = fixture(count, seed)
      for (const field of FIELDS) for (const dir of DIRS) {
        const expected = ids(sortTodos(todos, field, dir))
        expect(withKernel(() => kernelOrder(todos, field, { descending: dir === 'desc' })), `${field} ${dir} ${count}`).not.toBeNull()
        expect(withKernel(() => ids(sortTodos(todos, field, dir))), `${field} ${dir} ${count}`).toEqual(expected)
      }
    }
  })

  it('sections a list exactly as bucketTodos does', () => {
    for (const seed of [11, 12, 13]) {
      const todos = fixture(900, seed)
      const expected = bucketTodos(todos, TODAY)
      const actual = withKernel(() => bucketTodos(todos, TODAY))
      for (const id of SECTION_ORDER) expect(ids(actual[id]), `${id} ${seed}`).toEqual(ids(expected[id]))
      expect(SECTION_ORDER.every((id) => expected[id].length > 0)).toBe(true)
    }
  })

  it('orders completions exactly as the timeline and the panel do', () => {
    const todos = fixture(700, 21).filter((todo) => todo.completed)
    const stamps = new Map(todos.map((todo) => [todo, completionTimestamp(todo)]))
    expect(withKernel(() => completionTimelineSections(todos)).map((section) => [section.key, ids(section.todos)]))
      .toEqual(completionTimelineSections(todos).map((section) => [section.key, ids(section.todos)]))
    expect(withKernel(() => ids(newestCompletionFirst(todos, stamps)))).toEqual(ids(newestCompletionFirst(todos, stamps)))
  })

  it('keeps giving the same order as titles change between sorts', () => {
    const todos = fixture(400, 31)
    installOrderKernel(kernel)
    expect(ids(sortTodos(todos, 'name', 'asc'))).toEqual(ids([...todos].sort((a, b) => titleCollator.compare(a.title, b.title))))
    const next = rng(32)
    for (let round = 0; round < 60; round++) {
      const at = Math.floor(next() * todos.length)
      todos[at] = { ...todos[at], title: `${TITLES[Math.floor(next() * TITLES.length)]} ${round % 7 === 0 ? 'ab'.repeat(round) : next()}` }
      expect(ids(sortTodos(todos, 'name', 'asc')), `round ${round}`).toEqual(ids([...todos].sort((a, b) => titleCollator.compare(a.title, b.title))))
    }
  })

  it('leaves short lists and values outside the canonical shapes to the comparators', () => {
    installOrderKernel(kernel)
    const todos = fixture(100, 41)
    expect(kernelOrder(todos.slice(0, 31), 'due')).toBeNull()
    expect(kernelOrder(todos, 'due')).not.toBeNull()
    for (const odd of [{ dueDate: '2026-5-1' }, { dueDate: 'tomorrow' }, { startTime: '9:00' }, { updatedAt: '2026-05-01' }, { createdAt: '2026-13-01T00:00:00.000Z' }, { priority: 'urgent' }] as Partial<TodoRecord>[]) {
      const list = [...todos.slice(0, 60), { ...todos[60], ...odd } as TodoRecord, ...todos.slice(61)]
      expect(kernelOrder(list, 'due'), JSON.stringify(odd)).toBeNull()
      expect(ids(sortTodos(list, 'due', 'asc'))).toHaveLength(list.length)
    }
    expect(kernelOrder(todos, 'sections', { today: 'today' })).toBeNull()
    expect(kernelOrder(todos, 'stamp', { stamp: () => 'yesterday' })).toBeNull()
  })
})

describe('title index', () => {
  it('gives titles that collate equal one key and keeps collation order through single inserts and renumbering', () => {
    const titles = ['b', 'B', 'a', 'c']
    const index = (list: string[]): void => indexNames(list.map((title) => ({ title }) as TodoRecord), list.map(() => ({}) as never))
    index(titles)
    expect(nameKey('b')).toBe(nameKey('B'))
    // Each new title lands between the same two neighbours until no number is left between them.
    const squeezed = Array.from({ length: 80 }, (_, index) => `a${'a'.repeat(80 - index)}`)
    for (const title of squeezed) index([title])
    const all = [...titles, ...squeezed]
    for (const left of all) for (const right of all) {
      expect(Math.sign(nameKey(left) - nameKey(right)), `${left} / ${right}`).toBe(Math.sign(titleCollator.compare(left, right)))
    }
  })
})
