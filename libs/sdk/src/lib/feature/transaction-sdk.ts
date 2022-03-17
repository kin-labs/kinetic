import { Configuration, TransactionApi } from '../../generated'

export class TransactionSdk {
  private api: TransactionApi
  constructor(apiConfig: Configuration) {
    this.api = new TransactionApi(apiConfig)
  }
}
