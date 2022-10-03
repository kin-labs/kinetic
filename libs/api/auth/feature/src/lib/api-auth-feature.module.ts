import { ApiAuthDataAccessModule } from '@kin-kinetic/api/auth/data-access'
import { Module } from '@nestjs/common'
import { ApiAuthFeatureController } from './api-auth-feature.controller'
import { ApiAuthFeatureResolver } from './api-auth-feature.resolver'

@Module({
  controllers: [ApiAuthFeatureController],
  imports: [ApiAuthDataAccessModule],
  providers: [ApiAuthFeatureResolver],
})
export class ApiAuthFeatureModule {}
