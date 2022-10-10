import { addDecimals, removeDecimals } from './add-remove-decimals'

describe('addDecimals and removeDecimals', () => {
  it('should add decimals and remove them again ', () => {
    const decimals = 5
    const validCases = new Map<string, string>([
      ['0.00001', '1'],
      ['0.00002', '2'],
      ['1', '100000'],
      ['2', '200000'],
      // 10 trillion, more than what's in circulation
      ['10000000000000', '1000000000000000000'],
    ])
    validCases.forEach((expected, input) => {
      expect(addDecimals(input, decimals)).toStrictEqual(expected)
      expect(removeDecimals(expected, decimals)).toStrictEqual(input)
    })

    const roundedCases = new Map<string, string>([
      ['0.000001', '0'],
      ['0.000015', '1'],
      ['0.000018', '1'],
    ])
    roundedCases.forEach((expected, input) => {
      expect(addDecimals(input, decimals)).toStrictEqual(expected)
    })
  })

  it('should work with different decimals ', () => {
    const decimals = 2
    const validCases = new Map<string, string>([
      ['0.01', '1'],
      ['0.02', '2'],
      ['1', '100'],
      ['2', '200'],
      ['10000000000000', '1000000000000000'],
    ])
    validCases.forEach((expected, input) => {
      expect(addDecimals(input, decimals)).toStrictEqual(expected)
      expect(removeDecimals(expected, decimals)).toStrictEqual(input)
    })

    const roundedCases = new Map<string, string>([
      ['0.001', '0'],
      ['0.015', '1'],
      ['0.018', '1'],
    ])
    roundedCases.forEach((expected, input) => {
      expect(addDecimals(input, decimals)).toStrictEqual(expected)
    })
  })
})
