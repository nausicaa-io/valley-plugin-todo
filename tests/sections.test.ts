import { describe, expect, it } from 'vitest'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import {
  bucketTodos,
  completionTimelineSections,
  completionTimestamp,
  groupByDay,
  groupByTimeOfDay,
  panelDateSections,
  pageStats,
  parseQuickAdd,
  rollUpFutureDays,
  timeOfDay
} from '../src/sections'

const TODAY = '2026-06-13'

function todo(overrides: Partial<TodoRecord> = {}): TodoRecord {
  return {
    id: 't',
    title: 'Task',
    completed: false,
    priority: 'normal',
    dueDate: '',
    note: '',
    tags: [],
    createdAt: '2026-06-01T00:00:00.000Z',
    updatedAt: '2026-06-01T00:00:00.000Z',
    ...overrides
  }
}

describe('bucketTodos', () => {
  it('routes by completion and due date relative to today', () => {
    const buckets = bucketTodos(
      [
        todo({ id: 'done', completed: true, dueDate: '2026-06-01' }),
        todo({ id: 'over', dueDate: '2026-06-10' }),
        todo({ id: 'today', dueDate: TODAY }),
        todo({ id: 'up', dueDate: '2026-06-20' }),
        todo({ id: 'some' })
      ],
      TODAY
    )
    expect(buckets.completed.map((t) => t.id)).toEqual(['done'])
    expect(buckets.overdue.map((t) => t.id)).toEqual(['over'])
    expect(buckets.today.map((t) => t.id)).toEqual(['today'])
    expect(buckets.upcoming.map((t) => t.id)).toEqual(['up'])
    expect(buckets.someday.map((t) => t.id)).toEqual(['some'])
  })

  it('sorts overdue/upcoming by due date ascending', () => {
    const buckets = bucketTodos(
      [
        todo({ id: 'b', dueDate: '2026-06-25' }),
        todo({ id: 'a', dueDate: '2026-06-18' })
      ],
      TODAY
    )
    expect(buckets.upcoming.map((t) => t.id)).toEqual(['a', 'b'])
  })

  it('sorts today by start time then priority', () => {
    const buckets = bucketTodos(
      [
        todo({ id: 'late', dueDate: TODAY, startTime: '15:00' }),
        todo({ id: 'early', dueDate: TODAY, startTime: '08:00' }),
        todo({ id: 'untimed', dueDate: TODAY, priority: 'high' })
      ],
      TODAY
    )
    expect(buckets.today.map((t) => t.id)).toEqual(['early', 'late', 'untimed'])
  })
})

describe('pageStats', () => {
  it('counts open / due-today / overdue and sums tracked minutes', () => {
    const stats = pageStats(
      [
        todo({ completed: true, actualMinutes: 30 }),
        todo({ dueDate: TODAY, actualMinutes: 15 }),
        todo({ dueDate: '2026-06-01' }),
        todo({ dueDate: '' })
      ],
      TODAY
    )
    expect(stats).toEqual({ open: 3, dueToday: 1, overdue: 1, trackedMinutes: 45 })
  })
})

describe('parseQuickAdd', () => {
  it('extracts @today, @tomorrow, explicit dates and ! priority', () => {
    expect(parseQuickAdd('Catalog fern @today !!', TODAY)).toEqual({
      title: 'Catalog fern',
      dueDate: TODAY,
      priority: 'medium'
    })
    expect(parseQuickAdd('Survey fox @tomorrow', TODAY)).toEqual({
      title: 'Survey fox',
      dueDate: '2026-06-14',
      priority: 'normal'
    })
    expect(parseQuickAdd('Review fungi @2026-07-01 !!!', TODAY)).toEqual({
      title: 'Review fungi',
      dueDate: '2026-07-01',
      priority: 'high'
    })
  })

  it('leaves a plain title untouched', () => {
    expect(parseQuickAdd('Just a task', TODAY)).toEqual({
      title: 'Just a task',
      dueDate: '',
      priority: 'normal'
    })
  })
})


