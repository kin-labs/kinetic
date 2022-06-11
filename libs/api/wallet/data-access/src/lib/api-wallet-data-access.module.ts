import { Module } from '@nestjs/common'
import { ApiWalletUserDataAccessService } from './api-wallet-user-data-access.service'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'

@Module({
  providers: [ApiWalletUserDataAccessService],
  exports: [ApiWalletUserDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiWalletDataAccessModule {}
