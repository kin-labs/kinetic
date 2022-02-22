import { Module } from '@nestjs/common';
import { ApiCoreFeatureController } from './api-core-feature.controller';
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { ApiConfigFeatureModule } from '@mogami/api/config/feature'

@Module({
  controllers: [ApiCoreFeatureController],
  providers: [],
  imports: [ApiCoreDataAccessModule, ApiConfigFeatureModule],
})
export class ApiCoreFeatureModule {}
