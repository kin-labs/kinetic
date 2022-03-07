import { Module } from '@nestjs/common'
import { ApiAccountDataAccessService } from './api-account-data-access.service'
import { ApiConfigDataAccessModule } from '@mogami/api/config/data-access'

@Module({
  imports: [ApiConfigDataAccessModule],
  providers: [ApiAccountDataAccessService],
  exports: [ApiAccountDataAccessService],
})
export class ApiAccountDataAccessModule {}
