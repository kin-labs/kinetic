import { getPublicKey } from '@kin-kinetic/solana'
import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { SerializeMakeTransferOptions } from '../interfaces/serialize-make-transfer-transaction-options'
import { addDecimals } from './add-decimals'

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
  type,
  senderCreate,
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
  const instructions: TransactionInstruction[] = [
    appIndexMemoInstruction,
    senderCreate
      ? createAssociatedTokenAccountInstruction(
          feePayerKey,
          destinationTokenAccount,
          getPublicKey(destination),
          mintKey,
        )
      : ([] as unknown as TransactionInstruction),
    createTransferInstruction(
      ownerTokenAccount,
      destinationTokenAccount,
      owner.solanaPublicKey,
      addDecimals(amount, mintDecimals).toNumber(),
      [],
      TOKEN_PROGRAM_ID,
    ),
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
