import { AccountApi, Configuration } from '../../generated'

export class AccountSdk {
  private api: AccountApi
  constructor(apiConfig: Configuration) {
    this.api = new AccountApi(apiConfig)
  }
  accountInfo(accountId: string) {
    return this.api.apiAccountFeatureControllerGetAccountInfo(accountId)
  }

  balance(accountId: string) {
    return this.api.apiAccountFeatureControllerGetBalance(accountId)
  }

  history(accountId: string) {
    return this.api.apiAccountFeatureControllerGetHistory(accountId)
  }

  tokenAccounts(accountId: string) {
    return this.api.apiAccountFeatureControllerTokenAccounts(accountId)
  }
}
