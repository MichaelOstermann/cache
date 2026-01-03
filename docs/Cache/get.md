# get

```ts
function Cache.get(cache: Cache<K, V>, key: K): V | undefined
```

Gets a value from the cache by key, returning `undefined` if the key doesn't exist.

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);

Cache.get(cache, "foo"); // 42
Cache.get(cache, "bar"); // undefined
```
