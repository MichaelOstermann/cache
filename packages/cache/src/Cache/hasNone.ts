import type { Cache } from "./types"

/**
 * # hasNone
 *
 * ```ts
 * function Cache.hasNone(cache: Cache<K, V>, keys: Iterable<K>): boolean
 * ```
 *
 * Checks if none of the keys exist in the cache. Returns `true` only if every key is absent.
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
 * Cache.hasNone(cache, ["baz", "qux"]); // true
 * Cache.hasNone(cache, ["foo", "bar"]); // false
 * ```
 *
 */
export function hasNone<K, V>(cache: Cache<K, V>, keys: Iterable<NoInfer<K>>): boolean {
    for (const key of keys) {
        if (cache.has(key)) return false
    }
    return true
}
