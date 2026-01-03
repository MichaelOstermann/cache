# getOr

```ts
function Cache.getOr(cache: Cache<K, V>, key: K, or: T): V | T
```

Gets a value from the cache by key, returning the fallback value if the key doesn't exist.

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);

Cache.getOr(cache, "foo", 0); // 42
Cache.getOr(cache, "bar", 0); // 0
```
