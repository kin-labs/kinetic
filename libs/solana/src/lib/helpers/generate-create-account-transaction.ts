import { TransactionType } from '@kin-tools/kin-memo'
import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'
import {
  AuthorityType,
  createAssociatedTokenAccountInstruction,
  createSetAuthorityInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { GenerateCreateAccountTransactionOptions } from '../interfaces'
import { getPublicKey } from './get-public-key'

export async function generateCreateAccountTransaction({
  addMemo,
  appIndex,
  lastValidBlockHeight,
  latestBlockhash,
  mintFeePayer,
  mintPublicKey,
  signer,
}: GenerateCreateAccountTransactionOptions): Promise<Transaction> {
  // Create objects from Response
  const mintKey = getPublicKey(mintPublicKey)
  const feePayerKey = getPublicKey(mintFeePayer)

  // Get AssociatedTokenAccount
  const associatedTokenAccount = await getAssociatedTokenAddress(mintKey, signer.publicKey)

  // Create Transaction
  const instructions: TransactionInstruction[] = []

  // Create Memo Instruction for KRE Ingestion - Must be Memo Program v1, not v2
  if (addMemo) {
    instructions.push(
      generateKinMemoInstruction({
        appIndex,
        type: TransactionType.None,
      }),
    )
  }

  instructions.push(
    createAssociatedTokenAccountInstruction(feePayerKey, associatedTokenAccount, signer.publicKey, mintKey),
    createSetAuthorityInstruction(associatedTokenAccount, signer.publicKey, AuthorityType.CloseAccount, feePayerKey),
  )

  const transaction = new Transaction({
    blockhash: latestBlockhash,
    feePayer: getPublicKey(mintFeePayer),
    lastValidBlockHeight,
    signatures: [{ publicKey: signer.publicKey, signature: null }],
  }).add(...instructions)

  // Partially sign the transaction
  transaction.partialSign(signer)

  return transaction
}
