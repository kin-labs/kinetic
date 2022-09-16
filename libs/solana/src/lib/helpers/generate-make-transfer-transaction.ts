import { generateKinMemoInstruction } from '@kin-tools/kin-transaction'
import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { GenerateMakeTransferOptions } from '../interfaces'
import { addDecimals } from './add-remove-decimals'
import { getPublicKey } from './get-public-key'

export async function generateMakeTransferTransaction({
  addMemo,
  amount,
  appIndex,
  destination,
  lastValidBlockHeight,
  latestBlockhash,
  mintDecimals,
  mintFeePayer,
  mintPublicKey,
  signer,
  senderCreate,
  type,
}: GenerateMakeTransferOptions): Promise<Transaction> {
  // Create objects from Response
  const mintKey = getPublicKey(mintPublicKey)
  const feePayerKey = getPublicKey(mintFeePayer)

  // Get TokenAccount from Owner and Destination
  const [ownerTokenAccount, destinationTokenAccount] = await Promise.all([
    getAssociatedTokenAddress(mintKey, signer.publicKey),
    getAssociatedTokenAddress(mintKey, getPublicKey(destination)),
  ])

  // Create Transaction
  const instructions: TransactionInstruction[] = []

  if (addMemo) {
    instructions.push(
      generateKinMemoInstruction({
        appIndex,
        type,
      }),
    )
  }

  if (senderCreate) {
    instructions.push(
      createAssociatedTokenAccountInstruction(feePayerKey, destinationTokenAccount, getPublicKey(destination), mintKey),
    )
  }

  instructions.push(
    createTransferCheckedInstruction(
      ownerTokenAccount,
      mintKey,
      destinationTokenAccount,
      signer.publicKey,
      addDecimals(amount, mintDecimals).toNumber(),
      mintDecimals,
      [],
      TOKEN_PROGRAM_ID,
    ),
  )

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
