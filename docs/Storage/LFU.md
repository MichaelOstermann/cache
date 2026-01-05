# LFU

```ts
function Cache.LFU<K, V>(options: { max: number }): LFUCache<K, V>
```

Creates a cache with an LFU (Least Frequently Used) eviction policy backed by a Map and doubly linked list. When the cache exceeds `max` size, the least frequently accessed entry is removed. Both reads and writes increment the access frequency counter.

## Properties

- **data.entries**: The underlying `Map<K, LFUCacheEntry<K, V>>` instance
- **data.first**: The least frequently used entry in the cache
- **data.last**: The most frequently used entry in the cache
- **setMax(max)**: Updates the maximum cache size

## Use Cases

- When you want to keep frequently accessed items in cache regardless of recency
- When access frequency is more important than recency (unlike LRU)
- When hot data has consistent access patterns over time
- Long-running caches where popular items should persist even if not accessed recently

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.LFU<string, number>({ max: 3 });

Cache.set(cache, "a", 1);
Cache.set(cache, "b", 2);
Cache.set(cache, "c", 3);

Cache.get(cache, "a"); // "a" frequency: 2
Cache.get(cache, "a"); // "a" frequency: 3
Cache.get(cache, "b"); // "b" frequency: 2

Cache.set(cache, "d", 4); // "c" is evicted (least frequently used, frequency: 1)

Cache.has(cache, "a"); // true
Cache.has(cache, "b"); // true
Cache.has(cache, "c"); // false
Cache.has(cache, "d"); // true

// Dynamically adjust max size
cache.setMax(2); // "d" is evicted (lowest frequency)
Cache.has(cache, "d"); // false
```
