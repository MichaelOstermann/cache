---
aside: true
---

# cache

<Badge type="info" class="size">
    <span>Minified</span>
    <span>4.43 KB</span>
</Badge>

<Badge type="info" class="size">
    <span>Minzipped</span>
    <span>1.21 KB</span>
</Badge>

**Functional cache utilities.**

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

::: code-group

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

:::

## Tree-shaking

### Installation

::: code-group

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

:::

### Usage

::: code-group

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

:::
