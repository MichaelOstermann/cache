export interface Cache<K, V> {
    del: (key: K) => void
    get: (key: K) => V | undefined
    has: (key: K) => boolean
    set: (key: K, value: V) => void
}
