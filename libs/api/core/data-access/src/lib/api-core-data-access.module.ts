import { Module } from '@nestjs/common'
import { ApiCoreDataAccessService } from './api-core-data-access.service'

@Module({
  controllers: [],
  providers: [ApiCoreDataAccessService],
  exports: [ApiCoreDataAccessService],
})
export class ApiCoreDataAccessModule {}
