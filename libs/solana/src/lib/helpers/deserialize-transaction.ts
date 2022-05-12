import { Keypair } from '@mogami/keypair'
import { decodeTransferInstruction } from '@solana/spl-token'
import { AccountMeta, Transaction } from '@solana/web3.js'
import * as borsh from 'borsh'

const bytesNumber = {
  transfer: 420,
  creation: 511,
}

export function deserializeAndSignTransaction(
  keypair: Keypair,
  incoming: string | Uint8Array,
  type: 'transfer' | 'creation',
): {
  amount: number
  destination: AccountMeta
  feePayer: string
  source: AccountMeta
  tx: Transaction
} {
  const txJson = typeof incoming === 'string' ? JSON.parse(incoming) : incoming
  const schema = new Map([
    [
      Object,
      {
        kind: 'struct',
        fields: [['data', [bytesNumber[type]]]],
      },
    ],
  ])

  const buffer = borsh.serialize(schema, txJson)
  const tx = Transaction.from(buffer)
  tx.partialSign(...[keypair.solana])
  const feePayer = tx?.feePayer?.toBase58() ?? ''

  const decodedInstruction = decodeTransferInstruction(tx.instructions[1])
  const { source, destination } = decodedInstruction.keys
  const amount = Number(decodedInstruction.data.amount)

  return {
    amount,
    destination,
    feePayer,
    source,
    tx,
  }
}
