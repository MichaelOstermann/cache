import type { Cache } from "./types"
import { validateMax } from "./internals/validateMax"

export interface FIFOCache<K, V> extends Cache<K, V> {
    data: { entries: Map<K, V> }
    setMax: (max: number) => void
}

/**
 * # FIFO
 *
 * ```ts
 * function Cache.FIFO<K, V>(options: {
 *     max: number
 *     onHit?: (key: K) => void
 *     onMiss?: (key: K) => void
 * }): FIFOCache<K, V>
 * ```
 *
 * Creates a cache with a FIFO (First In, First Out) eviction policy backed by a Map. When the cache exceeds `max` size, the oldest entry is removed.
 *
 * ## Properties
 *
 * - **data.entries**: The underlying `Map` instance
 * - **setMax(max)**: Updates the maximum cache size
 *
 * ## Use Cases
 *
 * - When you want simple, predictable eviction order
 * - When access patterns don't matter (unlike LRU)
 * - When you need a bounded cache with minimal overhead
 *
 * ## Example
 *
 * ```ts
 * import { Cache } from "@monstermann/cache";
 *
 * const cache = Cache.FIFO<string, number>({ max: 3 });
 *
 * Cache.set(cache, "a", 1);
 * Cache.set(cache, "b", 2);
 * Cache.set(cache, "c", 3);
 * Cache.set(cache, "d", 4); // "a" is evicted (oldest)
 *
 * Cache.has(cache, "a"); // false
 * Cache.has(cache, "b"); // true
 *
 * // Dynamically adjust max size
 * cache.setMax(2); // "b" is evicted
 * Cache.has(cache, "b"); // false
 * ```
 *
 */
export function FIFO<K, V>(options: {
    max: number
    onHit?: (key: K) => void
    onMiss?: (key: K) => void
}): FIFOCache<K, V> {
    let max = validateMax("Cache.FIFO({ max })", options.max)
    const entries = new Map<K, V>()
    const { onHit, onMiss } = options
    return {
        data: { entries },
        del(key) {
            entries.delete(key)
        },
        get(key) {
            if (entries.has(key)) {
                onHit?.(key)
                return entries.get(key)
            }
            onMiss?.(key)
            return undefined
        },
        has(key) {
            return entries.has(key)
        },
        set(key, value) {
            const isNew = !entries.has(key)
            entries.set(key, value)
            if (isNew && entries.size > max) {
                entries.delete(entries.keys().next().value!)
            }
        },
        setMax(newMax) {
            max = validateMax("FIFO.setMax(max)", newMax)
            const iterator = entries.keys()
            while (entries.size > max) {
                entries.delete(iterator.next().value!)
            }
        },
    }
}
