export function uniq(prefix: string) {
  return `${prefix}${uniqInt()}`
}
export function uniqInt(): number {
  return Math.floor(Math.random() * 10000000)
}
