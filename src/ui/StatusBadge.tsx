import { React } from '../runtime'
import type { ReactElement } from 'react'
import type { TodoStatus } from '../types'
import { TodoStatusGlyph } from './icons'
import { statusDef, useStatusStyle, type StatusStyle } from '../state/statusStore'
import { todoStatusLabel } from '../localization'

/**
 * A status as words. Filled draws a pill in the status colour with the label
 * colour chosen in Settings (the stylesheet from `startStatusVocabulary` sets
 * both); Text keeps the coloured glyph and label without a box.
 */
function StatusBadgeView({ status, style }: { status: TodoStatus; style: StatusStyle }): ReactElement {
  const def = statusDef(status)
  if (style === 'filled') {
    return <span className="todo-status-pill" data-status={status}>{todoStatusLabel(status)}</span>
  }
  return (
    <span className={`todo-status-text ${def.cls}`}>
      <TodoStatusGlyph status={status === 'open' ? null : status} dotCls={def.cls} />
      {todoStatusLabel(status)}
    </span>
  )
}

export function StatusBadge({ status }: { status: TodoStatus }): ReactElement {
  return <StatusBadgeView status={status} style={useStatusStyle()} />
}
