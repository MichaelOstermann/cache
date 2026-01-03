# WeakMap

```ts
function Cache.WeakMap<K extends WeakKey, V>(): WeakMapCache<K, V>
```

Creates a cache backed by a JavaScript `WeakMap`. Keys must be objects and are held weakly, allowing them to be garbage collected when no other references exist.

## Properties

- **data.entries**: The underlying `WeakMap` instance

## Use Cases

- When you want to associate data with objects without preventing garbage collection
- When you need automatic cleanup of entries when keys are no longer referenced

## Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.WeakMap<object, number>();

const obj1 = { id: 1 };
const obj2 = { id: 2 };

Cache.set(cache, obj1, 42);
Cache.set(cache, obj2, 100);

Cache.get(cache, obj1); // 42

// When obj1 is no longer referenced elsewhere,
// it will be automatically removed from the cache
```
