import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { WORKSPACE_DETAILS_V1, type WorkspaceDetailsProvider } from '@valley/plugin-sdk'
import { installTodoNotes } from './mockTodoNotes'
import type { TodoRecord } from '../src/types'
import { TodoPanel } from '../src/ui/TodoPanel'
import { editTodoValues } from '../src/commands/commands'
import { addDays, formatDate, isoDay } from '../src/model/sort'
import { getSharedTodos, setSharedTodos } from '../src/state/sharedTodos'
import { setView } from '../src/state/viewStore'
import { viewTabInstance } from '../src/state/tabs'
import { detailItemId } from '../src/integrations/infoDetails'
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

describe('To-Do facts on the Info tab', () => {
  it('keeps the footer default and lists the facts of a mixed list as plain rows', () => {
    const store = installTodoNotes(RECORDS, SETTINGS)
    load(store)
    const details = provider(store)
    expect(details.defaultItems).toEqual(['title'])
    expect(details.pluginViews).toBe(true)
    expect(details.items[0]).toMatchObject({ id: 'title', labelKey: 'details.item.title' })
    expect(details.items.every((item) => item.kind === 'text')).toBe(true)
    expect(infoRows(store)).toEqual([
      ['List', 'All'],
      ['Tasks', '6'],
      ['Open', '5'],
      ['Done', '1'],
      ['Overdue', '1'],
      ['Due today', '1'],
      ['Next 7 days', '1'],
      ['No date', '1'],
      ['Flagged', '1'],
      ['With reminder', '1'],
      ['Priority', 'High 1 · Medium 1 · Low 1'],
      ['To do', '3'],
      ['Completed', '1'],
      ['Waiting', '1'],
      ['Review', '1'],
      ['Groups', '2'],
      ['Fungi', '3'],
      ['Wildlife', '2'],
      ['No group', '1'],
      ['Tags', '2 · #field 2 · #fungi 1'],
      ['Estimated time', '2 h'],
      ['Next due', `Wait for spores · ${formatDate(TODAY)}`],
      ['Last completed', formatDate(day(-3))],
      ['Last change', formatDate(day(-1))],
      ['Created', `${formatDate(day(-60))} – ${formatDate(day(-1))}`]
    ])
  })

  it('shows only the title row of an empty list', () => {
    const store = installTodoNotes([], SETTINGS)
    load(store, [])
    expect(infoRows(store)).toEqual([['List', 'All'], ['Tasks', '0']])
    expect(provider(store).items.map((item) => item.id)).not.toContain('groups')
  })

  it('combines several selected lists and follows a list a tab is pinned to', () => {
    const store = installTodoNotes(RECORDS, SETTINGS)
    load(store)
    act(() => setView({ kind: 'groups', names: ['Fungi', 'Wildlife'] }))
    const rows = infoRows(store)
    expect(rows.slice(0, 4)).toEqual([['List', 'Fungi, Wildlife'], ['Tasks', '5'], ['Open', '4'], ['Done', '1']])
    expect(rows).toContainEqual(['Groups', '2'])
    expect(rows).toContainEqual(['Fungi', '3'])
    expect(rows.find(([label]) => label === 'No group')).toBeUndefined()
    expect(rows.find(([label]) => label === 'No date')).toBeUndefined()

    const pinned = infoRows(store, viewTabInstance({ kind: 'groups', names: ['Wildlife'] }))
    expect(pinned.slice(0, 3)).toEqual([['List', 'Wildlife'], ['Tasks', '2'], ['Open', '2']])
    expect(pinned).toContainEqual(['Groups', '1'])
    expect(pinned).toContainEqual(['Wildlife', '2'])
    expect(pinned.find(([label]) => label === 'Fungi')).toBeUndefined()
    expect(pinned).toContainEqual(['Next due', `Review draft · ${formatDate(day(3))}`])
  })

  it('declares item ids the host accepts for group names with spaces, umlauts and slashes, and still counts them', () => {
    const groups = [{ id: 'group_cf', name: 'Copper Finch', color: '#3b82f6' }, { id: 'group_gw', name: 'Grüne Wiese/Nord', color: '#eab308' }]
    const records = [
      { id: 'x1', title: 'One', group: 'Copper Finch', createdAt: stamp(-2), updatedAt: stamp(-2) },
      { id: 'x2', title: 'Two', group: 'copper finch', createdAt: stamp(-2), updatedAt: stamp(-2) },
      { id: 'x3', title: 'Three', group: 'Grüne Wiese/Nord', status: 'waiting', createdAt: stamp(-2), updatedAt: stamp(-2) }
    ] as DataRecord[]
    const store = installTodoNotes(records, { ...SETTINGS, groups })
    load(store, records)
    const details = provider(store)
    expect(WORKSPACE_DETAILS_V1.validate(details)).toBe(true)
    expect(details.items.every((item) => /^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(item.id))).toBe(true)
    expect(details.items.find((item) => item.label === 'Copper Finch')?.id).toBe(detailItemId('group', 'copper finch'))
    expect(detailItemId('group', 'copper finch')).toBe(detailItemId('group', 'copper finch'))
    expect(detailItemId('group', 'fungi')).toBe('group:fungi')
    const rows = infoRows(store)
    expect(rows).toContainEqual(['Copper Finch', '2'])
    expect(rows).toContainEqual(['Grüne Wiese/Nord', '1'])
  })

  it('counts a smart list by its own scope', () => {
    const store = installTodoNotes(RECORDS, SETTINGS)
    load(store)
    act(() => setView({ kind: 'smart', id: 'completed' }))
    expect(infoRows(store).slice(0, 4)).toEqual([['List', 'Completed'], ['Tasks', '1'], ['Open', '0'], ['Done', '1']])
  })

  it('updates live when a task changes and declares a new status the moment one is used', () => {
    const store = installTodoNotes(RECORDS, SETTINGS)
    load(store)
    const details = provider(store)
    const listener = vi.fn()
    const off = details.subscribe(listener)
    expect(infoRows(store)).toContainEqual(['Overdue', '1'])
    const before = listener.mock.calls.length

    act(() => setSharedTodos(getSharedTodos().map((todo) => todo.id === 'a' ? { ...todo, completed: true, status: 'completed' as const, dueDate: '' } : todo)))
    expect(listener.mock.calls.length).toBeGreaterThan(before)
    const rows = infoRows(store)
    expect(rows).toContainEqual(['Done', '2'])
    expect(rows.find(([label]) => label === 'Overdue')).toBeUndefined()
    expect(rows.find(([label]) => label === 'Flagged')).toBeUndefined()

    act(() => setSharedTodos([...getSharedTodos(), { ...getSharedTodos()[0], id: 'g', title: 'On hold', completed: false, status: 'onhold' }]))
    expect(provider(store).items.map((item) => item.label)).toContain('On Hold')
    expect(infoRows(store)).toContainEqual(['On Hold', '1'])
    off()
  })

  it('follows a real edit made through the To-Do writer', async () => {
    const store = installTodoNotes(RECORDS, SETTINGS)
    await act(async () => { render(<TodoPanel />) })
    await screen.findByText('Survey fungi')
    await waitFor(() => expect(infoRows(store)).toContainEqual(['Overdue', '1']))
    await act(async () => { await editTodoValues('a', { completed: true }) })
    await waitFor(() => expect(infoRows(store)).toContainEqual(['Done', '2']))
    expect(infoRows(store).find(([label]) => label === 'Overdue')).toBeUndefined()
  })

  it('has every label in every shipped catalog, with umlauts intact in German', () => {
    const store = installTodoNotes(RECORDS, SETTINGS)
    const keys = provider(store).items.map((item) => item.labelKey).filter((key): key is string => !!key?.startsWith('todo.info.'))
    expect(keys.length).toBeGreaterThan(15)
    for (const catalog of [en, de, es, fr, zhCN] as Record<string, string>[]) {
      for (const key of keys) expect(catalog[key], key).toBeTruthy()
      for (const key of ['todo.info.hours', 'todo.info.minutes', 'todo.info.hoursMinutes']) expect(catalog[key], key).toBeTruthy()
    }
    for (const catalog of [en, de, es, fr, zhCN] as Record<string, string>[]) expect(catalog['todo.info.completed']).not.toBe(catalog['todo.status.completed'])
    expect(en['todo.info.completed']).toBe('Done')
    expect(de['todo.info.completed']).toBe('Erledigt')
    expect(de['todo.info.overdue']).toBe('Überfällig')
    expect(de['todo.info.nextDue']).toBe('Nächste Fälligkeit')
    expect(de['todo.info.lastChange']).toBe('Letzte Änderung')
    expect(JSON.stringify(de)).not.toContain('�')
  })
})
