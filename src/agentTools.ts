import {
  createAgentToolProvider,
  type AgentToolExecutionContext,
  type AgentToolProvider,
  type ValleyPluginApi
} from '@valley/plugin-sdk'

const schema = (properties: Record<string, unknown>, required: string[] = []) => ({
  type: 'object', properties, required, additionalProperties: false
})
const text = (description: string) => ({ type: 'string', description })

async function execute<T>(
  api: ValleyPluginApi,
  id: string,
  input: unknown,
  context?: AgentToolExecutionContext
): Promise<T> {
  const result = await api.commands.executeOwn(id, input, { ...context, autonomous: true })
  if (!result.ok) throw new Error(result.error.message)
  return result.value as T
}

export function todoAgentTools(api: ValleyPluginApi): AgentToolProvider {
  return createAgentToolProvider([
    {
      name: 'list_todos',
      description: 'List open tasks from the Todo plugin.',
      parameters: schema({}),
      sideEffect: 'read',
      commandId: 'list',
      run: async (_args, context) => {
        const todos = await execute<Array<{ id?: string; title?: string; status?: string; completed?: boolean }>>(
          api, 'list', { section: '', q: '' }, context
        )
        const open = todos.filter((todo) => todo.completed !== true && todo.status !== 'completed')
        return open.length
          ? open.map((todo) => `- [${todo.status || 'open'}] ${todo.title ?? ''} (${todo.id ?? ''})`).join('\n')
          : 'No open todos.'
      }
    },
    {
      name: 'add_todo',
      description: 'Add a task to the Todo plugin.',
      parameters: schema({ title: text('Task title'), due: text('Optional due date YYYY-MM-DD') }, ['title']),
      sideEffect: 'write',
      commandId: 'add',
      run: async (args, context) => {
        const title = String(args.title ?? '')
        const todo = await execute<{ title?: string }>(
          api, 'add', { title, due: String(args.due ?? '') }, context
        )
        return `Added todo "${todo.title || title}".`
      }
    },
    {
      name: 'complete_todo',
      description: 'Mark a Todo task complete by id.',
      parameters: schema({ id: text('Todo id') }, ['id']),
      sideEffect: 'write',
      commandId: 'complete',
      run: async (args, context) => {
        const query = String(args.id ?? '')
        const todo = await execute<{ title?: string }>(api, 'complete', { query }, context)
        return `Completed "${todo.title || query}".`
      }
    }
  ])
}
