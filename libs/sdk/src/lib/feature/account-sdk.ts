import { Solana } from '@mogami/solana'
import { SdkConfig } from '../interfaces/sdk-config'

export class AccountSdk {
  solana: Solana
  constructor(private readonly config: SdkConfig) {}
}
