import { ApiUserDataAccessModule } from '@mogami/api/user/data-access'
import { Module } from '@nestjs/common'
import { ApiUserFeatureResolver } from './api-user-feature.resolver'

@Module({
  imports: [ApiUserDataAccessModule],
  providers: [ApiUserFeatureResolver],
})
export class ApiUserFeatureModule {}
