import { ApiUserDataAccessModule } from '@kin-kinetic/api/user/data-access'
import { Module } from '@nestjs/common'
import { ApiUserAdminFeatureResolver } from './api-user-admin-feature.resolver'
import { ApiUserUserFeatureResolver } from './api-user-user-feature.resolver'

@Module({
  imports: [ApiUserDataAccessModule],
  providers: [ApiUserAdminFeatureResolver, ApiUserUserFeatureResolver],
})
export class ApiUserFeatureModule {}
