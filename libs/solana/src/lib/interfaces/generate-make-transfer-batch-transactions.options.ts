import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@solana/web3.js'
import { Destination } from './destination'
import { PublicKeyString } from './public-key-string'

export interface GenerateMakeTransferBatchTransactionsOptions {
  addMemo: boolean
  blockhash: string
  destinations: Destination[]
  index: number
  lastValidBlockHeight: number
  mintDecimals: number
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  owner: Keypair
  type: TransactionType
}
