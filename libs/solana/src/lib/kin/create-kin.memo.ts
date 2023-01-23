import { KinMemo } from './kin-memo'
import { TransactionType } from './transaction-type'

export function createKinMemo({
  index,
  reference,
  type = TransactionType.None,
}: {
  index: number
  reference?: string | null
  type?: TransactionType
}) {
  let data = Buffer.alloc(29)

  if (reference?.length) {
    data = Buffer.from(reference, 'base64')
  }
  const kinMemo = KinMemo.new(1, type, index, data)

  return kinMemo.buffer.toString('base64')
}
