import { React, api } from './runtime'
import type { ReactElement } from 'react'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import { Navigation, X } from './icons'
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
 * Typing queries the Map plugin's geocoder through `geo.search` and offers real
 * places; picking one stores its coordinates alongside the label, which is what
 * lets the row's ➤ open the map *at the pin* rather than re-running a text
 * search. Committing without picking stores the label alone — the field stays
 * fully usable when the Map plugin is disabled and there is no geocoder at all,
 * which is exactly why the contract is declared optional.
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
  const ResourcePicker = api.ui.ResourcePicker

  return (
    <div className="todo-location">
      <div className="todo-location-row">
        <div className="todo-location-input-slot"><ResourcePicker
          className="todo-location-input"
          disabled={disabled}
          value={value?.name ?? ''}
          placeholder={uiText('todo.locationPlaceholder')}
          ariaLabel={uiText('todo.location')}
          kinds={['place']}
          allowCustom
          onChange={(name, result) => {
            const longitude = Number(result?.metadata?.longitude)
            const latitude = Number(result?.metadata?.latitude)
            onChange(name ? {
              name,
              ...(Number.isFinite(longitude) && Number.isFinite(latitude) ? { lng: longitude, lat: latitude } : {})
            } : undefined)
          }}
        /></div>
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
              onClick={() => {
                onChange(undefined)
              }}
            >
              <X />
            </button>
          </>
        )}
      </div>

    </div>
  )
}
