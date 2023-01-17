import { Commitment } from '@kin-kinetic/solana'
import { App, AppEnv, Transaction } from '@prisma/client'
import { Transaction as SolanaTransaction } from '@solana/web3.js'

export interface ProcessTransactionOptions {
  amount?: bigint
  appEnv: AppEnv & { app: App }
  appKey: string
  blockhash: string
  commitment: Commitment
  decimals: number
  destination?: string
  feePayer: string
  headers?: Record<string, string>
  ip: string
  lastValidBlockHeight: number
  mintPublicKey: string
  referenceId?: string
  referenceType?: string
  solanaTransaction: SolanaTransaction
  source: string
  transaction: Transaction
  tx: string
  ua: string
}
