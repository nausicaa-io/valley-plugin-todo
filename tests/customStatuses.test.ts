import { describe, expect, it } from 'vitest'
import { normalizeTodoRecord, taskRow } from '../src/records'
import { isCustomStatusId, normalizeCustomStatuses, normalizeStatusSettings, parseStoredStatus, patchForStatus } from '../src/statuses'

describe('custom statuses', () => {
  it('keeps well-formed custom statuses and drops the rest', () => {
    const custom = normalizeCustomStatuses([
      { id: 'custom-abc123', label: '  Review  ', done: false },
      { id: 'custom-abc123', label: 'Duplicate', done: true },
      { id: 'not-custom', label: 'Bad id', done: false },
      { id: 'custom-empty', label: '   ', done: false },
      { id: 'custom-shipped', label: 'Shipped', done: true }
    ])
    expect(custom).toEqual([
      { id: 'custom-abc123', label: 'Review', done: false },
      { id: 'custom-shipped', label: 'Shipped', done: true }
    ])
  })

  it('shows a custom status only while it is active, so leaving it out archives it', () => {
    const settings = normalizeStatusSettings({
      active: ['waiting', 'custom-shipped', 'custom-gone'],
      custom: [{ id: 'custom-shipped', label: 'Shipped', done: true }, { id: 'custom-review', label: 'Review', done: false }]
    })
    expect(settings.active).toEqual(['waiting', 'custom-shipped'])
    expect(settings.custom.map((status) => status.id)).toEqual(['custom-shipped', 'custom-review'])
    expect(settings.strikethrough['custom-shipped']).toBe(true)
    expect(settings.strikethrough['custom-review']).toBe(false)
  })

  it('marks a task done only for a custom status that counts as done', () => {
    const settings = { custom: [{ id: 'custom-shipped' as const, label: 'Shipped', done: true }, { id: 'custom-review' as const, label: 'Review', done: false }] }
    expect(patchForStatus('custom-shipped', settings)).toEqual({ completed: true, status: 'custom-shipped' })
    expect(patchForStatus('custom-review', settings)).toEqual({ completed: false, status: 'custom-review' })
  })

  it('stores a custom status beside the nearest built-in and reads it back', () => {
    const done = normalizeTodoRecord({ id: 't1', title: 'Ship it', completed: true, status: 'custom-shipped', createdAt: '2026-11-12T10:00:00.000Z' })
    const doneRow = taskRow(done)
    expect(doneRow.status).toBe('completed')
    expect(doneRow.customStatus).toBe('custom-shipped')
    const open = taskRow(normalizeTodoRecord({ id: 't2', title: 'Look at it', completed: false, status: 'custom-review', createdAt: '2026-11-12T10:00:00.000Z' }))
    expect(open.status).toBeNull()
    expect(open.customStatus).toBe('custom-review')
    expect(normalizeTodoRecord({ ...doneRow }).status).toBe('custom-shipped')
    expect(taskRow(normalizeTodoRecord({ id: 't3', title: 'Plain', completed: false, status: 'waiting', createdAt: '2026-11-12T10:00:00.000Z' })).customStatus).toBeNull()
  })

  it('reads any well-formed stored id, since the backend cannot see settings', () => {
    expect(parseStoredStatus('custom-deadbeef')).toBe('custom-deadbeef')
    expect(parseStoredStatus('waiting')).toBe('waiting')
    expect(parseStoredStatus('custom-')).toBeUndefined()
    expect(isCustomStatusId('custom-UPPER')).toBe(false)
  })
})
