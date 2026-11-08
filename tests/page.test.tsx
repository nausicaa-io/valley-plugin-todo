import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import * as React from 'react'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes, TodoPropertiesHost, type TodoNotesMock } from './mockTodoNotes'
import { Page } from '../src/Page'
import { TodoPanel } from '../src/TodoPanel'
import { isoDay } from '../src/sort'
import { serializeView } from '../src/views'
import {
  applyTodoVisibleState,
  readTodoVisibleState,
  setView
} from '../src/viewStore'
import { PLUGIN_SURFACE_V1, type MainWorkspaceNavigationController } from '@valley/plugin-sdk'
import { registerTodoCommands } from '../src/commands'
import { revealRequestStore } from '../src/runtime'

let store: TodoNotesMock

const CONFIGURED = [
  { id: 'group_fungi', name: 'Fungi', color: '#3b82f6' },
  { id: 'group_wildlife', name: 'Wildlife', color: '#eab308' }
]

const RECORDS: DataRecord[] = [
  { id: 'a', title: 'Fungi Survey sheet', completed: false, group: 'Fungi' } as DataRecord,
  { id: 'b', title: 'Review species list', completed: false, group: 'Wildlife' } as DataRecord,
  { id: 'c', title: 'Record moss growth', completed: false } as DataRecord
]

function titles(): string[] {
  return [...document.querySelectorAll('.todo-table-row .todo-table-title-text')].map((cell) => (cell.textContent ?? '').trim())
}

