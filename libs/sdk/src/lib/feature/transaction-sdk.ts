import { Keypair } from '@mogami/keypair'
import { getPublicKey, PublicKeyString } from '@mogami/solana'
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Transaction, TransactionInstruction } from '@solana/web3.js'
import { Configuration, RecentBlockhashResponse, ServiceConfigResponse, TransactionApi } from '../../generated'
import { kinToQuarks } from '../helpers/kin-to-quarks'

export class TransactionSdk {
  private tx: TransactionApi
  constructor(apiConfig: Configuration) {
    this.tx = new TransactionApi(apiConfig)
  }

  async submit({ destination, amount, owner }: { destination: PublicKeyString; amount: string; owner: Keypair }) {
    const [{ mint, subsidizer }, { blockhash: recentBlockhash }] = await Promise.all([
      this.tx.getServiceConfig().then((res) => res.data as ServiceConfigResponse),
      this.tx.getRecentBlockhash().then((res) => res.data as RecentBlockhashResponse),
    ])

    // Create objects from Response
    const mintKey = getPublicKey(mint)
    const subsidizerKey = getPublicKey(subsidizer)

    // Get TokenAccount from Owner and Destination
    const [ownerTokenAccount, destinationTokenAccount] = await Promise.all([
      getAssociatedTokenAddress(mintKey, owner.solanaPublicKey),
      getAssociatedTokenAddress(mintKey, getPublicKey(destination)),
    ])

    const quarks = kinToQuarks(amount)

    // Create Transaction
    const instructions: TransactionInstruction[] = [
      createTransferInstruction(
        ownerTokenAccount,
        destinationTokenAccount,
        owner.solanaPublicKey,
        Number(quarks),
        [],
        TOKEN_PROGRAM_ID,
      ),
    ]

    const transaction = new Transaction({
      feePayer: subsidizerKey,
      recentBlockhash,
      signatures: [{ publicKey: owner.solana.publicKey, signature: null }],
    }).add(...instructions)

    // Sign and Serialize Transaction
    transaction.partialSign(...[owner.solana])

    const serialized = transaction.serialize({ requireAllSignatures: false, verifySignatures: false })

    // Submit Transaction
    const res = await this.tx.submitTransaction({ tx: JSON.stringify(serialized) })

    return Promise.resolve({ mint, subsidizer, recentBlockhash, res })
  }
}
