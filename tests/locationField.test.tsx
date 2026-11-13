import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { installTodoNotes } from './mockTodoNotes'
import { LocationField } from '../src/ui/LocationField'

afterEach(cleanup)

describe('the location field', () => {
  it('searches places as you type and stores the picked place with its coordinates', async () => {
    const store = installTodoNotes()
    const search = vi.fn(() => [{ id: '8.30,47.47', kind: 'place' as const, label: 'Baden', description: 'Aargau, Switzerland', value: 'Baden, Aargau, Switzerland', metadata: { longitude: 8.3, latitude: 47.47 } }])
    store.mock.api.resources.provide({ kinds: ['place'], search })
    const onChange = vi.fn()
    render(<LocationField value={undefined} onChange={onChange} />)

    const input = screen.getByLabelText('Location') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'baden' } })
    expect(await screen.findByText('Aargau, Switzerland')).toBeInTheDocument()
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onChange).toHaveBeenCalledWith({ name: 'Baden, Aargau, Switzerland', lng: 8.3, lat: 47.47 })
    expect(input.value).toBe('Baden, Aargau, Switzerland')
  })

  it('keeps a typed label without coordinates when nothing is picked', async () => {
    const store = installTodoNotes()
    store.mock.api.resources.provide({ kinds: ['place'], search: () => [] })
    const onChange = vi.fn()
    render(<LocationField value={undefined} onChange={onChange} />)

    const input = screen.getByLabelText('Location') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Upper Pasture Weather Mast' } })
    await waitFor(() => expect(screen.getByText(/No places found/)).toBeInTheDocument())
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onChange).toHaveBeenCalledWith({ name: 'Upper Pasture Weather Mast' })
  })
})
