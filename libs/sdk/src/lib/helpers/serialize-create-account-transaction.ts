import * as borsh from 'borsh'
import { Keypair } from '@mogami/keypair'
import { getPublicKey, PublicKeyString } from '@mogami/solana'
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'

export async function serializeCreateAccountTransaction({
  mint,
  owner,
  latestBlockhash,
  feePayer,
}: {
  mint: PublicKeyString
  owner: Keypair
  latestBlockhash: string
  feePayer: PublicKeyString
}) {
  // Create objects from Response
  const mintKey = getPublicKey(mint)
  const feePayerKey = getPublicKey(feePayer)

  // Get AssociatedTokenAccount
  const associatedTokenAccount = await getAssociatedTokenAddress(mintKey, owner.solanaPublicKey)

  // Create Transaction
  const instructions: TransactionInstruction[] = [
    createAssociatedTokenAccountInstruction(feePayerKey, associatedTokenAccount, owner.solanaPublicKey, mintKey),
  ]

  const transaction = new Transaction({
    feePayer: feePayerKey,
    recentBlockhash: latestBlockhash,
    signatures: [{ publicKey: owner.solana.publicKey, signature: null }],
  }).add(...instructions)

  // Sign and Serialize Transaction
  transaction.partialSign(...[owner.solana])

  const serialized = transaction.serialize({ requireAllSignatures: false, verifySignatures: false })

  const schema = new Map([
    [
      Object,
      {
        kind: 'struct',
        fields: [['data', [432]]],
      },
    ],
  ])

  return borsh.serialize(schema, JSON.parse(JSON.stringify(serialized)))
}
