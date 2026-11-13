import { describe, expect, it, vi } from 'vitest'
import { PLUGIN_SURFACE_V1 } from '@valley/plugin-sdk'
import { createMockValleyApi } from './harness'
import { initRuntime } from '../src/runtime'
import { registerTodoSurfaces } from '../src/surfaces'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import { isPaletteRef, paletteRef } from '@valley/plugin-sdk/palette'
import {
  DEFAULT_VIEW,
  SMART_LISTS,
  configuredSmartLists,
  endOfWeek,
  groupCount,
  matchesVisibleView,
  matchesView,
  normalizeSmartListSettings,
  parseView,
  sameView,
  serializeView,
  smartListDef,
  viewCounts,
  type TodoView
} from '../src/views'

const TODAY = '2026-08-13'

it('releases surface subscriptions without accessing a revoked session', () => {
  const mock = createMockValleyApi({ manifest: { id: 'todo' } })
  initRuntime(mock.api)
  const dispose = registerTodoSurfaces(mock.api)
  const surface = mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1)[0].extension
  const unsubscribe = surface.subscribe(vi.fn())
  const state = mock.api.runtime.getOrCreate('todo.surfaces', () => ({ listeners: new Set() }))
  expect(state.listeners.size).toBe(1)
  dispose()
  const runtime = vi.spyOn(mock.api.runtime, 'getOrCreate').mockImplementation(() => { throw new Error('Plugin session is no longer active') })
  try {
    unsubscribe()
    expect(state.listeners.size).toBe(0)
    expect(runtime).not.toHaveBeenCalled()
  } finally { runtime.mockRestore() }
})

const todo = (over: Partial<TodoRecord> = {}): TodoRecord => ({
  id: `t${Math.random()}`,
  title: 'Task',
  completed: false,
  priority: 'normal',
  dueDate: '',
  note: '',
  tags: [],
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  ...over
})

describe('smart lists', () => {
  it('is the six the sidebar shows, in order', () => {
    expect(SMART_LISTS.map((l) => l.id)).toEqual([
      'scheduled',
      'today',
      'week',
      'flagged',
      'all',
      'completed'
    ])
  })

  it('dates only the three date-ordered lists', () => {
    expect(SMART_LISTS.filter((l) => l.dated).map((l) => l.id)).toEqual(['scheduled', 'today', 'week'])
  })

  it('ends This Week on the last day of the host week, overdue included', () => {
    // 2026-08-13 is a Thursday.
    expect(endOfWeek('2026-08-13', 1)).toBe('2026-08-16')
    expect(endOfWeek('2026-08-13', 0)).toBe('2026-08-15')
    expect(endOfWeek('2026-08-16', 1)).toBe('2026-08-16')
    expect(endOfWeek('2026-08-17', 1)).toBe('2026-08-23')
    const week = { kind: 'smart', id: 'week' } as const
    expect(matchesView(todo({ dueDate: '2026-08-01' }), week, '2026-08-13')).toBe(true)
    expect(matchesView(todo({ dueDate: '2026-08-16' }), week, '2026-08-13')).toBe(true)
    expect(matchesView(todo({ dueDate: '2026-08-17' }), week, '2026-08-13')).toBe(false)
    expect(matchesView(todo({}), week, '2026-08-13')).toBe(false)
  })

  it('gives every smart list its own palette colour', () => {
    // Five lists, five colours, all references — the chips are how you tell the
    // lists apart, so they must not collapse onto the accent or onto each other.
    const colors = SMART_LISTS.map((l) => l.color)
    for (const color of colors) expect(isPaletteRef(color)).toBe(true)
    expect(new Set(colors).size).toBe(colors.length)
    expect(smartListDef('today').color).toBe(paletteRef('primary-blue'))
    expect(smartListDef('scheduled').color).toBe(paletteRef('red'))
    expect(smartListDef('flagged').color).toBe(paletteRef('yellow'))
    expect(smartListDef('all').color).toBe(paletteRef('gray'))
    expect(smartListDef('completed').color).toBe(paletteRef('green'))
  })

  it('normalizes persisted order and hidden lists while keeping one visible', () => {
    expect(normalizeSmartListSettings(undefined)).toEqual({
      order: ['scheduled', 'today', 'week', 'flagged', 'all', 'completed'],
      hidden: [],
      colors: {},
      textColors: {}
    })
    const settings = normalizeSmartListSettings({
      order: ['completed', 'today', 'completed', 'unknown'],
      hidden: ['today', 'all'],
      colors: { today: 'palette:violet', flagged: 'not a colour', all: '#12abef' },
      textColors: { today: 'black', flagged: 'auto', all: 'pink' }
    })
    expect(settings).toEqual({
      order: ['scheduled', 'completed', 'today', 'week', 'flagged', 'all'],
      hidden: ['today', 'all'],
      colors: { today: 'palette:violet', all: '#12abef' },
      textColors: { today: 'black' }
    })
    expect(configuredSmartLists(settings).map((list) => list.id)).toEqual([
      'scheduled', 'completed', 'week', 'flagged'
    ])
    // A saved order from before This Week gains it right after Today.
    expect(normalizeSmartListSettings({ order: ['today', 'scheduled', 'flagged', 'all', 'completed'] }).order)
      .toEqual(['today', 'week', 'scheduled', 'flagged', 'all', 'completed'])
    expect(normalizeSmartListSettings({
      hidden: ['scheduled', 'today', 'week', 'flagged', 'all', 'completed']
    }).hidden).toEqual(['today', 'week', 'flagged', 'all', 'completed'])
  })
})

