import type { TodoRecord } from '@valley/plugin-sdk/types'

/**
 * Parent/child nesting, Apple-Reminders style: a todo indented under another
 * one is a step of that bigger todo, and the whole subtree travels with it.
 *
 * The relation is a single `parentId` on the record — no order field, no
 * children array. Display order stays whatever the surrounding list already
 * decided; this module only *re-seats* children directly under their parent.
 * That is what makes nesting free of migrations and impossible to corrupt: a
 * parent that is filtered out, deleted or hand-edited into a cycle degrades to
 * "this todo is a root", never to a lost record.
 *
 * Pure and React-free, so every rule here is unit-testable.
 */

/**
 * How many times a todo may be indented. Root rows are depth 0, so the deepest
 * legal row is depth 5 — six tiers on screen. A hard cap rather than a
 * suggestion: the row's indent is `depth × 22px`, and at 245px of sidebar the
 * seventh tier has no room left for the title.
 */
export const MAX_TODO_DEPTH = 5

export interface TodoTreeRow {
  todo: TodoRecord
  /** 0 for a root row, capped at {@link MAX_TODO_DEPTH}. */
  depth: number
  hasChildren: boolean
}

/**
 * The parent a todo is actually drawn under, given the records currently in
 * play. Answers null — i.e. "draw it as a root" — for a missing parent, a
 * parent outside `present`, or a `parentId` chain that loops back to `id`.
 */
function resolvedParent(
  id: string,
  byId: Map<string, TodoRecord>,
  present: Set<string>
): string | null {
  const parent = byId.get(id)?.parentId
  if (!parent || !present.has(parent)) return null
  // Walk up; a chain that revisits a node is a cycle a hand-edit created.
  const seen = new Set<string>([id])
  let cursor: string | undefined = parent
  while (cursor) {
    if (seen.has(cursor)) return null
    seen.add(cursor)
    cursor = byId.get(cursor)?.parentId
    if (cursor && !present.has(cursor)) break
  }
  return parent
}

/**
 * Lay `todos` out as a flat, depth-annotated walk in which every child
 * immediately follows its parent.
 *
 * Roots keep the order they arrive in — the caller has already sorted or
 * bucketed them — and siblings keep it too, so nesting never re-orders a list
 * behind the user's back. A child whose parent is absent from this list (a
 * filtered view, a different group) is **promoted to a root** rather than
 * dropped: a view that matched the child must still show it.
 */
export function buildTodoTree(todos: TodoRecord[]): TodoTreeRow[] {
  const byId = new Map(todos.map((t) => [t.id, t]))
  const present = new Set(byId.keys())
  const childrenOf = new Map<string, TodoRecord[]>()
  const roots: TodoRecord[] = []

  for (const todo of todos) {
    const parent = resolvedParent(todo.id, byId, present)
    if (parent === null) {
      roots.push(todo)
      continue
    }
    const siblings = childrenOf.get(parent)
    if (siblings) siblings.push(todo)
    else childrenOf.set(parent, [todo])
  }

  const rows: TodoTreeRow[] = []
  const emit = (todo: TodoRecord, depth: number): void => {
    const children = childrenOf.get(todo.id) ?? []
    rows.push({ todo, depth: Math.min(depth, MAX_TODO_DEPTH), hasChildren: children.length > 0 })
    // The cap clamps what is *drawn*; the walk still descends, so a subtree
    // deeper than the cap stays visible (flattened) instead of disappearing.
    for (const child of children) emit(child, depth + 1)
  }
  for (const root of roots) emit(root, 0)
  return rows
}

/** Every descendant id of `id`, deepest-last. Used by delete and completion. */
export function descendantIds(todos: TodoRecord[], id: string): string[] {
  const childrenOf = new Map<string, string[]>()
  for (const todo of todos) {
    if (!todo.parentId) continue
    const siblings = childrenOf.get(todo.parentId)
    if (siblings) siblings.push(todo.id)
    else childrenOf.set(todo.parentId, [todo.id])
  }
  const out: string[] = []
  const seen = new Set<string>([id])
  const walk = (parent: string): void => {
    for (const child of childrenOf.get(parent) ?? []) {
      if (seen.has(child)) continue
      seen.add(child)
      out.push(child)
      walk(child)
    }
  }
  walk(id)
  return out
}

