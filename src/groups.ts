/**
 * Todo groups — the user's lists ("Fungi", "Wildlife", …).
 *
 * A todo stores its group as a **name** (`TodoRecord.group`); the group list
 * supplies that name's colour and chip order. The two halves are deliberately
 * independent: a name needs no entry to be a usable group, so assigning one
 * never has to write two files, there is no id to orphan when a group is
 * deleted, and no migration was needed to add the feature.
 *
 * The list itself is now the app-wide registry in `@valley/plugin-sdk/groups`
 * (Settings → Appearance → Groups), which Contacts and Calendar read too — this module's
 * helpers used to be a copy of it in every plugin. What stays here is the
 * Todo-shaped wrapper: `TodoGroup` is a {@link ValleyGroup}.
 */

import type { ValleyGroup } from '@valley/plugin-sdk/types'
import { canonicalGroupName } from '@valley/plugin-sdk/groups'

export type TodoGroup = ValleyGroup

export type { GroupUsage } from '@valley/plugin-sdk/groups'

export function allGroups(configured: readonly ValleyGroup[] = []): string[] {
  return configured.map((group) => canonicalGroupName(group.name, configured) ?? group.name)
}

export {
  countGroupUsage,
  deleteGroupByName,
  groupColorFor,
  groupForName,
  groupUsageCount,
  isGroupInUse,
  groupKey,
  newGroupId,
  nextGroupColor,
  normalizeGroups as normalizeTodoGroups,
  reorderGroups,
  promoteGroups
} from '@valley/plugin-sdk/groups'
