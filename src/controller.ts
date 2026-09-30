import { React, captureTodoScope } from './runtime'
import type { SlotId, TodoRecord } from '@valley/plugin-sdk/types'
import { selectTodoProperties } from './surfaces'
import { appendTodo, deleteTodo, loadTodoList, onTodoListChanged, updateTodo, type DocumentRevision } from './data'
import { getSharedTodos, onSharedTodos, setSharedTodos } from './sharedTodos'
import { newTodo } from './draft'
import { usePendingIds } from './hooks'
import { sortTodos, type SortDir, type SortField } from './sort'

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
  patchTodo: (id: string, patch: Partial<TodoRecord>, documentRevision?: DocumentRevision) => Promise<boolean>
  /** Delete a todo; ⌘Z restores it. */
  removeTodo: (id: string) => Promise<void>
}

export function useTodoListController(sortField: SortField, sortDir: SortDir, surface: SlotId = 'main_workspace'): TodoListController {
  const scope = React.useRef(captureTodoScope()).current
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
    const displayedIds = new Set(displayOrderRef.current)
    const result: TodoRecord[] = []
    for (const id of displayOrderRef.current) {
      const t = map.get(id)
      if (t) result.push(t)
    }
    for (const t of todos) {
      if (!displayedIds.has(t.id)) result.push(t)
    }
    return result
    // orderNonce re-derives the order when a sort control changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, orderNonce])

  const load = React.useCallback((initial: boolean): void => {
    const generation = ++refreshGenerationRef.current
    if (initial) setLoading(true)
    void loadTodoList(scope).then((records) => {
      scope.assertActive()
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
  }, [scope])

  React.useEffect(() => {
    load(true)
    return () => { refreshGenerationRef.current++ }
  }, [load])

  // Reconcile after any mutation without returning the mounted surfaces to their
  // initial Loading state. This matters most in the attachment-linked panel,
  // where completing its only row used to blank the entire panel before settling.
  React.useEffect(() => onTodoListChanged(() => load(false)), [load])

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

  const patchTodo = React.useCallback(
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

  const removeTodo = React.useCallback(
    async (id: string): Promise<void> => {
      if (isPending(id)) return
      const previous = getSharedTodos().find(todo => todo.id === id)
      if (!previous) return
      setPending(id, true)
      displayOrderRef.current = displayOrderRef.current.filter(oid => oid !== id)
      setSharedTodos(getSharedTodos().filter(todo => todo.id !== id))
      setLastCreatedId(current => current === id ? null : current)
      if (editingId === id) setEditingId(null)
      const rollback = (): void => {
        if (!displayOrderRef.current.includes(id)) displayOrderRef.current.push(id)
        if (!getSharedTodos().some(todo => todo.id === id)) setSharedTodos([...getSharedTodos(), previous])
      }
      try {
        if (!(await deleteTodo(id))) rollback()
      } catch {
        rollback()
      } finally {
        setPending(id, false)
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
