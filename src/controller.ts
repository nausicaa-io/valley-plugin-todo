import { React } from './runtime'
import type { SlotId, TodoRecord } from '@valley/plugin-sdk/types'
import { selectTodoProperties } from './surfaces'
import { appendTodo, deleteTodoSubtree, loadTodos, onChanged, updateTodo, type DocumentRevision } from './data'
import { getSharedTodos, onSharedTodos, setSharedTodos } from './sharedTodos'
import { newTodo } from './draft'
import { usePendingIds } from './hooks'
import { sortTodos, type SortDir, type SortField } from './sort'
import { descendantIds } from './tree'

/**
 * Shared list state + mutation flow for every todo surface (sidebar panels and
 * the main-workspace page): optimistic updates against the window-anchored
 * shared store, in-flight guards, and the stable display order that never
 * re-sorts on an in-place edit (toggling a checkbox bumps `updatedAt` but the
 * row stays put — only a sort-control change re-derives it).
 *
 * There is no edit draft here: every field is edited live in the detail modal
 * through {@link TodoListController.patchTodo}. One writer, so a change can
 * never be clobbered by a stale whole-record save.
 */
export interface TodoListController {
  todos: TodoRecord[]
  loading: boolean
  /** Todos in the stable display order (load order + prepended creations). */
  ordered: TodoRecord[]
  /**
   * The most recent creation, so a surface can keep it visible while the user
   * fills it in even when its own filters would hide it.
   */
  lastCreatedId: string | null
  clearLastCreated: () => void
  menuId: string | null
  setMenuId: (id: string | null) => void
  /**
   * The todo the detail modal is editing, or null. One value, so a second row
   * can only ever *replace* the open editor — that single-editor guarantee is
   * why the state lives here rather than in an imperative open call.
   */
  editingId: string | null
  openDetail: (id: string) => void
  closeDetail: () => void
  pendingIds: Set<string>
  creating: boolean
  /**
   * Create a todo (optimistic); `patch` pre-fills fields (quick-add due date /
   * priority, the group the active chip names). Resolves to the new record, or
   * null when rejected/failed.
   */
  create: (title: string, filePath?: string, opts?: { patch?: Partial<TodoRecord> }) => Promise<TodoRecord | null>
  /**
   * Patch one todo. Completing one **also completes everything nested under
   * it** — a parent is done when its steps are, so leaving orphaned open
   * children behind a struck-through parent is never what was meant.
   */
  patchTodo: (id: string, patch: Partial<TodoRecord>, documentRevision?: DocumentRevision) => Promise<boolean>
  /** Delete a todo **and its subtree**; ⌘Z restores all of it. */
  removeTodo: (id: string) => Promise<void>
}

