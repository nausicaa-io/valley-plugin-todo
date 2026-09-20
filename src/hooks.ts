import { React, api } from './runtime'
import {
  CALENDAR_PANEL_SELECTION_V1,
  type ValleyReadonlyState
} from '@valley/plugin-sdk'

export function useHostState<K extends keyof ValleyReadonlyState>(...fields: K[]): Pick<ValleyReadonlyState, K> {
  const signature = fields.slice().sort().join('\0')
  const keys = React.useMemo(() => signature.split('\0') as K[], [signature])
  const subscribe = React.useCallback((listener: () => void) => api.subscribeState(keys, listener), [keys])
  return React.useSyncExternalStore(subscribe, api.getState, api.getState)
}

/** The persisted Calendar selection while its right-sidebar surface is active. */
export function useActiveCalendarSelection(): {
  selectedDate: string | null
  selectedDateRange: { start: string; end: string } | null
} {
  const subscribe = React.useCallback(
    (cb: () => void) => api.interop.state.subscribe(CALENDAR_PANEL_SELECTION_V1, cb),
    []
  )
  const getSnapshot = React.useCallback(
    () => api.interop.state.get(CALENDAR_PANEL_SELECTION_V1),
    []
  )
  const selection = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const rangeStart = selection?.rangeStart ?? null
  const rangeEnd = selection?.rangeEnd ?? null
  return React.useMemo(() => ({
    selectedDate: selection?.selectedDate ?? null,
    selectedDateRange: rangeStart && rangeEnd ? { start: rangeStart, end: rangeEnd } : null
  }), [rangeEnd, rangeStart, selection?.selectedDate])
}

/**
 * Tracks a set of ids with in-flight mutations (a todo being saved or deleted).
 * Exposes a reactive `pendingIds` for rendering disabled state plus a sync
 * `isPending(id)` guard read from a ref, so overlapping async handlers bail
 * before queuing a duplicate write without waiting for a re-render.
 */
export function usePendingIds(): {
  pendingIds: Set<string>
  isPending: (id: string) => boolean
  setPending: (id: string, pending: boolean) => void
} {
  const [pendingIds, setPendingIds] = React.useState<Set<string>>(new Set())
  const ref = React.useRef<Set<string>>(new Set())

  const setPending = React.useCallback((id: string, pending: boolean): void => {
    const next = new Set(ref.current)
    if (pending) next.add(id)
    else next.delete(id)
    ref.current = next
    setPendingIds(next)
  }, [])

  const isPending = React.useCallback((id: string): boolean => ref.current.has(id), [])

  return { pendingIds, isPending, setPending }
}
