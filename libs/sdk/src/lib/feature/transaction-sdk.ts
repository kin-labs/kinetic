import { Solana } from '@mogami/solana'
import { SdkConfig } from '../interfaces/sdk-config'

export class TransactionSdk {
  solana: Solana | undefined
  constructor(private readonly config: SdkConfig) {}
}
