import BigNumber from 'bignumber.js'
import { BalanceMintMap } from './balance-mint-map'
import { BalanceToken } from './balance-token'

export interface BalanceSummary {
  balance: BigNumber
  mints: BalanceMintMap
  tokens: BalanceToken[]
}
