import { Logger } from '@nestjs/common'
import { Commitment, Connection, PublicKey, TokenAccountsFilter } from '@solana/web3.js'
import { parseEndpoint } from './helpers/parse-endpoint'

export class Solana {
  readonly endpoint: string
  readonly connection: Connection
  readonly logger = new Logger('@mogami/solana')

  constructor(endpoint: string) {
    this.endpoint = parseEndpoint(endpoint)
    this.connection = new Connection(this.endpoint)
    this.logger.verbose(`RPC Endpoint: ${this.endpoint}`)
  }

  getRecentBlockhash() {
    return this.connection.getRecentBlockhash()
  }

  getMinimumBalanceForRentExemption(dataLength: number) {
    return this.connection.getMinimumBalanceForRentExemption(dataLength)
  }
  // createAccount(newAccountRequest) {}

  getAccountInfo(accountId: string, commitment: Commitment) {
    return this.connection.getParsedAccountInfo(new PublicKey(accountId), commitment)
  }

  resolveTokenAccounts(accountId: string, filter: TokenAccountsFilter, commitment: Commitment) {
    return this.connection.getTokenAccountsByOwner(new PublicKey(accountId), filter, commitment)
  }
}
