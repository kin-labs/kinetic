import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiClusterAdminDataAccessService } from './api-cluster-admin-data-access.service'
import { ApiClusterDataAccessService } from './api-cluster-data-access.service'
import { ApiClusterStatDataAccessService } from './api-cluster-stat-data-access.service'

@Module({
  providers: [ApiClusterAdminDataAccessService, ApiClusterDataAccessService, ApiClusterStatDataAccessService],
  exports: [ApiClusterAdminDataAccessService, ApiClusterDataAccessService, ApiClusterStatDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiClusterDataAccessModule {}
