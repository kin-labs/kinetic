import { ApiCoreFeatureModule } from '@mogami/api/core/feature'
import { Module } from '@nestjs/common'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
