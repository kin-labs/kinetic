import { addDecimals, removeDecimals } from '@kin-kinetic/solana'
export { addDecimals, removeDecimals } from '@kin-kinetic/solana'
import BigNumber from 'bignumber.js'

export function quarksToKin(amount: string): string {
  return removeDecimals(amount, 5)
}

export function kinToQuarks(amount: string): BigNumber {
  return addDecimals(amount, 5)
}
