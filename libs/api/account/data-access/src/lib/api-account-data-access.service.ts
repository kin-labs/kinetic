import { Injectable } from '@nestjs/common'
import { AccountInfoResponse } from './entities/account-info.entity'
import { Solana } from '@mogami/solana'
import { ApiConfigDataAccessService } from '@mogami/api/config/data-access'
import { ResolveTokenAccountsResponse } from './entities/resolve-token-accounts.entity'
import { Commitment, TokenAccountsFilter } from '@solana/web3.js'

@Injectable()
export class ApiAccountDataAccessService {
  readonly solana: Solana

  constructor(readonly config: ApiConfigDataAccessService) {
    this.solana = new Solana(this.config.solanaRpcEndpoint)
  }

  getAccountInfo(accountId: string, commitment?: Commitment) {
    return this.solana.getAccountInfo(accountId, commitment)
  }

  // createAccount(newAccountRequest: CreateAccountRequest): CreateAccountResponse {
  //   return this.solana.createAccount(newAccountRequest) as CreateAccountResponse
  // }

  resolveTokenAccounts(
    accountId: string,
    filter: TokenAccountsFilter,
    commitment: Commitment,
  ): ResolveTokenAccountsResponse {
    return this.solana.resolveTokenAccounts(accountId, filter, commitment) as ResolveTokenAccountsResponse
  }
}
