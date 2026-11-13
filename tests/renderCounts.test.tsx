import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes, type TodoNotesMock } from './mockTodoNotes'
import { TodoPanel } from '../src/ui/TodoPanel'
import { Page } from '../src/ui/Page'
import { initLocalization } from '../src/localization'
import { countForGroup, groupCount, groupCounts } from '../src/model/views'

let store: TodoNotesMock

/**
 * Every row render calls `uiText` once for its status check's label, with the row title as `p0`.
 * Before rows were memoised (base 04e1fc5) the other rows re-rendered 87 times for one sidebar
 * flag, 58 for one sidebar completion, 18 for one table rename and 22 for one table completion.
 */
const ROW_LABEL_KEY = 'auto.13816aca9c25'

function trackRowRenders(): { counts: Map<string, number>; reset(): void; total(): number } {
  initLocalization(store.mock.api)
  const translate = store.mock.api.ui.t
  const counts = new Map<string, number>()
  store.mock.api.ui.t = ((key: string, params?: Record<string, unknown>) => {
    if (key === ROW_LABEL_KEY) {
      const title = String(params?.p0)
      counts.set(title, (counts.get(title) ?? 0) + 1)
    }
    return translate(key, params as never)
  }) as typeof translate
  return {
    counts,
    reset: () => counts.clear(),
    total: () => [...counts.values()].reduce((sum, value) => sum + value, 0)
  }
}

function records(count: number, extra: (index: number) => Partial<DataRecord> = () => ({})): DataRecord[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `t${index}`,
    title: `Task ${String(index).padStart(2, '0')}`,
    completed: false,
    ...extra(index)
  }) as DataRecord)
}

async function settle(): Promise<void> {
  await act(async () => { await new Promise((resolve) => setTimeout(resolve, 30)) })
}

function others(counts: Map<string, number>, title: string): number {
  return [...counts].filter(([candidate]) => candidate !== title).reduce((sum, [, value]) => sum + value, 0)
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  vi.useRealTimers()
})

