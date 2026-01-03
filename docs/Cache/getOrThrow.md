# getOrThrow

```ts
function Cache.getOrThrow(cache: Cache<K, V>, key: K): V
```

Gets a value from the cache by key, throwing an error if the key doesn't exist.

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);

Cache.getOrThrow(cache, "foo"); // 42
Cache.getOrThrow(cache, "bar"); // throws Error
```
