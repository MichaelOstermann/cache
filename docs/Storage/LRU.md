# LRU

```ts
function Cache.LRU<K, V>(options: {
    max: number
    onHit?: (key: K) => void
    onMiss?: (key: K) => void
}): LRUCache<K, V>
```

Creates a cache with an LRU (Least Recently Used) eviction policy backed by a Map. When the cache exceeds `max` size, the least recently accessed entry is removed. Both reads and writes update recency.

## Properties

- **data.entries**: The underlying `Map` instance
- **setMax(max)**: Updates the maximum cache size

## Use Cases

- When you want to keep frequently accessed items in cache
- Standard caching scenarios where hot data should stay cached
- When access patterns have locality (recently used items are likely to be used again)

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.LRU<string, number>({ max: 3 });

Cache.set(cache, "a", 1);
Cache.set(cache, "b", 2);
Cache.set(cache, "c", 3);

Cache.get(cache, "a"); // Access "a", making it most recent

Cache.set(cache, "d", 4); // "b" is evicted (least recently used)

Cache.has(cache, "a"); // true
Cache.has(cache, "b"); // false
Cache.has(cache, "c"); // true
```
