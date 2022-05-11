import { ApiAppDataAccessModule } from '@mogami/api/app/data-access'
import { Module } from '@nestjs/common'
import { ApiAppFeatureController } from './api-app-feature.controller'
import { ApiAppFeatureResolver } from './api-app-feature.resolver'
import { ApiAppTransactionFeatureResolver } from './api-app-transaction-feature.resolver'

@Module({
  controllers: [ApiAppFeatureController],
  imports: [ApiAppDataAccessModule],
  providers: [ApiAppFeatureResolver, ApiAppTransactionFeatureResolver],
})
export class ApiAppFeatureModule {}
