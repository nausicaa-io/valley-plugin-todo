/** Result contracts of the `todo:*` commands and the task values `todo:edit-fields` accepts. */
import { activeStatuses } from '../state/statusStore'
import type { TodoPriority, TodoRecord, TodoStatus } from '../types'
import { isClockTime, TODO_PRIORITIES as PRIORITIES } from '../domain/validation'

const todoResult = {
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "maxLength": 65536
    },
    "title": {
      "type": "string",
      "maxLength": 65536
    },
    "dueDate": {
      "type": "string",
      "maxLength": 65536
    },
    "startTime": {
      "type": "string",
      "maxLength": 65536
    },
    "endTime": {
      "type": "string",
      "maxLength": 65536
    },
    "note": {
      "type": "string",
      "maxLength": 65536
    },
    "filePath": {
      "type": "string",
      "maxLength": 65536
    },
    "group": {
      "type": "string",
      "maxLength": 65536
    },
    "color": {
      "type": "string",
      "maxLength": 65536
    },
    "remindAt": {
      "type": "string",
      "maxLength": 65536
    },
    "reminderFiredAt": {
      "type": "string",
      "maxLength": 65536
    },
    "reminderTime": {
      "type": "string",
      "maxLength": 65536
    },
    "createdAt": {
      "type": "string",
      "maxLength": 65536
    },
    "updatedAt": {
      "type": "string",
      "maxLength": 65536
    },
    "completed": {
      "type": "boolean"
    },
    "flagged": {
      "type": "boolean"
    },
    "priority": {
      "enum": [
        "normal",
        "low",
        "medium",
        "high"
      ]
    },
    "status": {
      "type": "string",
      "maxLength": 64
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string",
        "maxLength": 65536
      },
      "maxItems": 1000
    },
    "urls": {
      "type": "array",
      "items": {
        "type": "string",
        "maxLength": 65536
      },
      "maxItems": 1000
    },
    "attachments": {
      "type": "array",
      "items": {
        "type": "string",
        "maxLength": 65536
      },
      "maxItems": 1000
    },
    "reminderOffsets": {
      "type": "array",
      "items": {
        "type": "number"
      },
      "maxItems": 1000
    },
    "estimatedMinutes": {
      "type": "number"
    },
    "actualMinutes": {
      "type": "number"
    },
    "location": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "maxLength": 65536
        },
        "lng": {
          "type": "number",
          "minimum": -180,
          "maximum": 180
        },
        "lat": {
          "type": "number",
          "minimum": -90,
          "maximum": 90
        }
      },
      "required": [
        "name"
      ],
      "additionalProperties": false
    },
    "history": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "startedAt": {
            "type": "string",
            "maxLength": 65536
          },
          "endedAt": {
            "type": "string",
            "maxLength": 65536
          },
          "activeMinutes": {
            "type": "number"
          },
          "pauseMinutes": {
            "type": "number"
          }
        },
        "required": [
          "startedAt",
          "endedAt",
          "activeMinutes",
          "pauseMinutes"
        ],
        "additionalProperties": false
      },
      "maxItems": 10000
    },
    "statusHistory": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "from": {
            "type": "string",
            "maxLength": 64
          },
          "to": {
            "type": "string",
            "maxLength": 64
          },
          "changedAt": {
            "type": "string",
            "maxLength": 65536
          }
        },
        "required": [
          "from",
          "to",
          "changedAt"
        ],
        "additionalProperties": false
      },
      "maxItems": 10000
    }
  },
  "required": [
    "id",
    "title",
    "completed",
    "priority",
    "dueDate",
    "note",
    "tags",
    "createdAt",
    "updatedAt"
  ],
  "additionalProperties": false
}

export const todoResults: Record<string, Record<string, unknown>> = {
  "open": todoResult,
  "get": todoResult,
  "edit-fields": todoResult,
  "add": todoResult,
  "complete": todoResult,
  "done": todoResult,
  "reopen": todoResult,
  "cancel": todoResult,
  "pause": todoResult,
  "status": todoResult,
  "edit": todoResult,
  "open-page": {"type":"null"},
  "search": { type: 'array', items: todoResult, maxItems: 20 },
  "list": { type: 'array', items: todoResult, maxItems: 10000 },
  "delete": { type: 'object', properties: { deleted: { type: 'boolean' }, todo: todoResult, deletedCount: { type: 'integer', minimum: 0, maximum: 1 } }, required: ['deleted', 'todo', 'deletedCount'], additionalProperties: false },
  "group-list": {"type":"array","items":{"type":"object","properties":{"name":{"type":"string","maxLength":65536},"count":{"type":"integer","minimum":0}},"required":["name","count"],"additionalProperties":false},"maxItems":10000},
}

export const fieldText = { type: 'string' }
export const todoValuesSchema = { type: 'object', additionalProperties: false, properties: {
  ...Object.fromEntries(['title', 'dueDate', 'startTime', 'endTime', 'note', 'filePath', 'group', 'remindAt'].map((key) => [key, fieldText])),
  priority: { type: 'string', enum: PRIORITIES }, status: { type: 'string', maxLength: 64 },
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
  for (const key of ['startTime', 'endTime']) if (values[key] && !isClockTime(String(values[key]))) throw new Error('Invalid task time.')
  if (values.remindAt && !/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(values.remindAt))) throw new Error('Invalid reminder date.')
  return values as Partial<TodoRecord>
}
