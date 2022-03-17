import { Commitment, Connection, PublicKey, TokenAccountsFilter } from '@solana/web3.js'
import { parseEndpoint } from './helpers/parse-endpoint'

export interface SolanaConfig {
  logger?
}

export type PublicKeyString = PublicKey | string

export class Solana {
  readonly endpoint: string
  readonly connection: Connection

  constructor(endpoint: string, private readonly config?: SolanaConfig) {
    this.endpoint = parseEndpoint(endpoint)
    this.connection = new Connection(this.endpoint)
    config?.logger?.log(`Solana RPC Endpoint: ${this.endpoint}`)
  }

  getAccountInfo(accountId: PublicKeyString, { commitment = 'single' }: { commitment?: Commitment }) {
    return this.connection.getParsedAccountInfo(new PublicKey(accountId), commitment)
  }

  getMinimumBalanceForRentExemption(dataLength: number) {
    return this.connection.getMinimumBalanceForRentExemption(dataLength)
  }

  getRecentBlockhash() {
    return this.connection.getRecentBlockhash()
  }

  getBalance(accountId: PublicKeyString, mogamiMintPublicKey: any) {
    return this.connection.getBalance(new PublicKey(accountId), mogamiMintPublicKey)
  }

  tokenAccounts(
    accountId: PublicKeyString,
    { filter, commitment = 'single' }: { filter: TokenAccountsFilter; commitment?: Commitment },
  ) {
    return this.connection.getTokenAccountsByOwner(new PublicKey(accountId), filter, commitment)
  }
}