describe('matchesView', () => {
  it('Scheduled holds every open todo that has a date, overdue included', () => {
    const view: TodoView = { kind: 'smart', id: 'scheduled' }
    expect(matchesView(todo({ dueDate: '2026-09-01' }), view, TODAY)).toBe(true)
    expect(matchesView(todo({ dueDate: '2020-01-01' }), view, TODAY)).toBe(true)
    expect(matchesView(todo({ dueDate: '' }), view, TODAY)).toBe(false)
    expect(matchesView(todo({ dueDate: TODAY, completed: true }), view, TODAY)).toBe(false)
  })

  it('Today includes overdue — the most today thing there is', () => {
    const view: TodoView = { kind: 'smart', id: 'today' }
    expect(matchesView(todo({ dueDate: TODAY }), view, TODAY)).toBe(true)
    expect(matchesView(todo({ dueDate: '2020-01-01' }), view, TODAY)).toBe(true)
    expect(matchesView(todo({ dueDate: '2026-08-14' }), view, TODAY)).toBe(false)
    expect(matchesView(todo({ dueDate: '' }), view, TODAY)).toBe(false)
  })

  it('Flagged is open and flagged', () => {
    const view: TodoView = { kind: 'smart', id: 'flagged' }
    expect(matchesView(todo({ flagged: true }), view, TODAY)).toBe(true)
    expect(matchesView(todo({}), view, TODAY)).toBe(false)
    expect(matchesView(todo({ flagged: true, completed: true }), view, TODAY)).toBe(false)
  })

  it('All is every open todo; Completed is the rest', () => {
    const all: TodoView = { kind: 'smart', id: 'all' }
    const done: TodoView = { kind: 'smart', id: 'completed' }
    expect(matchesView(todo({}), all, TODAY)).toBe(true)
    expect(matchesView(todo({ completed: true }), all, TODAY)).toBe(false)
    expect(matchesView(todo({ completed: true }), done, TODAY)).toBe(true)
    expect(matchesView(todo({}), done, TODAY)).toBe(false)
  })

  it('matches a group case-insensitively, and No group only when unset', () => {
    expect(matchesView(todo({ group: 'Fungi' }), { kind: 'groups', names: ['fungi'] }, TODAY)).toBe(true)
    expect(matchesView(todo({ group: 'Fungi' }), { kind: 'groups', names: ['Wildlife'] }, TODAY)).toBe(false)
    expect(matchesView(todo({ group: 'Fungi' }), { kind: 'groups', names: ['Wildlife', 'Fungi'] }, TODAY)).toBe(true)
    expect(matchesView(todo({}), { kind: 'groups', names: [], includeUngrouped: true }, TODAY)).toBe(true)
    expect(matchesView(todo({}), { kind: 'nogroup' }, TODAY)).toBe(true)
    expect(matchesView(todo({ group: 'Fungi' }), { kind: 'nogroup' }, TODAY)).toBe(false)
  })

  it('matches tags case-insensitively', () => {
    expect(matchesView(todo({ tags: ['Forest'] }), { kind: 'tag', name: 'forest' }, TODAY)).toBe(true)
    expect(matchesView(todo({ tags: ['Forest'] }), { kind: 'tag', name: 'moss' }, TODAY)).toBe(false)
  })

  it('keeps a completed todo inside its group — a group is not a smart list', () => {
    expect(
      matchesView(todo({ group: 'Fungi', completed: true }), { kind: 'groups', names: ['Fungi'] }, TODAY)
    ).toBe(true)
  })
})

