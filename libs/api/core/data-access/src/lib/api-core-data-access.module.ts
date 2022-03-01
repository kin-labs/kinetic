import { ApiConfigDataAccessModule } from '@mogami/api/config/data-access'
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessService } from './api-core-data-access.service'

@Module({
  imports: [ApiConfigDataAccessModule],
  providers: [ApiCoreDataAccessService],
  exports: [ApiCoreDataAccessService],
})
export class ApiCoreDataAccessModule {}
