import BigNumber from 'bignumber.js'

export function addDecimals(amount: string, decimals: number): BigNumber {
  const b = new BigNumber(amount).decimalPlaces(decimals, BigNumber.ROUND_DOWN)
  return b.multipliedBy(Math.pow(10, decimals))
}

export function removeDecimals(amount: BigNumber | string, decimals: number): string {
  return new BigNumber(amount).dividedBy(Math.pow(10, decimals)).toString()
}
