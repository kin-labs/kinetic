import { TransactionType } from './transaction-type'

describe('TransactionType', () => {
  it('should verify values', () => {
    expect(TransactionType.Unknown).toEqual(-1)
    expect(TransactionType.None).toEqual(0)
    expect(TransactionType.Earn).toEqual(1)
    expect(TransactionType.Spend).toEqual(2)
    expect(TransactionType.P2P).toEqual(3)
  })
})
