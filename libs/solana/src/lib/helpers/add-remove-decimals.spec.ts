import BigNumber from 'bignumber.js'
import { addDecimals, removeDecimals } from './add-remove-decimals'

describe('addDecimals and removeDecimals', () => {
  it('should add decimals and remove them again ', () => {
    const decimals = 5
    const validCases = new Map<string, string>([
      ['0.00001', '1'],
      ['0.00002', '2'],
      ['1', '1e5'],
      ['2', '2e5'],
      // 10 trillion, more than what's in circulation
      ['10000000000000', '1e18'],
    ])
    validCases.forEach((expected, input) => {
      expect(addDecimals(input, decimals)).toStrictEqual(new BigNumber(expected))
      expect(removeDecimals(expected, decimals)).toStrictEqual(new BigNumber(input).toString())
    })

    const roundedCases = new Map<string, string>([
      ['0.000001', '0'],
      ['0.000015', '1'],
      ['0.000018', '1'],
    ])
    roundedCases.forEach((expected, input) => {
      expect(addDecimals(input, decimals)).toStrictEqual(new BigNumber(expected))
    })
  })

  it('should work with different decimals ', () => {
    const decimals = 2
    const validCases = new Map<string, string>([
      ['0.01', '1'],
      ['0.02', '2'],
      ['1', '1e2'],
      ['2', '2e2'],
      ['10000000000000', '1e15'],
    ])
    validCases.forEach((expected, input) => {
      expect(addDecimals(input, decimals)).toStrictEqual(new BigNumber(expected))
      expect(removeDecimals(expected, decimals)).toStrictEqual(new BigNumber(input).toString())
    })

    const roundedCases = new Map<string, string>([
      ['0.001', '0'],
      ['0.015', '1'],
      ['0.018', '1'],
    ])
    roundedCases.forEach((expected, input) => {
      expect(addDecimals(input, decimals)).toStrictEqual(new BigNumber(expected))
    })
  })
})
