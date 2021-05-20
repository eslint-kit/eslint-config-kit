export function arrayToString(array: string[]): string {
  return array.map(item => `"${item}"`).join(', ')
}
