import { createMintKin, createMintSol, createMintUsdc } from '@kin-kinetic/api/cluster/util'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { INestApplication, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ClusterStatus, ClusterType, Prisma } from '@prisma/client'
import * as fs from 'fs'
import { join } from 'path'
import { ProvisionedApp } from './entities/provisioned-app.entity'
import { getProvisionedApps } from './helpers/get-provisioned-apps'

@Injectable()
export class ApiConfigDataAccessService {
  readonly clusters: Prisma.ClusterCreateInput[] = [
    this.isProduction
      ? undefined
      : {
          id: 'local',
          name: 'Local',
          endpointPrivate: 'http://localhost:8899',
          endpointPublic: 'http://localhost:8899',
          explorer: 'https://explorer.solana.com/{path}?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899',
          type: ClusterType.Custom,
          status: ClusterStatus.Active,
        },
    {
      id: 'solana-devnet',
      name: 'Solana Devnet',
      endpointPrivate: this.solanaDevnetRpcEndpoint,
      endpointPublic: this.solanaDevnetRpcEndpoint,
      explorer: 'https://explorer.solana.com/{path}?cluster=devnet',
      type: ClusterType.SolanaDevnet,
    },
    {
      id: 'solana-mainnet',
      name: 'Solana Mainnet',
      endpointPrivate: this.solanaMainnetRpcEndpoint,
      endpointPublic: this.solanaMainnetRpcEndpoint,
      explorer: 'https://explorer.solana.com/{path}',
      type: ClusterType.SolanaMainnet,
      status: ClusterStatus.Inactive,
    },
  ]
  readonly mints: Prisma.MintCreateInput[] = [
    ...(!this.isProduction
      ? [
          createMintKin('local', 0, 'MoGaMuJnB3k8zXjBYBnHxHG47vWcW3nyb7bFYvdVzek', 5),
          createMintSol('local', 1),
          createMintUsdc('local', 2, 'USDzo281m7rjzeZyxevkzL1vr5Cibb9ek3ynyAjXjUM', 2),
        ]
      : []),
    createMintKin('solana-devnet', 0, this.defaultMintPublicKey, this.defaultMintDecimals),
    createMintKin('solana-mainnet', 0, 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6', 5),
    createMintSol('solana-devnet', 1),
    createMintSol('solana-mainnet', 1),
  ]
  readonly provisionedApps: ProvisionedApp[] = getProvisionedApps(Object.keys(process.env))

  constructor(private readonly config: ConfigService) {}

  get adminUsername(): string {
    return this.config.get('admin.username')
  }

  get adminPassword(): string {
    return this.config.get('admin.password')
  }

  get cors() {
    return {
      credentials: true,
      origin: this.corsOrigins,
    }
  }

  get corsOrigins(): string[] {
    return this.config.get('cors.origin')
  }

  get defaultMintAirdropAmount(): number {
    return this.config.get('defaultMintAirdropAmount')
  }

  get defaultMintAirdropMax(): number {
    return this.config.get('defaultMintAirdropMax')
  }

  get defaultMintDecimals(): number {
    return this.config.get('defaultMintDecimals')
  }

  get defaultMintPublicKey(): string {
    return this.config.get('defaultMintPublicKey')
  }

  get environment() {
    return this.config.get('environment')
  }

  get graphqlConfig(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'api-schema.graphql'),
      context: ({ req, res }) => ({ req, res }),
      cors: this.cors,
      playground: { settings: { 'request.credentials': 'include' } },
      sortSchema: true,
    }
  }

  get isDevelopment(): boolean {
    return this.environment === 'development'
  }

  get metricsEnabled(): boolean {
    return this.config.get('metricsEnabled')
  }

  get isProduction(): boolean {
    return this.environment === 'production'
  }

  get port() {
    return this.config.get('port')
  }

  get prefix() {
    return 'api'
  }

  get solanaDevnetRpcEndpoint() {
    return this.config.get('solanaDevnetRpcEndpoint')
  }

  get solanaMainnetRpcEndpoint() {
    return this.config.get('solanaMainnetRpcEndpoint')
  }

  configSummary() {
    return {
      environment: this.environment,
      port: this.port,
    }
  }

  configureSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Kinetic')
      .setDescription('The OpenAPI definition of the Kinetic API')
      .setVersion('1.0')
      .addTag('kinetic')
      .addServer('https://devnet.kinetic.kin.org')
      .addServer('https://mainnet.kinetic.kin.org')
      .addServer('http://localhost:3000')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    if (this.isDevelopment) {
      fs.writeFileSync('./api-swagger.json', JSON.stringify(document, null, 2))
    }
    SwaggerModule.setup(this.prefix, app, document)
  }
}
