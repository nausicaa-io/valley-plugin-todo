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
      if (svg) icons[name] = svg
    }
    current.icons = icons
    current.loaded = true
    current.revision += 1
    current.listeners.forEach((listener) => listener())
  }).catch(() => {}).finally(() => { current.pending = null })
  return current.pending
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
