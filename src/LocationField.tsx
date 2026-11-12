import { React, api } from './runtime'
import type { ReactElement } from 'react'
import type { TodoRecord } from './types'
import type { ResourceSearchResult } from '@valley/plugin-sdk/types'
import { MapPin, Navigation, Search, X } from './icons'
import { uiText } from './localization'

type Location = NonNullable<TodoRecord['location']>

/** Open the map at a place. Coordinates when we have them, the label otherwise. */
export function openLocation(location: Location): void {
  const query =
    location.lng !== undefined && location.lat !== undefined
      ? `${location.lat},${location.lng}`
      : location.name
  void api.links.open({ category: 'location', value: query })
}

/**
 * Where a task happens.
 *
 * Typing asks the place search (the Map plugin's provider, through
 * `api.resources.search`) and lists real places; picking one stores its
 * coordinates with the label, so the row's ➤ opens the map at the pin rather
 * than re-running a text search. Enter or leaving the field without a pick
 * keeps the typed label alone — the field stays usable with Map disabled.
 *
 * The input lives in the plugin's own document and is uncontrolled: the host
 * ResourcePicker round-trips every keystroke across the frame bridge, which
 * jumped the caret and scrambled fast typing.
 */
export const LocationField = ({
  value,
  onChange,
  disabled = false
}: {
  disabled?: boolean
  value: Location | undefined
  onChange: (next: Location | undefined) => void
}): ReactElement => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [hits, setHits] = React.useState<ResourceSearchResult[]>([])
  const [state, setState] = React.useState<'idle' | 'searching' | 'done' | 'failed'>('idle')
  const [active, setActive] = React.useState(-1)
  const [open, setOpen] = React.useState(false)
  const timer = React.useRef<number | null>(null)
  const token = React.useRef(0)
  const picked = React.useRef(false)

  React.useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) inputRef.current.value = value?.name ?? ''
  }, [value?.name])
  React.useEffect(() => () => { if (timer.current !== null) window.clearTimeout(timer.current) }, [])

  const search = (query: string): void => {
    if (timer.current !== null) window.clearTimeout(timer.current)
    const mine = ++token.current
    if (query.trim().length < 2) { setHits([]); setState('idle'); setOpen(false); return }
    setOpen(true)
    setState('searching')
    // A short pause so a typed word costs one request, not one per letter.
    timer.current = window.setTimeout(() => {
      void api.resources.search({ query: query.trim(), kinds: ['place'], limit: 8 }).then((results) => {
        if (mine !== token.current) return
        setHits(results)
        setActive(results.length ? 0 : -1)
        setState('done')
      }, () => {
        if (mine !== token.current) return
        setHits([])
        setActive(-1)
        setState('failed')
      })
    }, 250)
  }

  const pick = (hit: ResourceSearchResult): void => {
    const longitude = Number(hit.metadata?.longitude)
    const latitude = Number(hit.metadata?.latitude)
    const name = (hit.value ?? hit.label).trim()
    picked.current = true
    token.current++
    if (inputRef.current) inputRef.current.value = name
    setOpen(false)
    setHits([])
    onChange({ name, ...(Number.isFinite(longitude) && Number.isFinite(latitude) ? { lng: longitude, lat: latitude } : {}) })
  }

  /** Keep a typed label that matches no pick; an unchanged label keeps its coordinates. */
  const commitTyped = (): void => {
    const name = inputRef.current?.value.trim() ?? ''
    token.current++
    setOpen(false)
    if (picked.current) { picked.current = false; return }
    if (name === (value?.name ?? '')) return
    onChange(name ? { name } : undefined)
  }

  return (
    <div className="todo-location">
      <div className="todo-location-row">
        <div className="todo-location-field">
          <Search className="todo-location-field-icon" />
          <input
            ref={inputRef}
            className="todo-location-field-input"
            type="text"
            defaultValue={value?.name ?? ''}
            placeholder={uiText('todo.locationPlaceholder')}
            aria-label={uiText('todo.location')}
            aria-autocomplete="list"
            aria-expanded={open}
            disabled={disabled}
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => { picked.current = false; search(event.currentTarget.value) }}
            onFocus={(event) => { if (event.currentTarget.value.trim().length >= 2 && hits.length) setOpen(true) }}
            onBlur={commitTyped}
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing) return
              if (event.key === 'ArrowDown' && hits.length) {
                event.preventDefault()
                setOpen(true)
                setActive((index) => (index + 1) % hits.length)
              } else if (event.key === 'ArrowUp' && hits.length) {
                event.preventDefault()
                setActive((index) => (index <= 0 ? hits.length - 1 : index - 1))
              } else if (event.key === 'Enter') {
                event.preventDefault()
                if (open && hits[active]) pick(hits[active])
                else commitTyped()
              } else if (event.key === 'Escape' && open) {
                event.preventDefault()
                event.stopPropagation()
                token.current++
                setOpen(false)
              }
            }}
          />
        </div>
        {value && (
          <>
            <button
              className="todo-menu-btn"
              disabled={disabled}
              type="button"
              title={uiText('todo.openLocation')}
              aria-label={uiText('todo.openLocationOf', { p0: value.name })}
              onClick={() => openLocation(value)}
            >
              <Navigation />
            </button>
            <button
              className="todo-menu-btn"
              disabled={disabled}
              type="button"
              title={uiText('todo.removeLocation')}
              aria-label={uiText('todo.removeLocation')}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                token.current++
                if (inputRef.current) inputRef.current.value = ''
                setHits([])
                setOpen(false)
                onChange(undefined)
              }}
            >
              <X />
            </button>
          </>
        )}
      </div>
      {open && (
        <ul className="todo-location-hits" role="listbox" aria-label={uiText('todo.location')}>
          {state === 'searching' && !hits.length && <li className="todo-location-status">{uiText('todo.location.searching')}</li>}
          {state === 'done' && !hits.length && <li className="todo-location-status">{uiText('todo.location.noResults')}</li>}
          {state === 'failed' && <li className="todo-location-status">{uiText('todo.location.failed')}</li>}
          {hits.map((hit, index) => (
            <li key={hit.id} role="option" aria-selected={index === active}>
              <button
                type="button"
                className={'todo-location-hit' + (index === active ? ' is-active' : '')}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActive(index)}
                onClick={() => pick(hit)}
              >
                <span className="todo-location-hit-name"><MapPin />{hit.label}</span>
                {hit.description && <span className="todo-location-hit-context">{hit.description}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
