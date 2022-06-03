import { ApiAccountFeatureModule } from '@mogami/api/account/feature'
import { ApiAirdropFeatureModule } from '@mogami/api/airdrop/feature'
import { ApiAppFeatureModule } from '@mogami/api/app/feature'
import { ApiAuthFeatureModule } from '@mogami/api/auth/feature'
import { ApiClusterFeatureModule } from '@mogami/api/cluster/feature'
import { ApiConfigFeatureModule } from '@mogami/api/config/feature'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { ApiNetworkStatFeatureModule } from '@mogami/api/network-stat/feature'
import { ApiTransactionFeatureModule } from '@mogami/api/transaction/feature'
import { ApiUserFeatureModule } from '@mogami/api/user/feature'
import { ApiWalletFeatureModule } from '@mogami/api/wallet/feature'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ApiCoreFeatureController } from './api-core-feature.controller'
import { ApiCoreFeatureResolver } from './api-core-feature.resolver'
import { serveStaticFactory } from './serve-static.factory'
import { OpenTelemetryModule } from '@metinseylan/nestjs-opentelemetry'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'

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
    ApiNetworkStatFeatureModule,
    ApiTransactionFeatureModule,
    ApiUserFeatureModule,
    ApiWalletFeatureModule,
    OpenTelemetryModule.forRoot({
      applicationName: 'mogami-opentelemetry',
      metricExporter: new PrometheusExporter({
        endpoint: 'metrics',
        port: 9090,
      }),
    }),
    ScheduleModule.forRoot(),
  ],
})
export class ApiCoreFeatureModule {}
