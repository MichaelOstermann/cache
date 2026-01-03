import type { Cache } from "./types"

/**
 * # setAll
 *
 * ```ts
 * function Cache.setAll(cache: Cache<K, V>, entries: [K, V][]): void
 * ```
 *
 * Sets multiple key-value pairs in the cache at once.
 *
 * ## Example
 *
 * ```ts
 * import { Cache } from "@monstermann/cache";
 *
 * const cache = Cache.Map<string, number>();
 *
 * Cache.setAll(cache, [
 *     ["foo", 42],
 *     ["bar", 100],
 *     ["baz", 200],
 * ]);
 *
 * Cache.get(cache, "foo"); // 42
 * Cache.get(cache, "bar"); // 100
 * Cache.get(cache, "baz"); // 200
 * ```
 *
 */
export function setAll<K, V>(cache: Cache<K, V>, entries: [NoInfer<K>, NoInfer<V>][]): void {
    for (const [key, value] of entries) cache.set(key, value)
}
