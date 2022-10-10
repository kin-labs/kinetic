import { kinToQuarks, quarksToKin } from './kin-to-quarks'

describe('kinToQuarks and quarksToKin', () => {
  it('should convert kin to quarks and back ', () => {
    const validCases = new Map<string, string>([
      ['0.00001', '1'],
      ['0.00002', '2'],
      ['1', '100000'],
      ['2', '200000'],
      // 10 trillion, more than what's in circulation
      ['10000000000000', '1000000000000000000'],
    ])
    validCases.forEach((expected, input) => {
      expect(kinToQuarks(input)).toStrictEqual(expected)
      expect(quarksToKin(expected)).toStrictEqual(input)
    })

    const roundedCases = new Map<string, string>([
      ['0.000001', '0'],
      ['0.000015', '1'],
      ['0.000018', '1'],
    ])
    roundedCases.forEach((expected, input) => {
      expect(kinToQuarks(input)).toStrictEqual(expected)
    })
  })
})
