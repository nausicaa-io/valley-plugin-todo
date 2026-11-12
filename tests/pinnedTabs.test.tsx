import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import * as React from 'react'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { PLUGIN_SURFACE_V1, type UiMenuItem } from '@valley/plugin-sdk'
import { installTodoNotes, type TodoNotesMock } from './mockTodoNotes'
import { Page } from '../src/Page'
import { TodoPanel } from '../src/TodoPanel'
import { getView } from '../src/viewStore'
import { viewTabInstance } from '../src/tabs'

let store: TodoNotesMock

const RECORDS: DataRecord[] = [
  { id: 'a', title: 'Fungi Survey sheet', completed: false, group: 'Fungi' } as DataRecord,
  { id: 'b', title: 'Review species list', completed: false, group: 'Wildlife', flagged: true } as DataRecord,
  { id: 'c', title: 'Record moss growth', completed: false } as DataRecord
]
const FUNGI = viewTabInstance({ kind: 'groups', names: ['Fungi'] })
const navigation = () => ({ setController: vi.fn() })
const focus = (instanceId?: string) => act(() => { store.mock.emitState({ activePluginTab: { pluginId: 'todo', ...(instanceId ? { instanceId } : {}) } }) })
const mainSurface = () => store.mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'main_workspace')!.extension

beforeEach(() => {
  store = installTodoNotes(RECORDS, { groups: [{ id: 'group_fungi', name: 'Fungi', color: '#3b82f6' }, { id: 'group_wildlife', name: 'Wildlife', color: '#eab308' }] })
})
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('To-Do list tabs', () => {
  it('opens a list in its own pinned tab on ⌘-click or middle click without changing the shared view', async () => {
    focus()
    render(<TodoPanel />)
    await waitFor(() => expect(screen.getByRole('button', { name: /^Flagged/ })).toHaveTextContent('1'))
    fireEvent.click(screen.getByRole('button', { name: /^Today/ }), { metaKey: true, ctrlKey: true })
    expect(store.mock.api.workspace.openMainTab).toHaveBeenCalledWith({ instanceId: 'list:today', title: 'Today', newTab: true })
    fireEvent(screen.getByRole('button', { name: /^Fungi/ }), new MouseEvent('auxclick', { bubbles: true, button: 1 }))
    expect(store.mock.api.workspace.openMainTab).toHaveBeenLastCalledWith({ instanceId: FUNGI, title: 'Fungi', newTab: true })
    expect(getView()).toEqual({ kind: 'smart', id: 'all' })
    expect(store.mock.api.settings.get().panelChip).toBeUndefined()
  })

  it('keeps a plain click on the shared view', async () => {
    focus()
    render(<TodoPanel />)
    await waitFor(() => expect(screen.getByRole('button', { name: /^Flagged/ })).toHaveTextContent('1'))
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: /^Flagged/ })) })
    expect(getView()).toEqual({ kind: 'smart', id: 'flagged' })
    expect(store.mock.api.workspace.openMainTab).not.toHaveBeenCalled()
  })

  it('renders a pinned tab’s own list beside the shared one', async () => {
    const shared = render(<Page navigation={navigation()} />)
    const pinned = render(<Page navigation={navigation()} instanceId={FUNGI} />)
    await waitFor(() => expect(within(pinned.container).getAllByText('Fungi Survey sheet')).toHaveLength(1))
    expect(pinned.container.querySelector('.todo-page-appbar-title')).toHaveTextContent('Fungi')
    expect(within(pinned.container).queryByText('Record moss growth')).toBeNull()
    expect(shared.container.querySelector('.todo-page-appbar-title')).toHaveTextContent('All')
    expect(within(shared.container).getByText('Record moss growth')).toBeInTheDocument()
    expect(mainSurface().getSnapshot(FUNGI).view.view).toBe('groups:%7B%22names%22%3A%5B%22Fungi%22%5D%2C%22includeUngrouped%22%3Afalse%7D')
    await mainSurface().restore({ ...mainSurface().getSnapshot(FUNGI).view }, FUNGI)
    expect(getView()).toEqual({ kind: 'smart', id: 'all' })
  })

  it('switches only the focused pinned tab when another list is picked', async () => {
    focus('list:today')
    const view = render(<><TodoPanel /><Page navigation={navigation()} instanceId="list:today" /></>)
    const nav = view.container.querySelector('.todo-active-navigation') as HTMLElement
    await waitFor(() => expect(within(nav).getByRole('button', { name: /^Today/ })).toHaveAttribute('aria-current', 'true'))
    fireEvent.click(within(nav).getByRole('button', { name: /^Flagged/ }))
    expect(store.mock.api.workspace.openMainTab).toHaveBeenCalledWith({ instanceId: 'list:flagged', title: 'Flagged', newTab: false })
    expect(getView()).toEqual({ kind: 'smart', id: 'all' })

    const actions = mainSurface().getSnapshot('list:today').actions as UiMenuItem[]
    const inGroup = actions.find((item) => 'submenu' in item && item.submenu)?.submenu as UiMenuItem[]
    const onSelect = (inGroup[0] as { onSelect: (context?: { newTab?: boolean }) => void }).onSelect
    act(() => onSelect({ newTab: true }))
    expect(store.mock.api.workspace.openMainTab).toHaveBeenLastCalledWith({ instanceId: FUNGI, title: 'Fungi', newTab: true })
    act(() => onSelect())
    expect(store.mock.api.workspace.openMainTab).toHaveBeenLastCalledWith({ instanceId: FUNGI, title: 'Fungi', newTab: false })
    expect(getView()).toEqual({ kind: 'smart', id: 'all' })
  })
})
