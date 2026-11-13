import { api, captureTodoScope } from '../runtime'
import { loadTodoList } from '../data/listCache'

/**
 * Reminder notification clicks. The backend owner (`backend/reminders.ts`) hands every
 * reminder to the host, which fires it; a click on one opens its task's file, or
 * the To-Do page for a task without one.
 */

/** Everything under this prefix is ours. */
const KEY_PREFIX = 'reminder:'

export function startReminders(): () => void {
  const scope = captureTodoScope()
  return api.notifications.onAction(({ key, action, targetItemId }) => {
    if (action !== 'click' || !key.startsWith(KEY_PREFIX)) return
    const id = targetItemId ?? key.slice(KEY_PREFIX.length).split(':')[0]
    void loadTodoList(scope).then(todos => {
      scope.assertActive()
      const todo = todos.find(todo => todo.id === id)
      if (todo?.filePath) void scope.api.workspace.openFile(todo.filePath)
      else void scope.api.commands.executeOwn('open-page', {})
    }).catch(() => {})
  })
}
