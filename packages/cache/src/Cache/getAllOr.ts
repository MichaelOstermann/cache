import type { Cache } from "./types"

/**
 * # getAllOr
 *
 * ```ts
 * function Cache.getAllOr(cache: Cache<K, V>, keys: Iterable<K>, or: T): (V | T)[]
 * ```
 *
 * Gets multiple values from the cache by keys, returning an array where each element is either the value or the fallback value if the key doesn't exist.
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
 * Cache.getAllOr(cache, ["foo", "bar", "baz"], 0); // [42, 100, 0]
 * ```
 *
 */
export function getAllOr<K, V, T>(cache: Cache<K, V>, keys: Iterable<NoInfer<K>>, or: T): (V | T)[] {
    const result: (V | T)[] = []
    for (const key of keys) {
        if (cache.has(key)) result.push(cache.get(key)!)
        else result.push(or)
    }
    return result
}
