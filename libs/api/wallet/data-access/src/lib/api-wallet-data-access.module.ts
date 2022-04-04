import { Module } from '@nestjs/common'
import { ApiWalletDataAccessService } from './api-wallet-data-access.service'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'

@Module({
  controllers: [],
  providers: [ApiWalletDataAccessService],
  exports: [ApiWalletDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiWalletDataAccessModule {}
