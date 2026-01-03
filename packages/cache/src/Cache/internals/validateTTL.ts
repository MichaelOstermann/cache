export function validateTTL(prefix: string, ttl: number): number {
    if (ttl === Infinity) return ttl
    if (!Number.isInteger(ttl)) throw new Error(`${prefix}: ttl must be an integer`)
    if (ttl < 0) throw new Error(`${prefix}: ttl must be greater than -1`)
    return ttl
}
