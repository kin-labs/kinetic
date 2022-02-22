import { Module } from '@nestjs/common';
import { ApiCoreFeatureModule } from '@mogami/api/core/feature'

@Module({
  imports: [ApiCoreFeatureModule]
})
export class AppModule {}
