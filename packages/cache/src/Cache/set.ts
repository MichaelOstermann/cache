import type { Cache } from "./types"

/**
 * # set
 *
 * ```ts
 * function Cache.set(cache: Cache<K, V>, key: K, value: V): V
 * ```
 *
 * Sets a value in the cache and returns the value.
 *
 * ## Example
 *
 * ```ts
 * import { Cache } from "@monstermann/cache";
 *
 * const cache = Cache.Map<string, number>();
 *
 * Cache.set(cache, "foo", 42); // 42
 * Cache.set(cache, "bar", 100); // 100
 *
 * Cache.get(cache, "foo"); // 42
 * Cache.get(cache, "bar"); // 100
 * ```
 *
 */
export function set<K, V>(cache: Cache<K, V>, key: NoInfer<K>, value: NoInfer<V>): V {
    cache.set(key, value)
    return value
}
