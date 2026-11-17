import type { PluginBackendApi } from '@valley/plugin-sdk'

/** OpenStreetMap's own tile server: the standard map, free to use with attribution and a client that names itself. */
const MAP_TILE_HOST = 'tile.openstreetmap.org'
const MAP_TILE_CLIENT = 'Valley-ToDo (+https://github.com/nausicaa-io/valley-plugin-todo)'
const MAX_ZOOM = 19

/**
 * One 256px map tile as base64 PNG, for the Task tab's location map. The UI
 * cannot reach the network itself; the request goes through the host's broker
 * to the one host the package declares.
 */
export async function readMapTile(api: Pick<PluginBackendApi, 'network'>, raw: unknown): Promise<string> {
  const { z, x, y } = (raw ?? {}) as Record<string, unknown>
  const whole = (value: unknown, limit: number): value is number => typeof value === 'number' && Number.isInteger(value) && value >= 0 && value < limit
  if (!whole(z, MAX_ZOOM + 1) || !whole(x, 2 ** z) || !whole(y, 2 ** z)) throw new Error('Not a map tile')
  const response = await api.network.fetch({ url: `https://${MAP_TILE_HOST}/${z}/${x}/${y}.png`, headers: { 'User-Agent': MAP_TILE_CLIENT }, timeoutMs: 10000, maxResponseBytes: 1_000_000 })
  if (response.status !== 200) throw new Error(`Map tile unavailable (${response.status})`)
  return response.bodyBase64
}
