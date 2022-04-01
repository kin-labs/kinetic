import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiUserDataAccessService } from './api-user-data-access.service'

@Module({
  providers: [ApiUserDataAccessService],
  exports: [ApiUserDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiUserDataAccessModule {}
