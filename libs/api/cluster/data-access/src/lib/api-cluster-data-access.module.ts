import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiClusterDataAccessService } from './api-cluster-data-access.service'
import { ApiClusterStatDataAccessService } from './api-cluster-stat-data-access.service'

@Module({
  providers: [ApiClusterDataAccessService, ApiClusterStatDataAccessService],
  exports: [ApiClusterDataAccessService, ApiClusterStatDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiClusterDataAccessModule {}
