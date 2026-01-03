# removeAll

```ts
function Cache.removeAll(cache: Cache<K, V>, keys: Iterable<K>): void
```

Removes multiple keys from the cache. Keys that don't exist are silently ignored.

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);
Cache.set(cache, "bar", 100);
Cache.set(cache, "baz", 200);

Cache.removeAll(cache, ["foo", "baz"]);

Cache.has(cache, "foo"); // false
Cache.has(cache, "bar"); // true
Cache.has(cache, "baz"); // false
```
