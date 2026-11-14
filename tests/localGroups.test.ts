import { describe, expect, it } from 'vitest'
import { mergedGroups, normalizeLocalGroups, renameLocalGroup } from '../src/model/localGroups'
import { groupKeysCovered, isSubgroupName, setGroupFamilySource } from '../src/model/groups'
import { countForGroup, groupCounts, matchesViewScope } from '../src/model/views'
import type { TodoRecord } from '../src/types'

const shared = [
  { id: 'copper-finch', name: 'Copper Finch', color: 'palette:teal' },
  { id: 'glass-harbor', name: 'Glass Harbor', color: 'palette:blue', aliases: ['Old Harbor'] }
]

describe('individual To-Do groups', () => {
  it('drops invalid entries, names a shared group already uses and a parent that is no individual group', () => {
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

  it('keeps one level of subgroups, each directly after its group', () => {
    const local = normalizeLocalGroups([
      { id: 'local-b1', name: 'Analysis', color: 'palette:blue', parent: 'local-a1' },
      { id: 'local-c1', name: 'Garden', color: 'palette:green' },
      { id: 'local-a1', name: 'Uni', color: 'palette:red' },
      { id: 'local-b2', name: 'Series', color: 'palette:teal', parent: 'local-b1' }
    ], shared)
    expect(local.map((group) => [group.name, group.parent ?? null])).toEqual([['Garden', null], ['Uni', null], ['Analysis', 'local-a1'], ['Series', null]])
    const merged = mergedGroups(shared, local)
    expect(merged.find((group) => group.name === 'Analysis')?.parent).toBe('local-a1')
    expect(isSubgroupName('analysis', merged)).toBe(true)
    expect(isSubgroupName('Uni', merged)).toBe(false)
  })

  it('lets a group cover its subgroups in a list, a filter and a count', () => {
    const groups = [
      { id: 'local-a1', name: 'Uni', color: 'palette:red' },
      { id: 'local-b1', name: 'Analysis', color: 'palette:blue', parent: 'local-a1', aliases: ['Calculus'] },
      { id: 'local-c1', name: 'Garden', color: 'palette:green' }
    ]
    setGroupFamilySource(() => groups)
    try {
      expect([...groupKeysCovered('UNI')]).toEqual(['uni', 'analysis', 'calculus'])
      expect([...groupKeysCovered('Analysis')]).toEqual(['analysis'])
      const todo = (group?: string, completed = false): TodoRecord => ({ id: group ?? 'none', title: 'Task', completed, group } as TodoRecord)
      const todos = [todo('Uni'), todo('Analysis'), todo('calculus'), todo('Garden'), todo('Analysis', true), todo()]
      expect(todos.filter((entry) => matchesViewScope(entry, { kind: 'groups', names: ['Uni'] })).map((entry) => entry.group)).toEqual(['Uni', 'Analysis', 'calculus', 'Analysis'])
      expect(todos.filter((entry) => matchesViewScope(entry, { kind: 'groups', names: ['Analysis'] }))).toHaveLength(2)
      const counts = groupCounts(todos)
      expect(countForGroup(counts, 'Uni')).toBe(3)
      expect(countForGroup(counts, 'Analysis')).toBe(1)
      expect(countForGroup(counts, 'Garden')).toBe(1)
    } finally {
      setGroupFamilySource(() => [])
    }
  })
})
