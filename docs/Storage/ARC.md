# ARC

```ts
function Cache.ARC<K, V>(options: { max: number }): ARCCache<K, V>
```

Creates a cache using the [Adaptive Replacement Cache](https://en.wikipedia.org/wiki/Adaptive_replacement_cache) (ARC) algorithm. ARC balances between recency (LRU) and frequency, adapting to access patterns. It maintains both recently used entries and frequently used entries, automatically adjusting the balance based on workload.

## Properties

- **data.t1**: Recently accessed entries (recency list)
- **data.t2**: Frequently accessed entries (frequency list)
- **data.b1**: Ghost entries evicted from t1
- **data.b2**: Ghost entries evicted from t2
- **data.p**: Target size for t1

## Algorithm

ARC maintains four lists:

- **T1**: Recent cache entries (first access)
- **T2**: Frequent cache entries (multiple accesses)
- **B1**: Ghost entries recently evicted from T1
- **B2**: Ghost entries recently evicted from T2

The algorithm adapts parameter `p` to favor recency or frequency based on whether cache misses come from B1 or B2.

## Use Cases

- When access patterns vary between recency and frequency
- When you want optimal cache performance without tuning
- When you need better hit rates than pure LRU or LFU

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.ARC<string, number>({ max: 4 });

// First access - goes to T1 (recency)
Cache.set(cache, "a", 1);
Cache.set(cache, "b", 2);

// Second access - promotes to T2 (frequency)
Cache.get(cache, "a"); // Promotes "a" to T2

Cache.set(cache, "c", 3);
Cache.set(cache, "d", 4);

// Access pattern determines which entries stay cached
Cache.get(cache, "a"); // Frequently accessed, stays in T2
Cache.set(cache, "e", 5); // May evict from T1 or T2 based on pattern

// Inspect internals
cache.data.t1.size; // Recent entries
cache.data.t2.size; // Frequent entries
cache.data.p; // Adaptive parameter
```