describe('row render counts', () => {
  it('sidebar: flagging one task re-renders only that row', async () => {
    store = installTodoNotes(records(30))
    const renders = trackRowRenders()
    render(<TodoPanel />)
    await screen.findByText('Task 05')
    await settle()
    renders.reset()

    fireEvent.contextMenu(screen.getByText('Task 05').closest('.todo-row')!)
    const flag = store.mock.menus.at(-1)?.find((item) => item.label === 'Flag')
    await act(async () => { await flag?.onSelect?.() })
    await waitFor(() => expect(store.records.find((record) => record.id === 't5')?.flagged).toBe(true))
    await settle()
    expect(screen.getByText('Task 05').closest('.todo-row')).toHaveClass('flagged')
    expect(others(renders.counts, 'Task 05')).toBe(0)
    expect(renders.counts.get('Task 05')).toBeGreaterThan(0)
  })

  it('sidebar: completing one task re-renders no other row', async () => {
    store = installTodoNotes(records(30))
    const renders = trackRowRenders()
    render(<TodoPanel />)
    await screen.findByText('Task 05')
    await settle()
    renders.reset()

    await act(async () => fireEvent.click(screen.getByLabelText('Complete Task 05')))
    await waitFor(() => expect(store.records.find((record) => record.id === 't5')?.completed).toBe(true))
    await settle()
    expect(others(renders.counts, 'Task 05')).toBe(0)
  })

  it('table: completing and renaming one task re-render only that row', async () => {
    store = installTodoNotes(records(30))
    const renders = trackRowRenders()
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Task 05')
    await settle()
    renders.reset()

    await act(async () => fireEvent.click(screen.getByLabelText('Edit title of Task 07')))
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 260)) })
    const input = document.querySelector<HTMLInputElement>('.todo-table-title-input')!
    expect(input.closest('tr')).toHaveClass('is-editing')
    await act(async () => fireEvent.change(input, { target: { value: 'Task 07 renamed' } }))
    await act(async () => fireEvent.keyDown(input, { key: 'Enter' }))
    await waitFor(() => expect(store.records.find((record) => record.id === 't7')?.title).toBe('Task 07 renamed'))
    await settle()
    expect(screen.getByText('Task 07 renamed')).toBeInTheDocument()
    const renamedOthers = [...renders.counts].filter(([title]) => title !== 'Task 07' && title !== 'Task 07 renamed').reduce((sum, [, value]) => sum + value, 0)
    expect(renamedOthers).toBe(0)

    renders.reset()
    await act(async () => fireEvent.click(screen.getByLabelText('Complete Task 05')))
    await waitFor(() => expect(store.records.find((record) => record.id === 't5')?.completed).toBe(true))
    await settle()
    // Task 10 moves up onto the first page and mounts there; the rows already shown stay put.
    const shownBefore = [...renders.counts].filter(([title]) => title !== 'Task 05' && title !== 'Task 10').reduce((sum, [, value]) => sum + value, 0)
    expect(shownBefore).toBe(0)
    expect(screen.getByText('Task 10')).toBeInTheDocument()
  })

  it('table: Cmd/Shift-click selection re-renders only the rows whose selection changed', async () => {
    store = installTodoNotes(records(10))
    const renders = trackRowRenders()
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Task 05')
    await settle()
    const row = (title: string): HTMLElement => screen.getByText(title).closest('tr')!

    renders.reset()
    await act(async () => fireEvent.click(row('Task 02'), { metaKey: true }))
    expect(row('Task 02')).toHaveClass('selected')
    expect(row('Task 02')).toHaveAttribute('aria-selected', 'true')
    expect([...renders.counts.keys()]).toEqual(['Task 02'])

    renders.reset()
    await act(async () => fireEvent.click(row('Task 05'), { shiftKey: true }))
    for (const title of ['Task 02', 'Task 03', 'Task 04', 'Task 05']) expect(row(title)).toHaveClass('selected')
    for (const title of ['Task 00', 'Task 01', 'Task 06']) expect(row(title)).not.toHaveClass('selected')
    expect([...renders.counts.keys()].sort()).toEqual(['Task 03', 'Task 04', 'Task 05'])
    expect(screen.getByText('4 selected')).toBeInTheDocument()

    renders.reset()
    await act(async () => fireEvent.click(row('Task 03'), { ctrlKey: true }))
    expect(row('Task 03')).not.toHaveClass('selected')
    expect([...renders.counts.keys()]).toEqual(['Task 03'])
  })

  it('sidebar: a status rename and its done switch still reach every affected row', async () => {
    store = installTodoNotes(records(12, (index) => (index % 3 === 0 ? { status: 'waiting' } : {})), { panelPresentation: { compact: false } })
    const renders = trackRowRenders()
    render(<TodoPanel />)
    await screen.findByText('Task 03')
    await settle()
    const badges = (): string[] => [...document.querySelectorAll('.todo-row .todo-status-text')].map((badge) => (badge.textContent ?? '').trim())
    expect(badges()).toEqual(['Waiting', 'Waiting', 'Waiting', 'Waiting'])

    renders.reset()
    await act(async () => { await store.mock.api.settings.set('statuses', { labels: { waiting: 'Blocked' } }) })
    await waitFor(() => expect(badges()).toEqual(['Blocked', 'Blocked', 'Blocked', 'Blocked']))

    await act(async () => { await store.mock.api.settings.set('statuses', { labels: { waiting: 'Blocked' }, done: { waiting: true } }) })
    await waitFor(() => expect(badges()).toEqual([]))
    expect(renders.counts.get('Task 03')).toBeGreaterThan(0)
  })

  it('sidebar and table: a date format change reaches every dated row', async () => {
    store = installTodoNotes(records(6, (index) => ({ dueDate: `2031-0${index + 1}-14` })))
    const view = render(<TodoPanel />)
    await screen.findByText('Task 03')
    expect(screen.getByText('14-04-2031')).toBeInTheDocument()
    await act(async () => store.mock.emitState({ dateFormat: 'yyyy-mm-dd' }))
    await waitFor(() => expect(screen.getByText('2031-04-14')).toBeInTheDocument())
    expect(screen.queryByText('14-04-2031')).not.toBeInTheDocument()
    view.unmount()

    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Task 03')
    const due = (): string[] => [...document.querySelectorAll('.todo-table-row .todo-table-due-text')].map((cell) => cell.getAttribute('title') ?? '')
    expect(due()).toContain('2031-04-14')
    await act(async () => store.mock.emitState({ dateFormat: 'dd-mm-yyyy' }))
    await waitFor(() => expect(due()).toContain('14-04-2031'))
    expect(due().some((title) => title.startsWith('2031-'))).toBe(false)
  })

  it('table: a column change reaches every row', async () => {
    store = installTodoNotes(records(8, (index) => ({ tags: [`tag${index}`], priority: 'high' })))
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Task 03')
    const rows = (): HTMLElement[] => [...document.querySelectorAll<HTMLElement>('.todo-table-row')]
    expect(rows()).toHaveLength(8)
    expect(rows().every((row) => row.querySelector('.todo-table-priority') && !row.querySelector('.todo-table-tags'))).toBe(true)

    await act(async () => { await store.mock.api.settings.set('pageColumns', ['tags', 'title', 'due']) })
    await waitFor(() => expect(rows().every((row) => row.querySelector('.todo-table-tags'))).toBe(true))
    expect(rows().some((row) => row.querySelector('.todo-table-priority'))).toBe(false)
    expect(rows().map((row) => [...row.children].map((cell) => cell.className.split(' ')[0]))).toEqual(
      rows().map(() => ['todo-table-select', 'todo-table-tags', 'todo-table-title', 'todo-table-due', 'todo-table-actions'])
    )
    expect(rows()[3].querySelector('.todo-table-tag')).toHaveTextContent('#tag3')
  })

  it('renders each title through the host once, also across remounts', async () => {
    store = installTodoNotes(records(5))
    const renderMarkdown = vi.fn(async (source: string) => `<em>${source}</em>`)
    store.mock.api.markdown.render = renderMarkdown
    const first = render(<TodoPanel />)
    await waitFor(() => expect(document.querySelectorAll('.todo-row em')).toHaveLength(5))
    expect(renderMarkdown).toHaveBeenCalledTimes(5)
    first.unmount()

    render(<TodoPanel />)
    await screen.findByText('Task 02')
    // A cached title draws its HTML on the first paint.
    expect(document.querySelectorAll('.todo-row em')).toHaveLength(5)
    await settle()
    expect(renderMarkdown).toHaveBeenCalledTimes(5)

    await act(async () => { await store.mock.api.backend.call('records.update', { id: 't2', record: { ...store.records.find((record) => record.id === 't2'), title: 'Task 02 *edited*' } }) })
    await waitFor(() => expect(renderMarkdown).toHaveBeenCalledWith('Task 02 *edited*', { inline: true }))
    expect(renderMarkdown).toHaveBeenCalledTimes(6)
  })
})

