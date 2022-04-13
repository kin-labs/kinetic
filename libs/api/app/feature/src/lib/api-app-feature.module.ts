import { ApiAppConfigMiddleware, ApiAppDataAccessModule } from '@mogami/api/app/data-access'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ApiAppFeatureController } from './api-app-feature.controller'
import { ApiAppFeatureResolver } from './api-app-feature.resolver'

@Module({
  controllers: [ApiAppFeatureController],
  imports: [ApiAppDataAccessModule],
  providers: [ApiAppFeatureResolver],
})
export class ApiAppFeatureModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiAppConfigMiddleware).forRoutes({
      path: 'app/*',
      method: RequestMethod.ALL,
    })
  }
}
