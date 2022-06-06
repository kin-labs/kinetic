import { ApiClusterDataAccessModule } from '@mogami/api/cluster/data-access'
import { Module } from '@nestjs/common'
import { ApiClusterFeatureResolver } from './api-cluster-feature.resolver'
import { ApiClusterStatFeatureResolver } from './api-cluster-stat-feature.resolver'

@Module({
  imports: [ApiClusterDataAccessModule],
  providers: [ApiClusterFeatureResolver, ApiClusterStatFeatureResolver],
})
export class ApiClusterFeatureModule {}
