import { Module } from '@nestjs/common'
import { ApiClusterDataAccessService } from './api-cluster-data-access.service'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'

@Module({
  providers: [ApiClusterDataAccessService],
  exports: [ApiClusterDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiClusterDataAccessModule {}
