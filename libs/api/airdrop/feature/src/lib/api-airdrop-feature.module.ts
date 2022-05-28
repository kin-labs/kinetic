import { Module } from '@nestjs/common'
import { ApiAirdropFeatureController } from './api-airdrop-feature.controller'
import { ApiAirdropDataAccessModule } from '@mogami/api/airdrop/data-access'

@Module({
  controllers: [ApiAirdropFeatureController],
  imports: [ApiAirdropDataAccessModule],
})
export class ApiAirdropFeatureModule {}
