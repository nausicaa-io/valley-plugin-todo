import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import Ajv from 'ajv'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { METADATA_PANEL_SEGMENT_V1 } from '@valley/plugin-sdk'
import config from '../config.json'
import { installTodoNotes } from './mockTodoNotes'
import { initLocalization } from '../src/localization'
import { getAllGroups, getGroupKinds, getGroups, startGroupUsageReporting } from '../src/state/groupStore'
import { groupColorFor } from '../src/model/groups'
import { editTodoValues } from '../src/commands/commands'
import { Settings } from '../src/ui/Settings'
import { TodoPanel } from '../src/ui/TodoPanel'

const SHARED = [{ id: 'group_fungi', name: 'Fungi', color: '#3b82f6' }]
const LOCAL = [{ id: 'local-0f9e8d7c6b5a', name: 'Errands', color: '#eab308' }]
const RECORDS: DataRecord[] = [
  { id: 'a', title: 'Fungi survey sheet', completed: false, group: 'Fungi' } as DataRecord,
  { id: 'b', title: 'Post the parcel', completed: false, group: 'Errands' } as DataRecord
]

function install(settings: Record<string, unknown> = {}) {
  const store = installTodoNotes(RECORDS, { groups: SHARED, localGroups: LOCAL, ...settings })
  initLocalization(store.mock.api)
  return store
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('shared and To-Do-only group switches', () => {
  it('turns both kinds on by default and offers shared groups first, then To-Do-only ones', () => {
    install()
    expect(getGroupKinds()).toEqual({ shared: true, local: true })
    expect(getGroups().map((group) => group.name)).toEqual(['Fungi', 'Errands'])
  })

  it('drops a switched-off kind from the offered groups while tasks keep their group and its colour', async () => {
    const store = install({ useSharedGroups: false })
    expect(getGroups().map((group) => group.name)).toEqual(['Errands'])
    expect(getAllGroups().map((group) => group.name)).toEqual(['Fungi', 'Errands'])
    expect(groupColorFor('Fungi', getGroups())).toBe('#3b82f6')

    render(<TodoPanel />)
    await screen.findByText('Fungi survey sheet')
    const row = screen.getByText('Fungi survey sheet').closest('.todo-row, li, [role="listitem"], article') ?? document.body
    const groupText = row.querySelector('.todo-group-text')!
    expect(groupText).toHaveTextContent('Fungi')
    expect((groupText as HTMLElement).style.color).toBe('rgb(59, 130, 246)')

    const segment = store.mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1).find((entry) => entry.extension.id === 'todo.groups')!.extension
    render(<>{segment.render({ relPath: '', kind: 'unsupported' })}</>)
    expect(screen.queryByRole('switch', { name: 'Fungi' })).toBeNull()
    expect(screen.getByRole('switch', { name: 'Errands' })).toBeInTheDocument()

    await act(async () => { await store.mock.api.settings.set('useSharedGroups', true) })
    await waitFor(() => expect(screen.getByRole('switch', { name: 'Fungi' })).toBeInTheDocument())
  })

  it('hides To-Do-only groups the same way and still saves an edit to a task that keeps one', async () => {
    const store = install({ useLocalGroups: false })
    expect(getGroups().map((group) => group.name)).toEqual(['Fungi'])
    await editTodoValues('b', { title: 'Post the parcel today', group: 'Errands' })
    expect(store.records.find((record) => record.id === 'b')).toMatchObject({ title: 'Post the parcel today', group: 'Errands' })
    await expect(editTodoValues('a', { group: 'Errands' })).rejects.toThrow('Unknown task group')
  })

  it('keeps reporting shared-group usage while shared groups are off', async () => {
    const store = install({ useSharedGroups: false })
    const stop = startGroupUsageReporting()
    await waitFor(() => expect(store.mock.api.workspace.reportGroupUsage).toHaveBeenCalledWith({ fungi: 1 }))
    stop()
  })

  it('declares both switches in the settings schema', () => {
    const fields = config.settingsSchema.fields as Array<{ key: string; schema: object; default?: unknown }>
    const ajv = new Ajv()
    for (const key of ['useSharedGroups', 'useLocalGroups']) {
      const field = fields.find((candidate) => candidate.key === key)!
      expect(field.default).toBe(true)
      expect(ajv.validate(field.schema, false)).toBe(true)
      expect(ajv.validate(field.schema, 'off')).toBe(false)
    }
  })

  it('shows each editor on the Groups page only while its switch is on', async () => {
    const store = install()
    await act(async () => { render(<Settings section="groups" />) })
    expect(screen.getByTestId('shared-groups-editor')).toBeInTheDocument()
    expect(document.querySelector('.todo-local-groups')).not.toBeNull()
    expect(screen.getByText('Groups that Calendar, Contacts and Workspace use too. A change here changes them everywhere.')).toBeInTheDocument()
    expect(screen.getByText('Private to To-Do: create, rename, colour and reorder them here.')).toBeInTheDocument()

    await act(async () => fireEvent.click(screen.getByRole('switch', { name: 'Shared groups' })))
    expect(store.mock.api.settings.get()).toMatchObject({ useSharedGroups: false })
    expect(screen.queryByTestId('shared-groups-editor')).toBeNull()
    expect(document.querySelector('.todo-local-groups')).not.toBeNull()

    await act(async () => fireEvent.click(screen.getByRole('switch', { name: 'To-Do-only groups' })))
    expect(store.mock.api.settings.get()).toMatchObject({ useLocalGroups: false })
    expect(document.querySelector('.todo-local-groups')).toBeNull()
  })

  it('keeps the Lists page to the smart lists', async () => {
    install()
    await act(async () => { render(<Settings section="lists" />) })
    expect(screen.getByText('Smart lists')).toBeInTheDocument()
    expect(screen.queryByTestId('shared-groups-editor')).toBeNull()
    expect(document.querySelector('.todo-local-groups')).toBeNull()
  })

  it('registers Groups between Lists and Statuses with a host glyph', () => {
    expect(config.settingsSections.map((section) => section.id)).toEqual(['lists', 'groups'])
    expect(config.settingsSections[1].icon).toBe('group')
  })
})
