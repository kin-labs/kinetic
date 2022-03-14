import { Solana } from '@mogami/solana'
import { SdkConfig } from '../interfaces/sdk-config'

export class TransactionSdk {
  solana: Solana
  constructor(private readonly config: SdkConfig) {}
}
