/**
 * The todo plugin's command-bus surface. Read commands (open-page, search,
 * list) return structured data; write commands (add, complete) use
 * the **raw** data ops (`rawAppend`/`rawUpdate`/`rawDelete`) and return a `revert`
 * — so the command bus registers exactly one ⌘Z entry (the UI controller path
 * keeps its own undo registration, and the two never collide).
 */
import type { DataRecord } from '@valley/plugin-sdk/types'
import type { ValleyPluginApi } from '@valley/plugin-sdk'
import { loadTodo, loadTodos, normalizeTodoRecord, rawAppend, rawDelete, rawUpdate } from './data'
import { matchesSearch } from './search'
import { allGroups, groupForName, groupKey } from './groups'
import { getGroups } from './groupStore'
import { bucketTodos, SECTION_ORDER, type TodoSectionId } from './sections'
import { activeStatuses, isStatusActive, patchForStatus } from './statuses'
import type { TodoPriority, TodoRecord, TodoStatus } from './types'
import { revealRequestStore } from './runtime'

const asStr = (v: unknown): string => (typeof v === 'string' ? v : '')
const asQuery = (raw: unknown): string => asStr((raw as Record<string, unknown> | undefined)?.query).trim()
const PRIORITIES: TodoPriority[] = ['normal', 'low', 'medium', 'high']

function nowISO(): string {
  return new Date().toISOString()
}

