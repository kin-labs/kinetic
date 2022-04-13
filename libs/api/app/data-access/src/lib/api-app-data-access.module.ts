import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { ApiWalletDataAccessModule } from '@mogami/api/wallet/data-access'
import { Module } from '@nestjs/common'
import { ApiAppConfigGuard } from './guards/api-app-config-guard.service'
import { ApiAppConfigMiddleware } from './middleware/api-app-config.middleware'
import { ApiAppDataAccessService } from './api-app-data-access.service'

@Module({
  providers: [ApiAppDataAccessService, ApiAppConfigMiddleware, ApiAppConfigGuard],
  exports: [ApiCoreDataAccessModule, ApiAppDataAccessService],
  imports: [ApiCoreDataAccessModule, ApiWalletDataAccessModule],
})
export class ApiAppDataAccessModule {}
