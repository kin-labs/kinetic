import { ApiAppDataAccessModule } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { Module } from '@nestjs/common'
import { ApiAccountDataAccessService } from './api-account-data-access.service'

@Module({
  imports: [ApiAppDataAccessModule, ApiCoreDataAccessModule, ApiKineticDataAccessModule],
  providers: [ApiAccountDataAccessService],
  exports: [ApiAccountDataAccessService],
})
export class ApiAccountDataAccessModule {}
