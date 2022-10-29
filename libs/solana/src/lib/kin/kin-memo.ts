import { MAGIC_BYTE, MAX_TRANSACTION_TYPE, MAX_VERSION } from './kin-memo-constants'
import { TransactionType } from './transaction-type'

// Memo implements the Agora memo specification.
//
// Spec: https://github.com/kinecosystem/agora-api
export class KinMemo {
  buffer: Buffer
  constructor(buf: Buffer) {
    this.buffer = buf
  }

  static from(b: Buffer): KinMemo {
    const buf = Buffer.alloc(b.length)
    b.copy(buf)
    return new this(buf)
  }

  static fromB64String(s: string, strict = true): KinMemo | undefined {
    const raw = Buffer.from(s, 'base64')
    const m = KinMemo.from(raw)
    if (!KinMemo.isValid(m, strict)) {
      throw new Error('invalid memo')
    }

    return m
  }

  static new(version: number, type: TransactionType, index: number, fk: Buffer): KinMemo {
    if (fk.length > 29) {
      throw new Error('invalid foreign key length')
    }
    if (version > 7) {
      throw new Error('invalid version')
    }
    if (type < 0) {
      throw new Error('cannot use unknown transaction type')
    }

    const b = Buffer.alloc(32)

    // encode magic byte + version
    b[0] = MAGIC_BYTE
    b[0] |= version << 2

    // encode transaction type
    b[0] |= (type & 0x7) << 5
    b[1] = (type & 0x18) >> 3

    // encode index
    b[1] |= (index & 0x3f) << 2
    b[2] = (index & 0x3fc0) >> 6
    b[3] = (index & 0xc000) >> 14

    if (fk.byteLength > 0) {
      b[3] |= (fk[0] & 0x3f) << 2
      // insert the rest of the fk. since each loop references fk[n] and fk[n+1], the upper bound is offset by 3 instead of 4.
      for (let i = 4; i < 3 + fk.byteLength; i++) {
        // apply last 2-bits of current byte
        // apply first 6-bits of next byte
        b[i] = (fk[i - 4] >> 6) & 0x3
        b[i] |= (fk[i - 3] & 0x3f) << 2
      }

      // if the foreign key is less than 29 bytes, the last 2 bits of the FK can be included in the memo
      if (fk.byteLength < 29) {
        b[fk.byteLength + 3] = (fk[fk.byteLength - 1] >> 6) & 0x3
      }
    }

    return new this(b)
  }

  static isValid(m: KinMemo, strict?: boolean): boolean {
    if (Number(m.buffer[0] & 0x3) != MAGIC_BYTE) {
      return false
    }

    if (m.transactionTypeRaw() == -1) {
      return false
    }

    if (!strict) {
      return true
    }

    if (m.version() > MAX_VERSION) {
      return false
    }

    return m.transactionType() >= 0 && m.transactionType() <= MAX_TRANSACTION_TYPE
  }

  // version returns the memo encoding version.
  version(): number {
    return (this.buffer[0] & 0x1c) >> 2
  }

  // transactionType returns the type of the transaction the memo is
  // attached to.
  transactionType(): TransactionType {
    const raw = this.transactionTypeRaw()
    if (raw >= 0 && raw <= MAX_TRANSACTION_TYPE) {
      return raw
    }

    return TransactionType.Unknown
  }

  // transactionTypeRaw returns the type of the transaction the memo is
  // attached to, even if it is unsupported by this implementation. It should
  // only be used as a fallback if the raw value is needed when transactionType()
  // yields TransactionType.Unknown.
  transactionTypeRaw(): TransactionType {
    return (this.buffer[0] >> 5) | ((this.buffer[1] & 0x3) << 3)
  }

  // index returns the index of the app the transaction relates to.
  index(): number {
    const a = Number(this.buffer[1]) >> 2
    const b = Number(this.buffer[2]) << 6
    const c = Number(this.buffer[3] & 0x3) << 14
    return a | b | c
  }

  // foreignKey returns an identifier in an auxiliary service that contains
  // additional information related to the transaction.
  foreignKey(): Buffer {
    const fk = Buffer.alloc(29)

    for (let i = 0; i < 28; i++) {
      fk[i] |= this.buffer[i + 3] >> 2
      fk[i] |= (this.buffer[i + 4] & 0x3) << 6
    }

    // We only have 230 bits, which results in
    // our last fk byte only having 6 'valid' bits
    fk[28] = this.buffer[31] >> 2

    return fk
  }
}
