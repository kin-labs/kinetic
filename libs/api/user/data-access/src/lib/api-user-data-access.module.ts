import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiUserAdminDataAccessService } from './api-user-admin-data-access.service'
import { ApiUserUserDataAccessService } from './api-user-user-data-access.service'

@Module({
  providers: [ApiUserAdminDataAccessService, ApiUserUserDataAccessService],
  exports: [ApiUserAdminDataAccessService, ApiUserUserDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiUserDataAccessModule {}
