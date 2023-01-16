import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { Module } from '@nestjs/common'
import { ApiAirdropDataAccessService } from './api-airdrop-data-access.service'

@Module({
  providers: [ApiAirdropDataAccessService],
  exports: [ApiAirdropDataAccessService],
  imports: [ApiCoreDataAccessModule, ApiKineticDataAccessModule],
})
export class ApiAirdropDataAccessModule {}
