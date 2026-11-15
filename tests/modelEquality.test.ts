import { afterEach, describe, expect, it, vi } from 'vitest'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import { createMockValleyApi } from './harness'
import { initRuntime } from '../src/runtime'
import { addDays, isoDay, parseLocalDate } from '../src/model/dates'
import * as sort from '../src/model/sort'
import { todayIso } from '../src/model/sections'
import { groupKey } from '../src/model/groups'
import { matchesViewScope, type TodoView } from '../src/model/views'
import { searchMatcher, todoSearchMatcher } from '../src/model/search'

const matchesSearch = (query: string, tags: string[], ...textFields: string[]): boolean => searchMatcher(query)(tags, ...textFields)
import { getStatusSettings, normalizeStatusSettings } from '../src/state/statusStore'

// Verbatim copies of the implementations this work package replaced.
const legacyIsoDay = (date: Date): string => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
function legacyParse(value: string): Date | null {
  const [y, m, d] = value.split('-').map((n) => parseInt(n, 10))
  if (!y || !m || !d) return null
  const date = new Date(y, m - 1, d)
  date.setHours(0, 0, 0, 0)
  return date
}
function legacyAddDays(iso: string, days: number): string {
  const date = legacyParse(iso)
  if (!date) return iso
  date.setDate(date.getDate() + days)
  return legacyIsoDay(date)
}
function legacyAddDaysIso(day: string, days: number): string {
  const [y, m, d] = day.split('-').map(Number)
  return legacyIsoDay(new Date(y, (m || 1) - 1, (d || 1) + days))
}

