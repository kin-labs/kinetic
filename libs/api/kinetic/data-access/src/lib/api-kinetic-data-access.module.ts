import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { ApiSolanaDataAccessModule } from '@kin-kinetic/api/solana/data-access'
import { ApiWebhookDataAccessModule } from '@kin-kinetic/api/webhook/data-access'
import { Module } from '@nestjs/common'
import { ApiKineticService } from './api-kinetic.service'

@Module({
  exports: [ApiKineticService],
  imports: [ApiCoreDataAccessModule, ApiSolanaDataAccessModule, ApiWebhookDataAccessModule],
  providers: [ApiKineticService],
})
export class ApiKineticDataAccessModule {}
