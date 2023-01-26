import { TransactionInstruction } from '@solana/web3.js'
import { createKinMemo } from './create-kin.memo'
import { generateMemoInstruction } from './generate-memo.instruction'
import { TransactionType } from './index'

export const MEMO_V1_TOKEN_ID = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'

/**
 * Method to format a correct Kin Memo Instruction based on index and Type
 * @param {number} index
 * @param {string} reference
 * @param {TransactionType} type
 * @returns {TransactionInstruction}
 */
export function generateKinMemoInstruction({
  index,
  reference,
  type,
}: {
  index: number
  reference?: string | null
  type: TransactionType
}): TransactionInstruction {
  // Create correctly formatted memo string, including your App Index
  const content = createKinMemo({ index, type, reference })

  // Create Memo Instruction for KRE Ingestion - Must be Memo Program v1, not v2
  return generateMemoInstruction(content)
}
