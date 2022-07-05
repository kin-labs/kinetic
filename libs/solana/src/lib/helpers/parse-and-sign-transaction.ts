import { Keypair, Transaction } from '@solana/web3.js'

export function parseAndSignTransaction({ tx, signer }: { tx: Buffer; signer: Keypair }): {
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
    throw new Error(`parseAndSignTransaction: Can't find token feePayer`)
  }

  // Get the source
  const source = transaction.signatures
    .find((signature) => signature.publicKey.toBase58() !== feePayer)
    ?.publicKey?.toBase58()
  if (!source) {
    throw new Error(`parseAndSignTransaction: Can't find transaction source`)
  }

  return { feePayer, source, transaction }
}
