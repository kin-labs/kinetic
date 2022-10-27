import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { GenerateMakeTransferOptions } from '../interfaces'
import { addDecimals } from './add-remove-decimals'
import { generateKinMemoInstruction } from '../kin/generate-kin-memo-instruction'
import { getPublicKey } from './get-public-key'

export async function generateMakeTransferTransaction({
  addMemo,
  amount,
  blockhash,
  destination,
  index,
  lastValidBlockHeight,
  mintDecimals,
  mintFeePayer,
  mintPublicKey,
  owner,
  senderCreate,
  type,
}: GenerateMakeTransferOptions): Promise<Transaction> {
  // Create objects from Response
  const mintKey = getPublicKey(mintPublicKey)
  const feePayerKey = getPublicKey(mintFeePayer)
  const ownerPublicKey = owner.publicKey

  // Get TokenAccount from Owner and Destination
  const [ownerTokenAccount, destinationTokenAccount] = await Promise.all([
    getAssociatedTokenAddress(mintKey, ownerPublicKey),
    getAssociatedTokenAddress(mintKey, getPublicKey(destination)),
  ])

  // Create Instructions
  const instructions: TransactionInstruction[] = []

  if (addMemo) {
    instructions.push(
      generateKinMemoInstruction({
        index,
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
      ownerPublicKey,
      addDecimals(amount, mintDecimals).toNumber(),
      mintDecimals,
      [],
      TOKEN_PROGRAM_ID,
    ),
  )

  const transaction = new Transaction({
    blockhash,
    feePayer: feePayerKey,
    lastValidBlockHeight,
    signatures: [{ publicKey: ownerPublicKey, signature: null }],
  }).add(...instructions)

  // Partially sign the transaction
  transaction.partialSign(owner)

  return transaction
}
