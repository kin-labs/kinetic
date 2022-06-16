import { Keypair } from '@kin-kinetic/keypair'
import { getPublicKey, PublicKeyString } from '@kin-kinetic/solana'
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { kinToQuarks } from './kin-to-quarks'
import { TransactionType } from '@kin-tools/kin-memo'
import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'

export async function serializeMakeTransferTransaction({
  amount,
  appIndex,
  destination,
  latestBlockhash,
  mintFeePayer,
  mintPublicKey,
  owner,
  type,
}: {
  amount: string
  appIndex: number
  destination: PublicKeyString
  latestBlockhash: string
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  owner: Keypair
  type: TransactionType
}) {
  // Create objects from Response
  const mintKey = getPublicKey(mintPublicKey)
  const feePayerKey = getPublicKey(mintFeePayer)

  // Get TokenAccount from Owner and Destination
  const [ownerTokenAccount, destinationTokenAccount] = await Promise.all([
    getAssociatedTokenAddress(mintKey, owner.solanaPublicKey),
    getAssociatedTokenAddress(mintKey, getPublicKey(destination)),
  ])

  const quarks = kinToQuarks(amount)

  const appIndexMemoInstruction = generateKinMemoInstruction({
    appIndex,
    type,
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
