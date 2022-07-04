import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import { GenerateMakeTransferBatchTransactionsOptions } from '../interfaces'
import { addDecimals } from './add-remove-decimals'
import { getPublicKey } from './get-public-key'

export async function generateMakeTransferBatchTransaction({
  appIndex,
  destinations,
  lastValidBlockHeight,
  latestBlockhash,
  mintDecimals,
  mintFeePayer,
  mintPublicKey,
  signer,
  type,
}: GenerateMakeTransferBatchTransactionsOptions): Promise<Transaction> {
  // Create objects from Response
  const mintKey = getPublicKey(mintPublicKey)
  const feePayerKey = getPublicKey(mintFeePayer)

  // Get TokenAccount from Owner
  const ownerTokenAccount = await getAssociatedTokenAddress(mintKey, signer.publicKey)

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
      createTransferInstruction(ownerTokenAccount, destination, signer.publicKey, amount, [], TOKEN_PROGRAM_ID),
    ),
  ]

  const transaction = new Transaction({
    blockhash: latestBlockhash,
    feePayer: feePayerKey,
    lastValidBlockHeight,
    signatures: [{ publicKey: signer.publicKey, signature: null }],
  }).add(...instructions)

  // Partially sign the transaction
  transaction.partialSign(signer)

  return transaction
}
