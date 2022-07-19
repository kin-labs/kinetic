import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@solana/web3.js'
import { Destination } from './destination'
import { PublicKeyString } from './public-key-string'

export interface GenerateMakeTransferBatchTransactionsOptions {
  addMemo: boolean
  appIndex: number
  destinations: Destination[]
  lastValidBlockHeight: number
  latestBlockhash: string
  mintDecimals: number
  mintFeePayer: PublicKeyString
  mintPublicKey: PublicKeyString
  signer: Keypair
  type: TransactionType
}
