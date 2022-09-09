import { decodeTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AccountMeta, Keypair, Transaction } from '@solana/web3.js'
import { parseAndSignTransaction } from './parse-and-sign-transaction'

export function parseAndSignTokenTransfer({ tx, signer }: { tx: Buffer; signer: Keypair }): {
  amount: number
  blockhash: string
  destination: AccountMeta
  feePayer: string
  source: string
  transaction: Transaction
} {
  const { blockhash, feePayer, source, transaction } = parseAndSignTransaction({ tx, signer })

  // Get the first token account transfer
  const instruction = transaction.instructions.find(
    (instruction) => instruction?.programId?.toBase58() === TOKEN_PROGRAM_ID?.toBase58(),
  )
  if (!instruction) {
    throw new Error(`parseAndSignTokenTransfer: Can't find token transfer instruction`)
  }

  // Get the amount and destination from the instruction
  const {
    data: { amount },
    keys: { destination },
  } = decodeTransferInstruction(instruction, TOKEN_PROGRAM_ID)

  return {
    amount: Number(amount),
    blockhash,
    destination,
    feePayer,
    source,
    transaction,
  }
}
