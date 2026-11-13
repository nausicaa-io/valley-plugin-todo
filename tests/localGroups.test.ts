import { describe, expect, it } from 'vitest'
import { mergedGroups, normalizeLocalGroups, renameLocalGroup } from '../src/model/localGroups'

const shared = [
  { id: 'copper-finch', name: 'Copper Finch', color: 'palette:teal' },
  { id: 'glass-harbor', name: 'Glass Harbor', color: 'palette:blue', aliases: ['Old Harbor'] }
]

describe('individual To-Do groups', () => {
  it('drops invalid entries, names a shared group already uses and any saved parent', () => {
    const local = normalizeLocalGroups([
      { id: 'local-a1', name: 'Groceries', color: 'palette:green', parent: 'nowhere' },
      { id: 'local-a2', name: 'copper finch', color: 'palette:red' },
      { id: 'local-a3', name: 'Old Harbor', color: 'palette:red' },
      { id: 'local-a4', name: 'Groceries', color: 'palette:red' },
      { id: 'bad', name: 'Bad id', color: 'palette:red' },
      { id: 'local-a5', name: 'Sprint backlog', color: 'palette:violet', parent: 'copper-finch' }
    ], shared)
    expect(local).toEqual([
      { id: 'local-a1', name: 'Groceries', color: 'palette:green' },
      { id: 'local-a5', name: 'Sprint backlog', color: 'palette:violet' }
    ])
  })

  it('keeps the old name as an alias on rename, so tasks that carry it still resolve', () => {
    const renamed = renameLocalGroup({ id: 'local-a1', name: 'Groceries', color: 'palette:green' }, 'Shopping')
    expect(renamed).toEqual({ id: 'local-a1', name: 'Shopping', color: 'palette:green', aliases: ['Groceries'] })
    expect(renameLocalGroup(renamed, 'Groceries')).toEqual({ id: 'local-a1', name: 'Groceries', color: 'palette:green', aliases: ['Shopping'] })
  })

  it('lists shared groups first, then the individual ones', () => {
    const merged = mergedGroups(shared, [{ id: 'local-a1', name: 'Groceries', color: 'palette:green' }])
    expect(merged.map((group) => group.name)).toEqual(['Copper Finch', 'Glass Harbor', 'Groceries'])
  })
})
