import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import Ajv from 'ajv'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { DataRecord } from '@valley/plugin-sdk/types'
import config from '../config.json'
import { installTodoNotes } from './mockTodoNotes'
import { initLocalization } from '../src/localization'
import { getAllGroups, getGroupKinds, getGroups, onGroupsChanged, setLocalGroups, startGroupUsageReporting } from '../src/state/groupStore'
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

describe('saving a To-Do-only group', () => {
  const colourOf = (): string | undefined => getAllGroups().find((group) => group.name === 'Errands')?.color

  it('shows the change at once, before the settings have saved it', async () => {
    const { mock } = install()
    const set = mock.api.settings.set.bind(mock.api.settings)
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    mock.api.settings.set = (async (key: string, value: unknown) => { await held; return set(key, value) }) as typeof mock.api.settings.set
    const changed = vi.fn()
    const off = onGroupsChanged(changed)
    const saving = setLocalGroups([{ ...LOCAL[0], color: 'palette:red' }])
    expect(colourOf()).toBe('palette:red')
    expect(changed).toHaveBeenCalled()
    expect(mock.api.settings.get().localGroups).toEqual(LOCAL)
    release()
    await saving
    expect(colourOf()).toBe('palette:red')
    expect((mock.api.settings.get().localGroups as typeof LOCAL)[0].color).toBe('palette:red')
    off()
  })

  it('keeps the newest of two quick changes and goes back to the saved groups when a save fails', async () => {
    const { mock } = install()
    const first = setLocalGroups([{ ...LOCAL[0], color: 'palette:red' }])
    const second = setLocalGroups([{ ...LOCAL[0], color: 'palette:green' }])
    expect(colourOf()).toBe('palette:green')
    await Promise.all([first, second])
    expect(colourOf()).toBe('palette:green')
    mock.api.settings.set = (async () => { throw new Error('refused') }) as typeof mock.api.settings.set
    await expect(setLocalGroups([{ ...LOCAL[0], color: 'palette:blue' }])).rejects.toThrow('refused')
    expect(colourOf()).toBe('palette:green')
  })
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

    // The sidebar's Groups list offers only the kinds that are on.
    await act(async () => store.mock.emitState({ activePluginTab: { pluginId: 'todo' } }))
    await screen.findByText('Groups')
    expect(screen.queryByRole('button', { name: /^Fungi/ })).toBeNull()
    expect(screen.getByRole('button', { name: /^Errands/ })).toBeInTheDocument()

    await act(async () => { await store.mock.api.settings.set('useSharedGroups', true) })
    await waitFor(() => expect(screen.getByRole('button', { name: /^Fungi/ })).toBeInTheDocument())
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
