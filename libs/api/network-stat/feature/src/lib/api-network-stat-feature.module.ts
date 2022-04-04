import { Module } from '@nestjs/common'
import { ApiNetworkStatFeatureResolver } from './api-network-stat-feature.resolver'
import { ApiNetworkStatFeatureController } from './api-network-stat-feature.controller'
import { ApiNetworkStatDataAccessModule } from '@mogami/api/network-stat/data-access'

@Module({
  imports: [ApiNetworkStatDataAccessModule],
  controllers: [ApiNetworkStatFeatureController],
  providers: [ApiNetworkStatFeatureResolver],
})
export class ApiNetworkStatFeatureModule {}
