import type { ReactElement } from 'react'
import { React, api } from '../../runtime'

/** A setting read through `read`, re-read whenever the plugin's settings change. */
export function useSetting<T>(read: () => T): [T, (next: T) => void] {
  const [value, setValue] = React.useState<T>(read)
  React.useEffect(() => api.settings.subscribe(() => setValue(read())), [read])
  return [value, setValue]
}

/**
 * A text field drawn in the plugin's own document, with the shared Settings
 * control styling. The host TextField is controlled across the frame bridge, so
 * fast typing drops characters whenever an older value comes back after newer
 * keystrokes. This one is uncontrolled: it reports each keystroke to `onType`
 * and the final text to `onCommit` on Enter or blur; Escape restores `initial`.
 */
export function CommitTextField({ initial, onCommit, onType, onEnter, placeholder, ariaLabel, disabled, className = 'todo-settings-text', invalid }: {
  initial: string
  onCommit: (value: string) => void
  onType?: (value: string) => void
  /** Runs after the Enter commit, for a field that submits a row. */
  onEnter?: () => void
  placeholder?: string
  ariaLabel: string
  disabled?: boolean
  className?: string
  invalid?: boolean
}): ReactElement {
  const skip = React.useRef(false)
  return (
    <input
      className={`settings-control ${className}${invalid ? ' invalid' : ''}`}
      aria-invalid={invalid || undefined}
      type="text"
      defaultValue={initial}
      placeholder={placeholder}
      aria-label={ariaLabel}
      disabled={disabled}
      autoComplete="off"
      spellCheck={false}
      onChange={(event) => onType?.(event.currentTarget.value)}
      onBlur={(event) => {
        if (skip.current) { skip.current = false; return }
        onCommit(event.currentTarget.value)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          if (onEnter) { onCommit(event.currentTarget.value); onEnter(); return }
          event.currentTarget.blur()
        } else if (event.key === 'Escape') {
          event.preventDefault()
          event.currentTarget.value = initial
          onType?.(initial)
          skip.current = true
          event.currentTarget.blur()
        }
      }}
    />
  )
}
