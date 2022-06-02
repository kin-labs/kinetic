import { ApiAppDataAccessModule } from '@mogami/api/app/data-access'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiAccountDataAccessService } from './api-account-data-access.service'

@Module({
  imports: [ApiAppDataAccessModule, ApiCoreDataAccessModule],
  providers: [ApiAccountDataAccessService],
  exports: [ApiAccountDataAccessService],
})
export class ApiAccountDataAccessModule {}
