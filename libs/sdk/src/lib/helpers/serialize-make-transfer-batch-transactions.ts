import { TransactionType } from '@kin-tools/kin-memo'
import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'
import { Keypair } from '@kin-kinetic/keypair'
import { getPublicKey, Destination, PublicKeyString } from '@kin-kinetic/solana'
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { addDecimals } from './add-decimals'

export async function serializeMakeTransferBatchTransactions({
  appIndex,
  destinations,
  latestBlockhash,
  mintDecimals,
  mintFeePayer,
  mintPublicKey,
  owner,
  type,
}: {
  appIndex: number
  destinations: Destination[]
  latestBlockhash: string
  mintDecimals: number
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  owner: Keypair
  type: TransactionType
}) {
  // Create objects from Response
  const mintKey = getPublicKey(mintPublicKey)
  const feePayerKey = getPublicKey(mintFeePayer)

  // Get TokenAccount from Owner
  const ownerTokenAccount = await getAssociatedTokenAddress(mintKey, owner.solanaPublicKey)

  // Get TokenAccount from Destination
  const destinationInfo: { amount: number; destination: PublicKey }[] = await Promise.all(
    destinations.map(async ({ amount, destination }) => ({
      amount: addDecimals(amount, mintDecimals).toNumber(),
      destination: await getAssociatedTokenAddress(mintKey, getPublicKey(destination)),
    })),
  )

  const appIndexMemoInstruction = generateKinMemoInstruction({
    appIndex,
    type,
  })

  const instructions: TransactionInstruction[] = [
    appIndexMemoInstruction,
    ...destinationInfo.map(({ amount, destination }) =>
      createTransferInstruction(ownerTokenAccount, destination, owner.solanaPublicKey, amount, [], TOKEN_PROGRAM_ID),
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
