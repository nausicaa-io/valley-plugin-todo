import { ReminderDefaults } from './ReminderOffsets'
import type { ReactElement } from 'react'
import { React, api } from '../runtime'
import { uiText } from '../localization'
import {
  DATE_BREAKDOWN_SETTING_KEY,
  getDateBreakdown
} from '../state/viewStore'
import type { DateBreakdown } from '../model/sections'

import { SmartListsSettings } from './settings/SmartLists'
import { StatusesSettings } from './settings/Statuses'
import { GroupsSettings } from './settings/Groups'

function GeneralSettings(): ReactElement {
  const { Row, Section, SelectField } = api.ui.settings
  const [dateBreakdown, setDateBreakdown] = React.useState<DateBreakdown>(getDateBreakdown)
  return (
    <>
      <Section title={uiText('todo.settings.display')}>
        <Row title={uiText('todo.settings.dateBreakdown')} description={uiText('todo.settings.dateBreakdownDesc')}>
          <SelectField
            className="todo-date-breakdown-select"
            value={dateBreakdown}
            onChange={(value) => {
              const next = value as DateBreakdown
              setDateBreakdown(next)
              void api.settings.set(DATE_BREAKDOWN_SETTING_KEY, next)
            }}
            ariaLabel={uiText('todo.settings.dateBreakdown')}
            options={[
              { value: 'monthly', label: uiText('todo.breakdown.monthly') },
              { value: 'weekly', label: uiText('todo.breakdown.weekly') },
              { value: 'daily', label: uiText('todo.breakdown.daily') }
            ]}
          />
        </Row>
      </Section>
      <ReminderDefaults />
    </>
  )
}

/** `todo.settings` — rendered once per manifest `settingsSections` id, and once for the main page. */
export function Settings({ section }: { section?: string }): ReactElement {
  if (section === 'lists') return <><SmartListsSettings /><StatusesSettings /></>
  if (section === 'groups') return <GroupsSettings />
  return <GeneralSettings />
}
