import { describe, expect, it } from 'vitest'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import {
  MAX_TODO_DEPTH,
  buildTodoTree,
  canIndent,
  canReparent,
  canOutdent,
  descendantIds,
  indentPatch,
  indentTarget,
  outdentPatch
} from '../src/tree'

const todo = (id: string, parentId?: string): TodoRecord => ({
  id,
  title: id,
  completed: false,
  priority: 'normal',
  dueDate: '',
  note: '',
  tags: [],
  parentId,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z'
})

const shape = (todos: TodoRecord[]): string[] =>
  buildTodoTree(todos).map((row) => `${'  '.repeat(row.depth)}${row.todo.id}`)

describe('buildTodoTree', () => {
  it('seats each child directly under its parent', () => {
    expect(shape([todo('a'), todo('b'), todo('a1', 'a'), todo('a2', 'a')])).toEqual([
      'a',
      '  a1',
      '  a2',
      'b'
    ])
  })

  it('keeps the order roots and siblings arrive in — nesting never re-sorts', () => {
    expect(shape([todo('c'), todo('a'), todo('b')])).toEqual(['c', 'a', 'b'])
    expect(shape([todo('p'), todo('p2', 'p'), todo('p1', 'p')])).toEqual(['p', '  p2', '  p1'])
  })

  it('nests to the full depth limit', () => {
    const chain = [todo('l0')]
    for (let i = 1; i <= MAX_TODO_DEPTH; i++) chain.push(todo(`l${i}`, `l${i - 1}`))
    const rows = buildTodoTree(chain)
    expect(rows.map((r) => r.depth)).toEqual([0, 1, 2, 3, 4, 5])
  })

  it('clamps a deeper chain rather than dropping it', () => {
    const chain = [todo('l0')]
    for (let i = 1; i <= MAX_TODO_DEPTH + 3; i++) chain.push(todo(`l${i}`, `l${i - 1}`))
    const rows = buildTodoTree(chain)
    expect(rows).toHaveLength(chain.length)
    expect(Math.max(...rows.map((r) => r.depth))).toBe(MAX_TODO_DEPTH)
  })

  it('promotes a child whose parent is not in this list', () => {
    // A filtered view: the child matched, the parent did not.
    expect(shape([todo('orphan', 'missing')])).toEqual(['orphan'])
  })

  it('breaks a cycle a hand-edit created instead of hanging', () => {
    const rows = buildTodoTree([todo('a', 'b'), todo('b', 'a')])
    expect(rows).toHaveLength(2)
    expect(rows.every((r) => r.depth === 0)).toBe(true)
  })

  it('reports which rows have children', () => {
    const rows = buildTodoTree([todo('a'), todo('a1', 'a'), todo('b')])
    expect(rows.map((r) => [r.todo.id, r.hasChildren])).toEqual([
      ['a', true],
      ['a1', false],
      ['b', false]
    ])
  })

  it('holds every input record exactly once', () => {
    const todos = [todo('a'), todo('a1', 'a'), todo('x', 'gone'), todo('b')]
    expect(buildTodoTree(todos).map((r) => r.todo.id).sort()).toEqual(['a', 'a1', 'b', 'x'])
  })
})

describe('descendantIds', () => {
  const todos = [todo('a'), todo('a1', 'a'), todo('a1x', 'a1'), todo('a2', 'a'), todo('b')]

  it('returns the whole subtree, not just direct children', () => {
    expect(descendantIds(todos, 'a').sort()).toEqual(['a1', 'a1x', 'a2'])
  })

  it('is empty for a leaf', () => {
    expect(descendantIds(todos, 'b')).toEqual([])
  })

  it('terminates on a cycle', () => {
    expect(descendantIds([todo('x', 'y'), todo('y', 'x')], 'x')).toEqual(['y'])
  })
})

describe('indent', () => {
  const rows = (todos: TodoRecord[]) => buildTodoTree(todos)

  it('attaches to the nearest row above at the same depth or shallower', () => {
    const todos = [todo('a'), todo('b')]
    expect(indentTarget(rows(todos), 1)?.id).toBe('a')
    expect(indentPatch(rows(todos), 1)).toEqual({ parentId: 'a' })
  })

  it('skips over a deeper row to find the real target', () => {
    // a / a1 / b  →  indenting b lands on a, not on a1.
    const todos = [todo('a'), todo('a1', 'a'), todo('b')]
    expect(indentTarget(rows(todos), 2)?.id).toBe('a')
  })

  it('refuses the first row — there is nothing to indent under', () => {
    const todos = [todo('a'), todo('b')]
    expect(canIndent(rows(todos), 0)).toBe(false)
    expect(indentPatch(rows(todos), 0)).toBeNull()
  })

  it('refuses at the depth limit', () => {
    const chain = [todo('l0')]
    for (let i = 1; i <= MAX_TODO_DEPTH; i++) chain.push(todo(`l${i}`, `l${i - 1}`))
    chain.push(todo('next'))
    const built = rows(chain)
    const deepest = built.findIndex((r) => r.todo.id === `l${MAX_TODO_DEPTH}`)
    expect(canIndent(built, deepest)).toBe(false)
    // …and the row after it can only reach the tier that keeps it legal.
    const last = built.length - 1
    expect(indentTarget(built, last)?.id).toBe('l0')
  })

  it('refuses to indent when a descendant would exceed the depth limit', () => {
    const todos = [todo('a'), todo('b')]
    let parent = 'b'
    for (let i = 1; i <= MAX_TODO_DEPTH; i++) {
      const id = `b${i}`
      todos.push(todo(id, parent))
      parent = id
    }
    const built = rows(todos)
    expect(built[1].depth).toBe(0)
    expect(built.at(-1)?.depth).toBe(MAX_TODO_DEPTH)
    expect(indentPatch(built, 1)).toBeNull()
  })

  it('refuses an out-of-range index rather than throwing', () => {
    expect(indentTarget(rows([todo('a')]), 99)).toBeNull()
  })

  it('rejects cycles and reparenting that would deepen a subtree past the cap', () => {
    const todos = [todo('a'), todo('a1', 'a'), todo('b')]
    expect(canReparent(todos, 'a', 'a1')).toBe(false)

    let parent = 'b'
    for (let i = 1; i <= MAX_TODO_DEPTH; i++) {
      const id = `b${i}`
      todos.push(todo(id, parent))
      parent = id
    }
    expect(canReparent(todos, 'b', 'a')).toBe(false)
  })
})

describe('outdent', () => {
  it('re-parents to the grandparent', () => {
    const todos = [todo('a'), todo('a1', 'a'), todo('a1x', 'a1')]
    expect(outdentPatch(todos, 'a1x')).toEqual({ parentId: 'a' })
  })

  it('promotes a first-level child to a root', () => {
    expect(outdentPatch([todo('a'), todo('a1', 'a')], 'a1')).toEqual({ parentId: undefined })
  })

  it('refuses on a row that is already a root', () => {
    expect(outdentPatch([todo('a')], 'a')).toBeNull()
    expect(canOutdent([todo('a')], 'a')).toBe(false)
  })

  it('carries the subtree along — one write is enough', () => {
    const todos = [todo('a'), todo('a1', 'a'), todo('a1x', 'a1')]
    const patch = outdentPatch(todos, 'a1')!
    const after = todos.map((t) => (t.id === 'a1' ? { ...t, ...patch } : t))
    expect(shape(after)).toEqual(['a', 'a1', '  a1x'])
  })
})
