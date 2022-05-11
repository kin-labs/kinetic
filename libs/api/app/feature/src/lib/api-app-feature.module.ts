import { ApiAppDataAccessModule } from '@mogami/api/app/data-access'
import { Module } from '@nestjs/common'
import { ApiAppCreationFeatureResolver } from './api-app-creation-feature.resolver'
import { ApiAppFeatureController } from './api-app-feature.controller'
import { ApiAppFeatureResolver } from './api-app-feature.resolver'
import { ApiAppTransactionFeatureResolver } from './api-app-transaction-feature.resolver'

@Module({
  controllers: [ApiAppFeatureController],
  imports: [ApiAppDataAccessModule],
  providers: [ApiAppFeatureResolver, ApiAppCreationFeatureResolver, ApiAppTransactionFeatureResolver],
})
export class ApiAppFeatureModule {}
