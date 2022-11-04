import {
  AuthorityType,
  createAssociatedTokenAccountInstruction,
  createSetAuthorityInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { GenerateCreateAccountTransactionOptions } from '../interfaces'
import { TransactionType } from '../kin'
import { generateKinMemoInstruction } from '../kin/generate-kin-memo-instruction'
import { getPublicKey } from './get-public-key'

export async function generateCreateAccountTransaction({
  addMemo,
  blockhash,
  index,
  lastValidBlockHeight,
  mintFeePayer,
  mintPublicKey,
  owner,
}: GenerateCreateAccountTransactionOptions): Promise<Transaction> {
  // Create objects from Response
  const mintKey = getPublicKey(mintPublicKey)
  const feePayerKey = getPublicKey(mintFeePayer)
  const ownerPublicKey = owner.publicKey

  // Get AssociatedTokenAccount
  const ownerTokenAccount = await getAssociatedTokenAddress(mintKey, ownerPublicKey)

  // Create Instructions
  const instructions: TransactionInstruction[] = []

  // Create Memo Instruction for KRE Ingestion - Must be Memo Program v1, not v2
  if (addMemo) {
    instructions.push(
      generateKinMemoInstruction({
        index,
        type: TransactionType.None,
      }),
    )
  }

  instructions.push(
    createAssociatedTokenAccountInstruction(feePayerKey, ownerTokenAccount, ownerPublicKey, mintKey),
    createSetAuthorityInstruction(ownerTokenAccount, ownerPublicKey, AuthorityType.CloseAccount, feePayerKey),
  )

  const transaction = new Transaction({
    blockhash,
    feePayer: getPublicKey(mintFeePayer),
    lastValidBlockHeight,
    signatures: [{ publicKey: ownerPublicKey, signature: null }],
  }).add(...instructions)

  // Partially sign the transaction
  transaction.partialSign(owner)

  return transaction
}
