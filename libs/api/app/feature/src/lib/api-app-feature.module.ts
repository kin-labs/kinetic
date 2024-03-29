import { ApiAppDataAccessModule } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiAppAdminFeatureResolver } from './api-app-admin-feature.resolver'
import { ApiAppEnvAdminFeatureResolver } from './api-app-env-admin-feature.resolver'
import { ApiAppEnvUserFeatureResolver } from './api-app-env-user-feature.resolver'
import { ApiAppFeatureController } from './api-app-feature.controller'
import { ApiAppFeatureResolver } from './api-app-feature.resolver'
import { ApiAppUserFeatureResolver } from './api-app-user-feature.resolver'

@Module({
  controllers: [ApiAppFeatureController],
  imports: [ApiCoreDataAccessModule, ApiAppDataAccessModule],
  providers: [
    ApiAppAdminFeatureResolver,
    ApiAppEnvUserFeatureResolver,
    ApiAppEnvAdminFeatureResolver,
    ApiAppFeatureResolver,
    ApiAppUserFeatureResolver,
  ],
})
export class ApiAppFeatureModule {}
