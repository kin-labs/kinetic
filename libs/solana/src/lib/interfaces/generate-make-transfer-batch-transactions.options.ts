import { Keypair } from '@solana/web3.js'
import { TransactionType } from '../kin'
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
  ownerTokenAccount: PublicKeyString
  reference?: string | null
  type: TransactionType
}
