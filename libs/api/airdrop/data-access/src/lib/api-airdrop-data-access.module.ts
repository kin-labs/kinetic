import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiSolanaDataAccessModule } from '@kin-kinetic/api/solana/data-access'
import { Module } from '@nestjs/common'
import { ApiAirdropDataAccessService } from './api-airdrop-data-access.service'

@Module({
  providers: [ApiAirdropDataAccessService],
  exports: [ApiAirdropDataAccessService],
  imports: [ApiCoreDataAccessModule, ApiSolanaDataAccessModule],
})
export class ApiAirdropDataAccessModule {}
