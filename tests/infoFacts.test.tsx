import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { WORKSPACE_DETAILS_V1, type WorkspaceDetailsProvider } from '@valley/plugin-sdk'
import { installTodoNotes } from './mockTodoNotes'
import type { TodoRecord } from '../src/types'
import { TodoPanel } from '../src/ui/TodoPanel'
import { editTodoValues } from '../src/commands/commands'
import { addDays, isoDay } from '../src/model/sort'
import { getSharedTodos, setSharedTodos } from '../src/state/sharedTodos'
import { matchesViewScope } from '../src/model/views'
import en from '../locales/en.json'
import de from '../locales/de.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'
import zhCN from '../locales/zh-CN.json'

const TODAY = isoDay()
const day = (offset: number): string => addDays(TODAY, offset)
const stamp = (offset: number, time = '09:00:00'): string => `${day(offset)}T${time}.000Z`

const CONFIGURED = [
  { id: 'group_fungi', name: 'Fungi', color: '#3b82f6' },
  { id: 'group_wildlife', name: 'Wildlife', color: '#eab308' }
]
const SETTINGS = {
  groups: CONFIGURED,
  statuses: { active: ['waiting', 'custom-review'], custom: [{ id: 'custom-review', label: 'Review', done: false }] }
}

const RECORDS: DataRecord[] = [
  { id: 'a', title: 'Survey fungi', group: 'Fungi', dueDate: day(-1), priority: 'high', flagged: true, tags: ['fungi', 'field'], estimatedMinutes: 90, remindAt: `${day(1)}T08:00`, createdAt: stamp(-40), updatedAt: stamp(-2) },
  { id: 'b', title: 'Wait for spores', group: 'Fungi', status: 'waiting', dueDate: TODAY, priority: 'medium', createdAt: stamp(-30), updatedAt: stamp(-5) },
  { id: 'c', title: 'Review draft', group: 'Wildlife', status: 'custom-review', dueDate: day(3), priority: 'low', tags: ['#Field'], estimatedMinutes: 30, createdAt: stamp(-20), updatedAt: stamp(-1) },
  { id: 'd', title: 'Post the parcel', createdAt: stamp(-10), updatedAt: stamp(-10) },
  { id: 'e', title: 'Catalog fungi', group: 'Fungi', completed: true, status: 'completed', dueDate: day(-7), createdAt: stamp(-60), updatedAt: stamp(-3) },
  { id: 'f', title: 'Far task', group: 'Wildlife', dueDate: day(30), createdAt: stamp(-1), updatedAt: stamp(-8) }
] as DataRecord[]

function provider(store: ReturnType<typeof installTodoNotes>): WorkspaceDetailsProvider {
  return store.mock.api.interop.extensions.providers(WORKSPACE_DETAILS_V1).find((entry) => entry.extension.id === 'todo.details')!.extension
}

/** What core draws on Info: each declared text item that has a value, in declaration order. */
function infoRows(store: ReturnType<typeof installTodoNotes>, instanceId?: string): [string, string][] {
  const details = provider(store)
  const snapshot = details.getSnapshot({ instanceId, selectedItemIds: details.items.map((item) => item.id) })
  return details.items.filter((item) => item.id !== 'title' && snapshot.items[item.id]?.text).map((item) => [item.label, snapshot.items[item.id].text!])
}

