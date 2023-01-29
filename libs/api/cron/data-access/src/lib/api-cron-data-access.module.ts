import { ApiTransactionDataAccessModule } from '@kin-kinetic/api/transaction/data-access'
import { ApiWalletDataAccessModule } from '@kin-kinetic/api/wallet/data-access'
import { Module } from '@nestjs/common'
import { ApiCronService } from './api-cron.service'

@Module({
  providers: [ApiCronService],
  exports: [ApiCronService],
  imports: [ApiTransactionDataAccessModule, ApiWalletDataAccessModule],
})
export class ApiCronDataAccessModule {}
