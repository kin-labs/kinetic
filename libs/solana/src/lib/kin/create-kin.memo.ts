import { KinMemo } from './kin-memo'
import { TransactionType } from './transaction-type'

export function createKinMemo({
  index,
  memo,
  type = TransactionType.None,
}: {
  index: number
  memo?: string
  type?: TransactionType
}) {
  let data = Buffer.alloc(29)

  if (memo) {
    data = Buffer.from(memo, 'base64')
  }
  const kinMemo = KinMemo.new(1, type, index, data)

  return kinMemo.buffer.toString('base64')
}
