import { React, api } from '../runtime'
import type { ReactElement } from 'react'
import type { ResourceSearchResult } from '@valley/plugin-sdk/types'
import { classifyFilePath } from '@valley/plugin-sdk/fileTypes'
import { AudioGlyph, FileGlyph, ImageGlyph, Search, VideoGlyph, X } from './icons'
import { uiText } from '../localization'

const GLYPHS: Record<string, (p: { className?: string }) => ReactElement> = { image: ImageGlyph, audio: AudioGlyph, video: VideoGlyph }

/**
 * Pick a realm file: a compact search field whose matches list directly under
 * it (name over its folder, with a file-type glyph) instead of a tall overlay.
 * The input lives in the plugin document, so fast typing is never scrambled.
 */
export function FileSearchField({ onPick, onCancel, placeholder, autoFocus = true }: {
  onPick: (path: string) => void
  onCancel?: () => void
  placeholder: string
  autoFocus?: boolean
}): ReactElement {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [hits, setHits] = React.useState<ResourceSearchResult[]>([])
  const [active, setActive] = React.useState(0)
  const [state, setState] = React.useState<'idle' | 'searching' | 'done'>('idle')
  const timer = React.useRef<number | null>(null)
  const token = React.useRef(0)
  React.useEffect(() => { if (autoFocus) inputRef.current?.focus() }, [autoFocus])
  React.useEffect(() => () => { if (timer.current !== null) window.clearTimeout(timer.current) }, [])

  const search = (query: string): void => {
    if (timer.current !== null) window.clearTimeout(timer.current)
    const mine = ++token.current
    if (!query.trim()) { setHits([]); setState('idle'); return }
    setState('searching')
    timer.current = window.setTimeout(() => {
      void api.resources.search({ query: query.trim(), kinds: ['attachment'], limit: 6 }).then((results) => {
        if (mine !== token.current) return
        setHits(results)
        setActive(0)
        setState('done')
      }, () => { if (mine === token.current) { setHits([]); setState('done') } })
    }, 150)
  }
  const pathOf = (hit: ResourceSearchResult): string => (hit.value ?? hit.id).trim()

  return (
    <div className="todo-file-search">
      <div className="todo-location-field">
        <Search className="todo-location-field-icon" />
        <input
          ref={inputRef}
          className="todo-location-field-input"
          type="text"
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => search(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return
            if (event.key === 'ArrowDown' && hits.length) { event.preventDefault(); setActive((index) => (index + 1) % hits.length) }
            else if (event.key === 'ArrowUp' && hits.length) { event.preventDefault(); setActive((index) => (index <= 0 ? hits.length - 1 : index - 1)) }
            else if (event.key === 'Enter') { event.preventDefault(); if (hits[active]) onPick(pathOf(hits[active])) }
            else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onCancel?.() }
          }}
        />
        {onCancel && (
          <button type="button" className="todo-file-search-cancel" aria-label={uiText('auto.77dfd2135f4d')} title={uiText('auto.77dfd2135f4d')} onClick={onCancel}>
            <X />
          </button>
        )}
      </div>
      {state !== 'idle' && (
        <ul className="todo-file-search-hits" role="listbox" aria-label={placeholder}>
          {state === 'searching' && !hits.length && <li className="todo-location-status">{uiText('todo.location.searching')}</li>}
          {state === 'done' && !hits.length && <li className="todo-location-status">{uiText('todo.file.noResults')}</li>}
          {hits.map((hit, index) => {
            const path = pathOf(hit)
            const Glyph = GLYPHS[classifyFilePath(path)] ?? FileGlyph
            const folder = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : ''
            return (
              <li key={hit.id} role="option" aria-selected={index === active}>
                <button
                  type="button"
                  className={'todo-file-search-hit' + (index === active ? ' is-active' : '')}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => onPick(path)}
                >
                  <Glyph className="todo-file-search-glyph" />
                  <span className="todo-file-search-text">
                    <span className="todo-file-search-name">{hit.label || path.split('/').pop()}</span>
                    {folder && <span className="todo-file-search-folder">{folder}</span>}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
