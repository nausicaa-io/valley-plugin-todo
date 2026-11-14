import { act, cleanup, createEvent, fireEvent, render, screen } from '@testing-library/react'
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
  await screen.findByText('Groups')
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

describe('Groups list selection', () => {
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

describe('Groups list: folding and reordering', () => {
  const TREE = [
    { id: 'group_fungi', name: 'Fungi', color: '#3b82f6' },
    { id: 'group_spores', name: 'Spores', color: '#22c55e', parent: 'group_fungi' },
    { id: 'group_caps', name: 'Caps', color: '#a855f7', parent: 'group_fungi' },
    { id: 'group_wildlife', name: 'Wildlife', color: '#eab308' },
    { id: 'group_rain', name: 'Rain', color: '#a855f7' }
  ]
  const LOCAL = [
    { id: 'local-aaaaaaaaaaaa', name: 'Errands', color: 'palette:blue' },
    { id: 'local-bbbbbbbbbbbb', name: 'Market', color: 'palette:green', parent: 'local-aaaaaaaaaaaa' },
    { id: 'local-cccccccccccc', name: 'Home', color: 'palette:red' }
  ]
  const open = async (): Promise<void> => {
    store = installTodoNotes(RECORDS, { groups: TREE, localGroups: LOCAL })
    await act(async () => { render(<TodoPanel />) })
    await act(async () => store.mock.emitState({ activePluginTab: { pluginId: 'todo' } }))
    await screen.findByText('Groups')
  }
  const names = (): string[] => [...document.querySelectorAll('.todo-navigation-groups .todo-tree-label')].map((label) => (label.closest('.todo-subgroup') ? '  ' : '') + label.textContent)
  const navRow = (name: string): HTMLElement => row(name).closest('.todo-group-nav-row') as HTMLElement
  // jsdom rows have no size: a negative y is the upper half, x past 28 asks for a subgroup.
  const drag = async (from: string, to: string, at: { clientX: number; clientY: number }): Promise<void> => {
    const dataTransfer = { effectAllowed: '', setData: vi.fn(), getData: () => '' }
    await act(async () => { fireEvent.dragStart(navRow(from), { dataTransfer }) })
    // jsdom has no DragEvent, so the pointer position is put on the event by hand.
    const fire = (type: 'dragOver' | 'drop'): void => {
      const event = createEvent[type](navRow(to), { dataTransfer })
      Object.defineProperties(event, { clientX: { value: at.clientX }, clientY: { value: at.clientY } })
      fireEvent(navRow(to), event)
    }
    await act(async () => { fire('dragOver') })
    await act(async () => { fire('drop') })
    await act(async () => { await Promise.resolve() })
  }

  it('titles the section Groups and folds a group with subgroups, saving the choice', async () => {
    await open()
    expect(screen.queryByText('My Lists')).toBeNull()
    expect(names()).toEqual(['Fungi', '  Spores', '  Caps', 'Wildlife', 'Rain', 'Errands', '  Market', 'Home'])
    expect(screen.queryByRole('button', { name: 'Hide the subgroups of Wildlife' })).toBeNull()
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Hide the subgroups of Fungi' })) })
    expect(names()).toEqual(['Fungi', 'Wildlife', 'Rain', 'Errands', '  Market', 'Home'])
    expect(store.mock.api.settings.get().collapsedGroups).toEqual(['group_fungi'])
    expect(screen.getByRole('button', { name: 'Show the subgroups of Fungi' })).toHaveAttribute('aria-expanded', 'false')
    // Folding never selects the list.
    expect(selected()).toEqual([])
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Show the subgroups of Fungi' })) })
    expect(names()).toEqual(['Fungi', '  Spores', '  Caps', 'Wildlife', 'Rain', 'Errands', '  Market', 'Home'])
    expect(store.mock.api.settings.get().collapsedGroups).toEqual([])
  })

  it('folds and unfolds every group from the button at the end of the Groups title', async () => {
    await open()
    const head = document.querySelector('.todo-navigation-groups-head')!
    expect(head.firstElementChild).toHaveTextContent('Groups')
    expect(head.lastElementChild).toBe(screen.getByRole('button', { name: 'Collapse all groups' }))
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Collapse all groups' })) })
    expect(names()).toEqual(['Fungi', 'Wildlife', 'Rain', 'Errands', 'Home'])
    expect(store.mock.api.settings.get().collapsedGroups).toEqual(['group_fungi', 'local-aaaaaaaaaaaa'])
    // One open group is enough for the button to offer collapsing again.
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Show the subgroups of Errands' })) })
    expect(screen.getByRole('button', { name: 'Collapse all groups' })).toBeInTheDocument()
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Collapse all groups' })) })
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Expand all groups' })) })
    expect(names()).toEqual(['Fungi', '  Spores', '  Caps', 'Wildlife', 'Rain', 'Errands', '  Market', 'Home'])
    expect(store.mock.api.settings.get().collapsedGroups).toEqual([])
  })

  it('puts any group anywhere at the top level in To-Do\u2019s own order, shared and To-Do-only mixed', async () => {
    await open()
    // Home (To-Do-only) above Fungi (shared): the order is To-Do's, the shared registry is not touched.
    await drag('Home', 'Fungi', { clientX: 4, clientY: -1 })
    expect(store.mock.api.settings.get().groupOrder).toEqual(['local-cccccccccccc', 'group_fungi', 'group_wildlife', 'group_rain', 'local-aaaaaaaaaaaa'])
    expect(names()).toEqual(['Home', 'Fungi', '  Spores', '  Caps', 'Wildlife', 'Rain', 'Errands', '  Market'])
    expect(store.mock.api.sharedState.mutateGroup).not.toHaveBeenCalled()
    // A shared group below a To-Do-only one.
    await drag('Wildlife', 'Errands', { clientX: 4, clientY: 1 })
    expect(names()).toEqual(['Home', 'Fungi', '  Spores', '  Caps', 'Rain', 'Errands', '  Market', 'Wildlife'])
    expect(store.mock.api.sharedState.mutateGroup).not.toHaveBeenCalled()
  })

  it('nests only when the pointer travels right, lifts when it travels left, and never under the other kind', async () => {
    await open()
    // Grabbed anywhere on the row and dropped below Wildlife without sideways travel: a plain reorder.
    await drag('Rain', 'Wildlife', { clientX: 4, clientY: 1 })
    expect(store.mock.api.sharedState.mutateGroup).not.toHaveBeenCalled()
    // More than 20px to the right: a subgroup of Wildlife, saved in the shared registry.
    await drag('Rain', 'Wildlife', { clientX: 60, clientY: 1 })
    expect(store.mock.api.sharedState.mutateGroup).toHaveBeenLastCalledWith({ kind: 'move', id: 'group_rain', parent: 'group_wildlife', before: null })
    expect(names().slice(0, 5)).toEqual(['Fungi', '  Spores', '  Caps', 'Wildlife', '  Rain'])
    // Without sideways travel a subgroup stays a subgroup where the slot allows it.
    await drag('Caps', 'Spores', { clientX: 4, clientY: -1 })
    expect(store.mock.api.sharedState.mutateGroup).toHaveBeenLastCalledWith({ kind: 'move', id: 'group_caps', parent: 'group_fungi', before: 'group_spores' })
    // To the left at the end of its group: out to the top level.
    await drag('Rain', 'Rain', { clientX: 4, clientY: 1 })
    await drag('Rain', 'Wildlife', { clientX: -40, clientY: 1 })
    expect(store.mock.api.sharedState.mutateGroup).toHaveBeenLastCalledWith({ kind: 'move', id: 'group_rain', parent: null, before: null })
    expect(names().slice(0, 5)).toEqual(['Fungi', '  Caps', '  Spores', 'Wildlife', 'Rain'])
    // A shared group dragged right under a To-Do-only group lands after that group's subgroups instead.
    await drag('Rain', 'Errands', { clientX: 60, clientY: 1 })
    expect(names()).toEqual(['Fungi', '  Caps', '  Spores', 'Wildlife', 'Errands', '  Market', 'Rain', 'Home'])
    expect((store.mock.api.settings.get().localGroups as Array<{ name: string }>).map((group) => group.name)).toEqual(['Errands', 'Market', 'Home'])
  })

  it('lands after the hidden subgroups of a folded group, and reorders To-Do-only subgroups in To-Do\u2019s own groups', async () => {
    await open()
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Hide the subgroups of Fungi' })) })
    await drag('Rain', 'Fungi', { clientX: 60, clientY: 1 })
    expect(store.mock.api.sharedState.mutateGroup).not.toHaveBeenCalled()
    expect(store.mock.api.settings.get().groupOrder).toEqual(['group_fungi', 'group_rain', 'group_wildlife', 'local-aaaaaaaaaaaa', 'local-cccccccccccc'])
    // Home dragged right under Errands becomes its subgroup, saved in To-Do's own groups.
    await drag('Home', 'Market', { clientX: 60, clientY: 1 })
    expect((store.mock.api.settings.get().localGroups as Array<{ name: string; parent?: string }>).map((group) => [group.name, group.parent ?? null])).toEqual([['Errands', null], ['Market', 'local-aaaaaaaaaaaa'], ['Home', 'local-aaaaaaaaaaaa']])
  })
})

