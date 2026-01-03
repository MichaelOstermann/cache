export function validateMax(prefix: string, max: number): number {
    if (max === Infinity) return max
    if (!Number.isInteger(max)) throw new Error(`${prefix}: max must be an integer`)
    if (max < 0) throw new Error(`${prefix}: max must be greater than -1`)
    return max
}
