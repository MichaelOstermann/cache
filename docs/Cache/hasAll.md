# hasAll

```ts
function Cache.hasAll(cache: Cache<K, V>, keys: Iterable<K>): boolean
```

Checks if all keys exist in the cache. Returns `true` only if every key is present.

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);
Cache.set(cache, "bar", 100);

Cache.hasAll(cache, ["foo", "bar"]); // true
Cache.hasAll(cache, ["foo", "baz"]); // false
```
