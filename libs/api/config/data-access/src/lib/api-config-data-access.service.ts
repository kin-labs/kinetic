import { createMintKin, createMintSol } from '@mogami/api/cluster/util'
import { INestApplication, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ClusterStatus, ClusterType, Prisma } from '@prisma/client'
import * as fs from 'fs'
import { ProvisionedApp } from './entities/provisioned-app.entity'
import { getProvisionedApps } from './helpers/get-provisioned-apps'

@Injectable()
export class ApiConfigDataAccessService {
  readonly clusters: Prisma.ClusterCreateInput[] = [
    {
      id: 'solana-devnet',
      name: 'Solana Devnet',
      endpoint: this.solanaDevnetRpcEndpoint,
      explorer: 'https://explorer.solana.com/{path}?cluster=devnet',
      type: ClusterType.SolanaDevnet,
    },
    {
      id: 'solana-mainnet',
      name: 'Solana Mainnet',
      endpoint: this.solanaMainnetRpcEndpoint,
      explorer: 'https://explorer.solana.com/{path}',
      type: ClusterType.SolanaMainnet,
      status: ClusterStatus.Inactive,
    },
  ]
  readonly mints: Prisma.MintCreateInput[] = [
    createMintKin('solana-devnet', 0, this.defaultMintPublicKey, this.defaultMintDecimals),
    createMintKin('solana-mainnet', 0, 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6', 5),
    createMintSol('solana-devnet', 1),
    createMintSol('solana-mainnet', 1),
  ]
  readonly provisionedApps: ProvisionedApp[] = getProvisionedApps(Object.keys(process.env))

  constructor(private readonly config: ConfigService) {}

  get adminEmail(): string {
    return this.config.get('admin.email')
  }

  get adminPassword(): string {
    return this.config.get('admin.password')
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