describe('group counts', () => {
  it('equal groupCount for every group, case variant and the ungrouped row on a mixed fixture', () => {
    const todos = [
      { id: '1', group: 'Fungi', completed: false },
      { id: '2', group: 'fungi', completed: false },
      { id: '3', group: ' Fungi ', completed: true },
      { id: '4', group: 'Wildlife', completed: false },
      { id: '5', group: '', completed: false },
      { id: '6', completed: false },
      { id: '7', completed: true },
      { id: '8', group: 'Moss', completed: true },
      { id: '9', group: 'WILDLIFE', completed: false }
    ] as unknown as Parameters<typeof groupCount>[0]
    const counts = groupCounts(todos)
    for (const name of ['Fungi', 'fungi', 'FUNGI', ' Fungi ', 'Wildlife', 'wildlife', 'Moss', 'Absent', '', null]) {
      expect(countForGroup(counts, name)).toBe(groupCount(todos, name))
    }
    const all = groupCounts(todos, false)
    const total = (name: string | null): number => todos.filter((todo) => name === null ? !todo.group : (todo.group ?? '').trim().toLowerCase() === name.trim().toLowerCase()).length
    expect(countForGroup(all, 'Fungi')).toBe(total('Fungi'))
    expect(countForGroup(all, 'Moss')).toBe(1)
    expect(countForGroup(all, null)).toBe(3)
  })
})
