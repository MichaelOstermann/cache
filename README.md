<div align="center">

<h1>cache</h1>

![Minified](https://img.shields.io/badge/Minified-4.14_KB-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff) ![Minzipped](https://img.shields.io/badge/Minzipped-1.21_KB-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff)

**Functional cache utilities.**

[Documentation](https://MichaelOstermann.github.io/cache)

</div>

## Example

```ts
import { Cache } from "@monstermann/cache";

// Create a LRU cache with a maximum of 100 items
const cache = Cache.LRU<string, number>({ max: 100 });

// Set values
Cache.set(cache, "foo", 1);
Cache.set(cache, "bar", 2);

// Get values
const foo = Cache.get(cache, "foo"); // 1
const missing = Cache.get(cache, "unknown"); // undefined

// Get or compute and cache a value
const score = Cache.getOrElse(cache, "baz", (c) => {
    return Cache.set(c, "baz", 3);
});

// Check existence
Cache.has(cache, "foo"); // true

// Remove values
Cache.remove(cache, "bar");
```

## Installation

```sh [npm]
npm install @monstermann/cache
```

```sh [pnpm]
pnpm add @monstermann/cache
```

```sh [yarn]
yarn add @monstermann/cache
```

```sh [bun]
bun add @monstermann/cache
```

## Tree-shaking

### Installation

```sh [npm]
npm install -D @monstermann/unplugin-cache
```

```sh [pnpm]
pnpm -D add @monstermann/unplugin-cache
```

```sh [yarn]
yarn -D add @monstermann/unplugin-cache
```

```sh [bun]
bun -D add @monstermann/unplugin-cache
```

### Usage

```ts [Vite]
// vite.config.ts
import cache from "@monstermann/unplugin-cache/vite";

export default defineConfig({
    plugins: [cache()],
});
```

```ts [Rollup]
// rollup.config.js
import cache from "@monstermann/unplugin-cache/rollup";

export default {
    plugins: [cache()],
};
```

```ts [Rolldown]
// rolldown.config.js
import cache from "@monstermann/unplugin-cache/rolldown";

export default {
    plugins: [cache()],
};
```

```ts [Webpack]
// webpack.config.js
const cache = require("@monstermann/unplugin-cache/webpack");

module.exports = {
    plugins: [cache()],
};
```

```ts [Rspack]
// rspack.config.js
const cache = require("@monstermann/unplugin-cache/rspack");

module.exports = {
    plugins: [cache()],
};
```

```ts [ESBuild]
// esbuild.config.js
import { build } from "esbuild";
import cache from "@monstermann/unplugin-cache/esbuild";

build({
    plugins: [cache()],
});
```

## Cache

### get

```ts
function Cache.get(cache: Cache<K, V>, key: K): V | undefined
```

Gets a value from the cache by key, returning `undefined` if the key doesn't exist.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);

Cache.get(cache, "foo"); // 42
Cache.get(cache, "bar"); // undefined
```

### getAll

```ts
function Cache.getAll(cache: Cache<K, V>, keys: Iterable<K>): (V | undefined)[]
```

Gets multiple values from the cache by keys, returning an array where each element is either the value or `undefined` if the key doesn't exist.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);
Cache.set(cache, "bar", 100);

Cache.getAll(cache, ["foo", "bar", "baz"]); // [42, 100, undefined]
```

### getAllOr

```ts
function Cache.getAllOr(cache: Cache<K, V>, keys: Iterable<K>, or: T): (V | T)[]
```

Gets multiple values from the cache by keys, returning an array where each element is either the value or the fallback value if the key doesn't exist.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);
Cache.set(cache, "bar", 100);

Cache.getAllOr(cache, ["foo", "bar", "baz"], 0); // [42, 100, 0]
```

### getAllOrElse

```ts
function Cache.getAllOrElse(
    cache: Cache<K, V>,
    keys: Iterable<K>,
    orElse: (cache: Cache<K, V>, key: K) => T
): (V | T)[]
```

Gets multiple values from the cache by keys, calling the fallback function for each missing key. Useful for lazy computation or setting default values in the cache.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);
Cache.set(cache, "bar", 100);

Cache.getAllOrElse(cache, ["foo", "bar", "baz"], () => 0); // [42, 100, 0]

// Set default values for missing keys
Cache.getAllOrElse(cache, ["foo", "qux", "quux"], (c, key) => {
    return Cache.set(c, key, key.length);
}); // [42, 3, 4]
```

### getAllOrThrow

```ts
function Cache.getAllOrThrow(cache: Cache<K, V>, keys: Iterable<K>): V[]
```

Gets multiple values from the cache by keys, throwing an error if any key doesn't exist.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);
Cache.set(cache, "bar", 100);

Cache.getAllOrThrow(cache, ["foo", "bar"]); // [42, 100]
Cache.getAllOrThrow(cache, ["foo", "baz"]); // throws Error
```

### getOr

```ts
function Cache.getOr(cache: Cache<K, V>, key: K, or: T): V | T
```

Gets a value from the cache by key, returning the fallback value if the key doesn't exist.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);

Cache.getOr(cache, "foo", 0); // 42
Cache.getOr(cache, "bar", 0); // 0
```

### getOrElse

```ts
function Cache.getOrElse(
    cache: Cache<K, V>,
    key: K,
    orElse: (cache: Cache<K, V>) => T
): V | T
```

Gets a value from the cache by key, calling the fallback function if the key doesn't exist. Useful for lazy computation or setting a default value in the cache.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);

Cache.getOrElse(cache, "foo", () => 0); // 42
Cache.getOrElse(cache, "bar", () => 0); // 0

// Set default value if missing
Cache.getOrElse(cache, "baz", (c) => {
    return Cache.set(c, "baz", 100);
}); // 100
```

### getOrThrow

```ts
function Cache.getOrThrow(cache: Cache<K, V>, key: K): V
```

Gets a value from the cache by key, throwing an error if the key doesn't exist.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);

Cache.getOrThrow(cache, "foo"); // 42
Cache.getOrThrow(cache, "bar"); // throws Error
```

### has

```ts
function Cache.has(cache: Cache<K, V>, key: K): boolean
```

Checks if a key exists in the cache.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);

Cache.has(cache, "foo"); // true
Cache.has(cache, "bar"); // false
```

### hasAll

```ts
function Cache.hasAll(cache: Cache<K, V>, keys: Iterable<K>): boolean
```

Checks if all keys exist in the cache. Returns `true` only if every key is present.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);
Cache.set(cache, "bar", 100);

Cache.hasAll(cache, ["foo", "bar"]); // true
Cache.hasAll(cache, ["foo", "baz"]); // false
```

### hasAny

```ts
function Cache.hasAny(cache: Cache<K, V>, keys: Iterable<K>): boolean
```

Checks if any of the keys exist in the cache. Returns `true` if at least one key is present.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);

