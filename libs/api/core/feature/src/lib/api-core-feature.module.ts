import { ApiAccountFeatureModule } from '@mogami/api/account/feature'
import { ApiAirdropFeatureModule } from '@mogami/api/airdrop/feature'
import { ApiAppFeatureModule } from '@mogami/api/app/feature'
import { ApiAuthFeatureModule } from '@mogami/api/auth/feature'
import { ApiClusterFeatureModule } from '@mogami/api/cluster/feature'
import { ApiConfigFeatureModule } from '@mogami/api/config/feature'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { ApiTransactionFeatureModule } from '@mogami/api/transaction/feature'
import { ApiUserFeatureModule } from '@mogami/api/user/feature'
import { ApiWalletFeatureModule } from '@mogami/api/wallet/feature'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { OpenTelemetryModule } from 'nestjs-otel'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ApiCoreFeatureController } from './api-core-feature.controller'
import { ApiCoreFeatureResolver } from './api-core-feature.resolver'
import { serveStaticFactory } from './serve-static.factory'

const isMetricsEnable = process.env.ENABLE_METRICS === 'TRUE'

@Module({
  controllers: [ApiCoreFeatureController],
  providers: [ApiCoreFeatureResolver],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'api-schema.graphql'),
      context: ({ req, res }) => ({ req, res }),
      driver: ApolloDriver,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      sortSchema: true,
    }),
    ServeStaticModule.forRootAsync({ useFactory: serveStaticFactory() }),
    ApiAccountFeatureModule,
    ApiAirdropFeatureModule,
    ApiAppFeatureModule,
    ApiAuthFeatureModule,
    ApiClusterFeatureModule,
    ApiConfigFeatureModule,
    ApiCoreDataAccessModule,
    ApiTransactionFeatureModule,
    ApiUserFeatureModule,
    ApiWalletFeatureModule,
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: isMetricsEnable, // Includes Host Metrics
        defaultMetrics: isMetricsEnable, // Includes Default Metrics
        apiMetrics: {
          enable: isMetricsEnable, // Includes api metrics
          timeBuckets: [], // You can change the default time buckets
          defaultAttributes: {
            // You can set default labels for api metrics
            custom: 'label',
          },
          ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
          ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
        },
      },
    }),
    ScheduleModule.forRoot(),
  ],
})
export class ApiCoreFeatureModule {}