/** The loaded list the panel would publish, so no row has to mount. */
function load(_store: ReturnType<typeof installTodoNotes>, records: DataRecord[] = RECORDS): void {
  act(() => setSharedTodos(records.map((record) => ({ completed: false, priority: 'normal', dueDate: '', note: '', tags: [], createdAt: stamp(-100), updatedAt: stamp(-100), ...record }) as unknown as TodoRecord)))
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('To-Do Footer details', () => {
  const IDS = ['todayTodo', 'todayCompleted', 'weekTodo', 'weekCompleted', 'allTodo', 'allCompleted']
  const texts = (store: ReturnType<typeof installTodoNotes>): Record<string, string | undefined> => {
    const details = provider(store)
    const snapshot = details.getSnapshot({ selectedItemIds: details.items.map((item) => item.id) })
    return Object.fromEntries(IDS.map((id) => [id, snapshot.items[id]?.text]))
  }
  const inWeek = (): TodoRecord[] => getSharedTodos().filter((todo) => matchesViewScope(todo, { kind: 'smart', id: 'week' }, TODAY))

  it('offers only the title and six counts: to do and completed for Today, This week and All', () => {
    const store = installTodoNotes(RECORDS, SETTINGS)
    load(store)
    const details = provider(store)
    expect(details.defaultItems).toEqual(['title'])
    expect(details.pluginViews).toBe(true)
    expect(details.items.map((item) => item.id)).toEqual(['title', ...IDS])
    expect(details.items.slice(1).map((item) => item.label)).toEqual(['Today to do', 'Today completed', 'This week to do', 'This week completed', 'All to do', 'All completed'])
    expect(details.items.every((item) => item.kind === 'text')).toBe(true)
    expect(WORKSPACE_DETAILS_V1.validate(details)).toBe(true)
  })

  it('shows each count as name · number in the footer and carries the bare number for Info', () => {
    const store = installTodoNotes(RECORDS, SETTINGS)
    load(store)
    const week = inWeek()
    expect(texts(store)).toEqual({
      todayTodo: 'Today to do · 2',
      todayCompleted: 'Today completed · 1',
      weekTodo: `This week to do · ${week.filter((todo) => !todo.completed).length}`,
      weekCompleted: `This week completed · ${week.filter((todo) => todo.completed).length}`,
      allTodo: 'All to do · 5',
      allCompleted: 'All completed · 1'
    })
    const snapshot = provider(store).getSnapshot({ selectedItemIds: IDS })
    expect(IDS.map((id) => snapshot.items[id].value)).toEqual([2, 1, week.filter((todo) => !todo.completed).length, week.filter((todo) => todo.completed).length, 5, 1])
    // What Info draws: the label and the number, nothing repeated.
    expect(infoRows(store).map(([label]) => label)).toEqual(['Today to do', 'Today completed', 'This week to do', 'This week completed', 'All to do', 'All completed'])
  })

  it('shows a zero rather than dropping a count', () => {
    const store = installTodoNotes([], SETTINGS)
    load(store, [])
    expect(Object.values(texts(store))).toEqual(['Today to do · 0', 'Today completed · 0', 'This week to do · 0', 'This week completed · 0', 'All to do · 0', 'All completed · 0'])
  })

  it('updates live when a task changes', () => {
    const store = installTodoNotes(RECORDS, SETTINGS)
    load(store)
    const listener = vi.fn()
    const off = provider(store).subscribe(listener)
    const before = listener.mock.calls.length
    act(() => setSharedTodos(getSharedTodos().map((todo) => todo.id === 'a' ? { ...todo, completed: true, status: 'completed' as const } : todo)))
    expect(listener.mock.calls.length).toBeGreaterThan(before)
    expect(texts(store)).toMatchObject({ todayTodo: 'Today to do · 1', todayCompleted: 'Today completed · 2', allTodo: 'All to do · 4', allCompleted: 'All completed · 2' })
    off()
  })

  it('follows a real edit made through the To-Do writer', async () => {
    const store = installTodoNotes(RECORDS, SETTINGS)
    await act(async () => { render(<TodoPanel />) })
    await screen.findByText('Survey fungi')
    await waitFor(() => expect(texts(store).allTodo).toBe('All to do · 5'))
    await act(async () => { await editTodoValues('a', { completed: true }) })
    await waitFor(() => expect(texts(store).allCompleted).toBe('All completed · 2'))
  })

  it('has every label in every shipped catalog, with umlauts intact in German', () => {
    const store = installTodoNotes(RECORDS, SETTINGS)
    const keys = provider(store).items.map((item) => item.labelKey).filter((key): key is string => !!key?.startsWith('todo.info.'))
    expect(keys).toHaveLength(6)
    for (const catalog of [en, de, es, fr, zhCN] as Record<string, string>[]) for (const key of keys) expect(catalog[key], key).toBeTruthy()
    expect(de['todo.info.todayTodo']).toBe('Heute offen')
    expect(de['todo.info.weekCompleted']).toBe('Diese Woche erledigt')
    expect(JSON.stringify(de)).not.toContain('\uFFFD')
  })
})
