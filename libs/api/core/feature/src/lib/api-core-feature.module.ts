import { Module } from '@nestjs/common';
import { ApiCoreFeatureController } from './api-core-feature.controller';
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'

@Module({
  controllers: [ApiCoreFeatureController],
  providers: [],
  imports: [ApiCoreDataAccessModule],
})
export class ApiCoreFeatureModule {}
