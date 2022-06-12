import { ApiUserDataAccessModule } from '@mogami/api/user/data-access'
import { Module } from '@nestjs/common'
import { ApiUserAdminFeatureResolver } from './api-user-admin-feature.resolver'
import { ApiUserFeatureResolver } from './api-user-feature.resolver'

@Module({
  imports: [ApiUserDataAccessModule],
  providers: [ApiUserAdminFeatureResolver, ApiUserFeatureResolver],
})
export class ApiUserFeatureModule {}
