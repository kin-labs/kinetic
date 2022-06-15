import { SolanaKeypair } from '@kin-kinetic/keypair'
import { decodeTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AccountMeta, Transaction } from '@solana/web3.js'
import { parseAndSignTransaction } from './parse-and-sign-transaction'

export function parseAndSignTokenTransfer({ tx, signer }: { tx: Buffer; signer: SolanaKeypair }): {
  amount: number
  blockhash: string
  destination: AccountMeta
  feePayer: string
  source: string
  transaction: Transaction
} {
  const { feePayer, source, transaction } = parseAndSignTransaction({ tx, signer })

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    blockhash: transaction.recentBlockhash!.toString(),
    destination,
    feePayer,
    source,
    transaction,
  }
}
