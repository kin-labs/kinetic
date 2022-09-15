import { Module } from '@nestjs/common'
import { ApiAirdropDataAccessService } from './api-airdrop-data-access.service'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'

@Module({
  providers: [ApiAirdropDataAccessService],
  exports: [ApiAirdropDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiAirdropDataAccessModule {}
