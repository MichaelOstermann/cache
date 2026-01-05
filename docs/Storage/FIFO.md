# FIFO

```ts
function Cache.FIFO<K, V>(options: {
    max: number
    onHit?: (key: K) => void
    onMiss?: (key: K) => void
}): FIFOCache<K, V>
```

Creates a cache with a FIFO (First In, First Out) eviction policy backed by a Map. When the cache exceeds `max` size, the oldest entry is removed.

## Properties

- **data.entries**: The underlying `Map` instance
- **setMax(max)**: Updates the maximum cache size

## Use Cases

- When you want simple, predictable eviction order
- When access patterns don't matter (unlike LRU)
- When you need a bounded cache with minimal overhead

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.FIFO<string, number>({ max: 3 });

Cache.set(cache, "a", 1);
Cache.set(cache, "b", 2);
Cache.set(cache, "c", 3);
Cache.set(cache, "d", 4); // "a" is evicted (oldest)

Cache.has(cache, "a"); // false
Cache.has(cache, "b"); // true

// Dynamically adjust max size
cache.setMax(2); // "b" is evicted
Cache.has(cache, "b"); // false
```
