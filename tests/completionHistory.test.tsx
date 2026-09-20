import * as React from 'react'
import { act, cleanup, render, renderHook, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes, TodoPropertiesHost } from './mockTodoNotes'
import { loadTodo, loadTodoList, loadTodos, updateTodo, useTodoStatusHistory } from '../src/data'
import { completionTimestamp } from '../src/sections'
import { initRuntime } from '../src/runtime'
import { Page } from '../src/Page'
import { selectTodoProperties } from '../src/surfaces'
import type { TodoRecord } from '../src/types'

const NOW = '2026-06-01T12:00:00.000Z'
const task = (id: string, patch: Partial<TodoRecord> = {}): DataRecord => ({
  id, title: `Task ${id}`, completed: true, priority: 'normal', dueDate: '', note: '', tags: [],
  createdAt: NOW, updatedAt: NOW, ...patch
}) as unknown as DataRecord
const transition = (changedAt = NOW) => ({ from: 'open' as const, to: 'completed' as const, changedAt })
function deferred() {
  let resolve!: () => void
  const promise = new Promise<void>((done) => { resolve = done })
  return { promise, resolve }
}

afterEach(cleanup)

describe('ordinary completion projections', () => {
  it.each([999, 1000, 1001])('keeps all %i tasks while returning at most one completion row per task', async (count) => {
    const { mock } = installTodoNotes(Array.from({ length: count }, (_, i) => task(`t${i}`, { statusHistory: [transition(), transition('2026-05-01T12:00:00.000Z')] })))
    const dataset = mock.api.data.dataset
    const returned: Record<string, number> = {}
    const taskReads: unknown[] = []
    const aggregates: unknown[] = []
    mock.api.data.dataset = ((id) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        if (id === 'todo.tasks') taskReads.push(query)
        if (id === 'todo.status_history') {
          expect(query?.select).toEqual(['taskId', 'changedAt'])
          expect(query?.where?.or?.length).toBeLessThanOrEqual(20)
        }
        const page = await handle.query(query)
        returned[id] = (returned[id] ?? 0) + page.rows.length
        return page
      }, aggregate: async (request) => { aggregates.push(request); return handle.aggregate(request) } }
    }) as typeof dataset
    const consumers = await Promise.all(Array.from({ length: 20 }, () => loadTodoList()))
    expect(consumers.every((records) => records === consumers[0])).toBe(true)
    expect(consumers[0]).toHaveLength(count)
    expect(new Set(consumers[0].map((record) => record.id)).size).toBe(count)
    expect(consumers[0].every((record) => !record.history && !record.statusHistory && record.historyLoaded === false && completionTimestamp(record) === '2026-05-01T12:00:00.000Z')).toBe(true)
    expect(returned['todo.status_history']).toBe(count)
    expect(returned['todo.focus_sessions']).toBeUndefined()
    expect(taskReads).toHaveLength(count > 1000 ? 2 : 1)
    expect(aggregates).toHaveLength(Math.ceil(count / 20))
  })

  it('matches normalized full-history ordering, including reopened tasks, invalid transitions and fallback dates', async () => {
    const { mock } = installTodoNotes([
      task('order', { statusHistory: [transition('2026-06-03T00:00:00.000Z'), transition('2026-05-01T00:00:00.000Z')] }),
      task('reopened', { completed: false, statusHistory: [transition(), { from: 'completed', to: 'open', changedAt: '2026-06-03T00:00:00.000Z' }] }),
      task('canceled', { statusHistory: [transition(), { from: 'completed', to: 'canceled', changedAt: '2026-06-02T00:00:00.000Z' }] }),
      task('invalid', { statusHistory: [transition(), { from: 'completed', to: 'completed', changedAt: '2026-06-03T00:00:00.000Z' }, { from: 'invalid', to: 'canceled', changedAt: NOW }, transition('')] as TodoRecord['statusHistory'] }),
      task('legacy'),
      task('none', { statusHistory: [{ from: 'open', to: 'waiting', changedAt: NOW }] })
    ])
    const dataset = mock.api.data.dataset
    mock.api.data.dataset = ((id) => {
      const handle = dataset(id)
      return { ...handle, aggregate: (request) => {
        const comparison = request.where?.changedAt
        if (comparison && typeof comparison === 'object' && Object.values(comparison).some((value) => typeof value === 'string' && !Number.isFinite(Date.parse(value)))) throw new Error('Expected an ISO datetime')
        return handle.aggregate(request)
      } }
    }) as typeof dataset
    const summaries = await loadTodoList()
    const full = await loadTodos()
    expect(summaries.map(completionTimestamp)).toEqual(full.map(completionTimestamp))
    expect(summaries.find((record) => record.id === 'legacy')?.completionSummary).toBeNull()
    expect(summaries.find((record) => record.id === 'order')?.completionSummary?.changedAt).toBe('2026-05-01T00:00:00.000Z')
  })

  it('retries an aggregate/detail revision race once for all waiting consumers', async () => {
    const { mock } = installTodoNotes([task('a', { statusHistory: [transition()] })])
    const dataset = mock.api.data.dataset
    const held = deferred()
    let aggregates = 0
    mock.api.data.dataset = ((id) => {
      const handle = dataset(id)
      return { ...handle, aggregate: async (request) => {
        const result = await handle.aggregate(request)
        if (++aggregates === 1) await held.promise
        return result
      } }
    }) as typeof dataset
    const consumers = Array.from({ length: 20 }, () => loadTodoList())
    await vi.waitFor(() => expect(aggregates).toBe(1))
    await dataset('todo.status_history').insert({ taskId: 'a', position: 1, ...transition('2026-06-04T00:00:00.000Z') })
    held.resolve()
    const results = await Promise.all(consumers)
    expect(aggregates).toBe(2)
    expect(results.every((records) => records === results[0] && completionTimestamp(records[0]) === '2026-06-04T00:00:00.000Z')).toBe(true)
  })

  it('preserves omitted sessions through list edits, undo and redo while allowing explicit history clearing', async () => {
    const history = [{ startedAt: NOW, endedAt: NOW, activeMinutes: 7, pauseMinutes: 2 }]
    const { mock } = installTodoNotes([task('a', { completed: false, status: 'open', history, actualMinutes: 7, statusHistory: [{ from: 'waiting', to: 'open', changedAt: NOW }] })])
    const [list] = await loadTodoList()
    expect(await updateTodo('a', { ...list, title: 'Edited', completed: true, status: 'completed' })).toBe(true)
    expect(await loadTodo('a')).toMatchObject({ title: 'Edited', history, actualMinutes: 7, statusHistory: [{ from: 'waiting', to: 'open' }, { from: 'open', to: 'completed' }] })
    await mock.undoActions.at(-1)!.undo()
    expect(await loadTodo('a')).toMatchObject({ title: 'Task a', history, status: 'open' })
    await mock.undoActions.at(-1)!.redo!()
    expect(await loadTodo('a')).toMatchObject({ title: 'Edited', history, status: 'completed' })
    expect(await updateTodo('a', { ...(await loadTodoList())[0], history: [] })).toBe(true)
    expect((await loadTodo('a'))?.history).toBeUndefined()
  })

  it('does not hydrate history for mounted lists and Properties', async () => {
    const history = Array.from({ length: 1001 }, () => transition())
    const { mock } = installTodoNotes([task('a', { statusHistory: history })], { panelChip: 'completed' })
    const dataset = mock.api.data.dataset
    const queries: { id: string; select: unknown }[] = []
    mock.api.data.dataset = ((id) => {
      const handle = dataset(id)
      return { ...handle, query: (query) => { queries.push({ id, select: query?.select }); return handle.query(query) } }
    }) as typeof dataset
    render(<><Page navigation={{ setController: vi.fn() }} /><TodoPropertiesHost mock={mock} /></>)
    await screen.findByText('Task a')
    act(() => selectTodoProperties('a', 'main_workspace'))
    expect(screen.getByLabelText('Task properties')).toBeInTheDocument()
    expect(queries.filter((query) => query.id === 'todo.focus_sessions')).toEqual([])
    expect(queries.filter((query) => query.id === 'todo.status_history').every((query) => Array.isArray(query.select))).toBe(true)
  })
})

