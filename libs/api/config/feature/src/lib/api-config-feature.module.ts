import { Module } from '@nestjs/common'
import { ApiConfigFeatureController } from './api-config-feature.controller'
import { ApiConfigDataAccessModule } from '@kin-kinetic/api/config/data-access'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { validationSchema } from './config/validation-schema'

@Module({
  controllers: [ApiConfigFeatureController],
  imports: [
    ApiConfigDataAccessModule,
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      validationSchema,
    }),
  ],
})
export class ApiConfigFeatureModule {}
