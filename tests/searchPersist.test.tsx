import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { installTodoNotes, type TodoNotesMock } from './mockTodoNotes'
import { SEARCH_PERSIST_DELAY_MS, flushTodoSearch, readTodoVisibleState, resetViewCache, setTodoSearch } from '../src/viewStore'

let store: TodoNotesMock
const searchWrites = () => (store.mock.api.settings.set as unknown as { mock: { calls: unknown[][] } }).mock.calls.filter((call) => call[0] === 'pageSearch')

beforeEach(() => {
  vi.useFakeTimers()
  store = installTodoNotes([])
  vi.spyOn(store.mock.api.settings, 'set')
})
afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('search persistence', () => {
  it('keeps the value live while typing and writes the setting once', () => {
    const heard: string[] = []
    for (const ch of 'moss run') {
      setTodoSearch(`${readTodoVisibleState().search}${ch}`)
      heard.push(readTodoVisibleState().search)
    }
    expect(heard.at(-1)).toBe('moss run')
    expect(searchWrites()).toHaveLength(0)
    vi.advanceTimersByTime(SEARCH_PERSIST_DELAY_MS - 1)
    expect(searchWrites()).toHaveLength(0)
    vi.advanceTimersByTime(1)
    expect(searchWrites()).toEqual([['pageSearch', 'moss run']])
    vi.advanceTimersByTime(5000)
    expect(searchWrites()).toHaveLength(1)
  })

  it('restarts the delay on each keystroke', () => {
    setTodoSearch('a')
    vi.advanceTimersByTime(200)
    setTodoSearch('ab')
    vi.advanceTimersByTime(200)
    expect(searchWrites()).toHaveLength(0)
    vi.advanceTimersByTime(100)
    expect(searchWrites()).toEqual([['pageSearch', 'ab']])
  })

  it('writes an emptied search immediately and drops the pending one', () => {
    setTodoSearch('abc')
    setTodoSearch('')
    expect(searchWrites()).toEqual([['pageSearch', '']])
    vi.advanceTimersByTime(5000)
    expect(searchWrites()).toHaveLength(1)
  })

  it('flushes the latest value on request and on realm reset', () => {
    setTodoSearch('first')
    flushTodoSearch()
    expect(searchWrites()).toEqual([['pageSearch', 'first']])
    setTodoSearch('second')
    resetViewCache()
    expect(searchWrites().at(-1)).toEqual(['pageSearch', 'second'])
    vi.advanceTimersByTime(5000)
    expect(searchWrites()).toHaveLength(2)
  })

  it('flushes when the runtime scope is disposed', async () => {
    const { captureTodoScope } = await import('../src/runtime')
    setTodoSearch('left behind')
    captureTodoScope().dispose()
    expect(searchWrites()).toEqual([['pageSearch', 'left behind']])
    vi.advanceTimersByTime(5000)
    expect(searchWrites()).toHaveLength(1)
  })
})
