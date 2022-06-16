import { Keypair } from '@kin-kinetic/keypair'
import { getPublicKey, PublicKeyString } from '@kin-kinetic/solana'
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { TransactionType } from '@kin-tools/kin-memo'
import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'

export async function serializeCreateAccountTransaction({
  appIndex,
  latestBlockhash,
  mintFeePayer,
  mintPublicKey,
  owner,
}: {
  appIndex: number
  latestBlockhash: string
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  owner: Keypair
}) {
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
    createAssociatedTokenAccountInstruction(feePayerKey, associatedTokenAccount, owner.solanaPublicKey, mintKey),
  ]

  const transaction = new Transaction({
    feePayer: feePayerKey,
    recentBlockhash: latestBlockhash,
    signatures: [{ publicKey: owner.solana.publicKey, signature: null }],
  }).add(...instructions)

  // Sign and Serialize Transaction
  transaction.partialSign(...[owner.solana])

  return transaction.serialize({ requireAllSignatures: false, verifySignatures: false })
}