function holdReconciliation(): (records: DataRecord[]) => void {
  const originalDataset = store.mock.api.data.dataset
  let reads = 0
  let finish!: (records: DataRecord[]) => void
  const refresh = new Promise<DataRecord[]>((resolve) => { finish = resolve })
  store.mock.api.data.dataset = ((dataset: string) => {
    const accessor = originalDataset(dataset)
    if (dataset !== 'todo.tasks') return accessor
    return {
      ...accessor,
      query: async (query) => ++reads === 1
        ? accessor.query(query)
        : { rows: await refresh, revision: 1 }
    }
  }) as typeof store.mock.api.data.dataset
  return finish
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

/**
 * The page shows whatever the sidebar selected. It carries no filter of its
 * own any more — the two surfaces reading one value is the whole point of the
 * navigation rewrite, and a page that could disagree with the sidebar is the
 * bug the chip bar had.
 */
describe('the To-Do page', () => {
  beforeEach(() => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED })
  })

  it('opens on All, so an undated todo is never invisible on a fresh realm', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('All')
    expect(titles()).toHaveLength(3)
  })

  it('keeps a todo:open edit reveal on a freshly mounted page until the shared list has loaded', async () => {
    const scrollIntoView = vi.fn()
    Object.defineProperty(Element.prototype, 'scrollIntoView', { configurable: true, value: scrollIntoView })
    registerTodoCommands(store.mock.api)
    vi.mocked(store.mock.api.workspace.openMainTab).mockImplementation(() => { render(<Page navigation={{ setController: vi.fn() }} />) })
    const result = await act(async () => store.mock.api.commands.execute('todo:open', { id: 'b' }))
    expect(result.ok).toBe(true)
    expect(store.mock.api.workspace.openMainTab).toHaveBeenCalledTimes(1)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.getByLabelText('Todo title')).toHaveValue('Review species list')
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' }))
    expect(revealRequestStore().get()).toBeNull()
    delete (Element.prototype as { scrollIntoView?: unknown }).scrollIntoView
  })

  it('still closes an edit reveal for a todo that is missing once the page has loaded', async () => {
    revealRequestStore().request('ghost', 'edit')
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('orders the 38px header as title, filter, Status, Priority, then columns and add', async () => {
    const { container } = render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')

    const bar = container.querySelector('.todo-page-appbar')!
    expect([...bar.children].map((element) => {
      if (element.matches('h1')) return 'title'
      if (element.matches('.todo-search-wrap')) return 'search'
      if (element.matches('.todo-facet-btn')) return element.getAttribute('aria-label')
      if (element.matches('.todo-page-appbar-actions')) return [...element.children].map((child) => child.textContent || child.getAttribute('aria-label')).join('+')
      return 'other'
    })).toEqual(['title', 'search', 'Status', 'Priority', 'View+New todo'])
    expect(screen.getByLabelText('Search todos')).toHaveAttribute('placeholder', 'Filter tasks…')
  })

  it('round-trips linked navigation, filters, search, and sort into persistent settings', () => {
    const linkedView = serializeView({ kind: 'groups', names: ['Fungi'], includeUngrouped: false })
    expect(applyTodoVisibleState({
      v: 1,
      view: linkedView,
      showCompleted: true,
      statusFilter: ['waiting'],
      search: 'moss',
      sort: { field: 'priority', dir: 'desc' }
    })).toBe(true)

    expect(readTodoVisibleState()).toEqual({
      v: 1,
      view: linkedView,
      showCompleted: true,
      statusFilter: ['waiting'],
      search: 'moss',
      sort: { field: 'priority', dir: 'desc' }
    })
    expect(store.mock.api.settings.get()).toMatchObject({
      panelChip: linkedView,
      pageShowCompleted: true,
      statusFilter: ['waiting'],
      pageSearch: 'moss',
      pageSort: { field: 'priority', dir: 'desc' }
    })
    expect(applyTodoVisibleState({ ...readTodoVisibleState(), v: 2 })).toBe(false)
  })

  it('falls back from a missing linked tag while retaining every valid filter', async () => {
    applyTodoVisibleState({
      v: 1,
      view: 'tag:missing',
      showCompleted: true,
      statusFilter: ['waiting'],
      search: 'survey',
      sort: { field: 'name', dir: 'asc' }
    })
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByRole('heading', { level: 1, name: 'All' })

    expect(readTodoVisibleState()).toMatchObject({
      view: 'all',
      showCompleted: true,
      statusFilter: ['waiting'],
      search: 'survey',
      sort: { field: 'name', dir: 'asc' }
    })
  })

  it('leaves navigation to the host strip and keeps the active view and actions', async () => {
    const { container } = render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')

    const bar = container.querySelector('.todo-page-appbar')
    expect(bar).not.toBeNull()
    expect(bar?.querySelector('.todo-page-appbar-title')).toHaveTextContent('All')
    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Forward' })).not.toBeInTheDocument()

    expect(screen.queryByRole('button', { name: 'More actions' })).not.toBeInTheDocument()
    const provider = store.mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'main_workspace')!.extension
    expect(provider.getSnapshot().actions?.map((item) => item.label)).toContain('Manage groups')
  })

  it('registers internal view history for the host navigation controls', async () => {
    let controller: MainWorkspaceNavigationController | null = null
    const navigation = {
      setController: (next: MainWorkspaceNavigationController | null): void => {
        controller = next
      }
    }
    render(<Page navigation={navigation} />)

    act(() => setView({ kind: 'smart', id: 'today' }))
    await screen.findByRole('heading', { level: 1, name: 'Today' })
    await waitFor(() => expect(controller?.canGoBack).toBe(true))

    await act(async () => { await controller?.goBack() })
    await screen.findByRole('heading', { level: 1, name: 'All' })
    expect((controller as MainWorkspaceNavigationController | null)?.canGoForward).toBe(true)
  })

  it('titles itself after the selected view, in that view’s colour', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, panelChip: 'scheduled' })
    render(<Page navigation={{ setController: vi.fn() }} />)

    const title = await screen.findByRole('heading', { level: 1 })
    expect(title.textContent).toBe('Scheduled')
    // The variable, not a resolved colour — that is what keeps the title
    // following the theme and any `--color-red` the user overrode.
    expect(title.getAttribute('style')).toContain('var(--color-red)')
  })

  it('takes a group’s own colour for a group view', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, panelChip: 'group:Fungi' })
    render(<Page navigation={{ setController: vi.fn() }} />)

    const title = await screen.findByRole('heading', { level: 1 })
    expect(title.textContent).toBe('Fungi')
    expect(title.getAttribute('style')).toContain('rgb(59, 130, 246)')
    await waitFor(() => expect(titles()).toEqual(['Fungi Survey sheet']))
  })

  it('follows the sidebar’s selection', async () => {
    render(
      <>
        <TodoPanel />
        <Page navigation={{ setController: vi.fn() }} />
      </>
    )
    await screen.findAllByText('Fungi Survey sheet')

    fireEvent.click(screen.getByRole('button', { name: /^Groups/ }))
    render(<>{store.mock.popovers.at(-1)?.node}</>)
    fireEvent.click(screen.getByRole('button', { name: 'Deselect all' }))
    fireEvent.click(await screen.findByRole('button', { name: /^Fungi/ }))

    await waitFor(() => expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Fungi'))
  })

  it('keeps sidebar and page search synchronized', async () => {
    render(
      <>
        <TodoPanel />
        <Page navigation={{ setController: vi.fn() }} />
      </>
    )
    const searches = await screen.findAllByLabelText('Search todos')
    for (const input of searches) {
      expect(input).toHaveClass('search-field-input')
      expect(input.parentElement).toHaveClass('search-field')
      expect(input.parentElement?.querySelector('.search-field-icon')).toBeInTheDocument()
    }

    fireEvent.change(searches[0], { target: { value: 'moss' } })

    expect(searches[1]).toHaveValue('moss')
    await waitFor(() => expect(screen.queryByText('Review species list')).not.toBeInTheDocument())
    expect(screen.getAllByText('Record moss growth')).toHaveLength(2)
    const clear = screen.getAllByRole('button', { name: 'Clear search' })
    expect(clear.every((button) => button.classList.contains('search-field-action'))).toBe(true)
    fireEvent.click(clear[1])
    expect(searches[0]).toHaveValue('')
    expect(searches[1]).toHaveValue('')
    fireEvent.change(searches[0], { target: { value: 'moss' } })
    fireEvent.keyDown(searches[0], { key: 'Escape' })
    expect(searches[0]).toHaveValue('')
    expect(searches[1]).toHaveValue('')
    expect(await screen.findAllByLabelText('Search todos')).toEqual(searches)
  })

  it('persists the shared selection under the one key both surfaces read', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    expect(store.mock.api.settings.get()).not.toHaveProperty('pageChip')
  })

  it('opens a compact sidebar composer from the main page add button', async () => {
    store.mock.emitState({ activePluginTab: { pluginId: 'todo' } })
    render(<><TodoPanel /><Page navigation={{ setController: vi.fn() }} /></>)
    await screen.findByText('Fungi Survey sheet')
    const button = document.querySelector<HTMLButtonElement>('.todo-page-add')!
    fireEvent.click(button)
    expect(await screen.findByLabelText('New todo title')).toBeInTheDocument()
    expect(store.mock.api.workspace.revealOwnPanel).toHaveBeenCalledWith('left_sidebar')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('New todo title'), { target: { value: 'Record fern habitat' } })
    fireEvent.submit(screen.getByLabelText('New todo title').closest('form')!)
    await waitFor(() => expect(store.records.some(record => record.title === 'Record fern habitat')).toBe(true))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('hides done tasks until the Status filter includes them', async () => {
    store = installTodoNotes([
      { id: 'a', title: 'Open one', completed: false } as DataRecord,
      { id: 'b', title: 'Done one', completed: true } as DataRecord
    ])
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Open one')
    expect(titles()).toEqual(['Open one'])

    fireEvent.click(screen.getByRole('button', { name: 'Status' }))
    render(<>{store.mock.popovers.at(-1)?.node}</>)
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    await waitFor(() => expect(titles()).toEqual(['Open one', 'Done one']))
  })

  it('keeps the workspace page mounted while bulk-completing selected tasks', async () => {
    store = installTodoNotes([{
      id: 'linked',
      title: 'Archive field recording',
      completed: false,
      filePath: 'Audio/Field.m4a',
      attachments: ['Notes/Field.md']
    } as DataRecord])
    const finishRefresh = holdReconciliation()
    const { container } = render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Archive field recording')
    const shell = container.querySelector('.todo-page')

    fireEvent.click(screen.getByLabelText('Select Archive field recording'))
    expect(screen.getByText('1 of 1 row(s) selected.')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Complete' }))

    await waitFor(() => expect(screen.queryByText('Archive field recording')).not.toBeInTheDocument())
    expect(screen.getByText('0 of 0 row(s) selected.')).toBeInTheDocument()
    expect(screen.queryByText('Loading todos')).not.toBeInTheDocument()
    expect(container.querySelector('.todo-page')).toBe(shell)
    act(() => finishRefresh(store.records.map((record) => ({ ...record }))))
    await waitFor(() => expect(container.querySelector('.todo-page')).toBe(shell))
  })

  it('orders Completed newest completion first', async () => {
    store = installTodoNotes([
      {
        id: 'older', title: 'Older completion', completed: true, status: 'completed',
        statusHistory: [{ from: 'open', to: 'completed', changedAt: '2026-06-11T12:00:00.000Z' }]
      } as DataRecord,
      {
        id: 'newer', title: 'Newer cancellation', completed: true, status: 'canceled',
        statusHistory: [{ from: 'open', to: 'canceled', changedAt: '2026-06-13T12:00:00.000Z' }]
      } as DataRecord,
      {
        id: 'legacy', title: 'Legacy completion', completed: true,
        updatedAt: '2026-06-12T12:00:00.000Z'
      } as DataRecord,
      {
        id: 'reopened', title: 'Reopened task', completed: false, status: 'open',
        statusHistory: [
          { from: 'open', to: 'completed', changedAt: '2026-06-14T12:00:00.000Z' },
          { from: 'completed', to: 'open', changedAt: '2026-06-15T12:00:00.000Z' }
        ]
      } as DataRecord
    ], { panelChip: 'completed' })
    render(<Page navigation={{ setController: vi.fn() }} />)

    await screen.findByText('Newer cancellation')
    expect(titles()).toEqual(['Newer cancellation', 'Legacy completion', 'Older completion'])
    expect(screen.queryByText('Reopened task')).not.toBeInTheDocument()
  })

  it('orders a dated view overdue first and opens due dates in Calendar', async () => {
    const today = isoDay(new Date())
    store = installTodoNotes(
      [
        { id: 'a', title: 'Due today', completed: false, dueDate: today } as DataRecord,
        { id: 'b', title: 'Long overdue', completed: false, dueDate: '2020-01-01' } as DataRecord,
        { id: 'c', title: 'Future survey', completed: false, dueDate: '2099-01-02' } as DataRecord
      ],
      { panelChip: 'scheduled' }
    )
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Long overdue')

    expect(titles()).toEqual(['Long overdue', 'Due today', 'Future survey'])
    const overdue = screen.getByText('Long overdue').closest('tr')!.querySelector('.todo-table-due .todo-table-cell-btn')!
    expect(overdue).toHaveClass('is-overdue')
    expect(screen.getByText('Due today').closest('tr')!.querySelector('.todo-table-due')).toHaveTextContent('Today')
  })

  it('orders Today by start time', async () => {
    const today = isoDay(new Date())
    store = installTodoNotes(
      [
        { id: 'a', title: 'Whenever', completed: false, dueDate: today } as DataRecord,
        { id: 'b', title: 'Standup', completed: false, dueDate: today, startTime: '09:30' } as DataRecord,
        { id: 'c', title: 'Review', completed: false, dueDate: today, startTime: '14:00' } as DataRecord,
        { id: 'd', title: 'Reading', completed: false, dueDate: today, startTime: '21:00' } as DataRecord
      ],
      { panelChip: 'today' }
    )
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Standup')

    expect(titles()).toEqual(['Standup', 'Review', 'Reading', 'Whenever'])
    expect(screen.getByText('Standup').closest('tr')).toHaveTextContent('09:30')
  })

  it('sorts from the column headers and returns to the view order on the third click', async () => {
    store = installTodoNotes([
      { id: 'a', title: 'Beta', completed: false, priority: 'low' } as DataRecord,
      { id: 'b', title: 'Alpha', completed: false, priority: 'high' } as DataRecord,
      { id: 'c', title: 'Gamma', completed: false, priority: 'medium' } as DataRecord
    ])
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Alpha')
    const before = titles()

    const header = screen.getByRole('button', { name: 'Title' })
    fireEvent.click(header)
    await waitFor(() => expect(titles()).toEqual(['Alpha', 'Beta', 'Gamma']))
    expect(header.closest('th')).toHaveAttribute('aria-sort', 'ascending')
    fireEvent.click(header)
    await waitFor(() => expect(titles()).toEqual(['Gamma', 'Beta', 'Alpha']))
    fireEvent.click(header)
    await waitFor(() => expect(titles()).toEqual(before))
    expect(store.mock.api.settings.get()).toMatchObject({ pageSort: { field: 'auto' } })

    fireEvent.click(within(document.querySelector('thead')!).getByRole('button', { name: 'Priority' }))
    await waitFor(() => expect(titles()).toEqual(['Alpha', 'Gamma', 'Beta']))
  })

  it('filters by priority and resets every filter at once', async () => {
    store = installTodoNotes([
      { id: 'a', title: 'Urgent', completed: false, priority: 'high' } as DataRecord,
      { id: 'b', title: 'Later', completed: false, priority: 'low' } as DataRecord
    ])
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Urgent')

    fireEvent.click(within(document.querySelector<HTMLElement>('.todo-page-appbar')!).getByRole('button', { name: 'Priority' }))
    const popover = render(<>{store.mock.popovers.at(-1)?.node}</>)
    fireEvent.click(within(popover.container).getByRole('button', { name: 'High' }))
    await waitFor(() => expect(titles()).toEqual(['Urgent']))
    expect(store.mock.api.settings.get()).toMatchObject({ pagePriorityFilter: ['high'] })
    expect(document.querySelector('.todo-facet-btn[aria-label="Priority"] .todo-facet-badge')).toHaveTextContent('High')

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    await waitFor(() => expect(titles()).toEqual(['Urgent', 'Later']))
  })

  it('hides and restores columns from View', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    expect(document.querySelector('.todo-table-badge')).toHaveTextContent('Fungi')

    fireEvent.click(screen.getByRole('button', { name: 'Toggle columns' }))
    render(<>{store.mock.popovers.at(-1)?.node}</>)
    fireEvent.click(screen.getByRole('button', { name: 'Priority' , pressed: true }))
    fireEvent.click(screen.getByRole('button', { name: 'Group', pressed: true }))
    await waitFor(() => expect(screen.queryByRole('columnheader', { name: 'Priority' })).not.toBeInTheDocument())
    expect(document.querySelector('.todo-table-badge')).toBeNull()
    expect(store.mock.api.settings.get()).toMatchObject({ pageColumns: ['status', 'due'] })
  })

  it('changes status from its cell and deletes the selection after confirmation', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')

    const statusCell = screen.getByText('Review species list').closest('tr')!.querySelector<HTMLButtonElement>('.todo-table-status button')!
    fireEvent.click(statusCell)
    const inProgress = store.mock.menus.at(-1)!.find((item) => item.label === 'In Progress')!
    await act(async () => { await inProgress.onSelect?.() })
    await waitFor(() => expect(store.records.find((r) => r.id === 'b')).toMatchObject({ status: 'inprogress' }))

    fireEvent.click(screen.getByLabelText('Select all'))
    expect(screen.getByText('3 of 3 row(s) selected.')).toBeInTheDocument()
    vi.mocked(store.mock.api.ui.confirm).mockResolvedValueOnce('delete')
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    await waitFor(() => expect(store.records).toHaveLength(0))
  })

  it('edits the selected row in a modal while Properties stays read-only', async () => {
    render(<><Page navigation={{ setController: vi.fn() }} /><TodoPropertiesHost mock={store.mock} /></>)
    await screen.findByText('Fungi Survey sheet')

    fireEvent.doubleClick(screen.getByText('Review species list'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(store.mock.api.workspace.showProperties).not.toHaveBeenCalled()
    expect(screen.getByRole('region', { name: 'Task properties' }).querySelector('input, textarea, select')).not.toBeInTheDocument()
    expect((screen.getByLabelText('Todo title') as HTMLInputElement).value).toBe('Review species list')
    expect(store.mock.popovers).toHaveLength(0)
  })

})


