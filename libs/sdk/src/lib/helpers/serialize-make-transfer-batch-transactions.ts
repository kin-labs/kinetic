import { TransactionType } from '@kin-tools/kin-memo'
import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'
import { Keypair } from '@mogami/keypair'
import { getPublicKey, Payment, PublicKeyString } from '@mogami/solana'
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { kinToQuarks } from './kin-to-quarks'

export async function serializeMakeTransferBatchTransactions({
  appIndex,
  payments,
  feePayer,
  latestBlockhash,
  mint,
  owner,
  type,
}: {
  appIndex: number
  payments: Payment[]
  feePayer: PublicKeyString
  latestBlockhash: string
  mint: PublicKeyString
  owner: Keypair
  type: TransactionType
}) {
  if (payments?.length >= 15) throw new Error('Maximum number of payments exceded')

  // Create objects from Response
  const mintKey = getPublicKey(mint)
  const feePayerKey = getPublicKey(feePayer)

  // Get TokenAccount from Owner
  const ownerTokenAccount = await getAssociatedTokenAddress(mintKey, owner.solanaPublicKey)

  // Get TokenAccount from Destination
  const paymentInfo: { amount: BigNumber; destination: PublicKey }[] = await Promise.all(
    payments.map(async ({ amount, destination }) => ({
      amount: kinToQuarks(amount),
      destination: await getAssociatedTokenAddress(mintKey, getPublicKey(destination)),
    })),
  )

  const appIndexMemoInstruction = generateKinMemoInstruction({
    appIndex,
    type,
  })

  const instructions: TransactionInstruction[] = [
    appIndexMemoInstruction,
    ...paymentInfo.map((payment) =>
      createTransferInstruction(
        ownerTokenAccount,
        payment.destination,
        owner.solanaPublicKey,
        payment.amount.toNumber(),
        [],
        TOKEN_PROGRAM_ID,
      ),
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
