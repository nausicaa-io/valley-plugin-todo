import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes, type TodoNotesMock } from './mockTodoNotes'
import { TodoPanel } from '../src/ui/TodoPanel'
import { selectionOf, toggleName, viewOfSelection } from '../src/model/listSelection'
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

  it('adds exactly the clicked list on Shift-click: the first and the last select only those two', async () => {
    await openLists()
    await click('Fungi')
    await click('Rain', { shiftKey: true })
    expect(selected()).toEqual(['Fungi', 'Rain'])
    expect(row('Wildlife')).toHaveAttribute('aria-pressed', 'false')
    expect(row('Moss')).toHaveAttribute('aria-pressed', 'false')
    await click('Moss', { shiftKey: true })
    expect(selected()).toEqual(['Fungi', 'Rain', 'Moss'])
  })

  it('removes a selected list on Shift-click, and an emptied selection is the default list', async () => {
    await openLists()
    await click('Fungi')
    await click('Moss', { shiftKey: true })
    await click('Fungi', { shiftKey: true })
    expect(selected()).toEqual(['Moss'])
    await click('Moss', { shiftKey: true })
    expect(getView()).toEqual({ kind: 'smart', id: 'all' })
  })

  it('starts a selection from a smart list and keeps the ungrouped choice', async () => {
    await openLists()
    await click('All')
    await click('Wildlife', { shiftKey: true })
    expect(selected()).toEqual(['Wildlife'])
    act(() => setView({ kind: 'groups', names: ['Rain'], includeUngrouped: true }))
    await click('Fungi', { shiftKey: true })
    expect(getView()).toEqual({ kind: 'groups', names: ['Rain', 'Fungi'], includeUngrouped: true })
  })

  it('treats Option-click as a plain click', async () => {
    await openLists()
    await click('Fungi')
    await click('Moss', { altKey: true })
    expect(selected()).toEqual(['Moss'])
  })

  it('starts over on a plain click', async () => {
    await openLists()
    await click('Fungi')
    await click('Rain', { shiftKey: true })
    await click('Moss')
    expect(selected()).toEqual(['Moss'])
  })

  it('opens a list in a new tab on ⌘-click and middle click without touching the selection', async () => {
    await openLists()
    await click('Fungi')
    await click('Rain', { metaKey: true })
    expect(store.mock.api.workspace.openMainTab).toHaveBeenCalledWith(expect.objectContaining({ newTab: true, title: 'Rain' }))
    expect(selected()).toEqual(['Fungi'])
    await act(async () => { fireEvent(row('Moss'), new MouseEvent('auxclick', { bubbles: true, button: 1 })) })
    expect(store.mock.api.workspace.openMainTab).toHaveBeenCalledTimes(2)
    expect(selected()).toEqual(['Fungi'])
  })
})
