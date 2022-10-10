import { addDecimals, removeDecimals } from '@kin-kinetic/solana'

export { addDecimals, removeDecimals } from '@kin-kinetic/solana'

export function quarksToKin(amount: string): string {
  return removeDecimals(amount, 5)
}

export function kinToQuarks(amount: string): string {
  return addDecimals(amount, 5)
}
