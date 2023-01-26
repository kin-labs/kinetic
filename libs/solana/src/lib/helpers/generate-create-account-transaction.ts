import {
  AuthorityType,
  createAssociatedTokenAccountInstruction,
  createSetAuthorityInstruction,
} from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { GenerateCreateAccountTransactionOptions } from '../interfaces'
import { generateKinMemoInstruction, TransactionType } from '../kin'
import { getPublicKey } from './get-public-key'

export async function generateCreateAccountTransaction(
  options: GenerateCreateAccountTransactionOptions,
): Promise<Transaction> {
  // Create objects from Response
  const mintKey = getPublicKey(options.mintPublicKey)
  const feePayerKey = getPublicKey(options.mintFeePayer)
  const ownerPublicKey = options.owner.publicKey
  const ownerTokenAccountPublicKey = getPublicKey(options.ownerTokenAccount)

  // Create Instructions
  const instructions: TransactionInstruction[] = []

  // Create Memo Instruction for KRE Ingestion - Must be Memo Program v1, not v2
  if (options.addMemo) {
    instructions.push(
      generateKinMemoInstruction({
        index: options.index,
        reference: options.reference,
        type: TransactionType.None,
      }),
    )
  }

  instructions.push(
    createAssociatedTokenAccountInstruction(feePayerKey, ownerTokenAccountPublicKey, ownerPublicKey, mintKey),
    createSetAuthorityInstruction(ownerTokenAccountPublicKey, ownerPublicKey, AuthorityType.CloseAccount, feePayerKey),
  )

  const transaction = new Transaction({
    blockhash: options.blockhash,
    feePayer: feePayerKey,
    lastValidBlockHeight: options.lastValidBlockHeight,
    signatures: [{ publicKey: ownerPublicKey, signature: null }],
  }).add(...instructions)

  // Partially sign the transaction
  transaction.partialSign(options.owner)

  return transaction
}
