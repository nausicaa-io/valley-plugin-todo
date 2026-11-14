import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes, type TodoNotesMock } from './mockTodoNotes'
import { TodoPanel } from '../src/ui/TodoPanel'
import { rangeNames, selectionOf, toggleName, viewOfSelection } from '../src/model/listSelection'
import { getView, setView } from '../src/state/viewStore'

const GROUPS = [
  { id: 'group_fungi', name: 'Fungi', color: '#3b82f6' },
  { id: 'group_wildlife', name: 'Wildlife', color: '#eab308' },
  { id: 'group_moss', name: 'Moss', color: '#22c55e' },
  { id: 'group_rain', name: 'Rain', color: '#a855f7' }
]
const RECORDS: DataRecord[] = [{ id: 'a', title: 'Fungi Survey sheet', completed: false, group: 'Fungi' } as DataRecord]

let store: TodoNotesMock

async function openLists(): Promise<void> {
  store = installTodoNotes(RECORDS, { groups: GROUPS })
  await act(async () => { render(<TodoPanel />) })
  await act(async () => store.mock.emitState({ activePluginTab: { pluginId: 'todo' } }))
  await screen.findByText('My Lists')
}

const row = (name: string): HTMLElement => screen.getByRole('button', { name: new RegExp(`^${name}`) })
const click = async (name: string, init: Parameters<typeof fireEvent.click>[1] = {}): Promise<void> => { await act(async () => { fireEvent.click(row(name), init) }) }
const selected = (): string[] => {
  const view = getView()
  return view.kind === 'groups' ? view.names : []
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('list selection model', () => {
  const order = ['Fungi', 'Wildlife', 'Moss', 'Rain']

  it('takes the rows between the anchor and the click in the order shown, either way round', () => {
    expect(rangeNames(order, 'Wildlife', 'Rain')).toEqual(['Wildlife', 'Moss', 'Rain'])
    expect(rangeNames(order, 'Rain', 'Wildlife')).toEqual(['Wildlife', 'Moss', 'Rain'])
    expect(rangeNames(order, 'moss', 'MOSS')).toEqual(['Moss'])
    expect(rangeNames(order, 'Gone', 'Moss')).toEqual(['Moss'])
    expect(rangeNames(order, 'Moss', 'Gone')).toEqual([])
  })

  it('toggles one name without touching the rest, and an empty selection is the default list', () => {
    expect(toggleName(['Fungi', 'Moss'], 'moss')).toEqual(['Fungi'])
    expect(toggleName(['Fungi'], 'Rain')).toEqual(['Fungi', 'Rain'])
    expect(viewOfSelection({ names: [], includeUngrouped: false })).toEqual({ kind: 'smart', id: 'all' })
    expect(selectionOf({ kind: 'nogroup' })).toEqual({ names: [], includeUngrouped: true })
    expect(selectionOf({ kind: 'smart', id: 'today' })).toEqual({ names: [], includeUngrouped: false })
  })
})

describe('My Lists selection', () => {
  it('selects one list on a plain click', async () => {
    await openLists()
    await click('Wildlife')
    expect(selected()).toEqual(['Wildlife'])
    await click('Moss')
    expect(selected()).toEqual(['Moss'])
    expect(row('Moss')).toHaveAttribute('aria-pressed', 'true')
    expect(row('Wildlife')).toHaveAttribute('aria-pressed', 'false')
  })

  it('selects the whole range with Shift-click, forwards and backwards, and keeps the anchor', async () => {
    await openLists()
    await click('Fungi')
    await click('Moss', { shiftKey: true })
    expect(selected()).toEqual(['Fungi', 'Wildlife', 'Moss'])
    for (const name of ['Fungi', 'Wildlife', 'Moss']) expect(row(name)).toHaveAttribute('aria-pressed', 'true')
    expect(row('Rain')).toHaveAttribute('aria-pressed', 'false')
    await click('Wildlife', { shiftKey: true })
    expect(selected()).toEqual(['Fungi', 'Wildlife'])

    await click('Rain')
    await click('Wildlife', { shiftKey: true })
    expect(selected()).toEqual(['Wildlife', 'Moss', 'Rain'])
  })

  it('treats Shift-click without an anchor as a plain click that sets the anchor', async () => {
    await openLists()
    await click('Moss', { shiftKey: true })
    expect(selected()).toEqual(['Moss'])
    await click('Rain', { shiftKey: true })
    expect(selected()).toEqual(['Moss', 'Rain'])
  })

  it('adds or removes a single list with Option-click and moves the anchor to it', async () => {
    await openLists()
    await click('Fungi')
    await click('Moss', { altKey: true })
    expect(selected()).toEqual(['Fungi', 'Moss'])
    await click('Fungi', { altKey: true })
    expect(selected()).toEqual(['Moss'])
    await click('Fungi', { altKey: true })
    expect(selected()).toEqual(['Moss', 'Fungi'])
    await click('Moss', { altKey: true })
    await click('Fungi', { altKey: true })
    expect(getView()).toEqual({ kind: 'smart', id: 'all' })

    await click('Fungi')
    await click('Rain', { altKey: true })
    await click('Wildlife', { shiftKey: true })
    expect(selected()).toEqual(['Wildlife', 'Moss', 'Rain'])
  })

  it('starts over on a plain click, and a smart list drops the anchor', async () => {
    await openLists()
    await click('Fungi')
    await click('Rain', { shiftKey: true })
    expect(selected()).toHaveLength(4)
    await click('Moss')
    expect(selected()).toEqual(['Moss'])
    await click('Rain', { shiftKey: true })
    expect(selected()).toEqual(['Moss', 'Rain'])

    await click('All')
    expect(getView()).toEqual({ kind: 'smart', id: 'all' })
    await click('Wildlife', { shiftKey: true })
    expect(selected()).toEqual(['Wildlife'])
  })

  it('extends a selection made elsewhere, such as the group filter', async () => {
    await openLists()
    act(() => setView({ kind: 'groups', names: ['Rain'], includeUngrouped: true }))
    await click('Fungi', { altKey: true })
    expect(getView()).toEqual({ kind: 'groups', names: ['Rain', 'Fungi'], includeUngrouped: true })
  })

  it('opens a list in a new tab on ⌘-click and middle click without touching the selection or the anchor', async () => {
    await openLists()
    await click('Fungi')
    await click('Rain', { metaKey: true })
    expect(store.mock.api.workspace.openMainTab).toHaveBeenCalledWith(expect.objectContaining({ newTab: true, title: 'Rain' }))
    expect(selected()).toEqual(['Fungi'])
    await act(async () => { fireEvent(row('Moss'), new MouseEvent('auxclick', { bubbles: true, button: 1 })) })
    expect(store.mock.api.workspace.openMainTab).toHaveBeenCalledTimes(2)
    expect(selected()).toEqual(['Fungi'])
    await click('Moss', { shiftKey: true })
    expect(selected()).toEqual(['Fungi', 'Wildlife', 'Moss'])
  })
})
