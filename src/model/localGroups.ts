/**
 * Individual To-Do groups: lists that belong to To-Do only, beside the
 * app-wide shared groups (Settings → Appearance → Groups) that Contacts and
 * Calendar read too.
 *
 * An individual group is a plain group edited like the shared ones. It can be a
 * subgroup of another individual group (`parent`, one level only) but never
 * sits under a shared group. Tasks store a group by name, like every other group consumer, and a rename keeps the old name in `aliases` (the SDK's
 * own mechanism), so existing tasks keep resolving to the renamed group.
 */
import type { ValleyGroup } from '@valley/plugin-sdk/types'
import { groupKey, nestGroups } from '@valley/plugin-sdk/groups'

export interface LocalGroup {
  id: string
  name: string
  color: string
  aliases?: string[]
  /** Id of the individual group this one is a subgroup of. */
  parent?: string
}

export const LOCAL_GROUPS_KEY = 'localGroups'
export const LOCAL_GROUP_LIMIT = 200
export const LOCAL_GROUP_NAME_MAX = 60

const clean = (value: unknown, max: number): string => typeof value === 'string' ? value.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max) : ''

export function newLocalGroupId(): string {
  return `local-${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`
}

/** Valid, uniquely named groups; a name a shared group already uses is dropped, so a name never means two groups. */
export function normalizeLocalGroups(value: unknown, shared: readonly ValleyGroup[] = []): LocalGroup[] {
  if (!Array.isArray(value)) return []
  const taken = new Set(shared.flatMap((group) => [group.name, ...(group.aliases ?? [])]).map(groupKey))
  const ids = new Set<string>()
  const out: LocalGroup[] = []
  for (const entry of value) {
    if (!entry || typeof entry !== 'object') continue
    const raw = entry as Record<string, unknown>
    const id = clean(raw.id, 64)
    const name = clean(raw.name, LOCAL_GROUP_NAME_MAX)
    const color = clean(raw.color, 64)
    if (!/^local-[a-z0-9]{1,32}$/.test(id) || ids.has(id) || !name || taken.has(groupKey(name)) || !color) continue
    const aliases = Array.isArray(raw.aliases)
      ? [...new Set(raw.aliases.map((alias) => clean(alias, LOCAL_GROUP_NAME_MAX)).filter((alias) => alias && groupKey(alias) !== groupKey(name) && !taken.has(groupKey(alias))))].slice(0, 20)
      : []
    ids.add(id)
    taken.add(groupKey(name))
    aliases.forEach((alias) => taken.add(groupKey(alias)))
    const parent = clean(raw.parent, 64)
    out.push({ id, name, color, ...(aliases.length ? { aliases } : {}), ...(/^local-[a-z0-9]{1,32}$/.test(parent) ? { parent } : {}) })
    if (out.length >= LOCAL_GROUP_LIMIT) break
  }
  // A parent that is not an individual top-level group is dropped; subgroups follow their group.
  return nestGroups(out)
}

/** A renamed group keeps its old name as an alias so tasks that still carry it resolve. */
export function renameLocalGroup(group: LocalGroup, name: string): LocalGroup {
  const next = clean(name, LOCAL_GROUP_NAME_MAX)
  if (!next || next === group.name) return group
  const aliases = [...new Set([...(group.aliases ?? []), group.name])].filter((alias) => groupKey(alias) !== groupKey(next))
  return { ...group, name: next, ...(aliases.length ? { aliases } : {}) }
}

/** Shared groups first, then each individual group, as one list the pickers and chips use. */
export function mergedGroups(shared: readonly ValleyGroup[], local: readonly LocalGroup[]): ValleyGroup[] {
  return [
    ...shared,
    ...local.map((group) => ({ id: group.id, name: group.name, color: group.color, ...(group.aliases ? { aliases: group.aliases } : {}), ...(group.parent ? { parent: group.parent } : {}) }))
  ]
}
