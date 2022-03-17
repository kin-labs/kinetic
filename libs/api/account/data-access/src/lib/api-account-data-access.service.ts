import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Injectable } from '@nestjs/common'
import { Commitment, PublicKey } from '@solana/web3.js'
import { PublicKeyString } from '@mogami/solana'

@Injectable()
export class ApiAccountDataAccessService {
  constructor(readonly data: ApiCoreDataAccessService) {}

  getAccountInfo(accountId: PublicKeyString, commitment?: Commitment) {
    return this.data.solana.getAccountInfo(accountId, { commitment })
  }

  // createAccount(newAccountRequest: CreateAccountRequest) {
  //   return this.data.solana.createAccount(newAccountRequest)
  // }

  getBalance(accountId: PublicKeyString) {
    return this.data.solana.getBalance(accountId, this.data.config.mogamiMintPublicKey)
  }

  tokenAccounts(accountId: PublicKeyString, commitment: Commitment) {
    return this.data.solana.tokenAccounts(accountId, {
      commitment,
      filter: { mint: new PublicKey(this.data.config.mogamiMintPublicKey) },
    })
  }
}
