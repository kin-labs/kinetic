import { Commitment } from '@kin-kinetic/solana'
import { App, AppEnv } from '@prisma/client'
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
  processingStartedAt: number
  reference: string
  solanaTransaction: SolanaTransaction
  source: string
  tx: string
  ua: string
}
