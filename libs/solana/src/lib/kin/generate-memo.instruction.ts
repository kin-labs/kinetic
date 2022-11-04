import { PublicKey, TransactionInstruction } from '@solana/web3.js'
import { MEMO_V1_TOKEN_ID } from './generate-kin-memo-instruction'

export function generateMemoInstruction(content: string): TransactionInstruction {
  return new TransactionInstruction({
    keys: [],
    programId: new PublicKey(MEMO_V1_TOKEN_ID),
    data: Buffer.from(content),
  })
}
