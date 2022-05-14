import { SolanaKeypair } from '@mogami/keypair'
import { decodeTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AccountMeta, Transaction } from '@solana/web3.js'

export function parseIncomingTransaction({ tx, signer }: { tx: Buffer; signer: SolanaKeypair }): {
  amount: number
  destination: AccountMeta
  feePayer: string
  source: string
  transaction: Transaction
} {
  // Decode the transaction
  const transaction = Transaction.from(Buffer.from(tx))

  // Sign it
  transaction.partialSign(...[signer])

  // Get the fee payer
  const feePayer = transaction?.feePayer?.toBase58()
  if (!feePayer) {
    throw new Error(`parseIncomingTransaction: Can't find token feePayer`)
  }

  // Get the source
  const source = transaction.signatures.find((signature) => signature.publicKey.toBase58() !== feePayer)
  if (!source) {
    throw new Error(`parseIncomingTransaction: Can't find transaction source`)
  }

  // Get the first token account transfer
  const instruction = transaction.instructions.find(
    (instruction) => instruction?.programId?.toBase58() === TOKEN_PROGRAM_ID?.toBase58(),
  )
  if (!instruction) {
    throw new Error(`parseIncomingTransaction: Can't find token transfer`)
  }

  // Get the amount and destination from the instruction
  const {
    data: { amount },
    keys: { destination },
  } = decodeTransferInstruction(instruction, TOKEN_PROGRAM_ID)

  return {
    amount: Number(amount),
    destination,
    feePayer,
    source: source?.publicKey?.toBase58(),
    transaction,
  }
}
