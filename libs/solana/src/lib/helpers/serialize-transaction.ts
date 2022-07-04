import { Transaction } from '@solana/web3.js'

export function serializeTransaction(transaction: Transaction) {
  return transaction.serialize({ requireAllSignatures: false, verifySignatures: false }).toString('base64')
}
