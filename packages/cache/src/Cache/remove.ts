import type { Cache } from "./types"

/**
 * # remove
 *
 * ```ts
 * function Cache.remove(cache: Cache<K, V>, key: K): void
 * ```
 *
 * Removes a key from the cache.
 *
 * ## Example
 *
 * ```ts
 * import { Cache } from "@monstermann/cache";
 *
 * const cache = Cache.Map<string, number>();
 *
 * Cache.set(cache, "foo", 42);
 * Cache.has(cache, "foo"); // true
 *
 * Cache.remove(cache, "foo");
 * Cache.has(cache, "foo"); // false
 * ```
 *
 */
export function remove<K, V>(cache: Cache<K, V>, key: NoInfer<K>): void {
    cache.del(key)
}
