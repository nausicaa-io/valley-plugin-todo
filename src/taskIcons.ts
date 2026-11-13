import { React, api } from './runtime'

/** To-Do's own status icon folder; add an SVG there to offer it. */
export const TASK_ICON_FOLDER = '.valley/assets/icons/todo-icon'

const ELEMENTS = new Set(['svg', 'g', 'path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon'])
const ATTRIBUTES = new Set(['xmlns', 'viewBox', 'd', 'x', 'y', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry', 'points', 'fill', 'fill-rule', 'clip-rule', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-opacity', 'opacity', 'transform'])

/** Only drawing elements and attributes survive; the result scales to its box and follows `currentColor`. */
export function sanitizeTaskIcon(source: string): string | null {
  if (source.length > 64_000 || /<!DOCTYPE|<!ENTITY/i.test(source)) return null
  const document = new DOMParser().parseFromString(source, 'image/svg+xml')
  const root = document.documentElement
  if (root.localName !== 'svg' || document.querySelector('parsererror')) return null
  for (const node of [root, ...root.querySelectorAll('*')]) {
    if (!ELEMENTS.has(node.tagName)) { node.remove(); continue }
    for (const attribute of [...node.attributes]) {
      if (!ATTRIBUTES.has(attribute.name) || /url\s*\(|javascript:|expression\s*\(/i.test(attribute.value)) node.removeAttribute(attribute.name)
    }
  }
  if (!root.querySelector('path,circle,ellipse,rect,line,polyline,polygon')) return null
  root.setAttribute('width', '100%')
  root.setAttribute('height', '100%')
  return new XMLSerializer().serializeToString(root)
}

/**
 * Draws a symbol the way the built-in status glyphs are drawn: a disc in the
 * status colour (`currentColor`) with the symbol cut out of it. The symbol is
 * scaled into the disc through a mask, so it shows whatever surface is behind.
 */
export function statusDiscIcon(name: string, svg: string): string {
  const document = new DOMParser().parseFromString(svg, 'image/svg+xml')
  const root = document.documentElement
  for (const node of root.querySelectorAll('*')) {
    for (const attribute of ['stroke', 'fill']) {
      const value = node.getAttribute(attribute)
      if (value && value !== 'none') node.setAttribute(attribute, '#000')
    }
  }
  const fill = root.getAttribute('fill') === 'none' ? 'none' : '#000'
  const inner = [...root.childNodes].map((node) => new XMLSerializer().serializeToString(node)).join('')
  const id = `todo-icon-${name.toLowerCase().replace(/[^a-z0-9-]/g, '-')}`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><g transform="translate(12 12) scale(0.56) translate(-12 -12)" fill="${fill}" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${inner}</g></mask></defs><circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#${id})"/></svg>`
}

interface Registry { icons: Record<string, string>; revision: number; listeners: Set<() => void>; pending: Promise<void> | null; loaded?: boolean }

function registry(): Registry {
  return api.runtime.getOrCreate('todo.taskIcons', () => ({ icons: {}, revision: 0, listeners: new Set<() => void>(), pending: null }) as Registry)
}

export function refreshTaskIcons(): Promise<void> {
  const current = registry()
  if (current.pending) return current.pending
  current.pending = api.backend.call<{ icons: Record<string, string> }>('taskIcons', {}).then((result) => {
    const icons: Record<string, string> = {}
    for (const [name, source] of Object.entries(result?.icons ?? {})) {
      const svg = sanitizeTaskIcon(source)
      if (svg) icons[name] = statusDiscIcon(name, svg)
    }
    current.icons = icons
    current.loaded = true
    current.revision += 1
    current.listeners.forEach((listener) => listener())
  }).catch(() => {}).finally(() => { current.pending = null })
  return current.pending
}

/** Bumped whenever the icon folder is read again; memoised rows compare it. */
export function taskIconRevision(): number {
  return registry().revision
}

export function taskIconSvg(name: string | undefined): string | undefined {
  return name ? registry().icons[name] : undefined
}

export function useTaskIcons(): Record<string, string> {
  const current = registry()
  // Settings and other surfaces run in their own document, where startTaskIcons never ran.
  React.useEffect(() => { if (!current.loaded) void refreshTaskIcons() }, [current])
  React.useSyncExternalStore(
    React.useCallback((listener: () => void) => { current.listeners.add(listener); return () => { current.listeners.delete(listener) } }, [current]),
    () => current.revision
  )
  return current.icons
}

/** Load the icons now and again whenever a file in the folder changes. */
export function startTaskIcons(): () => void {
  void refreshTaskIcons()
  let timer: number | undefined
  const off = api.realm.onChanged((info) => {
    if (!info.full && !info.changes.some((change) => change.relPath.startsWith(`${TASK_ICON_FOLDER}/`))) return
    window.clearTimeout(timer)
    timer = window.setTimeout(() => { void refreshTaskIcons() }, 150)
  })
  return () => { window.clearTimeout(timer); off() }
}
