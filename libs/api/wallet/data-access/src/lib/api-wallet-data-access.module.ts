import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiWalletAdminDataAccessService } from './api-wallet-admin-data-access.service'
import { ApiWalletUserDataAccessService } from './api-wallet-user-data-access.service'

@Module({
  providers: [ApiWalletAdminDataAccessService, ApiWalletUserDataAccessService],
  exports: [ApiWalletAdminDataAccessService, ApiWalletUserDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiWalletDataAccessModule {}
