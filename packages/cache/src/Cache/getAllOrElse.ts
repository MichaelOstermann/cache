import type { Cache } from "./types"

/**
 * # getAllOrElse
 *
 * ```ts
 * function Cache.getAllOrElse(
 *     cache: Cache<K, V>,
 *     keys: Iterable<K>,
 *     orElse: (cache: Cache<K, V>, key: K) => T
 * ): (V | T)[]
 * ```
 *
 * Gets multiple values from the cache by keys, calling the fallback function for each missing key. Useful for lazy computation or setting default values in the cache.
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
 * Cache.getAllOrElse(cache, ["foo", "bar", "baz"], () => 0); // [42, 100, 0]
 *
 * // Set default values for missing keys
 * Cache.getAllOrElse(cache, ["foo", "qux", "quux"], (c, key) => {
 *     return Cache.set(c, key, key.length);
 * }); // [42, 3, 4]
 * ```
 *
 */
export function getAllOrElse<K, V, T>(cache: Cache<K, V>, keys: Iterable<NoInfer<K>>, orElse: (cache: Cache<K, V>, key: K) => T): (V | T)[] {
    const result: (V | T)[] = []
    for (const key of keys) {
        if (cache.has(key)) result.push(cache.get(key)!)
        else result.push(orElse(cache, key))
    }
    return result
}