describe('groupByTimeOfDay', () => {
  it('cuts the day at noon and at the hour work stops', () => {
    expect(timeOfDay(undefined)).toBe('untimed')
    expect(timeOfDay('00:00')).toBe('morning')
    expect(timeOfDay('11:59')).toBe('morning')
    expect(timeOfDay('12:00')).toBe('afternoon')
    expect(timeOfDay('17:59')).toBe('afternoon')
    expect(timeOfDay('18:00')).toBe('tonight')
    // A malformed time is untimed, not midnight — guessing puts a task under a
    // heading it never claimed.
    expect(timeOfDay('nonsense')).toBe('untimed')
  })

  it('leads with the untimed bucket and drops the empty ones', () => {
    const sections = groupByTimeOfDay([
      todo({ id: 'c', startTime: '21:00' }),
      todo({ id: 'a' }),
      todo({ id: 'b', startTime: '09:30' })
    ])
    expect(sections.map((s) => s.id)).toEqual(['untimed', 'morning', 'tonight'])
    expect(sections.map((s) => s.todos.map((t) => t.id))).toEqual([['a'], ['b'], ['c']])
  })

  it('keeps a subtree with its parent whatever hour the child names', () => {
    // Same rule as groupByDay: a step of a task belongs beside the task, and a
    // child that lands under a different heading reads as unrelated work.
    const sections = groupByTimeOfDay([
      todo({ id: 'parent', startTime: '09:00' }),
      todo({ id: 'child', parentId: 'parent', startTime: '20:00' })
    ])
    expect(sections.map((s) => s.id)).toEqual(['morning'])
    expect(sections[0].todos.map((t) => t.id).sort()).toEqual(['child', 'parent'])
  })
})

describe('panelDateSections', () => {
  const ids = (mode: 'monthly' | 'weekly' | 'daily', weekStart = 1) =>
    panelDateSections([
      todo({ id: 'september', dueDate: '2026-09-30' }),
      todo({ id: 'none' }),
      todo({ id: 'october', dueDate: '2026-10-01' })
    ], mode, weekStart).map((section) => [section.key, section.todos.map((item) => item.id)])

  it('keeps No date first and separates calendar months across year boundaries', () => {
    expect(ids('monthly')).toEqual([
      ['', ['none']],
      ['2026-10', ['october']],
      ['2026-09', ['september']]
    ])
    const years = panelDateSections([
      todo({ id: 'december', dueDate: '2026-12-31' }),
      todo({ id: 'january', dueDate: '2027-01-01' })
    ], 'monthly')
    expect(years.map((section) => section.key)).toEqual(['2027-01', '2026-12'])
  })

  it('respects the global start-of-week preference', () => {
    expect(ids('weekly', 1)).toEqual([
      ['', ['none']],
      ['2026-09-28', ['september', 'october']]
    ])
    expect(ids('weekly', 0)).toEqual([
      ['', ['none']],
      ['2026-09-27', ['september', 'october']]
    ])
  })

  it('creates one section per date without changing the selected row order', () => {
    expect(ids('daily')).toEqual([
      ['', ['none']],
      ['2026-10-01', ['october']],
      ['2026-09-30', ['september']]
    ])
  })

  it('keeps descendants in the parent section even when their own date differs', () => {
    const sections = panelDateSections([
      todo({ id: 'parent', dueDate: '2026-08-31' }),
      todo({ id: 'child', parentId: 'parent', dueDate: '2026-09-01' })
    ], 'monthly')
    expect(sections).toHaveLength(1)
    expect(sections[0].key).toBe('2026-08')
    expect(sections[0].todos.map((item) => item.id)).toEqual(['parent', 'child'])
  })
})

