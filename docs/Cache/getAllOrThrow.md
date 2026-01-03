# getAllOrThrow

```ts
function Cache.getAllOrThrow(cache: Cache<K, V>, keys: Iterable<K>): V[]
```

Gets multiple values from the cache by keys, throwing an error if any key doesn't exist.

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);
Cache.set(cache, "bar", 100);

Cache.getAllOrThrow(cache, ["foo", "bar"]); // [42, 100]
Cache.getAllOrThrow(cache, ["foo", "baz"]); // throws Error
```
