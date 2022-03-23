import { Module } from '@nestjs/common'
import { ApiAccountFeatureModule } from '@mogami/api/account/feature'
import { ApiAirdropFeatureModule } from '@mogami/api/airdrop/feature'
import { ApiConfigFeatureModule } from '@mogami/api/config/feature'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { ApiCoreFeatureController } from './api-core-feature.controller'
import { ApiTransactionFeatureModule } from '@mogami/api/transaction/feature'

@Module({
  controllers: [ApiCoreFeatureController],
  providers: [],
  imports: [
    ApiAccountFeatureModule,
    ApiAirdropFeatureModule,
    ApiConfigFeatureModule,
    ApiCoreDataAccessModule,
    ApiTransactionFeatureModule,
  ],
})
export class ApiCoreFeatureModule {}
