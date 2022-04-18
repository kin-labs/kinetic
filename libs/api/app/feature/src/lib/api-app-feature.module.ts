import { ApiAppDataAccessModule } from '@mogami/api/app/data-access'
import { Module } from '@nestjs/common'
import { ApiAppFeatureResolver } from './api-app-feature.resolver'

@Module({
  imports: [ApiAppDataAccessModule],
  providers: [ApiAppFeatureResolver],
})
export class ApiAppFeatureModule {}