function todayISO(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function assignedGroup(raw: string): string | undefined {
  const name = raw.trim()
  if (!name) return undefined
  const configured = groupForName(getGroups(), name)
  if (!configured) throw new Error(`Unknown group "${name}". Create it in the To-Do or Calendar plugin settings first.`)
  return configured.name
}

function resolveDue(value: unknown): string {
  if (typeof value !== 'string' || !value) return ''
  if (value.toLowerCase() === 'today') return todayISO()
  if (value.toLowerCase() === 'tomorrow') {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return todayISO(tomorrow)
  }
  return value
}

function parseTags(value: unknown): string[] {
  return typeof value === 'string' ? value.split(',').map((tag) => tag.trim()).filter(Boolean) : []
}

function describe(todo: TodoRecord): string {
  const state = todo.completed ? '✓' : todo.status ? `[${todo.status}]` : '[ ]'
  const meta = [
    todo.priority !== 'normal' ? todo.priority : '',
    todo.dueDate ? `due ${todo.dueDate}` : '',
    todo.group ? `group ${todo.group}` : ''
  ]
    .filter(Boolean)
    .join(', ')
  return `${state} ${todo.title}${meta ? ` (${meta})` : ''}  [${todo.id}]`
}

function resolveTodo(todos: TodoRecord[], query: string): TodoRecord {
  const trimmed = query.trim()
  if (!trimmed) throw new Error('Expected a todo id or title.')
  const byId = todos.find((todo) => todo.id === trimmed)
  if (byId) return byId
  const matches = todos.filter((todo) => todo.title.toLowerCase().includes(trimmed.toLowerCase()))
  if (matches.length === 0) throw new Error(`No todo matching "${trimmed}".`)
  if (matches.length === 1) return matches[0]
  throw new Error(
    `Multiple todos match "${trimmed}":\n${matches.map((todo, index) => `  ${index + 1}. ${todo.title} [${todo.id}]`).join('\n')}\nRe-run with the exact id.`
  )
}

const queryInput = {
  schema: {"type":"object","properties":{"query":{"type":"string"}},"required":["query"],"additionalProperties":false},
  parse: (raw: unknown): { query: string } => {
    const query = asQuery(raw)
    if (!query) throw new Error('Expected a todo id or title.')
    return { query }
  },
  fromCli: (args: string[]): { query: string } => ({ query: args.join(' ').trim() })
}

async function replaceTodo(
  query: string,
  update: (previous: TodoRecord) => TodoRecord,
  label: (previous: TodoRecord) => string
) {
  const previous = resolveTodo(await loadTodos(), query)
  const next = update(previous)
  if (!(await rawUpdate(previous.id, next, previous.updatedAt))) throw new Error('Failed to update todo.')
  return {
    value: next,
    revert: {
      label: label(previous),
      run: async () => {
        await rawUpdate(previous.id, previous)
      },
      reapply: async () => {
        await rawUpdate(previous.id, next)
      }
    }
  }
}

async function completeTodo(query: string) {
  return replaceTodo(
    query,
    (previous) => ({ ...previous, completed: true, status: 'completed', updatedAt: nowISO() }),
    (previous) => `Complete “${previous.title}”`
  )
}

const fieldText = { type: 'string' }
export const todoValuesSchema = { type: 'object', additionalProperties: false, properties: {
  ...Object.fromEntries(['title', 'dueDate', 'startTime', 'endTime', 'note', 'filePath', 'group', 'remindAt'].map((key) => [key, fieldText])),
  priority: { type: 'string', enum: PRIORITIES }, status: { type: 'string', enum: ['open', 'inprogress', 'waiting', 'onhold', 'delegated', 'deferred', 'completed', 'canceled'] },
  flagged: { type: 'boolean' }, completed: { type: 'boolean' },
  ...Object.fromEntries(['tags', 'urls', 'attachments'].map((key) => [key, { type: 'array', items: fieldText }])),
  estimatedMinutes: { type: 'number', minimum: 0 },
  location: { oneOf: [{ type: 'null' }, { type: 'object', required: ['name'], additionalProperties: false, properties: { name: fieldText, lng: { type: 'number', minimum: -180, maximum: 180 }, lat: { type: 'number', minimum: -90, maximum: 90 } } }] }
} }

export function parseTodoValues(raw: unknown): Partial<TodoRecord> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Expected task values.')
  const values = raw as Record<string, unknown>
  for (const [key, value] of Object.entries(values)) {
    if (!(key in todoValuesSchema.properties)) throw new Error(`Unsupported task property "${key}".`)
    if (['flagged', 'completed'].includes(key)) { if (typeof value !== 'boolean') throw new Error(`Expected boolean "${key}".`) }
    else if (['tags', 'urls', 'attachments'].includes(key)) { if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) throw new Error(`Expected a text list for "${key}".`) }
    else if (key === 'estimatedMinutes') { if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) throw new Error('Invalid duration.') }
    else if (key === 'location') {
      if (value !== null) {
        if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid location.')
        const point = value as Record<string, unknown>
        if (typeof point.name !== 'string' || Object.keys(point).some((field) => !['name', 'lng', 'lat'].includes(field)) || (point.lng !== undefined && (typeof point.lng !== 'number' || !Number.isFinite(point.lng) || Math.abs(point.lng) > 180)) || (point.lat !== undefined && (typeof point.lat !== 'number' || !Number.isFinite(point.lat) || Math.abs(point.lat) > 90)) || (point.lng === undefined) !== (point.lat === undefined)) throw new Error('Invalid location.')
      }
    } else if (typeof value !== 'string') throw new Error(`Expected text for "${key}".`)
  }
  if (typeof values.title === 'string' && !values.title.trim()) throw new Error('A task title cannot be empty.')
  if (values.priority !== undefined && !PRIORITIES.includes(values.priority as TodoPriority)) throw new Error('Invalid priority.')
  if (values.status !== undefined && !activeStatuses().includes(values.status as TodoStatus)) throw new Error('This task status is disabled.')
  for (const key of ['startTime', 'endTime']) if (values[key] && !/^([01]\d|2[0-3]):[0-5]\d$/.test(String(values[key]))) throw new Error('Invalid task time.')
  if (values.remindAt && !/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(values.remindAt))) throw new Error('Invalid reminder date.')
  return values as Partial<TodoRecord>
}

