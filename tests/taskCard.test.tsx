import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import * as React from 'react'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes, type TodoNotesMock } from './mockTodoNotes'
import { Page } from '../src/ui/Page'
import { TaskCard, projectPoint } from '../src/ui/TaskCard'
import { selectTodoProperties } from '../src/ui/surfaces'
import { readMapTile } from '../src/backend/mapTiles'

let store: TodoNotesMock

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const PNG = 'iVBORw0KGgo='

/** Serve map tiles the way the backend does, and record what was asked. */
function serveTiles(): { z: number; x: number; y: number }[] {
  const asked: { z: number; x: number; y: number }[] = []
  const call = store.mock.api.backend.call
  store.mock.api.backend.call = (async (method: string, payload?: unknown) => {
    if (method !== 'map.tile') return call(method, payload)
    asked.push(payload as (typeof asked)[number])
    return PNG
  }) as typeof call
  return asked
}

describe('the Task tab', () => {
  it('shows the selected task: bold title, note as written, time and its place on a map', async () => {
    store = installTodoNotes([
      { id: 'a', title: 'Count the lichens', completed: false, priority: 'high', flagged: true, group: 'Fungi', tags: ['survey', 'north'], urls: ['https://example.org/lichen-key'], attachments: ['Projects/lichens.md'], status: 'inprogress', note: 'North face first.\nBring the hand lens.', dueDate: '2031-04-05', startTime: '09:30', endTime: '11:00', location: { name: 'Uetliberg', lat: 47.3496, lng: 8.4914 } } as DataRecord,
      { id: 'b', title: 'No place, no note', completed: false } as DataRecord
    ])
    const asked = serveTiles()
    const open = vi.spyOn(store.mock.api.links, 'open')
    render(<><Page navigation={{ setController: vi.fn() }} /><TaskCard /></>)
    await screen.findAllByText('Count the lichens')
    expect(screen.getByText('Select a task in the table to see it here.')).toBeInTheDocument()

    act(() => selectTodoProperties('a', 'main_workspace'))
    const card = document.querySelector<HTMLElement>('.todo-task-card')!
    expect(card.querySelector('h2.todo-task-title')).toHaveTextContent('Count the lichens')
    expect(card.querySelector('.todo-task-note')!.textContent).toBe('North face first.\nBring the hand lens.')
    expect(card.querySelector('.todo-task-line')).toHaveTextContent('05-04-2031 · 09:30 – 11:00')
    expect(card).toHaveTextContent('Uetliberg')
    // Everything else the task carries: status, priority, flag, group, tags, link and file.
    const facts = card.querySelector('.todo-task-facts')!
    expect(facts).toHaveTextContent('In Progress')
    expect(facts).toHaveTextContent('High')
    // The flag is its icon alone.
    expect(facts).not.toHaveTextContent('Flagged')
    expect(within(facts as HTMLElement).getByRole('img', { name: 'Flagged' })).toBeInTheDocument()
    expect(facts.querySelector('.todo-table-group-pill')).toHaveTextContent('Fungi')
    expect([...card.querySelectorAll('.todo-task-tag')].map((tag) => tag.textContent)).toEqual(['#survey', '#north'])
    expect(card).toHaveTextContent('example.org')
    expect(card.querySelector('.todo-attach-card')).toHaveTextContent('lichens.md')

    // The map is made of the tiles around the place, with the pin on it and the map's credit.
    await waitFor(() => expect(card.querySelectorAll('img.todo-task-map-tile').length).toBeGreaterThan(0))
    const centre = projectPoint({ lat: 47.3496, lng: 8.4914 }, 15)
    expect(asked.length).toBeGreaterThan(0)
    expect(asked.every((tile) => tile.z === 15)).toBe(true)
    expect(asked.some((tile) => tile.x === Math.floor(centre.x / 256) && tile.y === Math.floor(centre.y / 256))).toBe(true)
    expect(card.querySelector('img.todo-task-map-tile')).toHaveAttribute('src', `data:image/png;base64,${PNG}`)
    expect(card.querySelector('.todo-task-map-credit')).toHaveTextContent('© OpenStreetMap contributors')
    // + zooms in, − back out; dragging moves the map and its pin; the address above the map opens the place.
    act(() => screen.getByRole('button', { name: 'Zoom in' }).click())
    await waitFor(() => expect(asked.some((tile) => tile.z === 16)).toBe(true))
    act(() => screen.getByRole('button', { name: 'Zoom out' }).click())
    act(() => screen.getByRole('button', { name: 'Zoom out' }).click())
    await waitFor(() => expect(asked.some((tile) => tile.z === 14)).toBe(true))
    const map = card.querySelector<HTMLElement>('.todo-task-map')!
    const pin = card.querySelector<HTMLElement>('.todo-task-map-pin')!
    expect(pin.style.left).toBe('calc(50% + 0px)')
    const before = asked.length
    fireEvent.pointerDown(map, { button: 0, pointerId: 1, clientX: 100, clientY: 100 })
    fireEvent.pointerMove(map, { pointerId: 1, clientX: 100 + 600, clientY: 100 + 40 })
    fireEvent.pointerUp(map, { pointerId: 1 })
    expect(pin.style.left).toBe('calc(50% + 600px)')
    expect(pin.style.top).toBe('calc(50% + 40px)')
    await waitFor(() => expect(asked.length).toBeGreaterThan(before))
    expect(open).not.toHaveBeenCalled()
    expect(screen.queryByText('Show on map')).toBeNull()
    act(() => screen.getByRole('button', { name: 'Show Uetliberg on the map' }).click())
    expect(open).toHaveBeenCalledWith({ category: 'location', value: '47.3496,8.4914' })
    // Top to bottom: title, date, note, the facts, the place and its map, tags, links, files.
    const order = ['.todo-task-title', '.todo-task-line', '.todo-task-note', '.todo-task-facts', '.todo-task-map', '.todo-task-tags', '.todo-attach-card'].map((selector) => card.querySelector(selector)!)
    for (let index = 1; index < order.length; index++) expect(order[index - 1].compareDocumentPosition(order[index]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()

    // A task without a note, date or place shows its title alone.
    act(() => selectTodoProperties('b', 'main_workspace'))
    const bare = document.querySelector<HTMLElement>('.todo-task-card')!
    expect(bare.querySelector('.todo-task-title')).toHaveTextContent('No place, no note')
    expect(bare.querySelector('.todo-task-note, .todo-task-line, .todo-task-map, .todo-task-tags')).toBeNull()
    act(() => selectTodoProperties(null, 'main_workspace'))
  })
})

describe('map tiles', () => {
  it('reads one tile from the declared host, naming itself, and refuses anything that is not a tile', async () => {
    const fetch = vi.fn(async (_request: { url: string; headers?: Record<string, string> }) => ({ status: 200, headers: {}, bodyBase64: PNG }))
    const api = { network: { fetch } } as never
    await expect(readMapTile(api, { z: 15, x: 17155, y: 11476 })).resolves.toBe(PNG)
    expect(fetch.mock.calls[0][0].url).toBe('https://tile.openstreetmap.org/15/17155/11476.png')
    expect(fetch.mock.calls[0][0].headers?.['User-Agent']).toMatch(/^Valley-ToDo /)
    for (const bad of [null, {}, { z: 20, x: 0, y: 0 }, { z: 2, x: 4, y: 0 }, { z: 2, x: 0, y: -1 }, { z: 2, x: '1/../..', y: 0 }, { z: 1.5, x: 0, y: 0 }]) {
      await expect(readMapTile(api, bad)).rejects.toThrow('Not a map tile')
    }
    expect(fetch).toHaveBeenCalledTimes(1)
    fetch.mockResolvedValueOnce({ status: 404, headers: {}, bodyBase64: '' })
    await expect(readMapTile(api, { z: 1, x: 0, y: 0 })).rejects.toThrow('Map tile unavailable (404)')
  })

  it('declares that host, and no other, in the package permissions', async () => {
    const config = (await import('../config.json')).default as { permissions: { network?: { hosts: string[] } } }
    expect(config.permissions.network).toEqual({ hosts: ['tile.openstreetmap.org'] })
  })
})