Cache.hasAny(cache, ["foo", "bar"]); // true
Cache.hasAny(cache, ["baz", "qux"]); // false
```

### hasNone

```ts
function Cache.hasNone(cache: Cache<K, V>, keys: Iterable<K>): boolean
```

Checks if none of the keys exist in the cache. Returns `true` only if every key is absent.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);

Cache.hasNone(cache, ["baz", "qux"]); // true
Cache.hasNone(cache, ["foo", "bar"]); // false
```

### remove

```ts
function Cache.remove(cache: Cache<K, V>, key: K): void
```

Removes a key from the cache.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);
Cache.has(cache, "foo"); // true

Cache.remove(cache, "foo");
Cache.has(cache, "foo"); // false
```

### removeAll

```ts
function Cache.removeAll(cache: Cache<K, V>, keys: Iterable<K>): void
```

Removes multiple keys from the cache. Keys that don't exist are silently ignored.

#### Example

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

### set

```ts
function Cache.set(cache: Cache<K, V>, key: K, value: V): V
```

Sets a value in the cache and returns the value.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42); // 42
Cache.set(cache, "bar", 100); // 100

Cache.get(cache, "foo"); // 42
Cache.get(cache, "bar"); // 100
```

### setAll

```ts
function Cache.setAll(cache: Cache<K, V>, entries: [K, V][]): void
```

Sets multiple key-value pairs in the cache at once.

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.setAll(cache, [
    ["foo", 42],
    ["bar", 100],
    ["baz", 200],
]);

Cache.get(cache, "foo"); // 42
Cache.get(cache, "bar"); // 100
Cache.get(cache, "baz"); // 200
```

## Storage

### FIFO

```ts
function Cache.FIFO<K, V>(options: { max: number }): FIFOCache<K, V>
```

Creates a cache with a FIFO (First In, First Out) eviction policy backed by a Map. When the cache exceeds `max` size, the oldest entry is removed.

#### Properties

- **data.entries**: The underlying `Map` instance
- **setMax(max)**: Updates the maximum cache size

#### Use Cases

- When you want simple, predictable eviction order
- When access patterns don't matter (unlike LRU)
- When you need a bounded cache with minimal overhead

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.FIFO<string, number>({ max: 3 });

Cache.set(cache, "a", 1);
Cache.set(cache, "b", 2);
Cache.set(cache, "c", 3);
Cache.set(cache, "d", 4); // "a" is evicted (oldest)

Cache.has(cache, "a"); // false
Cache.has(cache, "b"); // true

// Dynamically adjust max size
cache.setMax(2); // "b" is evicted
Cache.has(cache, "b"); // false
```

### LFU

