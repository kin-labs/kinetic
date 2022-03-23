import { Connection, Keypair, PublicKey } from '@solana/web3.js'

export interface AirdropConfig {
  airdropDefault: number
  airdropMax: number
  connection: Connection
  decimals: number
  feePayer: Keypair
  mint: PublicKey
}
