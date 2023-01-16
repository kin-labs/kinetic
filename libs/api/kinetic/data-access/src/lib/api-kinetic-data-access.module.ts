import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiKineticService } from './api-kinetic.service'

@Module({
  exports: [ApiKineticService],
  imports: [ApiCoreDataAccessModule],
  providers: [ApiKineticService],
})
export class ApiKineticDataAccessModule {}
