import { Module } from '@nestjs/common'
import { ApiTransactionFeatureController } from './api-transaction-feature.controller'
import { ApiTransactionDataAccessModule } from '@kin-kinetic/api/transaction/data-access'

@Module({
  controllers: [ApiTransactionFeatureController],
  imports: [ApiTransactionDataAccessModule],
})
export class ApiTransactionFeatureModule {}
