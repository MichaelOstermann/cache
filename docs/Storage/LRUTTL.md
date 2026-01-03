# LRUTTL

```ts
function Cache.LRUTTL<K, V>(options: { max: number, ttl: number }): LRUTTLCache<K, V>
```

Creates a cache with both LRU (Least Recently Used) eviction and TTL (Time To Live) expiration backed by a Map. Entries are evicted when the cache exceeds `max` size or when they exceed the `ttl` duration in milliseconds.

## Properties

- **data.entries**: The underlying `Map` instance storing entries with timestamps
- **evict()**: Manually trigger eviction of expired entries
- **setMax(max)**: Updates the maximum cache size
- **setTTL(ttl)**: Updates the TTL duration and evicts expired entries

## Use Cases

- When you need time-based expiration in addition to size limits
- When data becomes stale after a certain period

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.LRUTTL<string, number>({
    max: 100,
    ttl: 5000, // 5 seconds
});

Cache.set(cache, "a", 1);
Cache.get(cache, "a"); // 1

// After 5+ seconds
Cache.get(cache, "a"); // undefined (expired)

// Manual eviction
Cache.set(cache, "b", 2);
cache.evict(); // Remove expired entries

// Adjust TTL at runtime
cache.setTTL(10000); // 10 seconds
```
