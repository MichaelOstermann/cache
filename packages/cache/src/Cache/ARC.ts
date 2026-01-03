import type { Cache } from "./types"
import { validateMax } from "./internals/validateMax"

export interface ARCCache<K, V> extends Cache<K, V> {
    data: {
        b1: Set<K>
        b2: Set<K>
        p: number
        t1: Map<K, V>
        t2: Map<K, V>
    }
}

/**
 * # ARC
 *
 * ```ts
 * function Cache.ARC<K, V>(options: { max: number }): ARCCache<K, V>
 * ```
 *
 * Creates a cache using the [Adaptive Replacement Cache](https://en.wikipedia.org/wiki/Adaptive_replacement_cache) (ARC) algorithm. ARC balances between recency (LRU) and frequency, adapting to access patterns. It maintains both recently used entries and frequently used entries, automatically adjusting the balance based on workload.
 *
 * ## Properties
 *
 * - **data.t1**: Recently accessed entries (recency list)
 * - **data.t2**: Frequently accessed entries (frequency list)
 * - **data.b1**: Ghost entries evicted from t1
 * - **data.b2**: Ghost entries evicted from t2
 * - **data.p**: Target size for t1
 *
 * ## Algorithm
 *
 * ARC maintains four lists:
 *
 * - **T1**: Recent cache entries (first access)
 * - **T2**: Frequent cache entries (multiple accesses)
 * - **B1**: Ghost entries recently evicted from T1
 * - **B2**: Ghost entries recently evicted from T2
 *
 * The algorithm adapts parameter `p` to favor recency or frequency based on whether cache misses come from B1 or B2.
 *
 * ## Use Cases
 *
 * - When access patterns vary between recency and frequency
 * - When you want optimal cache performance without tuning
 * - When you need better hit rates than pure LRU or LFU
 *
 * ## Example
 *
 * ```ts
 * import { Cache } from "@monstermann/cache";
 *
 * const cache = Cache.ARC<string, number>({ max: 4 });
 *
 * // First access - goes to T1 (recency)
 * Cache.set(cache, "a", 1);
 * Cache.set(cache, "b", 2);
 *
 * // Second access - promotes to T2 (frequency)
 * Cache.get(cache, "a"); // Promotes "a" to T2
 *
 * Cache.set(cache, "c", 3);
 * Cache.set(cache, "d", 4);
 *
 * // Access pattern determines which entries stay cached
 * Cache.get(cache, "a"); // Frequently accessed, stays in T2
 * Cache.set(cache, "e", 5); // May evict from T1 or T2 based on pattern
 *
 * // Inspect internals
 * cache.data.t1.size; // Recent entries
 * cache.data.t2.size; // Frequent entries
 * cache.data.p; // Adaptive parameter
 * ```
 *
 */
export function ARC<K, V>(options: { max: number }): ARCCache<K, V> {
    validateMax("ARC", options.max)
    const max = options.max
    const t1 = new Map<K, V>()
    const t2 = new Map<K, V>()
    const b1 = new Set<K>()
    const b2 = new Set<K>()
    const data: ARCCache<K, V>["data"] = { b1, b2, p: 0, t1, t2 }

    function trimGhosts(): void {
        while (b1.size + b2.size > max) {
            const L1 = t1.size + b1.size
            if (L1 > max && b1.size > 0) {
                const old = b1.values().next().value!
                b1.delete(old)
            }
            else if (b2.size > 0) {
                const old = b2.values().next().value!
                b2.delete(old)
            }
            else if (b1.size > 0) {
                const old = b1.values().next().value!
                b1.delete(old)
            }
            else {
                break
            }
        }
    }

    function replace(key: K): void {
        if (
            t1.size > 0
            && (t1.size > data.p
                || (b2.has(key) && t1.size === data.p)
                || t2.size === 0)
        ) {
            const lruKey = t1.keys().next().value!
            t1.delete(lruKey)
            b1.add(lruKey)
            trimGhosts()
        }
        else if (t2.size > 0) {
            const lruKey = t2.keys().next().value!
            t2.delete(lruKey)
            b2.add(lruKey)
            trimGhosts()
        }
    }

    return {
        data,
        del(key) {
            t1.delete(key)
            t2.delete(key)
        },
        get(key) {
            if (t1.has(key)) {
                const value = t1.get(key) as V
                t1.delete(key)
                t2.set(key, value)
                return value
            }

            if (t2.has(key)) {
                const value = t2.get(key) as V
                t2.delete(key)
                t2.set(key, value)
                return value
            }

            return undefined
        },
        has(key) {
            return t1.has(key) || t2.has(key)
        },
        set(key, value) {
            if (t1.has(key)) {
                t1.delete(key)
                t2.set(key, value)
                return
            }

            if (t2.has(key)) {
                t2.delete(key)
                t2.set(key, value)
                return
            }

            if (b1.has(key)) {
                const delta = Math.max(1, Math.floor(b2.size / b1.size))
                data.p = Math.min(max, data.p + delta)

                if (t1.size + t2.size >= max) {
                    replace(key)
                }

                b1.delete(key)
                t2.set(key, value)
                return
            }

            if (b2.has(key)) {
                const delta = Math.max(1, Math.floor(b1.size / b2.size))
                data.p = Math.max(0, data.p - delta)

                if (t1.size + t2.size >= max) {
                    replace(key)
                }

                b2.delete(key)
                t2.set(key, value)
                return
            }

            if (t1.size + t2.size >= max) {
                replace(key)
            }

            t1.set(key, value)
        },
    }
}
