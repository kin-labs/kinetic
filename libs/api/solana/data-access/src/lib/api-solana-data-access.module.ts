import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiSolanaDataAccessService } from './api-solana-data-access.service'

@Module({
  providers: [ApiSolanaDataAccessService],
  exports: [ApiSolanaDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiSolanaDataAccessModule {}
