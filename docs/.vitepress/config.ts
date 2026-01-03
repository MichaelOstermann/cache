import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    base: "/cache/",
    description: "Functional cache utilities.",
    title: "cache",
    markdown: {
        theme: {
            dark: "catppuccin-macchiato",
            light: "github-light-default",
        },
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    themeConfig: {
        aside: false,
        outline: "deep",
        docFooter: {
            next: false,
            prev: false,
        },
        search: {
            provider: "local",
        },
        sidebar: [
            { base: "/Storage/", text: "Storage", items: [
                { link: "ARC", text: "ARC" },
                { link: "FIFO", text: "FIFO" },
                { link: "LRU", text: "LRU" },
                { link: "LRUTTL", text: "LRUTTL" },
                { link: "Map", text: "Map" },
                { link: "WeakMap", text: "WeakMap" },
            ] },
            { base: "/Cache/", text: "Cache", items: [
                { link: "get", text: "get" },
                { link: "getOr", text: "getOr" },
                { link: "getOrElse", text: "getOrElse" },
                { link: "getOrThrow", text: "getOrThrow" },
                { link: "getAll", text: "getAll" },
                { link: "getAllOr", text: "getAllOr" },
                { link: "getAllOrElse", text: "getAllOrElse" },
                { link: "getAllOrThrow", text: "getAllOrThrow" },
                { link: "has", text: "has" },
                { link: "hasAll", text: "hasAll" },
                { link: "hasAny", text: "hasAny" },
                { link: "hasNone", text: "hasNone" },
                { link: "remove", text: "remove" },
                { link: "removeAll", text: "removeAll" },
                { link: "set", text: "set" },
                { link: "setAll", text: "setAll" },
            ] },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/cache" },
        ],
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
