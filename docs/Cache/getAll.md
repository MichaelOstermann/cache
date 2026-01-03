# getAll

```ts
function Cache.getAll(cache: Cache<K, V>, keys: Iterable<K>): (V | undefined)[]
```

Gets multiple values from the cache by keys, returning an array where each element is either the value or `undefined` if the key doesn't exist.

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);
Cache.set(cache, "bar", 100);

Cache.getAll(cache, ["foo", "bar", "baz"]); // [42, 100, undefined]
```
