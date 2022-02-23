import { Module } from '@nestjs/common'
import { ApiConfigDataAccessService } from './api-config-data-access.service'

@Module({
  controllers: [],
  providers: [ApiConfigDataAccessService],
  exports: [ApiConfigDataAccessService],
})
export class ApiConfigDataAccessModule {}
