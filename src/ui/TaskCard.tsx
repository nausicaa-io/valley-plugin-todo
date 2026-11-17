import { React, api } from '../runtime'
import type { CSSProperties, ReactElement } from 'react'
import type { TodoRecord } from '../types'
import { getSharedTodos, onSharedTodos } from '../state/sharedTodos'
import { useHostState } from '../state/hooks'
import { formatDate, formatDueLabel, isoDay } from '../model/sort'
import { todoPriorityLabel, uiText } from '../localization'
import { Bell, Clock, Flag, Link, MapPin, Minus, Plus } from './icons'
import { StatusBadge } from './StatusBadge'
import { AttachmentCard } from './AttachmentCard'
import { GroupPill, PriorityIcon } from './table/cells'
import { parseAppOpenUrl } from '@valley/plugin-sdk/paths'
import { shortUrl } from './TodoDetail'
import { effectiveStatus, getStatusSettings, useStatusVocabulary } from '../state/statusStore'
import { useGroups } from '../state/groupStore'
import { openLocation } from './LocationField'
import { useSelectedTodoId } from './surfaces'

/** The right sidebar's Task tab: the task selected in the main table. */
export const TASK_SEGMENT_ID = 'todo.task'

/** Remix's checkbox-circle-fill; the host draws a data-URI icon as a mask in the tab's own colour. */
export const TASK_SEGMENT_ICON = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"/></svg>')}`

type Location = NonNullable<TodoRecord['location']>
interface Point { lat: number; lng: number }

const TILE = 256
const ZOOM = 15
const MIN_ZOOM = 2
const MAX_ZOOM = 19
const MAP_HEIGHT = 180
/** Half the widest sidebar the map has to cover, in px. */
const MAP_REACH = 330

interface MapCache { tiles: Map<string, Promise<string>>; places: Map<string, Promise<Point | null>> }

function mapCache(): MapCache {
  return api.runtime.getOrCreate('todo.taskMap', () => ({ tiles: new Map(), places: new Map() }))
}

/** One tile as a data URL, read once per runtime through the backend (the UI has no network of its own). */
function loadTile(z: number, x: number, y: number): Promise<string> {
  const { tiles } = mapCache()
  const key = `${z}/${x}/${y}`
  let tile = tiles.get(key)
  if (!tile) {
    tile = api.backend.call<string>('map.tile', { z, x, y }).then((base64) => `data:image/png;base64,${base64}`)
    tile.catch(() => { if (tiles.get(key) === tile) tiles.delete(key) })
    tiles.set(key, tile)
    // Oldest first out: a session of looking through tasks never keeps more than a few maps.
    if (tiles.size > 160) tiles.delete(tiles.keys().next().value as string)
  }
  return tile
}

/** Where a place without saved coordinates is: the place search's first hit for its name. */
function findPlace(name: string): Promise<Point | null> {
  const { places } = mapCache()
  let place = places.get(name)
  if (!place) {
    place = api.resources.search({ query: name, kinds: ['place'], limit: 1 }).then((hits) => {
      const lng = Number(hits[0]?.metadata?.longitude)
      const lat = Number(hits[0]?.metadata?.latitude)
      return Number.isFinite(lng) && Number.isFinite(lat) ? { lat, lng } : null
    }, () => null)
    places.set(name, place)
  }
  return place
}

/** Web Mercator: a position as pixels on the world map at one zoom. */
export function projectPoint({ lat, lng }: Point, zoom: number): { x: number; y: number } {
  const size = TILE * 2 ** zoom
  const clamped = Math.max(-85.0511, Math.min(85.0511, lat)) * Math.PI / 180
  return {
    x: (lng + 180) / 360 * size,
    y: (1 - Math.log(Math.tan(clamped) + 1 / Math.cos(clamped)) / Math.PI) / 2 * size
  }
}

/** Valley's appearance as the host sets it on a surface document. */
function isDark(doc: Document): boolean {
  const root = doc.documentElement
  const scheme = root.style.colorScheme.trim() || root.getAttribute('data-theme') || ''
  if (scheme === 'dark' || scheme === 'light') return scheme === 'dark'
  return doc.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches === true
}

function Tile({ z, x, y, style }: { z: number; x: number; y: number; style: CSSProperties }): ReactElement | null {
  const [src, setSrc] = React.useState('')
  React.useEffect(() => {
    let active = true
    setSrc('')
    void loadTile(z, x, y).then((url) => { if (active) setSrc(url) }, () => {})
    return () => { active = false }
  }, [z, x, y])
  return src ? <img className="todo-task-map-tile" src={src} alt="" draggable={false} style={style} /> : null
}

interface MapView { zoom: number; x: number; y: number }

/** The view one zoom level in (1) or out (-1), keeping its middle where it is. */
function zoomView(view: MapView, step: 1 | -1): MapView {
  const zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, view.zoom + step))
  const scale = 2 ** (zoom - view.zoom)
  return { zoom, x: view.x * scale, y: view.y * scale }
}

