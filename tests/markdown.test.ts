import { describe, it, expect, vi } from 'vitest'
import { createMockValleyApi } from '@valley/plugin-testkit'
import { initRuntime } from '../src/runtime'
import { renderInlineMarkdown } from '../src/markdown'
import CONFIG from '../config.json'

describe('shared To-Do Markdown documents', () => {
  it('delegates inline title formatting to the host Markdown renderer', async () => {
    const mock = createMockValleyApi({ manifest: { id: 'todo' } })
    const render = vi.fn(async () => '<strong>Fungi</strong>')
    mock.api.markdown.render = render
    initRuntime(mock.api)
    expect(await renderInlineMarkdown('**Fungi**')).toBe('<strong>Fungi</strong>')
    expect(render).toHaveBeenCalledTimes(1)
    expect(render).toHaveBeenCalledWith('**Fungi**', { inline: true })
  })

  it('declares canonical task bodies and tag relations without duplicate storage', () => {
    expect(CONFIG.noteDocuments).toEqual([expect.objectContaining({
      id: 'tasks', dataset: 'tasks', idColumn: 'id', titleColumn: 'title', bodyColumn: 'note',
      tags: { dataset: 'task_tags', itemIdColumn: 'taskId', valueColumn: 'tag' },
      sourcePathColumn: 'filePath', updatedAtColumn: 'updatedAt',
      searchSourceId: 'todo', navigation: { command: 'todo:open', itemIdArg: 'id' }
    })])
  })
})
