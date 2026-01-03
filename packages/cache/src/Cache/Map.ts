import type { Cache } from "./types"

export interface MapCache<K, V> extends Cache<K, V> {
    data: { entries: Map<K, V> }
}

/**
 * # Map
 *
 * ```ts
 * function Cache.Map<K, V>(): MapCache<K, V>
 * ```
 *
 * Creates a cache backed by a Map with no eviction policy.
 *
 * ## Properties
 *
 * - **data.entries**: The underlying `Map` instance
 *
 * ## Use Cases
 *
 * - When you don't need automatic eviction
 * - When cache size won't grow unbounded
 *
 * ## Example
 *
 * ```ts
 * import { Cache } from "@monstermann/cache";
 *
 * const cache = Cache.Map<string, number>();
 *
 * Cache.set(cache, "foo", 42);
 * Cache.set(cache, "bar", 100);
 *
 * Cache.get(cache, "foo"); // 42
 *
 * // Access underlying Map if needed
 * cache.data.entries.size; // 2
 * ```
 *
 */
export function Map<K, V>(): MapCache<K, V> {
    const entries = new globalThis.Map<K, V>()
    return {
        data: { entries },
        del(key) {
            entries.delete(key)
        },
        get(key) {
            return entries.get(key)
        },
        has(key) {
            return entries.has(key)
        },
        set(key, value) {
            entries.set(key, value)
        },
    }
}
