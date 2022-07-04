import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { SerializeMakeTransferOptions } from '../interfaces'
import { addDecimals } from './add-remove-decimals'
import { getPublicKey } from './get-public-key'

export async function serializeMakeTransferTransaction({
  amount,
  appIndex,
  destination,
  lastValidBlockHeight,
  latestBlockhash,
  mintDecimals,
  mintFeePayer,
  mintPublicKey,
  owner,
  senderCreate,
  type,
}: SerializeMakeTransferOptions) {
  // Create objects from Response
  const mintKey = getPublicKey(mintPublicKey)
  const feePayerKey = getPublicKey(mintFeePayer)

  // Get TokenAccount from Owner and Destination
  const [ownerTokenAccount, destinationTokenAccount] = await Promise.all([
    getAssociatedTokenAddress(mintKey, owner.solanaPublicKey),
    getAssociatedTokenAddress(mintKey, getPublicKey(destination)),
  ])

  const appIndexMemoInstruction = generateKinMemoInstruction({
    appIndex,
    type,
  })

  // Create Transaction
  const instructions: TransactionInstruction[] = [appIndexMemoInstruction]

  if (senderCreate) {
    instructions.push(
      createAssociatedTokenAccountInstruction(feePayerKey, destinationTokenAccount, getPublicKey(destination), mintKey),
    )
  }

  instructions.push(
    createTransferInstruction(
      ownerTokenAccount,
      destinationTokenAccount,
      owner.solanaPublicKey,
      addDecimals(amount, mintDecimals).toNumber(),
      [],
      TOKEN_PROGRAM_ID,
    ),
  )

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
