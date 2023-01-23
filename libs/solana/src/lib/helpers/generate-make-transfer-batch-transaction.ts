import { createTransferCheckedInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { GenerateMakeTransferBatchTransactionsOptions } from '../interfaces'
import { generateKinMemoInstruction } from '../kin'
import { addDecimals } from './add-remove-decimals'
import { getPublicKey } from './get-public-key'

export async function generateMakeTransferBatchTransaction(
  options: GenerateMakeTransferBatchTransactionsOptions,
): Promise<Transaction> {
  // Create objects from Response
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

  // Create the Token Transfer Instructions
  options.destinations.map(({ amount, destination }) =>
    instructions.push(
      createTransferCheckedInstruction(
        ownerTokenAccountPublicKey,
        mintKey,
        getPublicKey(destination),
        ownerPublicKey,
        addDecimals(amount, options.mintDecimals).toNumber(),
        options.mintDecimals,
        [],
        TOKEN_PROGRAM_ID,
      ),
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
