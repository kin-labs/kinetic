import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiUserAdminService } from './api-user-admin.service'
import { ApiUserUserService } from './api-user-user.service'

@Module({
  providers: [ApiUserAdminService, ApiUserUserService],
  exports: [ApiUserAdminService, ApiUserUserService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiUserDataAccessModule {}
