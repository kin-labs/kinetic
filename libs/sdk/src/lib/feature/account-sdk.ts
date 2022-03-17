import { Solana } from '@mogami/solana'
import { SdkConfig } from '../interfaces/sdk-config'

export class AccountSdk {
  solana: Solana | undefined
  constructor(private readonly config: SdkConfig) {}
}
