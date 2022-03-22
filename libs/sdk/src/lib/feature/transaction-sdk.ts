import { Configuration, RecentBlockhashResponse, ServiceConfigResponse, TransactionApi } from '../../generated'
import { Keypair } from '@mogami/keypair'
import { getPublicKey, PublicKeyString } from '@mogami/solana'
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'

import BigNumber from 'bignumber.js'

export function kinToQuarks(amount: string): BigNumber {
  const b = new BigNumber(amount).decimalPlaces(5, BigNumber.ROUND_DOWN)
  return b.multipliedBy(1e5)
}

export class TransactionSdk {
  private tx: TransactionApi
  constructor(apiConfig: Configuration) {
    this.tx = new TransactionApi(apiConfig)
  }

  async submit(dest: PublicKeyString, amount: string, owner: Keypair) {
    const [{ mint, subsidizer }, { blockhash: recentBlockhash }] = await Promise.all([
      this.tx.apiTransactionFeatureControllerGetServiceConfig().then((res) => res.data as ServiceConfigResponse),
      this.tx.apiTransactionFeatureControllerGetRecentBlockhash().then((res) => res.data as RecentBlockhashResponse),
    ])

    // // Create objects from Response
    const mintKey = getPublicKey(mint)
    const subsidizerKey = getPublicKey(subsidizer)

    // // Get OwnerTokenAccount
    const ownerTokenAcount = await getAssociatedTokenAddress(mintKey, owner.solanaPublicKey)

    // // Get DestinationTokenAccount
    const destinationTokenAcount = await getAssociatedTokenAddress(mintKey, getPublicKey(dest))

    const quarks = kinToQuarks(amount)

    // Create Transaction
    const instructions: TransactionInstruction[] = [
      createTransferInstruction(
        ownerTokenAcount,
        destinationTokenAcount,
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

    // // Sign and Serialize Transaction
    transaction.partialSign(...[owner.solana])

    const serialized = transaction.serialize({ requireAllSignatures: false, verifySignatures: false })

    // // Submit Transaction
    const res = await this.tx.apiTransactionFeatureControllerSubmitTransaction({ tx: JSON.stringify(serialized) })

    return Promise.resolve({ mint, subsidizer, recentBlockhash, res })
  }
}
