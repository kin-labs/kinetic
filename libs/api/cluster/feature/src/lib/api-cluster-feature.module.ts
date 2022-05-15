import { Module } from '@nestjs/common'
import { ApiClusterDataAccessModule } from '@mogami/api/cluster/data-access'
import { ApiClusterFeatureResolver } from './api-cluster-feature.resolver'

@Module({
  exports: [],
  imports: [ApiClusterDataAccessModule],
  providers: [ApiClusterFeatureResolver],
})
export class ApiClusterFeatureModule {}
