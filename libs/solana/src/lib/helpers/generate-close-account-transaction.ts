import { createCloseAccountInstruction } from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { GenerateCloseAccountTransactionOptions } from '../interfaces'
import { generateKinMemoInstruction, TransactionType } from '../kin'
import { getPublicKey } from './get-public-key'

export function generateCloseAccountTransaction({
  addMemo,
  blockhash,
  index,
  lastValidBlockHeight,
  reference,
  signer,
  tokenAccount,
}: GenerateCloseAccountTransactionOptions): {
  transaction: Transaction
} {
  // Create Instructions
  const instructions: TransactionInstruction[] = []

  // Create Memo Instruction for KRE Ingestion - Must be Memo Program v1, not v2
  if (addMemo) {
    instructions.push(
      generateKinMemoInstruction({
        index,
        reference,
        type: TransactionType.None,
      }),
    )
  }

  instructions.push(createCloseAccountInstruction(getPublicKey(tokenAccount), signer.publicKey, signer.publicKey))

  // Decode the transaction
  const transaction = new Transaction({
    blockhash,
    feePayer: signer.publicKey,
    lastValidBlockHeight,
  }).add(...instructions)

  // Sign the transaction
  transaction.sign(...[signer])

  return { transaction }
}