describe('completion timeline', () => {
  it('uses the latest completed or canceled transition and falls back for legacy records', () => {
    const repeatedlyCompleted = todo({
      id: 'repeated',
      title: 'Repeated',
      completed: true,
      status: 'completed',
      statusHistory: [
        { from: 'open', to: 'completed', changedAt: '2026-06-10T12:00:00.000Z' },
        { from: 'completed', to: 'open', changedAt: '2026-06-11T12:00:00.000Z' },
        { from: 'open', to: 'completed', changedAt: '2026-06-13T12:00:00.000Z' }
      ]
    })
    const canceled = todo({
      id: 'canceled',
      title: 'Canceled',
      completed: true,
      status: 'canceled',
      statusHistory: [{ from: 'open', to: 'canceled', changedAt: '2026-06-12T12:00:00.000Z' }]
    })
    const legacy = todo({
      id: 'legacy',
      title: 'Legacy',
      completed: true,
      updatedAt: '2026-06-11T12:00:00.000Z'
    })
    const reopened = todo({
      id: 'reopened',
      title: 'Reopened',
      completed: false,
      status: 'open',
      statusHistory: [
        { from: 'open', to: 'completed', changedAt: '2026-06-14T12:00:00.000Z' },
        { from: 'completed', to: 'open', changedAt: '2026-06-15T12:00:00.000Z' }
      ]
    })

    expect(completionTimestamp(repeatedlyCompleted)).toBe('2026-06-13T12:00:00.000Z')
    const sections = completionTimelineSections(
      [reopened, legacy, canceled, repeatedlyCompleted].filter((item) => item.completed)
    )
    expect(sections.map((section) => [section.key, section.todos.map((item) => item.id)])).toEqual([
      ['2026-06-13', ['repeated']],
      ['2026-06-12', ['canceled']],
      ['2026-06-11', ['legacy']]
    ])
  })
})

describe('rollUpFutureDays', () => {
  const days = (...keys: string[]) => groupByDay(keys.map((k, i) => todo({ id: `t${i}`, dueDate: k })), TODAY)

  it('keeps a day header inside the horizon and rolls the rest up per month', () => {
    const { near, months } = rollUpFutureDays(
      days('2026-06-20', '2026-06-30', '2026-08-04', '2026-09-01'),
      TODAY
    )
    expect(near.map((d) => d.key)).toEqual(['2026-06-20'])
    expect(months.map((m) => m.key)).toEqual(['2026-06', '2026-08', '2026-09'])
    // The current month is partial: its earlier days are already above, under
    // Overdue and Today, so it reads "Rest of June" rather than "June".
    expect(months.map((m) => m.partial)).toEqual([true, false, false])
  })

  it('keeps the undated bucket out of the roll-up — it has no month to join', () => {
    const { near, months } = rollUpFutureDays(days('2099-01-01', ''), TODAY)
    expect(near.map((d) => d.key)).toEqual([''])
    expect(months.map((m) => m.key)).toEqual(['2099-01'])
  })

  it('measures the horizon across a month end', () => {
    const { near } = rollUpFutureDays(days('2026-06-27'), TODAY, 14)
    expect(near.map((d) => d.key)).toEqual(['2026-06-27'])
    const { near: past } = rollUpFutureDays(days('2026-06-28'), TODAY, 14)
    expect(past).toEqual([])
  })

  it('keeps the fourteenth day itself, and rolls up the one after it', () => {
    // The horizon day is inclusive on purpose: a todo due exactly two weeks out
    // is the last one a day header still says something useful about.
    const { near, months } = rollUpFutureDays(days('2026-06-26', '2026-06-27', '2026-06-28'), TODAY, 14)
    expect(near.map((d) => d.key)).toEqual(['2026-06-26', '2026-06-27'])
    expect(months.flatMap((m) => m.days.map((d) => d.key))).toEqual(['2026-06-28'])
  })

  it('rolls up across a year boundary in calendar order', () => {
    const { months } = rollUpFutureDays(days('2026-12-31', '2027-01-01'), TODAY, 14)
    expect(months.map((m) => m.key)).toEqual(['2026-12', '2027-01'])
    expect(months.map((m) => m.partial)).toEqual([false, false])
    expect(months.map((m) => m.days.map((d) => d.key))).toEqual([['2026-12-31'], ['2027-01-01']])
  })
})