export function useTodoListController(sortField: SortField, sortDir: SortDir, surface: SlotId = 'main_workspace'): TodoListController {
  const [todos, setTodos] = React.useState<TodoRecord[]>(getSharedTodos())
  const [lastCreatedId, setLastCreatedId] = React.useState<string | null>(null)
  const [menuId, setMenuId] = React.useState<string | null>(null)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [orderNonce, setOrderNonce] = React.useState(0)
  const [creating, setCreating] = React.useState(false)
  const { pendingIds, isPending, setPending } = usePendingIds()
  const creatingRef = React.useRef(false)
  const refreshGenerationRef = React.useRef(0)
  const sortRef = React.useRef({ sortField, sortDir })
  sortRef.current = { sortField, sortDir }

  // Stable display order — only set on load, append on create, remove on delete
  const displayOrderRef = React.useRef<string[]>([])


  // Ordered by stable display order — never re-sorts on completion toggle
  const ordered = React.useMemo(() => {
    const map = new Map(todos.map((t) => [t.id, t]))
    const result: TodoRecord[] = []
    for (const id of displayOrderRef.current) {
      const t = map.get(id)
      if (t) result.push(t)
    }
    for (const t of todos) {
      if (!displayOrderRef.current.includes(t.id)) result.push(t)
    }
    return result
    // orderNonce re-derives the order when a sort control changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, orderNonce])

  const load = React.useCallback((initial: boolean): void => {
    const generation = ++refreshGenerationRef.current
    if (initial) setLoading(true)
    void loadTodos().then((records) => {
      if (generation !== refreshGenerationRef.current) return
      if (initial) {
        const { sortField: field, sortDir: direction } = sortRef.current
        displayOrderRef.current = sortTodos(records, field, direction).map((record) => record.id)
      } else {
        const ids = new Set(records.map((record) => record.id))
        const retained = displayOrderRef.current.filter((id) => ids.has(id))
        const retainedIds = new Set(retained)
        const { sortField: field, sortDir: direction } = sortRef.current
        const added = sortTodos(records.filter((record) => !retainedIds.has(record.id)), field, direction)
          .map((record) => record.id)
        displayOrderRef.current = [...added, ...retained]
      }
      setSharedTodos(records)
      setLoading(false)
    }).catch(() => {
      if (generation === refreshGenerationRef.current) setLoading(false)
    })
  }, [])

  React.useEffect(() => {
    load(true)
  }, [load])

  // Reconcile after any mutation without returning the mounted surfaces to their
  // initial Loading state. This matters most in the attachment-linked panel,
  // where completing its only row used to blank the entire panel before settling.
  React.useEffect(() => onChanged(() => load(false)), [load])

  // Re-derive the stable display order only when a sort control changes,
  // never on an in-place edit (toggling a checkbox bumps updatedAt but the row stays put).
  const firstSortRun = React.useRef(true)
  React.useEffect(() => {
    if (firstSortRun.current) {
      firstSortRun.current = false
      return
    }
    displayOrderRef.current = sortTodos(getSharedTodos(), sortField, sortDir).map((r) => r.id)
    setOrderNonce((n) => n + 1)
  }, [sortField, sortDir])

  React.useEffect(() => onSharedTodos((t) => setTodos(t)), [])

  const clearLastCreated = React.useCallback((): void => setLastCreatedId(null), [])

  const openDetail = React.useCallback((id: string): void => {
    selectTodoProperties(id, surface)
    setEditingId(id)
  }, [surface])
  const closeDetail = React.useCallback((): void => setEditingId(null), [])

  const create = React.useCallback(
    async (
      rawTitle: string,
      filePath?: string,
      opts?: { patch?: Partial<TodoRecord> }
    ): Promise<TodoRecord | null> => {
      if (creatingRef.current) return null
      const title = rawTitle.trim()
      if (!title) return null
      const record = { ...newTodo(title, filePath), ...opts?.patch }
      creatingRef.current = true
      setCreating(true)
      displayOrderRef.current = [record.id, ...displayOrderRef.current]
      setSharedTodos([record, ...getSharedTodos()])
      setLastCreatedId(record.id)
      const rollback = (): void => {
        displayOrderRef.current = displayOrderRef.current.filter((id) => id !== record.id)
        setSharedTodos(getSharedTodos().filter((todo) => todo.id !== record.id))
        setLastCreatedId((id) => (id === record.id ? null : id))
      }
      try {
        const ok = await appendTodo(record)
        if (!ok) rollback()
        return ok ? record : null
      } catch {
        rollback()
        return null
      } finally {
        creatingRef.current = false
        setCreating(false)
      }
    },
    []
  )

  const patchOne = React.useCallback(
    async (id: string, patch: Partial<TodoRecord>, documentRevision?: DocumentRevision): Promise<boolean> => {
      if (isPending(id)) return false
      const current = getSharedTodos().find((t) => t.id === id)
      if (!current) return false
      const next = { ...current, ...patch, updatedAt: new Date().toISOString() }
      setPending(id, true)
      setSharedTodos(getSharedTodos().map((t) => (t.id === id ? next : t)))
      try {
        const ok = await updateTodo(id, next, current.updatedAt, documentRevision)
        if (!ok) {
          setSharedTodos(getSharedTodos().map((t) => (t.id === id ? current : t)))
          return false
        }
        return true
      } catch {
        setSharedTodos(getSharedTodos().map((t) => (t.id === id ? current : t)))
        return false
      } finally {
        setPending(id, false)
      }
    },
    [isPending, setPending]
  )

  /**
   * Completing a parent completes its subtree. Each record is written on its
   * own — one ⌘Z entry per record, matching how every other multi-row edit in
   * this plugin behaves — and only *open* descendants are touched, so undoing
   * cannot resurrect a child that was already done.
   */
  const patchTodo = React.useCallback(
    async (id: string, patch: Partial<TodoRecord>, documentRevision?: DocumentRevision): Promise<boolean> => {
      const ok = await patchOne(id, patch, documentRevision)
      if (!ok || patch.completed !== true) return ok
      const all = getSharedTodos()
      for (const childId of descendantIds(all, id)) {
        if (all.find((t) => t.id === childId)?.completed) continue
        await patchOne(childId, { completed: true, status: patch.status ?? 'completed' })
      }
      return true
    },
    [patchOne]
  )

  /**
   * Deleting a parent takes its subtree with it — a child without its parent is
   * a step of nothing. The data layer performs the raw deletes and registers one
   * compound undo entry, while this layer keeps every surface optimistic.
   */
  const removeTodo = React.useCallback(
    async (id: string): Promise<void> => {
      const all = getSharedTodos()
      const root = all.find((todo) => todo.id === id)
      if (!root) return
      const ids = [...descendantIds(all, id).reverse(), id]
      if (ids.some((todoId) => isPending(todoId))) return
      const previous = all.filter((todo) => ids.includes(todo.id))
      for (const todoId of ids) setPending(todoId, true)
      displayOrderRef.current = displayOrderRef.current.filter((oid) => !ids.includes(oid))
      setSharedTodos(all.filter((todo) => !ids.includes(todo.id)))
      setLastCreatedId((current) => ids.includes(current ?? '') ? null : current)
      if (ids.includes(editingId ?? '')) setEditingId(null)
      const rollback = (): void => {
        displayOrderRef.current = [
          ...displayOrderRef.current,
          ...previous.map((todo) => todo.id).filter((todoId) => !displayOrderRef.current.includes(todoId))
        ]
        const current = getSharedTodos()
        setSharedTodos([...current, ...previous.filter((todo) => !current.some((candidate) => candidate.id === todo.id))])
      }
      try {
        const ok = await deleteTodoSubtree(ids, root.title)
        if (!ok) rollback()
      } catch {
        rollback()
      } finally {
        for (const todoId of ids) setPending(todoId, false)
      }
    },
    [editingId, isPending, setPending]
  )

  const controller = {
    todos,
    loading,
    ordered,
    lastCreatedId,
    clearLastCreated,
    menuId,
    setMenuId,
    editingId,
    openDetail,
    closeDetail,
    pendingIds,
    creating,
    create,
    patchTodo,
    removeTodo
  }
  return controller
}
