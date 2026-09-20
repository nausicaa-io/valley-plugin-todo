import type { ValleyPluginApi } from '@valley/plugin-sdk'

/**
 * Module-global handles to the host's React instance and plugin API, set once in
 * `register(api)` before any view renders — same pattern as the Music and
 * SideNotes plugins. Components import these instead of bundling their own
 * `react`. JSX compiles to `React.createElement` (classic transform), resolving
 * to this binding.
 */
export let React!: typeof import('react')
export let api!: ValleyPluginApi
const renderedRows = new Map<string, Set<HTMLElement>>()

export interface TodoRuntimeScope {
  api: ValleyPluginApi
  assertActive(): void
  onDispose(dispose: () => void): () => void
  dispose(): void
}

let scope: TodoRuntimeScope

export function captureTodoScope(): TodoRuntimeScope { return scope }

export function registerTodoRow(id: string, row: HTMLElement): () => void {
  const rows = renderedRows.get(id) ?? new Set<HTMLElement>()
  rows.add(row)
  renderedRows.set(id, rows)
  return () => { rows.delete(row); if (!rows.size) renderedRows.delete(id) }
}

export function initRuntime(a: ValleyPluginApi): () => void {
  scope?.dispose()
  api = a
  React = a.React
  let active = true
  const disposers = new Set<() => void>()
  scope = {
    api: a,
    assertActive: () => { if (!active) throw new Error('To-Do read scope disposed') },
    onDispose: (dispose) => {
      if (active) disposers.add(dispose)
      else dispose()
      return () => { disposers.delete(dispose) }
    },
    dispose: () => {
      if (!active) return
      active = false
      for (const dispose of disposers) dispose()
      disposers.clear()
    }
  }
  return scope.dispose
}

/**
 * "Show me this todo" — published by a surface that has no React of its own (the
 * calendar item source runs inside a service call) and consumed by whichever of
 * the panel and the page is mounted.
 *
 * `focus` scrolls to the row and flashes it; `edit` also opens the detail modal.
 * The `nonce` is what makes asking twice for the same todo work: it folds into
 * a React key, so a repeat request restarts the flash instead of being
 * dropped as an unchanged value.
 */
export interface TodoRevealRequest {
  todoId: string
  mode: 'focus' | 'edit'
  nonce: number
}

interface RevealRequestStore {
  value: TodoRevealRequest | null
  listeners: Set<() => void>
  get(): TodoRevealRequest | null
  request(todoId: string, mode: TodoRevealRequest['mode']): void
  clear(): void
  subscribe(listener: () => void): () => void
}

/** How long the row stays highlighted — matches `todo-reveal-pulse` in the CSS. */
const REVEAL_FLASH_MS = 1800

/**
 * Answer a reveal request on whichever surface is mounted: scroll the row into
 * view, flash it, and open the detail modal when the request asked to edit.
 *
 * The request can arrive before the owner panel mounts, so a new consumer also
 * answers the current snapshot. The row lookup retries briefly because the
 * panel reveal and list switch finish on separate React commits.
 */
export function useTodoRevealRequest(onEdit: (todoId: string) => void): void {
  const store = revealRequestStore()
  React.useEffect(() => {
    let retryTimer: ReturnType<typeof setTimeout> | null = null
    let flashTimer: ReturnType<typeof setTimeout> | null = null
    let flashed: HTMLElement | null = null
    let activeNonce = 0
    const clearFlash = (): void => {
      if (flashed) flashed.classList.remove('todo-reveal-target')
      flashed = null
    }
    const answer = (request: TodoRevealRequest): void => {
      activeNonce = request.nonce
      if (request.mode === 'edit') {
        store.clear()
        onEdit(request.todoId)
      }
      if (retryTimer !== null) clearTimeout(retryTimer)
      const deadline = Date.now() + 2500
      const attempt = (): void => {
        retryTimer = null
        if (activeNonce !== request.nonce) return
        const row = [...(renderedRows.get(request.todoId) ?? [])].find((element) => element.isConnected)
        if (!row) {
          if (Date.now() < deadline) retryTimer = setTimeout(attempt, 40)
          else if (store.get()?.nonce === request.nonce) store.clear()
          return
        }
        row.scrollIntoView({ behavior: 'smooth', block: 'center' })
        if (flashTimer !== null) clearTimeout(flashTimer)
        clearFlash()
        row.classList.add('todo-reveal-target')
        flashed = row
        flashTimer = setTimeout(clearFlash, REVEAL_FLASH_MS)
        if (store.get()?.nonce === request.nonce) store.clear()
      }
      retryTimer = setTimeout(attempt, 0)
    }
    const off = store.subscribe(() => {
      const request = store.get()
      if (request) answer(request)
    })
    const pending = store.get()
    if (pending) answer(pending)
    return () => {
      off()
      activeNonce = 0
      if (retryTimer !== null) clearTimeout(retryTimer)
      if (flashTimer !== null) clearTimeout(flashTimer)
      clearFlash()
    }
  }, [store, onEdit])
}

export function revealRequestStore(): RevealRequestStore {
  return api.runtime.getOrCreate('todo.revealRequest', () => {
    let nonce = 0
    const emit = (): void => {
      for (const listener of [...store.listeners]) listener()
    }
    const store: RevealRequestStore = {
      value: null,
      listeners: new Set(),
      get: () => store.value,
      request: (todoId, mode) => {
        nonce += 1
        store.value = { todoId, mode, nonce }
        emit()
      },
      clear: () => {
        if (!store.value) return
        store.value = null
        emit()
      },
      subscribe: (listener) => {
        store.listeners.add(listener)
        return () => store.listeners.delete(listener)
      }
    }
    return store
  })
}
