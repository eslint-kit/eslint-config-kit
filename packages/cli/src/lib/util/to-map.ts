// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toMap<T = any>(array: T[]): Map<T, true> {
  const map = new Map()

  for (const item of array) {
    map.set(item, true)
  }

  return map
}