```ts
function Cache.LFU<K, V>(options: { max: number }): LFUCache<K, V>
```

Creates a cache with an LFU (Least Frequently Used) eviction policy backed by a Map and doubly linked list. When the cache exceeds `max` size, the least frequently accessed entry is removed. Both reads and writes increment the access frequency counter.

#### Properties

- **data.entries**: The underlying `Map<K, LFUCacheEntry<K, V>>` instance
- **data.first**: The least frequently used entry in the cache
- **data.last**: The most frequently used entry in the cache
- **setMax(max)**: Updates the maximum cache size

#### Use Cases

- When you want to keep frequently accessed items in cache regardless of recency
- When access frequency is more important than recency (unlike LRU)
- When hot data has consistent access patterns over time
- Long-running caches where popular items should persist even if not accessed recently

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.LFU<string, number>({ max: 3 });

Cache.set(cache, "a", 1);
Cache.set(cache, "b", 2);
Cache.set(cache, "c", 3);

Cache.get(cache, "a"); // "a" frequency: 2
Cache.get(cache, "a"); // "a" frequency: 3
Cache.get(cache, "b"); // "b" frequency: 2

Cache.set(cache, "d", 4); // "c" is evicted (least frequently used, frequency: 1)

Cache.has(cache, "a"); // true
Cache.has(cache, "b"); // true
Cache.has(cache, "c"); // false
Cache.has(cache, "d"); // true

// Dynamically adjust max size
cache.setMax(2); // "d" is evicted (lowest frequency)
Cache.has(cache, "d"); // false
```

### LRU

```ts
function Cache.LRU<K, V>(options: { max: number }): LRUCache<K, V>
```

Creates a cache with an LRU (Least Recently Used) eviction policy backed by a Map. When the cache exceeds `max` size, the least recently accessed entry is removed. Both reads and writes update recency.

#### Properties

- **data.entries**: The underlying `Map` instance
- **setMax(max)**: Updates the maximum cache size

#### Use Cases

- When you want to keep frequently accessed items in cache
- Standard caching scenarios where hot data should stay cached
- When access patterns have locality (recently used items are likely to be used again)

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.LRU<string, number>({ max: 3 });

Cache.set(cache, "a", 1);
Cache.set(cache, "b", 2);
Cache.set(cache, "c", 3);

Cache.get(cache, "a"); // Access "a", making it most recent

Cache.set(cache, "d", 4); // "b" is evicted (least recently used)

Cache.has(cache, "a"); // true
Cache.has(cache, "b"); // false
Cache.has(cache, "c"); // true
```

### LRUTTL

```ts
function Cache.LRUTTL<K, V>(options: { max: number, ttl: number }): LRUTTLCache<K, V>
```

Creates a cache with both LRU (Least Recently Used) eviction and TTL (Time To Live) expiration backed by a Map. Entries are evicted when the cache exceeds `max` size or when they exceed the `ttl` duration in milliseconds.

#### Properties

- **data.entries**: The underlying `Map` instance storing entries with timestamps
- **evict()**: Manually trigger eviction of expired entries
- **setMax(max)**: Updates the maximum cache size
- **setTTL(ttl)**: Updates the TTL duration and evicts expired entries

#### Use Cases

- When you need time-based expiration in addition to size limits
- When data becomes stale after a certain period

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.LRUTTL<string, number>({
    max: 100,
    ttl: 5000, // 5 seconds
});

Cache.set(cache, "a", 1);
Cache.get(cache, "a"); // 1

// After 5+ seconds
Cache.get(cache, "a"); // undefined (expired)

// Manual eviction
Cache.set(cache, "b", 2);
cache.evict(); // Remove expired entries

// Adjust TTL at runtime
cache.setTTL(10000); // 10 seconds
```

### Map

```ts
function Cache.Map<K, V>(): MapCache<K, V>
```

Creates a cache backed by a Map with no eviction policy.

#### Properties

- **data.entries**: The underlying `Map` instance

#### Use Cases

- When you don't need automatic eviction
- When cache size won't grow unbounded

#### Example

```ts
import { Cache } from "@monstermann/cache";

const cache = Cache.Map<string, number>();

Cache.set(cache, "foo", 42);
Cache.set(cache, "bar", 100);

Cache.get(cache, "foo"); // 42

// Access underlying Map if needed
cache.data.entries.size; // 2
```

### WeakMap

```ts
function Cache.WeakMap<K extends WeakKey, V>(): WeakMapCache<K, V>
```

Creates a cache backed by a JavaScript `WeakMap`. Keys must be objects and are held weakly, allowing them to be garbage collected when no other references exist.

#### Properties

- **data.entries**: The underlying `WeakMap` instance

#### Use Cases

- When you want to associate data with objects without preventing garbage collection
- When you need automatic cleanup of entries when keys are no longer referenced

#### Example

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
