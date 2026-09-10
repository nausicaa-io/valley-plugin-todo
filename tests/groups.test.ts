import { describe, expect, it } from 'vitest'
import {
  allGroups,
  groupColorFor,
  groupKey,
  newGroupId,
  nextGroupColor,
  normalizeTodoGroups,
  reorderGroups,
  type TodoGroup
} from '../src/groups'
import { PALETTE_AUTO_ASSIGN, isPaletteRef, paletteRef } from '@valley/plugin-sdk/palette'
import { createMockValleyApi } from '@valley/plugin-testkit'
import { initRuntime } from '../src/runtime'
import { registerTodoCommands } from '../src/commands'
import CONFIG from '../config.json'

describe('group names', () => {
  it('matches case- and whitespace-insensitively but keeps the typed casing', () => {
    expect(groupKey(' Fungi ')).toBe('fungi')
    expect(groupKey('fungi')).toBe(groupKey('Fungi'))
    const [group] = normalizeTodoGroups([{ name: '  Fungi  ', color: '#3b82f6' }])
    expect(group.name).toBe('Fungi')
  })

  it('drops unnamed and duplicate entries, and assigns ids and colours', () => {
    const groups = normalizeTodoGroups([
      { name: 'Fungi' },
      { name: 'fungi' },
      { name: '   ' },
      'nonsense',
      { name: 'Wildlife', color: 'not-a-colour' },
      { name: 'Custom', color: '#ABCDEF' }
    ])
    expect(groups.map((g) => g.name)).toEqual(['Fungi', 'Wildlife', 'Custom'])
    expect(groups[0].id).toBe('group_fungi')
    // Either stored form is valid: a palette reference for the two that fell
    // back to auto-assignment, a literal for the one that was picked by hand.
    expect(groups.every((g) => isPaletteRef(g.color) || /^#[0-9a-f]{6}$/.test(g.color))).toBe(true)
    expect(groups.slice(0, 2).every((g) => isPaletteRef(g.color))).toBe(true)
    // A hand-picked literal survives, canonicalized to lower case.
    expect(groups[2].color).toBe('#abcdef')
  })

  it('slugifies an id and never produces a bare prefix', () => {
    expect(newGroupId('Canopy Design')).toBe('group_canopy-design')
    expect(newGroupId('!!!')).toBe('group_group')
  })
})

describe('allGroups', () => {
  const configured: TodoGroup[] = [
    { id: 'group_fungi', name: 'Fungi', color: '#3b82f6' },
    { id: 'group_wildlife', name: 'Wildlife', color: '#eab308' }
  ]

  it('lists only shared groups, in configured order', () => {
    expect(allGroups(configured)).toEqual([
      'Fungi',
      'Wildlife'
    ])
  })

  it('returns no names without configured groups', () => {
    expect(allGroups([])).toEqual([])
  })
})

describe('group colours', () => {
  it('prefers the configured colour and is stable for an unconfigured name', () => {
    const configured: TodoGroup[] = [{ id: 'group_fungi', name: 'Fungi', color: '#123456' }]
    expect(groupColorFor('fungi', configured)).toBe('#123456')
    expect(groupColorFor('Unknown', configured)).toBe(groupColorFor('Unknown', configured))
    expect(PALETTE_AUTO_ASSIGN.map(paletteRef)).toContain(groupColorFor('Unknown', configured))
  })

  it('hands out an unused palette colour to the next group', () => {
    const used = PALETTE_AUTO_ASSIGN.slice(0, 2).map((id, i) => ({
      id: `g${i}`,
      name: `G${i}`,
      color: paletteRef(id)
    }))
    expect(nextGroupColor(used)).toBe(paletteRef(PALETTE_AUTO_ASSIGN[2]))
  })

  it('never auto-assigns red before the palette is exhausted', () => {
    // A group name shares a meta line with the overdue date, which is already
    // red — so an ordinary list must not start looking alarming at group three.
    expect(PALETTE_AUTO_ASSIGN.indexOf('red')).toBe(PALETTE_AUTO_ASSIGN.length - 1)
  })
})

describe('reorderGroups', () => {
  const list: TodoGroup[] = [
    { id: 'a', name: 'A', color: '#111111' },
    { id: 'b', name: 'B', color: '#222222' },
    { id: 'c', name: 'C', color: '#333333' }
  ]

  it('moves before and after a target', () => {
    expect(reorderGroups(list, 'c', 'a', false).map((g) => g.id)).toEqual(['c', 'a', 'b'])
    expect(reorderGroups(list, 'a', 'c', true).map((g) => g.id)).toEqual(['b', 'c', 'a'])
  })

  it('leaves the list alone for an unknown id', () => {
    expect(reorderGroups(list, 'zz', 'a', false)).toBe(list)
    expect(reorderGroups(list, 'a', 'zz', false)).toBe(list)
  })
})

describe('central group persistence', () => {

  it('accepts only existing shared groups from write commands', async () => {
    const mock = createMockValleyApi({
      manifest: { id: 'todo' },
      groups: [{ id: 'fungi', name: 'Fungi', aliases: ['Mycology'], color: 'palette:green' }],
      datasets: {
        'todo.tasks': [], 'todo.task_tags': [], 'todo.task_links': [], 'todo.task_attachments': [],
        'todo.focus_sessions': [], 'todo.status_history': []
      }
    })
    initRuntime(mock.api)
    registerTodoCommands(mock.api)

    const accepted = await mock.api.commands.execute('todo:add', { title: 'Survey', group: 'mycology' })
    expect(accepted).toMatchObject({ ok: true, value: { group: 'Fungi' } })
    const refused = await mock.api.commands.execute('todo:add', { title: 'Survey', group: 'Unknown' })
    expect(refused).toMatchObject({ ok: false, error: { message: expect.stringContaining('Settings → Appearance → Groups') } })
  })
})

describe('explicit task field commands', () => {
  const commandMock = () => {
    const mock = createMockValleyApi({ manifest: { id: 'todo', noteDocuments: CONFIG.noteDocuments }, datasets: { 'todo.tasks': [
      { id: 'parent', title: 'Parent', updatedAt: 'revision-1' },
      { id: 'child', title: 'Child', parentId: 'parent', updatedAt: 'revision-1' }
    ] } })
    initRuntime(mock.api)
    registerTodoCommands(mock.api)
    return mock
  }

  it('updates supported schedule and attention fields with one undo record', async () => {
    const mock = commandMock()
    const result = await mock.api.commands.execute('todo:edit-fields', { id: 'child', values: { flagged: true, remindAt: '2026-09-01T09:00', estimatedMinutes: 20, tags: ['field'] }, expectedUpdatedAt: 'revision-1' })
    expect(result.ok).toBe(true)
    expect(mock.datasets.get('todo.tasks')?.find((record) => record.id === 'child')).toMatchObject({ flagged: true, remindAt: '2026-09-01T09:00', estimatedMinutes: 20 })
    expect(mock.busUndo).toHaveLength(1)
  })

  it('refuses missing targets, stale revisions, cycles and unsafe links', async () => {
    const mock = commandMock()
    for (const input of [
      { id: 'missing', values: { title: 'Lost' } },
      { id: 'parent', values: { parentId: 'child' } },
      { id: 'child', values: { title: 'New' }, expectedUpdatedAt: 'stale' },
      { id: 'child', values: { urls: ['javascript:alert(1)'] } }
    ]) expect((await mock.api.commands.execute('todo:edit-fields', input)).ok).toBe(false)
    expect(mock.datasets.get('todo.tasks')?.find((record) => record.id === 'parent')).toMatchObject({ title: 'Parent' })
    expect(mock.busUndo).toHaveLength(0)
  })
})
