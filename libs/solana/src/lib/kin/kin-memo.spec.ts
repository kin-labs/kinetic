import { KinMemo } from './kin-memo'
import { MAX_APP_INDEX, MAX_TRANSACTION_TYPE } from './kin-memo-constants'
import { TransactionType } from './transaction-type'

describe('KinMemo', () => {
  it('valid', () => {
    const emptyFK = Buffer.alloc(29)

    for (let v = 0; v <= 7; v++) {
      const m = KinMemo.new(v, TransactionType.Spend, 1, emptyFK)

      expect(m.version()).toBe(v)
      expect(m.transactionType()).toBe(TransactionType.Spend)
      expect(m.index()).toBe(1)
      expect(emptyFK.equals(m.foreignKey())).toBe(true)
    }

    for (let t = TransactionType.None; t < MAX_TRANSACTION_TYPE; t++) {
      const m = KinMemo.new(1, t, 1, emptyFK)

      expect(m.version()).toBe(1)
      expect(m.transactionType()).toBe(t)
      expect(m.index()).toBe(1)
      expect(emptyFK.equals(m.foreignKey())).toBe(true)
    }

    // We increment by 0xf instead of 1 since iterating over the total space
    // is far too slow in Javascript (unlike some other languages).
    for (let i = 0; i < MAX_APP_INDEX; i += 0xf) {
      const m = KinMemo.new(1, TransactionType.Spend, i, emptyFK)

      expect(m.version()).toBe(1)
      expect(m.transactionType()).toBe(TransactionType.Spend)
      expect(m.index()).toBe(i)
      expect(emptyFK.equals(m.foreignKey())).toBe(true)
    }

    // Test a short foreign key
    const fk = Buffer.alloc(29)
    fk[0] = 1
    const m = KinMemo.new(1, TransactionType.Earn, 2, fk)
    expect(fk.equals(m.foreignKey())).toBe(true)

    // Test range of foreign keys
    for (let i = 0; i < 256; i += 29) {
      for (let j = 0; j < 29; j++) {
        fk[j] = i + j
      }

      const m = KinMemo.new(1, TransactionType.Earn, 2, fk)
      for (let j = 0; j < 28; j++) {
        expect(fk[j]).toBe(m.foreignKey()[j])
      }

      // Note: because we only have 230 bits, the last byte in the memo fk
      // only has the first 6 bits of the last byte in the original fk.
      expect(fk[28] & 0x3f).toBe(m.foreignKey()[28])
    }
  })
  it('invalid', () => {
    const fk = Buffer.alloc(29)

    expect(() => KinMemo.new(8, TransactionType.Earn, 1, fk)).toThrow('invalid version')

    let m = KinMemo.new(1, TransactionType.Earn, 1, fk)
    m.buffer[0] = 0xfc
    expect(KinMemo.isValid(m)).toBeFalsy()
    expect(KinMemo.isValid(m, false)).toBeFalsy()
    expect(KinMemo.isValid(m, true)).toBeFalsy()

    // invalid tx type
    expect(() => KinMemo.new(1, TransactionType.Unknown, 1, fk)).toThrow('cannot use unknown transaction type')

    // Version higher than configured
    m = KinMemo.new(2, TransactionType.Earn, 1, fk)
    expect(KinMemo.isValid(m)).toBeTruthy()
    expect(KinMemo.isValid(m, false)).toBeTruthy()
    expect(KinMemo.isValid(m, true)).toBeFalsy()

    // Transaction type higher than configured
    m = KinMemo.new(1, MAX_TRANSACTION_TYPE + 1, 1, fk)
    expect(KinMemo.isValid(m)).toBeTruthy()
    expect(KinMemo.isValid(m, false)).toBeTruthy()
    expect(KinMemo.isValid(m, true)).toBeFalsy()
  })

  it('memo from', () => {
    const valid = KinMemo.from(Buffer.from('KQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=', 'base64'))
    expect(KinMemo.isValid(valid)).toBeTruthy()
    expect(KinMemo.isValid(valid, true)).toBeFalsy()

    const strictlyValid = KinMemo.from(Buffer.from('JQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=', 'base64'))
    expect(KinMemo.isValid(strictlyValid)).toBeTruthy()
    expect(KinMemo.isValid(strictlyValid, true)).toBeTruthy()

    // Test deserialization with an unknown tx type
    const unknownTxType = KinMemo.from(Buffer.from('RQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=', 'base64'))
    expect(KinMemo.isValid(unknownTxType)).toBeTruthy()
    expect(KinMemo.isValid(unknownTxType, false)).toBeTruthy()
    expect(KinMemo.isValid(unknownTxType, true)).toBeFalsy()
    expect(unknownTxType.transactionType()).toBe(TransactionType.Unknown)
    expect(unknownTxType.transactionTypeRaw()).toBe(10)
  })
})