/**
 * The place on the OpenStreetMap map, with its pin. Dragging moves the map,
 * + and − (and a trackpad pinch) zoom around its middle; the plain wheel is
 * left to the sidebar. Dark appearance dims the same tiles.
 */
function LocationMap({ location, point }: { location: Location; point: Point }): ReactElement {
  const ref = React.useRef<HTMLDivElement>(null)
  const [dark, setDark] = React.useState(() => isDark(document))
  const [view, setView] = React.useState<MapView>(() => ({ zoom: ZOOM, ...projectPoint(point, ZOOM) }))
  React.useEffect(() => setView({ zoom: ZOOM, ...projectPoint(point, ZOOM) }), [point.lat, point.lng]) // eslint-disable-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    const doc = ref.current?.ownerDocument
    if (!doc) return
    setDark(isDark(doc))
    const Observer = doc.defaultView?.MutationObserver ?? MutationObserver
    const observer = new Observer(() => setDark(isDark(doc)))
    observer.observe(doc.documentElement, { attributes: true, attributeFilter: ['style', 'data-theme'] })
    return () => observer.disconnect()
  }, [])
  // A pinch arrives as a wheel with Ctrl held; it needs a listener that may cancel the page zoom.
  React.useEffect(() => {
    const map = ref.current
    if (!map) return
    let pinched = 0
    const onWheel = (event: WheelEvent): void => {
      if (!event.ctrlKey) return
      event.preventDefault()
      pinched += event.deltaY
      if (Math.abs(pinched) < 12) return
      const step = pinched < 0 ? 1 : -1
      pinched = 0
      setView((current) => zoomView(current, step))
    }
    map.addEventListener('wheel', onWheel, { passive: false })
    return () => map.removeEventListener('wheel', onWheel)
  }, [])
  const drag = React.useRef<{ pointer: number; x: number; y: number } | null>(null)
  const [dragging, setDragging] = React.useState(false)
  const size = TILE * 2 ** view.zoom
  const count = 2 ** view.zoom
  const pin = projectPoint(point, view.zoom)
  const tiles: ReactElement[] = []
  for (let ty = Math.floor((view.y - MAP_HEIGHT / 2) / TILE); ty <= Math.floor((view.y + MAP_HEIGHT / 2) / TILE); ty++) {
    if (ty < 0 || ty >= count) continue
    for (let tx = Math.floor((view.x - MAP_REACH) / TILE); tx <= Math.floor((view.x + MAP_REACH) / TILE); tx++) {
      const x = ((tx % count) + count) % count
      tiles.push(<Tile key={`${view.zoom}/${tx}/${ty}`} z={view.zoom} x={x} y={ty} style={{ left: `calc(50% + ${Math.round(tx * TILE - view.x)}px)`, top: `calc(50% + ${Math.round(ty * TILE - view.y)}px)` }} />)
    }
  }
  return (
    <div
      ref={ref}
      className={`todo-task-map${dark ? ' is-dark' : ''}${dragging ? ' is-dragging' : ''}`}
      role="group"
      aria-label={uiText('todo.task.mapOf', { p0: location.name })}
      onPointerDown={(event) => {
        if (event.button !== 0 || (event.target as Element).closest('button')) return
        drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY }
        event.currentTarget.setPointerCapture?.(event.pointerId)
        setDragging(true)
      }}
      onPointerMove={(event) => {
        const from = drag.current
        if (!from || from.pointer !== event.pointerId) return
        const dx = event.clientX - from.x
        const dy = event.clientY - from.y
        drag.current = { ...from, x: event.clientX, y: event.clientY }
        setView((current) => ({ ...current, x: current.x - dx, y: Math.max(0, Math.min(size, current.y - dy)) }))
      }}
      onPointerUp={() => { drag.current = null; setDragging(false) }}
      onPointerCancel={() => { drag.current = null; setDragging(false) }}
    >
      {tiles}
      <span className="todo-task-map-pin" aria-hidden="true" style={{ left: `calc(50% + ${Math.round(pin.x - view.x)}px)`, top: `calc(50% + ${Math.round(pin.y - view.y)}px)` }}><MapPin /></span>
      <div className="todo-task-map-zoom">
        <button type="button" className="todo-task-map-zoom-btn" disabled={view.zoom >= MAX_ZOOM} title={uiText('todo.task.zoomIn')} aria-label={uiText('todo.task.zoomIn')} onClick={() => setView((current) => zoomView(current, 1))}><Plus /></button>
        <button type="button" className="todo-task-map-zoom-btn" disabled={view.zoom <= MIN_ZOOM} title={uiText('todo.task.zoomOut')} aria-label={uiText('todo.task.zoomOut')} onClick={() => setView((current) => zoomView(current, -1))}><Minus /></button>
      </div>
      <span className="todo-task-map-credit">{uiText('todo.task.mapCredit')}</span>
    </div>
  )
}

