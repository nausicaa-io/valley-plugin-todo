import { groupKey } from './groups'
import { DEFAULT_VIEW, type TodoView } from './views'

export interface ListSelection {
  names: string[]
  includeUngrouped: boolean
}

/** The groups a view selects: a smart, tag or no-group view selects none of the My Lists rows. */
export function selectionOf(view: TodoView): ListSelection {
  if (view.kind === 'groups') return { names: view.names, includeUngrouped: view.includeUngrouped === true }
  return { names: [], includeUngrouped: view.kind === 'nogroup' }
}

/** The view a selection shows; an empty one falls back to the default list, as the group filter does. */
export function viewOfSelection(selection: ListSelection): TodoView {
  return selection.names.length || selection.includeUngrouped
    ? { kind: 'groups', names: selection.names, includeUngrouped: selection.includeUngrouped }
    : DEFAULT_VIEW
}

/** One row added or removed, the rest of the selection untouched. */
export function toggleName(names: readonly string[], name: string): string[] {
  return names.some((entry) => groupKey(entry) === groupKey(name))
    ? names.filter((entry) => groupKey(entry) !== groupKey(name))
    : [...names, name]
}
