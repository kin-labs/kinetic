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

  getAccountInfo(accountId: string, { commitment = 'single' }: { commitment?: Commitment }) {
    return this.connection.getParsedAccountInfo(new PublicKey(accountId), commitment)
  }

  getMinimumBalanceForRentExemption(dataLength: number) {
    return this.connection.getMinimumBalanceForRentExemption(dataLength)
  }

  getRecentBlockhash() {
    return this.connection.getRecentBlockhash()
  }

  tokenAccounts(
    accountId: string,
    { filter, commitment = 'single' }: { filter: TokenAccountsFilter; commitment?: Commitment },
  ) {
    return this.connection.getTokenAccountsByOwner(new PublicKey(accountId), filter, commitment)
  }
}
