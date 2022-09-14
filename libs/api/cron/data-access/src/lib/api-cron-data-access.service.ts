import { ApiTransactionDataAccessService } from '@kin-kinetic/api/transaction/data-access'
import { ApiWalletUserDataAccessService } from '@kin-kinetic/api/wallet/data-access'
import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class ApiCronDataAccessService {
  constructor(
    private readonly wallet: ApiWalletUserDataAccessService,
    private readonly transaction: ApiTransactionDataAccessService,
  ) {}

  @Cron('25 * * * * *')
  checkBalance() {
    return this.wallet.checkBalance()
  }

  @Cron('55 * * * * *')
  checkStaleTransactions() {
    return this.transaction.cleanupStaleTransactions()
  }
}
