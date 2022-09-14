import { ApiTransactionDataAccessModule } from '@kin-kinetic/api/transaction/data-access'
import { ApiWalletDataAccessModule } from '@kin-kinetic/api/wallet/data-access'
import { Module } from '@nestjs/common'
import { ApiCronDataAccessService } from './api-cron-data-access.service'

@Module({
  providers: [ApiCronDataAccessService],
  exports: [ApiCronDataAccessService],
  imports: [ApiTransactionDataAccessModule, ApiWalletDataAccessModule],
})
export class ApiCronDataAccessModule {}