describe('matchesVisibleView', () => {
  it('adds completed rows only when requested while keeping the view criteria', () => {
    const all: TodoView = { kind: 'smart', id: 'all' }
    const scheduled: TodoView = { kind: 'smart', id: 'scheduled' }
    expect(matchesVisibleView(todo({ completed: true }), all, false, TODAY)).toBe(false)
    expect(matchesVisibleView(todo({ completed: true }), all, true, TODAY)).toBe(true)
    expect(matchesVisibleView(todo({ completed: true, dueDate: TODAY }), scheduled, true, TODAY)).toBe(true)
    expect(matchesVisibleView(todo({ completed: true }), scheduled, true, TODAY)).toBe(false)
  })
})

describe('viewCounts', () => {
  const todos = [
    todo({ dueDate: '2020-01-01' }),
    todo({ dueDate: TODAY, flagged: true }),
    todo({ dueDate: '2026-12-01' }),
    todo({ flagged: true }),
    todo({}),
    todo({ completed: true, dueDate: TODAY })
  ]

  it('agrees with matchesView for every list', () => {
    const counts = viewCounts(todos, TODAY)
    for (const list of SMART_LISTS) {
      const expected = todos.filter((t) => matchesView(t, { kind: 'smart', id: list.id }, TODAY))
      expect(counts[list.id]).toBe(expected.length)
    }
  })

  it('counts each todo once per list', () => {
    expect(viewCounts(todos, TODAY)).toEqual({
      scheduled: 3,
      today: 2,
      week: 2,
      flagged: 2,
      all: 5,
      completed: 1
    })
  })
})

describe('groupCount', () => {
  const todos = [
    todo({ group: 'Fungi' }),
    todo({ group: 'fungi' }),
    todo({ group: 'Fungi', completed: true }),
    todo({})
  ]

  it('counts open todos only, case-insensitively', () => {
    expect(groupCount(todos, 'Fungi')).toBe(2)
    expect(groupCount(todos, 'fungi')).toBe(2)
  })

  it('counts the ungrouped for the No group row', () => {
    expect(groupCount(todos, null)).toBe(1)
  })
})

describe('persistence', () => {
  it('round-trips every view shape', () => {
    const cases: TodoView[] = [
      ...SMART_LISTS.map((l) => ({ kind: 'smart' as const, id: l.id })),
      { kind: 'nogroup' },
      { kind: 'groups', names: ['Fungi', 'Wildlife'], includeUngrouped: true }
    ]
    for (const view of cases) expect(parseView(serializeView(view))).toEqual(view)
  })

  it('accepts legacy single-group values and persists multi-selection', () => {
    expect(serializeView({ kind: 'nogroup' })).toBe('nogroup')
    expect(parseView('group:Fungi')).toEqual({ kind: 'groups', names: ['Fungi'] })
    expect(parseView('nogroup')).toEqual({ kind: 'nogroup' })
  })

  it('folds a retired due chip onto the nearest list instead of resetting', () => {
    expect(parseView('due:today')).toEqual({ kind: 'smart', id: 'today' })
    expect(parseView('due:overdue')).toEqual({ kind: 'smart', id: 'scheduled' })
    expect(parseView('due:tomorrow')).toEqual({ kind: 'smart', id: 'scheduled' })
    expect(parseView('due:week')).toEqual({ kind: 'smart', id: 'scheduled' })
    expect(parseView('due:month')).toEqual({ kind: 'smart', id: 'scheduled' })
  })

  it('falls back to the default for anything unrecognized', () => {
    for (const raw of [undefined, 42, '', 'group:', 'garbage', null]) {
      expect(parseView(raw)).toEqual(DEFAULT_VIEW)
    }
  })

  it('compares views by value', () => {
    expect(sameView({ kind: 'smart', id: 'today' }, { kind: 'smart', id: 'today' })).toBe(true)
    expect(sameView({ kind: 'smart', id: 'today' }, { kind: 'smart', id: 'all' })).toBe(false)
    expect(sameView({ kind: 'groups', names: ['Fungi'] }, { kind: 'groups', names: ['X'] })).toBe(false)
  })
})
