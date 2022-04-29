import { Keypair } from '@mogami/keypair'
import { getPublicKey, PublicKeyString } from '@mogami/solana'
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { kinToQuarks } from './kin-to-quarks'

export async function serializeMakeTransferTransaction({
  amount,
  destination,
  mint,
  owner,
  latestBlockhash,
  subsidizer,
}: {
  amount: string
  destination: PublicKeyString
  mint: PublicKeyString
  owner: Keypair
  latestBlockhash: string
  subsidizer: PublicKeyString
}) {
  // Create objects from Response
  const mintKey = getPublicKey(mint)
  const subsidizerKey = getPublicKey(subsidizer)

  // Get TokenAccount from Owner and Destination
  const [ownerTokenAccount, destinationTokenAccount] = await Promise.all([
    getAssociatedTokenAddress(mintKey, owner.solanaPublicKey),
    getAssociatedTokenAddress(mintKey, getPublicKey(destination)),
  ])

  const quarks = kinToQuarks(amount)

  // Create Transaction
  const instructions: TransactionInstruction[] = [
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
    feePayer: subsidizerKey,
    recentBlockhash: latestBlockhash,
    signatures: [{ publicKey: owner.solana.publicKey, signature: null }],
  }).add(...instructions)

  // Sign and Serialize Transaction
  transaction.partialSign(...[owner.solana])

  return transaction.serialize({ requireAllSignatures: false, verifySignatures: false })
}
