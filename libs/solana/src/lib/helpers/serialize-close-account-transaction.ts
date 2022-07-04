import { Keypair } from '@kin-kinetic/keypair'
import { TransactionType } from '@kin-tools/kin-memo'
import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'
import { createCloseAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { PublicKeyString } from '../interfaces'
import { getPublicKey } from './get-public-key'

export async function serializeCreateAccountTransaction({
  appIndex,
  lastValidBlockHeight,
  latestBlockhash,
  mintFeePayer,
  mintPublicKey,
  owner,
}: {
  appIndex: number
  lastValidBlockHeight: number
  latestBlockhash: string
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  owner: Keypair
}): Promise<Buffer> {
  // Create objects from Response
  const mintKey = getPublicKey(mintPublicKey)
  const feePayerKey = getPublicKey(mintFeePayer)

  // Create Memo Instruction for KRE Ingestion - Must be Memo Program v1, not v2
  const appIndexMemoInstruction = generateKinMemoInstruction({
    appIndex,
    type: TransactionType.None,
  })

  // Get AssociatedTokenAccount
  const associatedTokenAccount = await getAssociatedTokenAddress(mintKey, owner.solanaPublicKey)

  // Create Transaction
  const instructions: TransactionInstruction[] = [
    appIndexMemoInstruction,
    createCloseAccountInstruction(TOKEN_PROGRAM_ID, associatedTokenAccount, feePayerKey, []),
  ]

  const transaction = new Transaction({
    blockhash: latestBlockhash,
    feePayer: feePayerKey,
    lastValidBlockHeight,
    signatures: [{ publicKey: owner.solana.publicKey, signature: null }],
  }).add(...instructions)

  // Sign and Serialize Transaction
  transaction.partialSign(owner.solana)

  return transaction.serialize({ requireAllSignatures: false, verifySignatures: false })
}
