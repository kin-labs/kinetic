import BigNumber from 'bignumber.js'

export function kinToQuarks(amount: string): BigNumber {
  const b = new BigNumber(amount).decimalPlaces(5, BigNumber.ROUND_DOWN)
  return b.multipliedBy(1e5)
}