export async function editTodoValues(id: string, values: Partial<TodoRecord>, expectedUpdatedAt?: string) {
  const todos = await loadTodos()
  const previous = todos.find((todo) => todo.id === id)
  if (!previous) throw new Error('The task no longer exists.')
  if (expectedUpdatedAt !== undefined && previous.updatedAt !== expectedUpdatedAt) throw new Error('This task changed elsewhere. Reload it before saving; your draft is preserved.')
  if (values.group && !allGroups(getGroups()).includes(values.group)) throw new Error('Unknown task group. Create it in shared group settings first.')
  const next = normalizeTodoRecord({ ...previous, ...values, ...(values.status ? patchForStatus(values.status) : values.completed !== undefined ? patchForStatus(values.completed ? 'completed' : 'open') : {}), ...(values.remindAt !== undefined ? { reminderFiredAt: undefined } : {}), updatedAt: nowISO() } as unknown as DataRecord)
  if (values.filePath && next.filePath !== values.filePath) throw new Error('Invalid task file path.')
  for (const key of ['urls', 'attachments'] as const) if (values[key]?.some((value) => !next[key]?.includes(value))) throw new Error(`Invalid task ${key}.`)
  if (!(await rawUpdate(id, next, previous.updatedAt))) throw new Error('Could not save the task.')
  return { value: next, revert: { label: `Edit “${previous.title}”`, run: async () => { if (!(await rawUpdate(id, previous))) throw new Error('Could not restore the task.') }, reapply: async () => { if (!(await rawUpdate(id, next))) throw new Error('Could not reapply the task edit.') } } }
}

/** Register every `todo:*` command; returns a combined disposer. */
async function todoCommandRevision(raw: unknown): Promise<unknown> {
  const input = (raw ?? {}) as { id?: string; query?: string; values?: Partial<TodoRecord> }
  const query = input.id ?? input.query
  const settings = { groups: getGroups(), statuses: activeStatuses() }
  if (!query) return settings
  const todos = await loadTodos()
  const todo = resolveTodo(todos, query)
  return { ...settings, records: [todo] }
}

