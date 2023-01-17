import { Commitment } from '@kin-kinetic/solana'
import { App, AppEnv, Transaction } from '@prisma/client'
import { Transaction as SolanaTransaction } from '@solana/web3.js'

export interface ProcessTransactionOptions {
  appEnv: AppEnv & { app: App }
  appKey: string
  transaction: Transaction
  amount?: bigint
  blockhash: string
  commitment: Commitment
  decimals: number
  destination?: string
  feePayer: string
  headers?: Record<string, string>
  lastValidBlockHeight: number
  mintPublicKey: string
  source: string
  solanaTransaction: SolanaTransaction
}
