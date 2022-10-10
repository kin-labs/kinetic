import { Big } from 'big.js'

export function addDecimals(amount: string, decimals: number): string {
  Big.RM = 0
  return new Big(amount).mul(Math.pow(10, decimals)).round().toPrecision()
}

export function removeDecimals(amount: string, decimals: number): string {
  return new Big(amount).div(Math.pow(10, decimals)).toString()
}