function todoDepth(todos: TodoRecord[], id: string): number {
  const byId = new Map(todos.map((todo) => [todo.id, todo]))
  const seen = new Set<string>([id])
  let depth = 0
  let parent = byId.get(id)?.parentId
  while (parent && !seen.has(parent) && byId.has(parent)) {
    seen.add(parent)
    depth++
    parent = byId.get(parent)?.parentId
  }
  return Math.min(depth, MAX_TODO_DEPTH)
}

function subtreeHeight(todos: TodoRecord[], id: string): number {
  const childrenOf = new Map<string, string[]>()
  for (const todo of todos) {
    if (!todo.parentId) continue
    const children = childrenOf.get(todo.parentId)
    if (children) children.push(todo.id)
    else childrenOf.set(todo.parentId, [todo.id])
  }
  const seen = new Set<string>([id])
  let deepest = 0
  const walk = (parent: string, depth: number): void => {
    for (const child of childrenOf.get(parent) ?? []) {
      if (seen.has(child)) continue
      seen.add(child)
      deepest = Math.max(deepest, depth)
      walk(child, depth + 1)
    }
  }
  walk(id, 1)
  return deepest
}

/** Whether assigning `parentId` keeps the record graph legal and within depth. */
export function canReparent(todos: TodoRecord[], id: string, parentId?: string): boolean {
  if (!parentId) return true
  if (id === parentId || descendantIds(todos, id).includes(parentId)) return false
  return todoDepth(todos, parentId) + 1 + subtreeHeight(todos, id) <= MAX_TODO_DEPTH
}

/**
 * The parent an indent would attach `rows[index]` to: the nearest row above it
 * at the same depth or shallower — i.e. the todo it would become a step of.
 * Null when there is nothing above it in this list, or when the move would
 * exceed {@link MAX_TODO_DEPTH}.
 *
 * Note it is measured against the *rendered* rows, not the record graph: what
 * you see above the row is what it indents under.
 */
export function indentTarget(rows: TodoTreeRow[], index: number): TodoRecord | null {
  const row = rows[index]
  if (!row || index <= 0) return null
  if (row.depth >= MAX_TODO_DEPTH) return null
  let deepest = row.depth
  for (let i = index + 1; i < rows.length && rows[i].depth > row.depth; i++) {
    deepest = Math.max(deepest, rows[i].depth)
  }
  for (let i = index - 1; i >= 0; i--) {
    const candidate = rows[i]
    if (candidate.depth <= row.depth) {
      // The whole subtree moves by the same amount. Refuse when any descendant
      // would cross the hard cap, not only when the selected row itself does.
      const depthDelta = candidate.depth + 1 - row.depth
      return deepest + depthDelta <= MAX_TODO_DEPTH ? candidate.todo : null
    }
  }
  return null
}

export function canIndent(rows: TodoTreeRow[], index: number): boolean {
  return indentTarget(rows, index) !== null
}

/** The `parentId` patch for indenting the row, or null when it is refused. */
export function indentPatch(rows: TodoTreeRow[], index: number): { parentId: string } | null {
  const target = indentTarget(rows, index)
  return target ? { parentId: target.id } : null
}

/**
 * The patch for outdenting: re-parent to the grandparent, or to nothing when
 * the row is already a first-level child. Descendants ride along untouched —
 * they point at *this* row, which is what makes one write enough.
 */
export function outdentPatch(
  todos: TodoRecord[],
  id: string
): { parentId: string | undefined } | null {
  const byId = new Map(todos.map((t) => [t.id, t]))
  const parentId = byId.get(id)?.parentId
  if (!parentId) return null
  const grandparent = byId.get(parentId)?.parentId
  return { parentId: grandparent || undefined }
}

export function canOutdent(todos: TodoRecord[], id: string): boolean {
  return outdentPatch(todos, id) !== null
}
