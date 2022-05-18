import { Keypair } from '@mogami/keypair'
import { getPublicKey, Payment, PublicKeyString } from '@mogami/solana'
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import { kinToQuarks } from './kin-to-quarks'
import { TransactionType } from '@kin-tools/kin-memo'
import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'
import BigNumber from 'bignumber.js'

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

  const ownerTokenAccount = await getAssociatedTokenAddress(mintKey, owner.solanaPublicKey)
  // Get TokenAccount from Owner and Destination

  const promises: Promise<PublicKey>[] = []
  const quarksAmounts: { [key: string]: BigNumber } = {}
  // const destinationsTokenAccounts: {[key:string]: PublicKey} = {}
  payments.map(async (payment) => {
    promises.push(getAssociatedTokenAddress(mintKey, getPublicKey(payment.destination)))
    quarksAmounts[payment.destination.toString()] = kinToQuarks(payment.amount)
    // destinationsTokenAccounts[payment.destination.toString()] = await getAssociatedTokenAddress(mintKey, getPublicKey(payment.destination))
  })

  console.log({ promises, quarksAmounts })
  const appIndexMemoInstruction = generateKinMemoInstruction({
    appIndex,
    type,
  })

  const destinationsTokenAccounts = await Promise.all(promises)
  const instructions: TransactionInstruction[] = []

  console.log({ destinationsTokenAccounts, instructions })
  let i = 0
  for (const payment of payments) {
    instructions.push(
      createTransferInstruction(
        ownerTokenAccount,
        destinationsTokenAccounts[i++],
        owner.solanaPublicKey,
        Number(quarksAmounts[payment.destination.toString()]),
        [],
        TOKEN_PROGRAM_ID,
      ),
    )
  }

  const transaction = new Transaction({
    feePayer: feePayerKey,
    recentBlockhash: latestBlockhash,
    signatures: [{ publicKey: owner.solana.publicKey, signature: null }],
  })
    .add(appIndexMemoInstruction)
    .add(...instructions)

  console.log({ transaction })

  // Sign and Serialize Transaction
  transaction.partialSign(...[owner.solana])

  return transaction.serialize({ requireAllSignatures: false, verifySignatures: false })
}