function todo(overrides: Partial<TodoRecord> = {}): TodoRecord {
  return { id: 't', title: 'Title', note: '', completed: false, priority: 'normal', dueDate: '', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z', ...overrides } as TodoRecord
}

afterEach(() => vi.restoreAllMocks())

describe('date helpers: one implementation, same results', () => {
  it('matches the three former copies over every day around DST changes and midnight', () => {
    for (let t = Date.UTC(2024, 0, 1); t < Date.UTC(2027, 0, 1); t += 6 * 3600 * 1000) {
      const date = new Date(t)
      expect(isoDay(date)).toBe(legacyIsoDay(date))
      expect(todayIso(date)).toBe(legacyIsoDay(date))
      expect(sort.isoDay(date)).toBe(legacyIsoDay(date))
    }
    for (let t = Date.UTC(2025, 0, 1); t < Date.UTC(2026, 11, 31); t += 5 * 24 * 3600 * 1000) {
      const day = legacyIsoDay(new Date(t))
      for (const n of [-40, -7, -1, 0, 1, 6, 30, 366]) {
        expect(addDays(day, n)).toBe(legacyAddDays(day, n))
        expect(addDays(day, n)).toBe(legacyAddDaysIso(day, n))
        expect(sort.addDays(day, n)).toBe(legacyAddDays(day, n))
      }
    }
    expect(addDays('garbage', 3)).toBe('garbage')
    expect(parseLocalDate('2026-03-29')?.getTime()).toBe(legacyParse('2026-03-29')?.getTime())
    expect(parseLocalDate('nope')).toBeNull()
    expect(sort.parseLocalDate).toBe(parseLocalDate)
  })

  it('keeps title ordering and every sort field identical to the unmodified comparator', () => {
    const items = [
      todo({ id: '1', title: 'éclair' }), todo({ id: '2', title: 'Eclair' }), todo({ id: '3', title: 'apple', priority: 'high' }),
      todo({ id: '4', title: 'Zebra', dueDate: '2026-05-01' }), todo({ id: '5', title: 'zebra', dueDate: '2026-05-01T09:00' })
    ]
    const collator = new Intl.Collator(undefined, { sensitivity: 'base' })
    const byName = [...items].sort((a, b) => collator.compare(a.title, b.title) || 0).map((t) => t.id)
    expect(sort.sortTodos(items, 'name', 'asc').map((t) => t.id)).toEqual(byName)
  })
})

describe('matchesViewScope group keys', () => {
  const legacy = (t: TodoRecord, view: Extract<TodoView, { kind: 'groups' }>): boolean => {
    if (!t.group) return view.includeUngrouped === true
    return new Set(view.names.map(groupKey)).has(groupKey(t.group))
  }
  const todos = [todo({ group: 'Fungi' }), todo({ group: 'fungi ' }), todo({ group: 'Wildlife' }), todo({}), todo({ group: 'Other' })]

  it('gives the same answer as building a Set per todo', () => {
    for (const view of [
      { kind: 'groups', names: ['Fungi'] },
      { kind: 'groups', names: ['Fungi', 'Wildlife'], includeUngrouped: true },
      { kind: 'groups', names: [] }
    ] as TodoView[]) {
      for (const t of todos) expect(matchesViewScope(t, view, '2026-08-13')).toBe(legacy(t, view as Extract<TodoView, { kind: 'groups' }>))
    }
  })

  it('rebuilds when the names of the same view object change', () => {
    const view = { kind: 'groups', names: ['Fungi'] } as Extract<TodoView, { kind: 'groups' }>
    expect(matchesViewScope(todo({ group: 'Wildlife' }), view)).toBe(false)
    view.names.push('Wildlife')
    expect(matchesViewScope(todo({ group: 'Wildlife' }), view)).toBe(true)
    view.names = ['Other']
    expect(matchesViewScope(todo({ group: 'Wildlife' }), view)).toBe(false)
  })
})

describe('todoSearchMatcher', () => {
  const todos = [
    todo({ id: 'a', title: 'Fungi SURVEY', note: 'Moss run', tags: ['Fungi', 'urgent'], group: 'Field' }),
    todo({ id: 'b', title: 'Review', note: '', tags: [], group: 'Wildlife' }),
    todo({ id: 'c', title: 'ÄÖÜ straße', note: 'İstanbul', tags: ['Plants'] }),
    todo({ id: 'd', title: '', note: '' })
  ]
  const queries = ['', '  ', 'survey', 'MOSS', '#fun', '#fungi #urgent', '#plants straße', 'wildlife', 'field #fu', '#nope', 'äöü', 'istanbul', 'x y']

  it('selects exactly what matchesSearch selects, with and without the group field', () => {
    for (const q of queries) {
      const withGroup = todos.filter((t) => matchesSearch(q, t.tags ?? [], t.title, t.note, t.group ?? '')).map((t) => t.id)
      const withoutGroup = todos.filter((t) => matchesSearch(q, t.tags ?? [], t.title, t.note)).map((t) => t.id)
      expect(todos.filter(todoSearchMatcher(q)).map((t) => t.id), q).toEqual(withGroup)
      expect(todos.filter(todoSearchMatcher(q, false)).map((t) => t.id), q).toEqual(withoutGroup)
    }
  })

  it('lowercases each record once, and rebuilds only for a changed record object', () => {
    const items = Array.from({ length: 50 }, (_, i) => todo({ id: `i${i}`, title: `Task ${i}`, note: `note ${i}`, group: 'G' }))
    expect(items.filter(todoSearchMatcher('task 4')).length).toBe(11)
    const spy = vi.spyOn(String.prototype, 'toLowerCase')
    items.filter(todoSearchMatcher('task 4x'))
    items.filter(todoSearchMatcher('note 7'))
    expect(spy.mock.calls.length).toBeLessThan(10)
    const edited = items.map((t, i) => (i === 3 ? { ...t, title: 'Brand new words' } : t))
    expect(edited.filter(todoSearchMatcher('brand new')).map((t) => t.id)).toEqual(['i3'])
    expect(edited.filter(todoSearchMatcher('task 3')).map((t) => t.id)).toEqual(['i30', 'i31', 'i32', 'i33', 'i34', 'i35', 'i36', 'i37', 'i38', 'i39'])
  })
})

describe('getStatusSettings memo', () => {
  it('shares one normalised result until the stored value changes', async () => {
    const mock = createMockValleyApi({ manifest: { id: 'todo' }, settings: { statuses: { active: ['waiting'], labels: { waiting: 'Parked' } } } })
    initRuntime(mock.api)
    const first = getStatusSettings()
    expect(getStatusSettings()).toBe(first)
    expect(first).toEqual(normalizeStatusSettings(mock.api.settings.get().statuses))
    expect(first.labels.waiting).toBe('Parked')
  })

  it('is invalidated when the settings change', async () => {
    const mock = createMockValleyApi({ manifest: { id: 'todo' }, settings: { statuses: { labels: { waiting: 'Parked' } } } })
    initRuntime(mock.api)
    const first = getStatusSettings()
    await mock.api.settings.set('statuses', { labels: { waiting: 'Later' } })
    const second = getStatusSettings()
    expect(second).not.toBe(first)
    expect(second.labels.waiting).toBe('Later')
    expect(getStatusSettings()).toBe(second)
  })

  it('does not let one realm leak into the next runtime', () => {
    const one = createMockValleyApi({ manifest: { id: 'todo' }, settings: { statuses: { labels: { waiting: 'One' } } } })
    initRuntime(one.api)
    expect(getStatusSettings().labels.waiting).toBe('One')
    const two = createMockValleyApi({ manifest: { id: 'todo' }, settings: {} })
    initRuntime(two.api)
    expect(getStatusSettings().labels.waiting).toBeUndefined()
  })
})
