import { describe, expect, it } from 'vitest'
import { installTodoNotes } from './mockTodoNotes'
import { registerTodoCommands } from '../src/commands'

const ARGV_CASES: { args: string[]; flags: Record<string, string | boolean> }[] = [
  { args: [], flags: {} },
  { args: ['one two three'], flags: {} },
  { args: ['a', 'b', 'c'], flags: {} },
  { args: [''], flags: {} },
  { args: ['x'], flags: { exact: true, count: '3', q: 'hello world', unknown: 'y', neg: '-1' } },
  { args: ['--'], flags: { verbose: true } }
]

describe('command CLI mappings', () => {
  it('handles canonical argv shapes', () => {
    const { mock } = installTodoNotes([])
    registerTodoCommands(mock.api)
    const swept: string[] = []
    for (const entry of mock.commands) {
      const fromCli = entry.input?.fromCli
      if (!fromCli) continue
      swept.push(entry.id)
      for (const c of ARGV_CASES) {
        let raw: unknown
        expect(() => {
          raw = fromCli(c.args, c.flags)
        }, `${entry.id} fromCli(${JSON.stringify(c)}) must not throw`).not.toThrow()
        try {
          entry.input!.parse(raw)
        } catch (err) {
          expect(err, `${entry.id} parse must throw a clean Error`).toBeInstanceOf(Error)
        }
      }
    }
    expect(swept.length).toBeGreaterThan(0)
  })

  it('maps the todo --note flag to the canonical note field', () => {
    const { mock } = installTodoNotes([])
    registerTodoCommands(mock.api)
    const add = mock.commands.find((command) => command.id === 'add')
    const raw = add?.input?.fromCli?.(['Record moss growth'], { note: 'Survey the forest floor' })
    expect(raw).toEqual({
      title: 'Record moss growth',
      due: undefined,
      priority: undefined,
      status: undefined,
      note: 'Survey the forest floor'
    })
    expect(add?.input?.parse(raw)).toMatchObject({ note: 'Survey the forest floor' })
  })
})
