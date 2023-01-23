import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { GenerateMakeTransferOptions } from '../interfaces'
import { generateKinMemoInstruction } from '../kin'
import { addDecimals } from './add-remove-decimals'
import { getPublicKey } from './get-public-key'

export function generateMakeTransferTransaction(options: GenerateMakeTransferOptions): Transaction {
  // Create objects from Response
  const destinationPublicKey = getPublicKey(options.destination)
  const destinationTokenAccountPublicKey = getPublicKey(options.destinationTokenAccount)
  const feePayerKey = getPublicKey(options.mintFeePayer)
  const mintKey = getPublicKey(options.mintPublicKey)
  const ownerPublicKey = options.owner.publicKey
  const ownerTokenAccountPublicKey = getPublicKey(options.ownerTokenAccount)

  // Create Instructions
  const instructions: TransactionInstruction[] = []

  // Create the Memo Instruction
  if (options.addMemo) {
    instructions.push(
      generateKinMemoInstruction({
        index: options.index,
        reference: options.reference,
        type: options.type,
      }),
    )
  }

  // Create the Token Account if senderCreate is enabled
  if (options.senderCreate) {
    instructions.push(
      createAssociatedTokenAccountInstruction(
        feePayerKey,
        destinationTokenAccountPublicKey,
        destinationPublicKey,
        mintKey,
      ),
    )
  }

  // Create the Token Transfer Instruction
  instructions.push(
    createTransferCheckedInstruction(
      ownerTokenAccountPublicKey,
      mintKey,
      destinationTokenAccountPublicKey,
      ownerPublicKey,
      addDecimals(options.amount, options.mintDecimals).toNumber(),
      options.mintDecimals,
      [],
      TOKEN_PROGRAM_ID,
    ),
  )

  // Create transaction
  const transaction = new Transaction({
    blockhash: options.blockhash,
    feePayer: feePayerKey,
    lastValidBlockHeight: options.lastValidBlockHeight,
    signatures: [{ publicKey: ownerPublicKey, signature: null }],
  }).add(...instructions)

  // Partially sign the transaction
  transaction.partialSign(options.owner)

  return transaction
}
