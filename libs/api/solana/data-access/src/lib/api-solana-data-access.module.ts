import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiSolanaService } from './api-solana.service'

@Module({
  providers: [ApiSolanaService],
  exports: [ApiSolanaService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiSolanaDataAccessModule {}
