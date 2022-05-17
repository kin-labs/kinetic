import { Module } from '@nestjs/common'
import { ApiNetworkStatFeatureResolver } from './api-network-stat-feature.resolver'
import { ApiNetworkStatDataAccessModule } from '@mogami/api/network-stat/data-access'

@Module({
  imports: [ApiNetworkStatDataAccessModule],
  providers: [ApiNetworkStatFeatureResolver],
})
export class ApiNetworkStatFeatureModule {}
