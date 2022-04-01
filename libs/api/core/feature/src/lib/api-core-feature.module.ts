import { ApiAccountFeatureModule } from '@mogami/api/account/feature'
import { ApiAirdropFeatureModule } from '@mogami/api/airdrop/feature'
import { ApiConfigFeatureModule } from '@mogami/api/config/feature'
import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { ApiTransactionFeatureModule } from '@mogami/api/transaction/feature'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ApiCoreFeatureController } from './api-core-feature.controller'
import { ApiCoreFeatureResolver } from './api-core-feature.resolver'
import { serveStaticFactory } from './serve-static.factory'

@Module({
  controllers: [ApiCoreFeatureController],
  providers: [ApiCoreFeatureResolver],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'api-schema.graphql'),
      context: ({ req, res }) => ({ req, res }),
      driver: ApolloDriver,
    }),
    ServeStaticModule.forRootAsync({ useFactory: serveStaticFactory() }),
    ApiAccountFeatureModule,
    ApiAirdropFeatureModule,
    ApiConfigFeatureModule,
    ApiCoreDataAccessModule,
    ApiTransactionFeatureModule,
  ],
})
export class ApiCoreFeatureModule {}
