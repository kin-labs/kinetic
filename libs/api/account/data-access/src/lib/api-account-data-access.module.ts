import { ApiAppDataAccessModule } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { Module } from '@nestjs/common'
import { ApiAccountService } from './api-account.service'

@Module({
  imports: [ApiAppDataAccessModule, ApiCoreDataAccessModule, ApiKineticDataAccessModule],
  providers: [ApiAccountService],
  exports: [ApiAccountService],
})
export class ApiAccountDataAccessModule {}
