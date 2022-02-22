import { Module } from '@nestjs/common';
import { ApiConfigFeatureController } from './api-config-feature.controller';
import { ApiConfigDataAccessModule } from '@mogami/api/config/data-access'

@Module({
  controllers: [ApiConfigFeatureController],
  providers: [],
  imports: [ApiConfigDataAccessModule],
})
export class ApiConfigFeatureModule {}
