import BigNumber from 'bignumber.js'

export interface BalanceToken {
  account: string
  balance: BigNumber
  mint: string
}
