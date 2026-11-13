import { describe, expect, it } from 'vitest'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import {
  bucketTodos,
  completionTimelineSections,
  completionTimestamp,
  panelDateSections,
  parseQuickAdd
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

  it('groups every task by its own date', () => {
    const sections = panelDateSections([
      todo({ id: 'parent', dueDate: '2026-08-31' }),
      todo({ id: 'child', parentId: 'parent', dueDate: '2026-09-01' })
    ], 'monthly')
    expect(sections.map(section => [section.key, section.todos.map(item => item.id)])).toEqual([['2026-09', ['child']], ['2026-08', ['parent']]])
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
