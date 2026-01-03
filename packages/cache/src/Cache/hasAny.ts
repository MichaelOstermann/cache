import type { Cache } from "./types"

/**
 * # hasAny
 *
 * ```ts
 * function Cache.hasAny(cache: Cache<K, V>, keys: Iterable<K>): boolean
 * ```
 *
 * Checks if any of the keys exist in the cache. Returns `true` if at least one key is present.
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
 * Cache.hasAny(cache, ["foo", "bar"]); // true
 * Cache.hasAny(cache, ["baz", "qux"]); // false
 * ```
 *
 */
export function hasAny<K, V>(cache: Cache<K, V>, keys: Iterable<NoInfer<K>>): boolean {
    for (const key of keys) {
        if (cache.has(key)) return true
    }
    return false
}
