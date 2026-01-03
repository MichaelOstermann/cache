import { defineConfig } from "@monstermann/barrels"
import { flat } from "@monstermann/barrels-flat"
import { namespace } from "@monstermann/barrels-namespace"

export default defineConfig([
    namespace({
        entries: "./packages/cache/src/Cache",
    }),
    flat({
        entries: "./packages/cache/src",
        include: ["*", "Cache/index.js"],
    }),
])