/** Where the task happens: the address, which opens the place in the map, and the map itself under it. */
function TaskLocation({ location }: { location: Location }): ReactElement {
  const saved = location.lat !== undefined && location.lng !== undefined ? { lat: location.lat, lng: location.lng } : null
  const [found, setFound] = React.useState<Point | null>(null)
  React.useEffect(() => {
    setFound(null)
    if (saved) return
    let active = true
    void findPlace(location.name).then((point) => { if (active) setFound(point) })
    return () => { active = false }
  }, [location.name, saved?.lat, saved?.lng]) // eslint-disable-line react-hooks/exhaustive-deps
  const point = saved ?? found
  return (
    <>
      <button type="button" className="todo-task-line todo-task-link" title={uiText('todo.openLocation')} aria-label={uiText('todo.openLocationOf', { p0: location.name })} onClick={() => openLocation({ ...location, ...(point ?? {}) })}>
        <MapPin /><span>{location.name}</span>
      </button>
      {point && <LocationMap location={location} point={point} />}
    </>
  )
}

/**
 * One task, read-only, top to bottom: title, when it is due, its note as
 * written, status, priority, flag and group, where it happens (address and
 * map), tags, links and, last, its files.
 */
export function TaskCard(): ReactElement {
  const id = useSelectedTodoId('main_workspace')
  const todos = React.useSyncExternalStore(onSharedTodos, getSharedTodos, getSharedTodos)
  const groups = useGroups()
  useStatusVocabulary()
  const { dateFormat } = useHostState('dateFormat')
  const todo = id ? todos.find((candidate) => candidate.id === id) : undefined
  if (!todo) return <div className="right-sidebar-empty"><p>{uiText('todo.task.empty')}</p></div>
  const status = effectiveStatus(todo)
  const day = todo.dueDate
    ? formatDueLabel(todo.dueDate, isoDay(new Date()), { today: uiText('todo.due.today'), tomorrow: uiText('todo.due.tomorrow'), yesterday: uiText('todo.due.yesterday') }, api.ui.language(), dateFormat)
    : ''
  const date = todo.dueDate ? formatDate(todo.dueDate, dateFormat) : ''
  const time = [todo.startTime, todo.endTime].filter(Boolean).join(' – ')
  const when = [day, day !== date ? date : '', time].filter(Boolean).join(' · ')
  const overdue = !!todo.dueDate && !todo.completed && todo.dueDate.slice(0, 10) < isoDay(new Date())
  const reminder = todo.remindAt && !todo.reminderFiredAt ? todo.remindAt.slice(11, 16) : ''
  const files = [todo.filePath, ...(todo.attachments ?? [])].filter((path): path is string => !!path)
  return (
    <div className="todo-properties-frame" data-plugin-widget-layout="fill"><api.ui.ScrollPanel fill>
      <div className="right-panel-body todo-task-card" data-todo-id={todo.id}>
        {/* Struck through exactly where the table strikes it: by the status's own setting. */}
        <h2 className={`todo-task-title${getStatusSettings().strikethrough[status] ? ' is-struck' : ''}`}>{todo.title}</h2>
        {when && <div className={`todo-task-line${overdue ? ' is-overdue' : ''}`}><Clock /><span>{when}</span></div>}
        {reminder && <div className="todo-task-line" title={uiText('todo.reminderSet')}><Bell /><span>{reminder}</span></div>}
        {todo.note?.trim() && <p className="todo-task-note">{todo.note.trim()}</p>}
        <div className="todo-task-facts">
          <StatusBadge status={status} />
          {todo.priority !== 'normal' && <span className="todo-task-fact"><PriorityIcon priority={todo.priority} />{todoPriorityLabel(todo.priority)}</span>}
          {todo.flagged && <span className="todo-task-fact todo-task-flag" role="img" title={uiText('todo.flagged')} aria-label={uiText('todo.flagged')}><Flag /></span>}
          {todo.group && <GroupPill name={todo.group} groups={groups} />}
        </div>
        {todo.location && <TaskLocation location={todo.location} />}
        {!!todo.tags?.length && <div className="todo-task-tags">{todo.tags.map((tag) => <span key={tag} className="todo-task-tag">#{tag}</span>)}</div>}
        {(todo.urls ?? []).map((url) => (
          <button
            key={url}
            type="button"
            className="todo-task-line todo-task-link"
            title={url}
            onClick={(event) => {
              const relPath = parseAppOpenUrl(url)
              if (relPath) api.workspace.openFile(relPath, undefined, { newTab: api.ui.hasModKey(event) })
              else void api.files.openExternalUrl(url)
            }}
          >
            <Link /><span>{shortUrl(url)}</span>
          </button>
        ))}
        {files.map((path) => <AttachmentCard key={path} relPath={path} />)}
      </div>
    </api.ui.ScrollPanel></div>
  )
}
