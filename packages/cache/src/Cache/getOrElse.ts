import type { Cache } from "./types"

/**
 * # getOrElse
 *
 * ```ts
 * function Cache.getOrElse(
 *     cache: Cache<K, V>,
 *     key: K,
 *     orElse: (cache: Cache<K, V>) => T
 * ): V | T
 * ```
 *
 * Gets a value from the cache by key, calling the fallback function if the key doesn't exist. Useful for lazy computation or setting a default value in the cache.
 *
 * ## Example
 *
 * ```ts
 * import { Cache } from "@monstermann/cache";
 *
 * const cache = Cache.Map<string, number>();
 *
 * Cache.set(cache, "foo", 42);
 *
 * Cache.getOrElse(cache, "foo", () => 0); // 42
 * Cache.getOrElse(cache, "bar", () => 0); // 0
 *
 * // Set default value if missing
 * Cache.getOrElse(cache, "baz", (c) => {
 *     return Cache.set(c, "baz", 100);
 * }); // 100
 * ```
 *
 */
export function getOrElse<K, V, T>(cache: Cache<K, V>, key: NoInfer<K>, orElse: (cache: Cache<K, V>) => T): V | T {
    if (!cache.has(key)) return orElse(cache)
    return cache.get(key)!
}
