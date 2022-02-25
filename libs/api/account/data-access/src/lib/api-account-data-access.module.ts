import { Module } from '@nestjs/common'
import { ApiAccountDataAccessService } from './api-account-data-access.service'

@Module({
  controllers: [],
  providers: [ApiAccountDataAccessService],
  exports: [ApiAccountDataAccessService],
})
export class ApiAccountDataAccessModule {}
