# has

```ts
function Cache.has(cache: Cache<K, V>, key: K): boolean
```

Checks if a key exists in the cache.

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);

Cache.has(cache, "foo"); // true
Cache.has(cache, "bar"); // false
```
