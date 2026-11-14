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
import { canonicalGroupName, groupColorFor as sdkGroupColorFor, groupFamilyKeys, groupForName, groupKey } from '@valley/plugin-sdk/groups'

export type TodoGroup = ValleyGroup

export type { GroupUsage } from '@valley/plugin-sdk/groups'

export function allGroups(configured: readonly ValleyGroup[] = []): string[] {
  return configured.map((group) => canonicalGroupName(group.name, configured) ?? group.name)
}

let colorFallback: () => readonly ValleyGroup[] = () => []

/** The groups a colour lookup falls back to when a name is not in the offered list (a switched-off kind). */
export function setGroupColorFallback(read: () => readonly ValleyGroup[]): void {
  colorFallback = read
}

let familySource: () => readonly ValleyGroup[] = () => []
let familyRevision = 0
let families: Map<string, ReadonlySet<string>> | null = null

/** The groups whose subgroups a group view, filter and count cover: every shared and To-Do-only group. */
export function setGroupFamilySource(read: () => readonly ValleyGroup[]): void {
  familySource = read
  invalidateGroupFamilies()
}

/** Call when the groups changed, so the next lookup reads them again. */
export function invalidateGroupFamilies(): void {
  families = null
  familyRevision++
}

/** Changes whenever the group families may have changed; a cache of expanded names compares it. */
export function groupFamilyRevision(): number {
  return familyRevision
}

/**
 * Every group key a group name covers: its own and, for a group with
 * subgroups, each subgroup's names and aliases. A name without subgroups
 * covers only itself.
 */
export function groupKeysCovered(name: string): ReadonlySet<string> {
  if (!families) {
    families = new Map()
    const all = familySource()
    for (const group of all) {
      if (group.parent || !all.some((candidate) => candidate.parent === group.id)) continue
      const keys = groupFamilyKeys(all, group)
      for (const own of [group.name, ...(group.aliases ?? [])]) families.set(groupKey(own), keys)
    }
  }
  const key = groupKey(name)
  return families.get(key) ?? new Set([key])
}

/** Is this name a subgroup in the given list? Lists indent it under its group. */
export function isSubgroupName(name: string, configured: readonly ValleyGroup[]): boolean {
  return groupForName(configured, name)?.parent !== undefined
}

export function groupColorFor(name: string | null | undefined, configured: readonly ValleyGroup[]): string {
  return sdkGroupColorFor(name, groupForName(configured, name) ? configured : colorFallback())
}

export {
  countGroupUsage,
  deleteGroupByName,
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
