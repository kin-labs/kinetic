import { ApiTransactionService } from '@kin-kinetic/api/transaction/data-access'
import { ApiWalletUserService } from '@kin-kinetic/api/wallet/data-access'
import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class ApiCronService {
  constructor(private readonly wallet: ApiWalletUserService, private readonly transaction: ApiTransactionService) {}

  @Cron('25 * * * * *')
  checkBalance() {
    return this.wallet.checkBalance()
  }

  @Cron('55 * * * * *')
  checkStaleTransactions() {
    return this.transaction.cleanupStaleTransactions()
  }
}