export function registerTodoCommands(api: ValleyPluginApi): () => void {
  const offs = [
    api.commands.register({
      id: 'open', label: 'To-Do: Open task', labelKey: 'todo.command.openTask', paletteSafe: false, sideEffect: 'read',
      input: { schema: { type: 'object', properties: { id: fieldText }, required: ['id'], additionalProperties: false }, parse: (raw) => {
        const id = asStr((raw as Record<string, unknown>)?.id).trim()
        if (!id) throw new Error('Expected a task id.')
        return { id }
      } },
      run: async ({ id }) => {
        const todo = await loadTodo(id)
        if (!todo) throw new Error('The task no longer exists. Open To-Do to choose another task.')
        api.workspace.openMainTab()
        revealRequestStore().request(id, 'edit')
        return todo
      }
    }),
    api.commands.register({ id: 'get', label: 'To-Do: Get task', labelKey: 'todo.command.get', paletteSafe: false, sideEffect: 'read', input: { schema: { type: 'object', properties: { id: fieldText }, required: ['id'], additionalProperties: false }, parse: (raw) => { const id = asStr((raw as Record<string, unknown>)?.id).trim(); if (!id) throw new Error('Expected a task id.'); return { id } } }, run: async ({ id }) => { const todo = await loadTodo(id); if (!todo) throw new Error('The task no longer exists.'); return todo } }),
    api.commands.register({
      id: 'edit-fields',
      label: 'To-Do: Edit task fields',
      labelKey: 'todo.command.editFields',
      paletteSafe: false,
      sideEffect: 'write',
      input: { schema: { type: 'object', properties: { id: fieldText, values: todoValuesSchema, expectedUpdatedAt: fieldText }, required: ['id', 'values'], additionalProperties: false }, parse: (raw) => { const input = raw as Record<string, unknown>; const id = asStr(input?.id).trim(); if (!id || (input.expectedUpdatedAt !== undefined && typeof input.expectedUpdatedAt !== 'string')) throw new Error('Expected a task id and revision.'); return { id, values: parseTodoValues(input.values), expectedUpdatedAt: input.expectedUpdatedAt as string | undefined } } },
      run: ({ id, values, expectedUpdatedAt }) => editTodoValues(id, values, expectedUpdatedAt),
      revision: (input) => todoCommandRevision(input),
      preview: (input) => ({ changes: input })
    }),
    api.commands.register({
      id: 'open-page',
      label: 'Open To-Do page', labelKey: 'auto.25097a85052b',
      sideEffect: 'read',
      run: () => {
        api.workspace.openMainTab()
        return undefined
      },
      formatCli: () => 'Opened To-Do page.'
    }),

    api.commands.register({
      id: 'add',
      label: 'To-Do: Add a task',
      labelKey: 'auto.34d1bc4daccf',
      paletteSafe: false,
      sideEffect: 'write',
      input: {
        schema: {"type":"object","properties":{"title":{"type":"string"},"due":{"type":"string"},"priority":{"type":"string"},"status":{"type":"string"},"note":{"type":"string"},"group":{"type":"string"}},"required":["title"],"additionalProperties":false},
        parse: (raw) => {
          const o = (raw ?? {}) as Record<string, unknown>
          const title = asStr(o.title).trim()
          if (!title) throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]')
          return {
            title,
            due: asStr(o.due),
            priority: asStr(o.priority),
            status: asStr(o.status),
            note: asStr(o.note),
            group: asStr(o.group)
          }
        },
        fromCli: (args, flags) => ({
          title: args.join(' ').trim(),
          due: flags.due,
          priority: flags.priority,
          status: flags.status,
          note: flags.note,
          group: flags.group
        })
      },
      run: async ({ title, due, priority, status, note, group }) => {
        const available = activeStatuses()
        if (status && !available.includes(status as TodoStatus)) {
          throw new Error(`Status "${status}" is not enabled. One of: ${available.join(', ')}`)
        }
        const record = normalizeTodoRecord({
          title,
          priority: priority || 'normal',
          status: status || undefined,
          dueDate: resolveDue(due),
          note,
          group: assignedGroup(group)
        } as DataRecord)
        if (!(await rawAppend(record))) throw new Error('Failed to add todo.')
        return {
          value: record,
          revert: {
            label: `Add todo “${record.title}”`,
            run: async () => {
              await rawDelete(record.id)
            },
            reapply: async () => {
              await rawAppend(record)
            }
          }
        }
      },
      formatCli: (v) => `Added: ${describe(v)}`,
      revision: (input) => todoCommandRevision(input),
      preview: (input) => ({ changes: input })
    }),

    api.commands.register({
      id: 'complete',
      label: 'To-Do: Complete a task',
      labelKey: 'auto.2fb86192bd77',
      paletteSafe: false,
      sideEffect: 'write',
      input: queryInput,
      run: ({ query }) => completeTodo(query),
      formatCli: (v) => `Completed: ${v.title}`,
      revision: (input) => todoCommandRevision(input),
      preview: (input) => ({ changes: input })
    }),

    api.commands.register({
      id: 'done',
      label: 'To-Do: Complete a task (done)',
      labelKey: 'auto.3fc72a0701ff',
      paletteSafe: false,
      sideEffect: 'write',
      input: queryInput,
      run: ({ query }) => completeTodo(query),
      formatCli: (v) => `Completed: ${v.title}`,
      revision: (input) => todoCommandRevision(input),
      preview: (input) => ({ changes: input })
    }),

    api.commands.register({
      id: 'search',
      label: 'To-Do: Search tasks', labelKey: 'auto.496cd6a42238',
      paletteSafe: false,
      sideEffect: 'read',
      input: {
        schema: {"type":"object","properties":{"query":{"type":"string"}},"required":["query"],"additionalProperties":false},
        parse: (raw) => {
          const query = asQuery(raw)
          if (!query) throw new Error('Usage: todo search "<query>"')
          return { query }
        },
        fromCli: (args) => ({ query: args.join(' ').trim() })
      },
      run: async ({ query }) =>
        (await loadTodos()).filter((todo) => matchesSearch(query, todo.tags, todo.title, todo.note)).slice(0, 20),
      formatCli: (todos) => todos.length ? todos.map(describe).join('\n') : 'No matching todos.'
    }),

    api.commands.register({
      id: 'reopen',
      label: 'To-Do: Reopen a task',
      labelKey: 'auto.cf3d0c76d559',
      paletteSafe: false,
      sideEffect: 'write',
      input: queryInput,
      run: ({ query }) =>
        replaceTodo(
          query,
          (previous) => ({ ...previous, completed: false, status: 'open', updatedAt: nowISO() }),
          (previous) => `Reopen “${previous.title}”`
        ),
      formatCli: (todo) => `Reopened: ${todo.title}`,
      revision: (input) => todoCommandRevision(input),
      preview: (input) => ({ changes: input })
    }),

    // `pause` keeps its verb (a CLI verb is an id, not a label) but now writes
    // `onhold` — `paused` was the focus timer's word and no longer exists.
    ...(['cancel', 'pause'] as const).map((id) =>
      api.commands.register({
      id,
      label: `To-Do: ${id === 'cancel' ? 'Cancel' : 'Put a task on hold'}`,
      paletteSafe: false,
      sideEffect: 'write',
      input: queryInput,
      run: ({ query }) => {
          const status = id === 'cancel' ? 'canceled' : 'onhold'
          if (!isStatusActive(status)) throw new Error(`Status "${status}" is disabled in To-Do settings.`)
          return replaceTodo(
            query,
            (previous) => ({
              ...previous,
              ...patchForStatus(status),
              updatedAt: nowISO()
            }),
            (previous) => `${id === 'cancel' ? 'Cancel' : 'Hold'} “${previous.title}”`
          )
        },
      formatCli: (todo) => `${id === 'cancel' ? 'Canceled' : 'On hold'}: ${todo.title}`,
      revision: (input) => todoCommandRevision(input),
      preview: (input) => ({ changes: input })
    })
    ),

    api.commands.register({
      id: 'status',
      label: 'To-Do: Set task status',
      labelKey: 'auto.664764d2200b',
      paletteSafe: false,
      sideEffect: 'write',
      input: {
        schema: {"type":"object","properties":{"query":{"type":"string"},"status":{"type":"string"}},"required":["query","status"],"additionalProperties":false},
        parse: (raw) => {
          const value = (raw ?? {}) as Record<string, unknown>
          const query = asStr(value.query).trim()
          const status = asStr(value.status)
          const available = activeStatuses()
          if (!query || !available.includes(status as TodoStatus)) {
            throw new Error(`Usage: todo status "<id or title>" <${available.join('|')}>`)
          }
          return { query, status: status as TodoStatus }
        },
        fromCli: (args) => ({ query: args.slice(0, -1).join(' '), status: args.at(-1) })
      },
      run: ({ query, status }) =>
        replaceTodo(
          query,
          // Through `patchForStatus`, so `todo status x completed` checks the
          // box as well — the CLI and the checkbox must agree on what done is.
          (previous) => ({ ...previous, ...patchForStatus(status), updatedAt: nowISO() }),
          (previous) => `Set status for “${previous.title}”`
        ),
      formatCli: (todo) => `${todo.title} → ${todo.status}`,
      revision: (input) => todoCommandRevision(input),
      preview: (input) => ({ changes: input })
    }),

    api.commands.register({
      id: 'edit',
      label: 'To-Do: Edit a task',
      labelKey: 'auto.0379f3c75faa',
      paletteSafe: false,
      sideEffect: 'write',
      input: {
        schema: {"type":"object","properties":{"query":{"type":"string"},"title":{"type":"string"},"priority":{"type":"string"},"due":{"type":"string"},"note":{"type":"string"},"tags":{"type":"string"},"group":{"type":"string"}},"required":["query"],"additionalProperties":false},
        parse: (raw) => {
          const value = (raw ?? {}) as Record<string, unknown>
          const query = asStr(value.query).trim()
          const priority = asStr(value.priority)
          if (!query) throw new Error('Expected a todo id or title.')
          if (priority && !PRIORITIES.includes(priority as TodoPriority)) {
            throw new Error(`Invalid priority "${priority}". One of: ${PRIORITIES.join(', ')}`)
          }
          return {
            query,
            title: typeof value.title === 'string' ? value.title : undefined,
            priority: priority ? priority as TodoPriority : undefined,
            due: typeof value.due === 'string' ? value.due : undefined,
            note: typeof value.note === 'string' ? value.note : undefined,
            tags: typeof value.tags === 'string' ? parseTags(value.tags) : undefined,
            group: typeof value.group === 'string' ? value.group : undefined
          }
        },
        fromCli: (args, flags) => ({
          query: args.join(' '),
          title: flags.title,
          priority: flags.priority,
          due: flags.due,
          note: flags.note,
          tags: flags.tag,
          group: flags.group
        })
      },
      run: ({ query, title, priority, due, note, tags, group }) =>
        replaceTodo(
          query,
          (previous) => ({
            ...previous,
            title: title ?? previous.title,
            priority: priority ?? previous.priority,
            dueDate: due === undefined ? previous.dueDate : resolveDue(due),
            note: note ?? previous.note,
            tags: tags ?? previous.tags,
            // `--group ""` clears it; omitting the flag leaves it alone.
            group: group === undefined ? previous.group : assignedGroup(group),
            updatedAt: nowISO()
          }),
          (previous) => `Edit “${previous.title}”`
        ),
      formatCli: (todo) => `Edited: ${describe(todo)}`,
      revision: (input) => todoCommandRevision(input),
      preview: (input) => ({ changes: input })
    }),

    api.commands.register({
      id: 'delete',
      label: 'To-Do: Delete a task',
      labelKey: 'auto.798b29fa6c05',
      paletteSafe: false,
      sideEffect: 'write',
      input: {
        schema: {"type":"object","properties":{"query":{"type":"string"},"confirm":{"oneOf":[{"type":"boolean"},{"type":"string","enum":["true","false"]}]}},"required":["query"],"additionalProperties":false},
        parse: (raw) => {
          const value = (raw ?? {}) as Record<string, unknown>
          const query = asStr(value.query).trim()
          if (!query) throw new Error('Expected a todo id or title.')
          return { query, confirm: value.confirm === true || value.confirm === 'true' }
        },
        fromCli: (args, flags) => ({ query: args.join(' '), confirm: flags.confirm })
      },
      run: async ({ query, confirm }) => {
        const todos = await loadTodos()
        const previous = resolveTodo(todos, query)
        if (!confirm) return { value: { deleted: false, todo: previous, deletedCount: 0 }, revert: null }
        if (!(await rawDelete(previous.id))) throw new Error('Failed to delete todo.')
        return {
          value: { deleted: true, todo: previous, deletedCount: 1 },
          revert: {
            label: `Delete “${previous.title}”`,
            run: async () => {
              await rawAppend(previous)
            },
            reapply: async () => {
              await rawDelete(previous.id)
            }
          }
        }
      },
      formatCli: ({ deleted, todo, deletedCount }) => deleted
        ? `Deleted: ${todo.title}${deletedCount > 1 ? ` (${deletedCount} tasks)` : ''}`
        : `Would delete "${todo.title}" [${todo.id}]. Re-run with --confirm to delete.`,
      revision: (input) => todoCommandRevision(input),
      preview: (input) => ({ changes: input })
    }),

    api.commands.register({
      id: 'list',
      label: 'To-Do: List tasks', labelKey: 'auto.112f17ac556e',
      paletteSafe: false,
      sideEffect: 'read',
      input: {
        schema: {"type":"object","properties":{"section":{"type":"string"},"q":{"type":"string"}},"required":[],"additionalProperties":false},
        parse: (raw) => {
          const o = (raw ?? {}) as Record<string, unknown>
          return { section: asStr(o.section), q: asStr(o.q) }
        },
        fromCli: (_args, flags) => ({ section: asStr(flags.section), q: asStr(flags.q ?? flags.search) })
      },
      run: async ({ section, q }): Promise<TodoRecord[]> => {
        let todos = await loadTodos()
        if (q) todos = todos.filter((t) => matchesSearch(q, t.tags, t.title, t.note))
        if (section && (SECTION_ORDER as string[]).includes(section)) {
          return bucketTodos(todos)[section as TodoSectionId]
        }
        return todos
      },
      formatCli: (todos) => (todos.length === 0 ? 'No matching todos.' : todos.map(describe).join('\n'))
    }),

    api.commands.register({
      id: 'group-list',
      label: 'To-Do: List groups', labelKey: 'auto.34656b383dd3',
      paletteSafe: false,
      sideEffect: 'read',
      run: async (): Promise<{ name: string; count: number }[]> => {
        const todos = await loadTodos()
        const configured = getGroups()
        return allGroups(configured).map((name) => ({
          name,
          count: todos.filter((t) => groupKey(t.group ?? '') === groupKey(name)).length
        }))
      },
      formatCli: (groups) =>
        groups.length ? groups.map((g) => `${g.name} (${g.count})`).join('\n') : 'No groups.'
    }),
  ]
  return () => offs.forEach((off) => off())
}
