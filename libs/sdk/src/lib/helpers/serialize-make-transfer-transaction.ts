import { Keypair } from '@mogami/keypair'
import { getPublicKey, PublicKeyString } from '@mogami/solana'
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { kinToQuarks } from './kin-to-quarks'
import { TransactionType } from '@kin-tools/kin-memo'
import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'

export async function serializeMakeTransferTransaction({
  amount,
  destination,
  mint,
  owner,
  latestBlockhash,
  feePayer,
  appIndex,
  type,
}: {
  amount: string
  destination: PublicKeyString
  mint: PublicKeyString
  owner: Keypair
  latestBlockhash: string
  feePayer: PublicKeyString
  appIndex: number
  type: TransactionType
}) {
  // Create objects from Response
  const mintKey = getPublicKey(mint)
  const feePayerKey = getPublicKey(feePayer)

  // Get TokenAccount from Owner and Destination
  const [ownerTokenAccount, destinationTokenAccount] = await Promise.all([
    getAssociatedTokenAddress(mintKey, owner.solanaPublicKey),
    getAssociatedTokenAddress(mintKey, getPublicKey(destination)),
  ])

  const quarks = kinToQuarks(amount)

  const appIndexMemoInstruction = generateKinMemoInstruction({
    appIndex,
    type: TransactionType.None,
  })

  // Create Transaction
  const instructions: TransactionInstruction[] = [
    appIndexMemoInstruction,
    createTransferInstruction(
      ownerTokenAccount,
      destinationTokenAccount,
      owner.solanaPublicKey,
      Number(quarks),
      [],
      TOKEN_PROGRAM_ID,
    ),
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
