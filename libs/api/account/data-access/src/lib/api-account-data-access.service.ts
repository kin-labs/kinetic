import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Injectable } from '@nestjs/common'
import { Commitment, PublicKey } from '@solana/web3.js'

@Injectable()
export class ApiAccountDataAccessService {
  constructor(readonly data: ApiCoreDataAccessService) {}

  getAccountInfo(accountId: string, commitment?: Commitment) {
    return this.data.solana.getAccountInfo(accountId, { commitment })
  }

  // createAccount(newAccountRequest: CreateAccountRequest) {
  //   return this.data.solana.createAccount(newAccountRequest)
  // }

  tokenAccounts(accountId: string, commitment: Commitment) {
    return this.data.solana.tokenAccounts(accountId, {
      commitment,
      filter: { mint: new PublicKey(this.data.config.mogamiMintPublicKey) },
    })
  }
}
