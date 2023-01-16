import { ApiKineticDataAccessModule } from '@kin-kinetic/api/kinetic/data-access'
import { Module } from '@nestjs/common'
import { ApiKineticFeatureController } from './api-kinetic-feature.controller'

@Module({
  controllers: [ApiKineticFeatureController],
  imports: [ApiKineticDataAccessModule],
})
export class ApiKineticFeatureModule {}
