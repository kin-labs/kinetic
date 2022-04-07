import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiNetworkStatDataAccessService } from './api-network-stat-data-access.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiNetworkStatDataAccessService],
  exports: [ApiNetworkStatDataAccessService],
})
export class ApiNetworkStatDataAccessModule {}
