import { Module } from '@nestjs/common'
import { ApiAccountFeatureController } from './api-account-feature.controller'
import { ApiAccountDataAccessModule } from '@mogami/api/account/data-access'

@Module({
  controllers: [ApiAccountFeatureController],
  providers: [],
  imports: [ApiAccountDataAccessModule],
})
export class ApiAccountFeatureModule {}