describe('selected history lifetime', () => {
  it('shares selected pages until the last reader closes, then stops further page dispatch', async () => {
    const { mock } = installTodoNotes([task('a', { statusHistory: Array.from({ length: 1001 }, () => transition()) })])
    const dataset = mock.api.data.dataset
    const held = deferred()
    let queries = 0
    mock.api.data.dataset = ((id) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        queries++
        const result = await handle.query(query)
        await held.promise
        return result
      } }
    }) as typeof dataset
    const first = renderHook(() => useTodoStatusHistory('a'))
    const second = renderHook(() => useTodoStatusHistory('a'))
    await waitFor(() => expect(queries).toBe(1))
    first.unmount()
    second.unmount()
    await act(async () => { held.resolve(); await held.promise })
    expect(queries).toBe(1)
    const reopened = renderHook(() => useTodoStatusHistory('a'))
    await waitFor(() => expect(reopened.result.current).toHaveLength(1001))
    expect(queries).toBe(3)
  })

  it('retains a shared read for another mounted Timeline and responds to keyless invalidations', async () => {
    const { mock } = installTodoNotes([task('a', { statusHistory: [transition()] })])
    const dataset = mock.api.data.dataset
    const held = deferred()
    let queries = 0
    mock.api.data.dataset = ((id) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        queries++
        const result = await handle.query(query)
        await held.promise
        return result
      } }
    }) as typeof dataset
    const first = renderHook(() => useTodoStatusHistory('a'))
    const second = renderHook(() => useTodoStatusHistory('a'))
    await waitFor(() => expect(queries).toBe(1))
    first.unmount()
    await act(async () => { held.resolve(); await held.promise })
    await waitFor(() => expect(second.result.current).toHaveLength(1))
    await act(async () => { await dataset('todo.status_history').insert({ taskId: 'a', position: 1, ...transition('2026-06-02T00:00:00.000Z') }) })
    expect(second.result.current).toHaveLength(2)
    expect(queries).toBe(2)
  })

  it.each([999, 1000, 1001])('loads the selected %i transitions completely and ignores unrelated changes', async (count) => {
    const { mock } = installTodoNotes([task('a', { statusHistory: Array.from({ length: count }, () => transition()) }), task('b', { statusHistory: [transition()] })])
    const dataset = mock.api.data.dataset
    const queries: unknown[] = []
    mock.api.data.dataset = ((id) => {
      const handle = dataset(id)
      return { ...handle,
        subscribe: (listener) => handle.subscribe((event) => listener({ ...event, keys: [{ taskId: 'b', position: 1 }] })),
        query: (query) => { expect(id).toBe('todo.status_history'); queries.push(query); return handle.query(query) }
      }
    }) as typeof dataset
    const hook = renderHook(() => useTodoStatusHistory('a'))
    await waitFor(() => expect(hook.result.current).toHaveLength(count))
    expect(queries).toHaveLength(count > 1000 ? 2 : 1)
    for (const query of queries) expect(query).toMatchObject({ where: { taskId: 'a' }, limit: 1000 })
    await act(async () => { await dataset('todo.status_history').insert({ taskId: 'b', position: 1, ...transition() }) })
    expect(queries).toHaveLength(count > 1000 ? 2 : 1)
  })

  it('rejects delayed aggregate results after A→B→A without querying another page or publishing', async () => {
    const a = installTodoNotes([task('a', { statusHistory: [transition()] })]).mock
    const dataset = a.api.data.dataset
    const held = deferred()
    let entered = false
    const detail = vi.fn()
    a.api.data.dataset = ((id) => {
      const handle = dataset(id)
      return { ...handle, aggregate: async (request) => {
        entered = true
        const result = await handle.aggregate(request)
        await held.promise
        return result
      }, query: (query) => { if (id === 'todo.status_history') detail(); return handle.query(query) } }
    }) as typeof dataset
    const outcome = loadTodoList().then(() => 'published', () => 'revoked')
    await vi.waitFor(() => expect(entered).toBe(true))
    const b = installTodoNotes([task('b')]).mock
    const bQuery = vi.spyOn(b.api.data, 'dataset')
    initRuntime(a.api)
    held.resolve()
    expect(await outcome).toBe('revoked')
    expect(detail).not.toHaveBeenCalled()
    expect(bQuery).not.toHaveBeenCalled()
    expect((await loadTodoList()).map((record) => record.id)).toEqual(['a'])
  })

  it('does not replace another selected task with a delayed history page and stops paging on unload', async () => {
    const { mock } = installTodoNotes([task('a', { statusHistory: Array.from({ length: 1001 }, () => transition()) }), task('b', { statusHistory: [transition('2026-06-05T00:00:00.000Z')] })])
    const dispose = initRuntime(mock.api)
    const dataset = mock.api.data.dataset
    const held = deferred()
    const queries: unknown[] = []
    mock.api.data.dataset = ((id) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        queries.push(query)
        const result = await handle.query(query)
        if (query?.where?.taskId === 'a') await held.promise
        return result
      } }
    }) as typeof dataset
    const hook = renderHook(({ id }) => useTodoStatusHistory(id), { initialProps: { id: 'a' } })
    await waitFor(() => expect(queries).toHaveLength(1))
    hook.rerender({ id: 'b' })
    await waitFor(() => expect(hook.result.current).toEqual([transition('2026-06-05T00:00:00.000Z')]))
    dispose()
    await act(async () => { held.resolve(); await held.promise })
    expect(hook.result.current).toEqual([transition('2026-06-05T00:00:00.000Z')])
    expect(queries).toHaveLength(2)
  })
})
