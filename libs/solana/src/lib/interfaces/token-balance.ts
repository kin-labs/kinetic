import BigNumber from 'bignumber.js'
import { PublicKeyString } from './public-key-string'

export interface TokenBalance {
  account: PublicKeyString
  balance: BigNumber
}
