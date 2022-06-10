import { ApiAppDataAccessModule } from '@mogami/api/app/data-access'
import { Module } from '@nestjs/common'
import { ApiAppAdminFeatureResolver } from './api-app-admin-feature.resolver'
import { ApiAppEnvFeatureResolver } from './api-app-env-feature.resolver'
import { ApiAppFeatureController } from './api-app-feature.controller'
import { ApiAppFeatureResolver } from './api-app-feature.resolver'
import { ApiAppTransactionFeatureResolver } from './api-app-transaction-feature.resolver'
import { ApiAppUserFeatureResolver } from './api-app-user-feature.resolver'

@Module({
  controllers: [ApiAppFeatureController],
  imports: [ApiAppDataAccessModule],
  providers: [
    ApiAppAdminFeatureResolver,
    ApiAppEnvFeatureResolver,
    ApiAppFeatureResolver,
    ApiAppTransactionFeatureResolver,
    ApiAppUserFeatureResolver,
  ],
})
export class ApiAppFeatureModule {}
