import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { ApiWalletDataAccessModule } from '@mogami/api/wallet/data-access'
import { Module } from '@nestjs/common'
import { ApiAppDataAccessService } from './api-app-data-access.service'

@Module({
  providers: [ApiAppDataAccessService],
  exports: [ApiAppDataAccessService],
  imports: [ApiCoreDataAccessModule, ApiWalletDataAccessModule],
})
export class ApiAppDataAccessModule {}
