import { ApiAuthDataAccessModule } from '@mogami/api/auth/data-access'
import { Module } from '@nestjs/common'
import { ApiAuthFeatureResolver } from './api-auth-feature.resolver'

@Module({
  imports: [ApiAuthDataAccessModule],
  providers: [ApiAuthFeatureResolver],
})
export class ApiAuthFeatureModule {}
