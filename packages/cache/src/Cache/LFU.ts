import type { Cache } from "./types"
import { validateMax } from "./internals/validateMax"

export interface LFUCacheEntry<K, V> {
    count: number
    key: K
    next: LFUCacheEntry<K, V> | undefined
    prev: LFUCacheEntry<K, V> | undefined
    value: V
}

export interface LFUCache<K, V> extends Cache<K, V> {
    data: {
        entries: Map<K, LFUCacheEntry<K, V>>
        first: LFUCacheEntry<K, V> | undefined
        last: LFUCacheEntry<K, V> | undefined
    }
    setMax: (max: number) => void
}

/**
 * # LFU
 *
 * ```ts
 * function Cache.LFU<K, V>(options: { max: number }): LFUCache<K, V>
 * ```
 *
 * Creates a cache with an LFU (Least Frequently Used) eviction policy backed by a Map and doubly linked list. When the cache exceeds `max` size, the least frequently accessed entry is removed. Both reads and writes increment the access frequency counter.
 *
 * ## Properties
 *
 * - **data.entries**: The underlying `Map<K, LFUCacheEntry<K, V>>` instance
 * - **data.first**: The least frequently used entry in the cache
 * - **data.last**: The most frequently used entry in the cache
 * - **setMax(max)**: Updates the maximum cache size
 *
 * ## Use Cases
 *
 * - When you want to keep frequently accessed items in cache regardless of recency
 * - When access frequency is more important than recency (unlike LRU)
 * - When hot data has consistent access patterns over time
 * - Long-running caches where popular items should persist even if not accessed recently
 *
 * ## Example
 *
 * ```ts
 * import { Cache } from "@monstermann/cache";
 *
 * const cache = Cache.LFU<string, number>({ max: 3 });
 *
 * Cache.set(cache, "a", 1);
 * Cache.set(cache, "b", 2);
 * Cache.set(cache, "c", 3);
 *
 * Cache.get(cache, "a"); // "a" frequency: 2
 * Cache.get(cache, "a"); // "a" frequency: 3
 * Cache.get(cache, "b"); // "b" frequency: 2
 *
 * Cache.set(cache, "d", 4); // "c" is evicted (least frequently used, frequency: 1)
 *
 * Cache.has(cache, "a"); // true
 * Cache.has(cache, "b"); // true
 * Cache.has(cache, "c"); // false
 * Cache.has(cache, "d"); // true
 *
 * // Dynamically adjust max size
 * cache.setMax(2); // "d" is evicted (lowest frequency)
 * Cache.has(cache, "d"); // false
 * ```
 *
 */
export function LFU<K, V>(options: { max: number }): LFUCache<K, V> {
    let max = validateMax("Cache.LFU({ max })", options.max)
    const entries = new Map<K, LFUCacheEntry<K, V>>()
    const data: LFUCache<K, V>["data"] = {
        entries,
        first: undefined,
        last: undefined,
    }

    const removeFromList = (entry: LFUCacheEntry<K, V>) => {
        if (entry.prev) {
            entry.prev.next = entry.next
        }
        else {
            data.first = entry.next
        }
        if (entry.next) {
            entry.next.prev = entry.prev
        }
        else {
            data.last = entry.prev
        }
        entry.prev = undefined
        entry.next = undefined
    }

    const insertAfter = (entry: LFUCacheEntry<K, V>, after: LFUCacheEntry<K, V> | undefined) => {
        if (after === undefined) {
            entry.next = data.first
            entry.prev = undefined
            if (data.first) {
                data.first.prev = entry
            }
            else {
                data.last = entry
            }
            data.first = entry
        }
        else {
            entry.prev = after
            entry.next = after.next
            after.next = entry
            if (entry.next) {
                entry.next.prev = entry
            }
            else {
                data.last = entry
            }
        }
    }

    const reposition = (entry: LFUCacheEntry<K, V>) => {
        removeFromList(entry)
        let current = data.last
        while (current && current.count > entry.count) {
            current = current.prev
        }
        insertAfter(entry, current)
    }

    return {
        data,
        del(key) {
            const entry = entries.get(key)
            if (entry) {
                removeFromList(entry)
                entries.delete(key)
            }
        },
        get(key) {
            const entry = entries.get(key)
            if (entry) {
                entry.count++
                reposition(entry)
                return entry.value
            }
            return undefined
        },
        has(key) {
            return entries.has(key)
        },
        set(key, value) {
            const existing = entries.get(key)
            if (existing) {
                existing.value = value
                existing.count++
                reposition(existing)
            }
            else {
                const entry: LFUCacheEntry<K, V> = {
                    count: 1,
                    key,
                    next: undefined,
                    prev: undefined,
                    value,
                }
                entries.set(key, entry)
                insertAfter(entry, undefined)
                if (entries.size > max) {
                    if (data.first) {
                        entries.delete(data.first.key)
                        removeFromList(data.first)
                    }
                }
            }
        },
        setMax(newMax) {
            max = validateMax("LFU.setMax(max)", newMax)
            while (entries.size > max && data.first) {
                entries.delete(data.first.key)
                removeFromList(data.first)
            }
        },
    }
}
