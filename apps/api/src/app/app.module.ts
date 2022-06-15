import { ApiCoreFeatureModule } from '@kin-kinetic/api/core/feature'
import { Module } from '@nestjs/common'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
