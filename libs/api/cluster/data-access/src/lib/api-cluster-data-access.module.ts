import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiClusterAdminDataAccessService } from './api-cluster-admin-data-access.service'
import { ApiClusterStatDataAccessService } from './api-cluster-stat-data-access.service'
import { ApiClusterUserDataAccessService } from './api-cluster-user-data-access.service'

@Module({
  providers: [ApiClusterAdminDataAccessService, ApiClusterUserDataAccessService, ApiClusterStatDataAccessService],
  exports: [ApiClusterAdminDataAccessService, ApiClusterUserDataAccessService, ApiClusterStatDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiClusterDataAccessModule {}
