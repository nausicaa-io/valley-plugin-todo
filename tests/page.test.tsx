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

  it('keeps the 38px header to the title and icons, with search opening in the title\'s place', async () => {
    const { container } = render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')

    const bar = container.querySelector('.todo-page-appbar')!
    const shape = (): unknown => [...bar.children].map((element) => {
      if (element.matches('h1')) return 'title'
      if (element.matches('.todo-page-search')) return 'search-field'
      if (element.matches('.todo-page-appbar-actions')) return [...element.children].map((child) => child.getAttribute('aria-label')).join('+')
      return 'other'
    })
    expect(shape()).toEqual(['title', 'Search todos+Priority+Toggle columns+New todo'])
    expect(screen.queryByRole('textbox', { name: 'Search todos' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Search todos' }))
    const input = await screen.findByRole('textbox', { name: 'Search todos' })
    expect(input).toHaveAttribute('placeholder', 'Filter tasks…')
    expect(shape()).toEqual(['search-field', 'Clear search+Priority+Toggle columns+New todo'])
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(shape()).toEqual(['title', 'Search todos+Priority+Toggle columns+New todo'])

    // The status filter sits on the header cell above the status checks.
    expect(container.querySelector('thead th.todo-table-select button[aria-label="Statuses"]')).toBeInTheDocument()
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
    // A remembered search reopens the field in the title's place.
    expect(await screen.findByRole('textbox', { name: 'Search todos' })).toHaveValue('survey')

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

    fireEvent.click(screen.getByRole('button', { name: 'Filter' }))
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
    const sidebar = await screen.findByRole('textbox', { name: 'Search todos' })
    expect(sidebar).toHaveClass('search-field-input')
    await act(async () => fireEvent.change(sidebar, { target: { value: 'moss' } }))
    await waitFor(() => expect(screen.queryByText('Review species list')).not.toBeInTheDocument())
    expect(screen.getAllByText('Record moss growth')).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Search todos' })).toHaveClass('active')

    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Search todos' })))
    const fields = await screen.findAllByRole('textbox', { name: 'Search todos' })
    expect(fields).toHaveLength(2)
    expect(fields[1]).toHaveValue('moss')
    await act(async () => fireEvent.keyDown(fields[1], { key: 'Escape' }))
    expect(sidebar).toHaveValue('')
    expect(screen.getAllByRole('textbox', { name: 'Search todos' })).toHaveLength(1)
  })

  it('persists the shared selection under the one key both surfaces read', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    expect(store.mock.api.settings.get()).not.toHaveProperty('pageChip')
  })

  it('adds tasks from an empty row at the top of the table, one per pasted line', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, panelChip: 'group:Fungi' })
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    await act(async () => fireEvent.click(document.querySelector<HTMLButtonElement>('.todo-page-add')!))
    const input = await screen.findByLabelText('New todo title')
    expect(input.closest('tr')).toHaveClass('todo-table-new-row')
    expect(input.closest('tbody')!.firstElementChild).toBe(input.closest('tr'))
    expect(store.mock.api.workspace.revealOwnPanel).not.toHaveBeenCalled()

    await act(async () => fireEvent.change(input, { target: { value: 'Record fern habitat' } }))
    await act(async () => fireEvent.keyDown(input, { key: 'Enter' }))
    await waitFor(() => expect(store.records.find((record) => record.title === 'Record fern habitat')).toMatchObject({ group: 'Fungi' }))
    expect(input).toHaveValue('')

    await act(async () => fireEvent.paste(input, { clipboardData: { getData: () => '- [ ] Count moss beds\n- Label spore prints\n\n' } }))
    await waitFor(() => expect(store.records.map((record) => record.title)).toEqual(expect.arrayContaining(['Count moss beds', 'Label spore prints'])))

    await act(async () => fireEvent.keyDown(input, { key: 'Escape' }))
    expect(screen.queryByLabelText('New todo title')).not.toBeInTheDocument()
  })

  it('adds one more new row per +, focuses it, and drops a row left without a title', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, panelChip: 'group:Fungi' })
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    const add = document.querySelector<HTMLButtonElement>('.todo-page-add')!
    await act(async () => fireEvent.click(add))
    const first = await screen.findByLabelText('New todo title')
    await waitFor(() => expect(first).toHaveFocus())
    await act(async () => fireEvent.change(first, { target: { value: 'Keep this draft' } }))

    await act(async () => fireEvent.click(add))
    await waitFor(() => expect(screen.getAllByLabelText('New todo title')).toHaveLength(2))
    // The newest row sits on top and is the only highlighted one.
    const [second, older] = screen.getAllByLabelText('New todo title')
    expect(older).toHaveValue('Keep this draft')
    await waitFor(() => expect(second).toHaveFocus())
    expect(second.closest('tr')).not.toHaveClass('is-idle')
    expect(older.closest('tr')).toHaveClass('is-idle')

    // Leaving the empty new row removes it; the titled row stays, plain.
    await act(async () => fireEvent.pointerDown(document.body))
    await waitFor(() => expect(screen.getAllByLabelText('New todo title')).toHaveLength(1))
    expect(screen.getByLabelText('New todo title')).toHaveValue('Keep this draft')
    expect(screen.getByLabelText('New todo title').closest('tr')).toHaveClass('is-idle')
  })

  it('hides done tasks until the Status filter includes them', async () => {
    store = installTodoNotes([
      { id: 'a', title: 'Open one', completed: false } as DataRecord,
      { id: 'b', title: 'Done one', completed: true } as DataRecord
    ])
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Open one')
    expect(titles()).toEqual(['Open one'])

    fireEvent.click(screen.getByRole('button', { name: 'Statuses' }))
    render(<>{store.mock.popovers.at(-1)?.node}</>)
    fireEvent.click(screen.getByRole('button', { name: 'Show every status' }))
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

    fireEvent.click(screen.getByText('Archive field recording'), { metaKey: true })
    expect(screen.getByText('1 selected')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Complete' }))

    await waitFor(() => expect(screen.queryByText('Archive field recording')).not.toBeInTheDocument())
    expect(screen.getByText('0 tasks')).toBeInTheDocument()
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

  it('orders a dated view overdue first and never opens Calendar from the table', async () => {
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
    const openLink = vi.spyOn(store.mock.api.links, 'open')
    await act(async () => fireEvent.click(overdue))
    expect(store.mock.popovers.at(-1)).toBeTruthy()
    await act(async () => {
      fireEvent.click(screen.getByText('Future survey'))
      await new Promise((resolve) => setTimeout(resolve, 260))
    })
    expect(openLink).not.toHaveBeenCalled()
    // The click edited the title in place instead.
    const titleInput = screen.getByRole('textbox', { name: 'Title' })
    expect(titleInput).toHaveValue('Future survey')
    await act(async () => fireEvent.change(titleInput, { target: { value: 'Future field survey' } }))
    await act(async () => fireEvent.keyDown(titleInput, { key: 'Enter' }))
    await waitFor(() => expect(store.records.find((record) => record.id === 'c')?.title).toBe('Future field survey'))
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
    expect(document.querySelector('.todo-page-appbar-btn[aria-label="Priority"]')).toHaveClass('active')

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    await waitFor(() => expect(titles()).toEqual(['Urgent', 'Later']))
  })

  it('hides and restores columns from View', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    expect(document.querySelector('tr.todo-table-row td.todo-table-group .todo-table-group-pill')).toHaveTextContent('Fungi')

    fireEvent.click(screen.getByRole('button', { name: 'Toggle columns' }))
    render(<>{store.mock.popovers.at(-1)?.node}</>)
    fireEvent.click(screen.getByRole('button', { name: 'Priority' , pressed: true }))
    fireEvent.click(screen.getByRole('button', { name: 'Group', pressed: true }))
    await waitFor(() => expect(screen.queryByRole('columnheader', { name: 'Priority' })).not.toBeInTheDocument())
    expect(document.querySelector('tr.todo-table-row td.todo-table-group')).toBeNull()
    expect(store.mock.api.settings.get()).toMatchObject({ pageColumns: ['title', 'due', 'note'] })
  })

  it('offers All, To do and Completed as quick picks in the status filter', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    fireEvent.click(screen.getByRole('button', { name: 'Statuses' }))
    render(<>{store.mock.popovers.at(-1)?.node}</>)
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Show only Completed and Canceled' })))
    expect(store.mock.api.settings.get()).toMatchObject({ statusFilter: ['completed', 'canceled'] })
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Show only unfinished statuses' })))
    expect((store.mock.api.settings.get().statusFilter as string[])).not.toContain('completed')
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Show every status' })))
    expect(store.mock.api.settings.get()).toMatchObject({ statusFilter: 'all' })
  })

  it('sorts by every column header and resizes all but Due and Priority', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, pageColumns: ['due', 'priority', 'group', 'note'] })
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    for (const [name, field] of [['Notes', 'notes'], ['Group', 'group'], ['Title', 'name']] as const) {
      await act(async () => fireEvent.click(screen.getByRole('button', { name })))
      expect(store.mock.api.settings.get()).toMatchObject({ pageSort: { field, dir: 'asc' } })
    }

    expect(screen.queryByRole('separator', { name: /Resize Due/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('separator', { name: /Resize Priority/ })).not.toBeInTheDocument()
    const split = screen.getByRole('separator', { name: /Resize Notes/ })
    await act(async () => {
      fireEvent.pointerDown(split, { button: 0, clientX: 100, pointerId: 1 })
      fireEvent.pointerMove(split, { clientX: 340, pointerId: 1 })
      fireEvent.pointerUp(split, { clientX: 340, pointerId: 1 })
    })
    expect(store.mock.api.settings.get()).toMatchObject({ pageColumnWidths: { note: 240 } })
    expect(split.closest('th')).toHaveStyle({ width: '240px' })
    await act(async () => fireEvent.doubleClick(split))
    expect(store.mock.api.settings.get().pageColumnWidths).toEqual({})
  })

  it('reorders columns, Title included, by dragging one header onto another', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, pageColumns: ['title', 'due', 'group'] })
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    const header = (name: string): HTMLElement => screen.getByRole('button', { name }).closest('th')!
    let payload = ''
    const dataTransfer = { effectAllowed: '', dropEffect: '', setData: (_t: string, value: string) => { payload = value }, getData: () => payload, setDragImage: vi.fn() }
    await act(async () => fireEvent.dragStart(header('Due'), { dataTransfer }))
    expect(dataTransfer.setDragImage).toHaveBeenCalledWith(expect.objectContaining({ className: 'todo-col-drag-chip', textContent: 'Due' }), expect.any(Number), expect.any(Number))
    expect(document.querySelector('table.todo-table')).toHaveAttribute('data-dragging-col', 'due')
    await act(async () => fireEvent.dragOver(header('Title'), { dataTransfer, clientX: -1 }))
    await act(async () => fireEvent.drop(header('Title'), { dataTransfer }))
    expect(store.mock.api.settings.get()).toMatchObject({ pageColumns: ['due', 'title', 'group'] })
    expect([...document.querySelectorAll('thead th')].map((cell) => cell.textContent)).toEqual(['', 'Due', 'Title', 'Group', ''])
    expect(screen.getByText('Fungi Survey sheet').closest('tr')!.children[2]).toHaveClass('todo-table-title')
  })

  it('offers a fixed-width Flagged column that toggles the flag and sorts', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, pageColumns: ['due', 'flagged'] })
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    expect(screen.queryByRole('separator', { name: /Resize Flagged/ })).not.toBeInTheDocument()
    const row = screen.getByText('Fungi Survey sheet').closest('tr')!
    const flag = row.querySelector<HTMLButtonElement>('td.todo-table-flagged button')!
    const before = flag.getAttribute('aria-pressed') === 'true'
    await act(async () => fireEvent.click(flag))
    await waitFor(() => expect(screen.getByText('Fungi Survey sheet').closest('tr')!.querySelector('td.todo-table-flagged button')).toHaveAttribute('aria-pressed', String(!before)))
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Flagged' })))
    expect(store.mock.api.settings.get()).toMatchObject({ pageSort: { field: 'flagged', dir: 'asc' } })
  })

  it('shows the columns in the order the picker saved and sorts by Group', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, pageColumns: ['due', 'group'] })
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    expect([...document.querySelectorAll('thead th')].map((cell) => cell.textContent)).toEqual(['', 'Title', 'Due', 'Group', ''])

    fireEvent.click(screen.getByRole('button', { name: 'Group' }))
    await waitFor(() => expect(store.mock.api.settings.get()).toMatchObject({ pageSort: { field: 'group', dir: 'asc' } }))
    const groups = (): string[] => [...document.querySelectorAll('tr.todo-table-row td.todo-table-group')].map((cell) => cell.textContent ?? '')
    const named = groups().filter(Boolean)
    expect(named).toEqual([...named].sort((a, b) => a.localeCompare(b)))
    expect(groups().slice(named.length).every((value) => value === '')).toBe(true)
  })

  it('reads in the list row order, with the status check first', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')

    expect([...document.querySelectorAll('thead th')].map((cell) => cell.textContent)).toEqual(['', 'Title', 'Due', 'Priority', 'Group', 'Notes', ''])
    const row = screen.getByText('Fungi Survey sheet').closest('tr')!
    expect(row.querySelector('td:first-child input.todo-check')).toBeInTheDocument()
    expect(screen.queryByLabelText('Select all')).not.toBeInTheDocument()
  })

  it.each([
    ['Inspect the sampling labels', 'Inspect the sampling labels'],
    ['\n\n  Second line first  \nthird', 'Second line first'],
    ['- [ ] Inspect the **sampling** labels', '- [ ] Inspect the **sampling** labels'],
    ['| Habitat | Samples |\n| --- | --- |', '| Habitat | Samples |']
  ])('shows the first line of the note %j as written', async (note, text) => {
    store = installTodoNotes([{ id: 'n', title: 'With a note', completed: false, note } as DataRecord], { groups: CONFIGURED })
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('With a note')
    expect(document.querySelector('tr.todo-table-row td.todo-table-note')?.textContent).toBe(text)
  })

  it('toggles completion from the check and opens the statuses on a long press', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    const check = screen.getByText('Review species list').closest('tr')!.querySelector<HTMLInputElement>('input.todo-check')!

    vi.useFakeTimers()
    try {
      fireEvent.pointerDown(check)
      act(() => { vi.advanceTimersByTime(450) })
      fireEvent.pointerUp(check)
      fireEvent.click(check)
    } finally {
      vi.useRealTimers()
    }
    expect(store.records.find((r) => r.id === 'b')?.completed).toBe(false)
    const waiting = store.mock.menus.at(-1)!.find((item) => item.label === 'In Progress')!
    await act(async () => { await waiting.onSelect?.() })
    await waitFor(() => expect(store.records.find((r) => r.id === 'b')).toMatchObject({ status: 'inprogress' }))

    fireEvent.click(screen.getByText('Fungi Survey sheet').closest('tr')!.querySelector('input.todo-check')!)
    await waitFor(() => expect(store.records.find((r) => r.id === 'a')).toMatchObject({ completed: true }))
  })

  it('offers no Status column and deletes the selection after confirmation', async () => {
    void store.mock.api.settings.set('pageColumns', ['group', 'status', 'priority', 'due'])
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')

    // The status check at the front of each row shows the status; a saved Status column is dropped.
    expect(document.querySelector('.todo-table-status')).toBeNull()

    const order = titles()
    fireEvent.click(screen.getByText(order[0]), { metaKey: true })
    fireEvent.click(screen.getByText(order[2]), { shiftKey: true })
    expect(screen.getByText('3 selected')).toBeInTheDocument()
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
