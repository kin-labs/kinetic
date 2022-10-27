import { BalanceMintMap } from './balance-mint-map'
import { BalanceToken } from './balance-token'

export interface BalanceSummary {
  balance: string
  mintMap: Record<string, string[]>
  mints: BalanceMintMap
  tokens: BalanceToken[]
}
