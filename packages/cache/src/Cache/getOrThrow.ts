import type { Cache } from "./types"

/**
 * # getOrThrow
 *
 * ```ts
 * function Cache.getOrThrow(cache: Cache<K, V>, key: K): V
 * ```
 *
 * Gets a value from the cache by key, throwing an error if the key doesn't exist.
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
 * Cache.getOrThrow(cache, "foo"); // 42
 * Cache.getOrThrow(cache, "bar"); // throws Error
 * ```
 *
 */
export function getOrThrow<K, V>(cache: Cache<K, V>, key: NoInfer<K>): V {
    if (!cache.has(key)) throw new Error(`Cache.getOrThrow(cache, key): key "${key}" not found`)
    return cache.get(key)!
}
