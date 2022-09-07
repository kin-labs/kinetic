import { ApiTransactionDataAccessModule } from '@kin-kinetic/api/transaction/data-access'
import { Module } from '@nestjs/common'
import { ApiTransactionFeatureController } from './api-transaction-feature.controller'
import { ApiTransactionFeatureResolver } from './api-transaction-feature.resolver'

@Module({
  controllers: [ApiTransactionFeatureController],
  imports: [ApiTransactionDataAccessModule],
  providers: [ApiTransactionFeatureResolver],
})
export class ApiTransactionFeatureModule {}
