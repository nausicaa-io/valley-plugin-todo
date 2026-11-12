import { React } from './runtime'
import type { ReactElement } from 'react'
import { X } from './icons'
import { uiText } from './localization'

/**
 * Tags as one field: chips flow inline before the input. Enter, comma or space
 * adds what is typed; Backspace in an empty input removes the last tag. The
 * input lives in the plugin document, so typing never races the frame bridge.
 */
export function TagChipsField({ value, onChange, autoFocus = false, disabled = false, bare = false }: {
  value: readonly string[]
  onChange: (next: string[]) => void
  autoFocus?: boolean
  disabled?: boolean
  /** No frame: chips and the input sit directly on the surface (the edit sheet). */
  bare?: boolean
}): ReactElement {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const add = (raw: string): boolean => {
    const additions = raw.split(/[\s,]+/).map((tag) => tag.trim().replace(/^#+/, '')).filter(Boolean)
    const next = [...value]
    for (const tag of additions) if (!next.some((existing) => existing.toLowerCase() === tag.toLowerCase())) next.push(tag)
    if (next.length === value.length) return false
    onChange(next)
    return true
  }
  React.useEffect(() => { if (autoFocus) inputRef.current?.focus() }, [autoFocus])
  return (
    <div className={`todo-tags-input${bare ? ' is-bare' : ''}`} onMouseDown={(event) => { if (event.target === event.currentTarget) { event.preventDefault(); inputRef.current?.focus() } }}>
      {value.map((tag) => (
        <span key={tag} className="todo-tags-chip">
          <span>#{tag}</span>
          <button
            type="button"
            className="todo-tags-chip-remove"
            disabled={disabled}
            aria-label={uiText('todo.compose.removeTag', { tag })}
            title={uiText('todo.compose.removeTag', { tag })}
            onClick={() => { onChange(value.filter((candidate) => candidate !== tag)); inputRef.current?.focus() }}
          >
            <X />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        className="todo-tags-field"
        type="text"
        disabled={disabled}
        placeholder={value.length ? '' : uiText('todo.compose.addTags')}
        aria-label={uiText('todo.edit.tags')}
        autoComplete="off"
        spellCheck={false}
        onKeyDown={(event) => {
          const input = event.currentTarget
          if (event.nativeEvent.isComposing) return
          if (event.key === 'Enter' || event.key === ',' || (event.key === ' ' && input.value.trim())) {
            event.preventDefault()
            if (add(input.value)) input.value = ''
          } else if (event.key === 'Backspace' && !input.value && value.length) {
            event.preventDefault()
            onChange(value.slice(0, -1))
          }
        }}
        onBlur={(event) => { if (add(event.currentTarget.value)) event.currentTarget.value = '' }}
        onPaste={(event) => {
          const text = event.clipboardData.getData('text/plain')
          if (!/[\s,]/.test(text.trim())) return
          event.preventDefault()
          add(event.currentTarget.value + text)
          event.currentTarget.value = ''
        }}
      />
    </div>
  )
}
