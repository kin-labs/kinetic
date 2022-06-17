import BigNumber from 'bignumber.js'
import { addDecimals } from './add-decimals'

export function kinToQuarks(amount: string): BigNumber {
  console.warn(`Deprecated method: use 'addDecimals(amount, 5)' instead.`)
  return addDecimals(amount, 5)
}
