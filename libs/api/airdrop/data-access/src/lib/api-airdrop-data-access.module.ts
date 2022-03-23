import { Module } from '@nestjs/common'
import { ApiAirdropDataAccessService } from './api-airdrop-data-access.service'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'

@Module({
  controllers: [],
  providers: [ApiAirdropDataAccessService],
  exports: [ApiAirdropDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiAirdropDataAccessModule {}
