import type { Cache } from "./types"
import { validateMax } from "./internals/validateMax"
import { validateTTL } from "./internals/validateTTL"

type LRUTTLCacheEntry<V> = {
    date: number
    value: V
}

export interface LRUTTLCache<K, V> extends Cache<K, V> {
    data: {
        entries: Map<K, LRUTTLCacheEntry<V>>
    }
    evict: () => void
    setMax: (max: number) => void
    setTTL: (ttl: number) => void
}

/**
 * # LRUTTL
 *
 * ```ts
 * function Cache.LRUTTL<K, V>(options: { max: number, ttl: number }): LRUTTLCache<K, V>
 * ```
 *
 * Creates a cache with both LRU (Least Recently Used) eviction and TTL (Time To Live) expiration backed by a Map. Entries are evicted when the cache exceeds `max` size or when they exceed the `ttl` duration in milliseconds.
 *
 * ## Properties
 *
 * - **data.entries**: The underlying `Map` instance storing entries with timestamps
 * - **evict()**: Manually trigger eviction of expired entries
 * - **setMax(max)**: Updates the maximum cache size
 * - **setTTL(ttl)**: Updates the TTL duration and evicts expired entries
 *
 * ## Use Cases
 *
 * - When you need time-based expiration in addition to size limits
 * - When data becomes stale after a certain period
 *
 * ## Example
 *
 * ```ts
 * import { Cache } from "@monstermann/cache";
 *
 * const cache = Cache.LRUTTL<string, number>({
 *     max: 100,
 *     ttl: 5000, // 5 seconds
 * });
 *
 * Cache.set(cache, "a", 1);
 * Cache.get(cache, "a"); // 1
 *
 * // After 5+ seconds
 * Cache.get(cache, "a"); // undefined (expired)
 *
 * // Manual eviction
 * Cache.set(cache, "b", 2);
 * cache.evict(); // Remove expired entries
 *
 * // Adjust TTL at runtime
 * cache.setTTL(10000); // 10 seconds
 * ```
 *
 */
export function LRUTTL<K, V>(options: { max: number, ttl: number }): LRUTTLCache<K, V> {
    let max = validateMax("Cache.LRUTTL({ max })", options.max)
    let ttl = validateTTL("Cache.LRUTTL({ ttl })", options.ttl)
    const entries = new Map<K, LRUTTLCacheEntry<V>>()

    function evict(): void {
        const now = Date.now()
        for (const [key, entry] of entries) {
            if (entry.date + ttl <= now) {
                entries.delete(key)
            }
            else {
                break
            }
        }
    }

    return {
        data: { entries },
        evict,
        del(key) {
            entries.delete(key)
            evict()
        },
        get(key) {
            evict()
            const entry = entries.get(key)
            if (entry) {
                entry.date = Date.now()
                entries.delete(key)
                entries.set(key, entry)
            }
            return entry?.value
        },
        has(key) {
            evict()
            return entries.has(key)
        },
        set(key, value) {
            evict()

            const entry = entries.get(key)

            if (entry) {
                entry.value = value
                entry.date = Date.now()
                entries.delete(key)
                entries.set(key, entry)
                return
            }

            entries.set(key, {
                date: Date.now(),
                value,
            })

            if (entries.size > max) {
                entries.delete(entries.keys().next().value!)
            }
        },
        setMax(newMax) {
            max = validateMax("LRUTTL.setMax(max)", newMax)
            const iterator = entries.keys()
            while (entries.size > newMax) {
                entries.delete(iterator.next().value!)
            }
        },
        setTTL(newTTL) {
            ttl = validateTTL("LRUTTL.setTTL(ttl)", newTTL)
            evict()
        },
    }
}
