import { Module } from '@nestjs/common'
import { ApiAppDataAccessService } from './api-app-data-access.service'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'

@Module({
  controllers: [],
  providers: [ApiAppDataAccessService],
  exports: [ApiAppDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiAppDataAccessModule {}
