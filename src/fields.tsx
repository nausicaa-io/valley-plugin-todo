import { React, api } from './runtime'
import type { ReactElement } from 'react'
import { uiText } from './localization'

// ── FilePathInput ─────────────────────────────────────────────────────────────
// Linked-file picker shared by the Todo inline editor and the calendar quick-add.
// Search and ranking are owned by the host resource API.

export function FilePathInput({
  value,
  onChange,
  disabled
}: {
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}): ReactElement {
  const ResourcePicker = api.ui.ResourcePicker
  return <ResourcePicker value={value} onChange={onChange} kinds={['attachment']} placeholder={uiText('auto.e7de9576dc00')} disabled={disabled} ariaLabel={uiText('auto.8410192cbb1f')} allowCustom={false} />
}