it('pages a large list and turns to the page of a revealed task', async () => {
  store = installTodoNotes(Array.from({ length: 95 }, (_, index) => ({ id: `task-${index}`, title: `Task ${String(index).padStart(3, '0')}`, completed: false })), { pageSort: { field: 'name', dir: 'asc' } })
  const view = render(<Page navigation={{ setController: vi.fn() }} />)
  await screen.findByText('Task 000')
  expect(view.container.querySelectorAll('.todo-table-row')).toHaveLength(10)
  expect(screen.getByText('Page 1 of 10')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeDisabled()

  fireEvent.click(screen.getByRole('button', { name: 'Go to next page' }))
  expect(await screen.findByText('Task 010')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Go to last page' }))
  expect(await screen.findByText('Task 094')).toBeInTheDocument()
  expect(view.container.querySelectorAll('.todo-table-row')).toHaveLength(5)

  fireEvent.click(screen.getByRole('button', { name: 'Rows per page' }))
  const fifty = store.mock.menus.at(-1)!.find((item) => item.label === '50')!
  act(() => { void fifty.onSelect?.() })
  expect(await screen.findByText('Page 1 of 2')).toBeInTheDocument()
  expect(store.mock.api.settings.get()).toMatchObject({ pageRowsPerPage: 50 })

  const scrollIntoView = vi.fn()
  Object.defineProperty(Element.prototype, 'scrollIntoView', { configurable: true, value: scrollIntoView })
  act(() => revealRequestStore().request('task-77', 'focus'))
  expect(await screen.findByText('Task 077')).toBeInTheDocument()
  expect(screen.getByText('Page 2 of 2')).toBeInTheDocument()
  await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' }))
  delete (Element.prototype as { scrollIntoView?: unknown }).scrollIntoView
})
