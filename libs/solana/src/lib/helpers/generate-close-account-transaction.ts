import { TransactionType } from '@kin-tools/kin-memo'
import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'
import { createCloseAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { GenerateCloseAccountTransactionOptions } from '../interfaces'
import { getPublicKey } from './get-public-key'

export async function generateCloseAccountTransaction({
  appIndex,
  lastValidBlockHeight,
  latestBlockhash,
  mintFeePayer,
  mintPublicKey,
  signer,
}: GenerateCloseAccountTransactionOptions): Promise<Transaction> {
  // Create objects from Response
  const mintKey = getPublicKey(mintPublicKey)
  const feePayerKey = getPublicKey(mintFeePayer)

  // Create Memo Instruction for KRE Ingestion - Must be Memo Program v1, not v2
  const appIndexMemoInstruction = generateKinMemoInstruction({
    appIndex,
    type: TransactionType.None,
  })

  // Get AssociatedTokenAccount
  const associatedTokenAccount = await getAssociatedTokenAddress(mintKey, signer.publicKey)

  // Create Transaction
  const instructions: TransactionInstruction[] = [
    appIndexMemoInstruction,
    createCloseAccountInstruction(TOKEN_PROGRAM_ID, associatedTokenAccount, feePayerKey, []),
  ]

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
