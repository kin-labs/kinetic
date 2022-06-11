import { getRandomInt } from './random-int'

export function uniq(prefix: string) {
  return `${prefix}${uniqInt()}`
}
export function uniqInt(): number {
  return Math.floor(Math.random() * 10000000)
}
export function randomAppIndex(): number {
  return getRandomInt(1_000, 1_000_000)
}
