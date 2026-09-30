import { parseLinkUrl } from '@valley/plugin-sdk/linkTargets'
import { React, api } from './runtime'
import type { MouseEvent, ReactElement } from 'react'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import type { TodoListController } from './controller'
import { assetUrlForRelPath, classifyFilePath } from '@valley/plugin-sdk/fileTypes'

export function renderInlineMarkdown(value: string): Promise<string> {
  return api.markdown.render(value, { inline: true })
}

export function TodoNotePreview({ todo, c }: { todo: TodoRecord; c: TodoListController }): ReactElement {
  const [rendered, setRendered] = React.useState({ source: '', html: '' })
  const root = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    let active = true
    void api.markdown.render(todo.note).then((html) => {
      if (active) setRendered({ source: todo.note, html })
    }).catch(() => { if (active) setRendered({ source: '', html: '' }) })
    return () => { active = false }
  }, [todo.note])
  React.useEffect(() => {
    root.current?.querySelectorAll<HTMLImageElement>('img.md-embed[data-embed], img.md-asset[data-src]').forEach(img => {
      const reference = img.dataset.embed ?? img.dataset.src ?? ''
      const path = api.workspace.resolveWikilink(reference)
      if (path && classifyFilePath(path) === 'image') {
        img.src = assetUrlForRelPath(path)
        img.loading = 'lazy'
      } else {
        const link = img.ownerDocument.createElement('a')
        link.dataset.wikilink = reference
        link.textContent = img.alt || reference
        link.href = '#'
        img.replaceWith(link)
      }
    })
  }, [rendered])

  const onClick = (event: MouseEvent<HTMLDivElement>): void => {
    const target = event.target as Element
    const checkbox = target.closest<HTMLInputElement>('input.md-task-checkbox')
    if (checkbox) {
      event.stopPropagation()
      const lines = todo.note.split('\n')
      const index = Number(checkbox.dataset.taskLine)
      if (!Number.isInteger(index) || !lines[index] || c.pendingIds.has(todo.id)) { event.preventDefault(); return }
      const checked = checkbox.checked
      lines[index] = lines[index].replace(/^(\s*(?:[-*+]|\d+[.)])\s+\[)[^\]](\])/, `$1${checkbox.checked ? 'x' : ' '}$2`)
      void c.patchTodo(todo.id, { note: lines.join('\n') }).then(saved => {
        if (!saved && checkbox.isConnected) checkbox.checked = !checked
      })
      return
    }
    const link = target.closest<HTMLAnchorElement>('a')
    if (!link) return
    event.preventDefault()
    event.stopPropagation()
    const ref = link.dataset.wikilink
    const href = link.getAttribute('href') ?? ''
    if (ref) {
      const path = api.workspace.resolveWikilink(ref)
      if (path) api.workspace.openFile(path, undefined, { newTab: api.ui.hasModKey(event) })
    } else if (parseLinkUrl(href)) {
      void api.links.open(href)
    } else if (href && !/^[a-z][a-z\d+.-]*:/i.test(href) && !href.startsWith('#')) {
      const path = api.workspace.resolveWikilink(href)
      if (path) api.workspace.openFile(path, undefined, { newTab: api.ui.hasModKey(event) })
    }
  }

  return React.createElement('div', {
    ref: root,
    className: 'todo-notes',
    onClick,
    ...(rendered.source === todo.note
      ? { dangerouslySetInnerHTML: { __html: rendered.html } }
      : { children: todo.note })
  })
}
