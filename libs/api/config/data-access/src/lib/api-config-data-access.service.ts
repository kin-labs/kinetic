import { AirdropConfig } from '@mogami/airdrop'
import { createMintKin } from '@mogami/api/cluster/util'
import { INestApplication, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ClusterStatus, ClusterType, Prisma } from '@prisma/client'
import { Connection, Keypair } from '@solana/web3.js'
import { exec } from 'child_process'
import * as fs from 'fs'
import { ProvisionedApp } from './entities/provisioned-app.entity'
import { getProvisionedApps } from './helpers/get-provisioned-apps'

@Injectable()
export class ApiConfigDataAccessService {
  private readonly logger = new Logger(ApiConfigDataAccessService.name)
  readonly clusters: Prisma.ClusterCreateInput[] = [
    {
      id: 'solana-devnet',
      name: 'Solana Devnet',
      endpoint: 'devnet',
      type: ClusterType.SolanaDevnet,
    },
    {
      id: 'solana-mainnet',
      name: 'Solana Mainnet',
      endpoint: 'mainnet',
      type: ClusterType.SolanaMainnet,
      status: ClusterStatus.Inactive,
    },
  ]
  readonly mints: Prisma.MintCreateInput[] = [
    createMintKin('solana-devnet', 'KinDesK3dYWo3R2wDk6Ucaf31tvQCCSYyL8Fuqp33GX'),
    createMintKin('solana-mainnet', 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6'),
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

  get environment() {
    return this.config.get('environment')
  }

  get jwtSecret(): string {
    return this.config.get('jwt.secret')
  }

  mogamiAirdropConfig(connection: Connection): AirdropConfig | null {
    return this.mogamiAirdropKeypair
      ? {
          airdropDefault: this.mogamiAirdropDefault,
          airdropMax: this.mogamiAirdropMax,
          connection,
          decimals: this.mogamiMintDecimals,
          feePayer: this.mogamiAirdropKeypair,
          mint: this.mogamiMintPublicKey,
        }
      : null
  }

  get mogamiAirdropDefault(): number {
    return this.config.get('mogamiAirdropDefault')
  }

  get mogamiAirdropMax(): number {
    return this.config.get('mogamiAirdropMax')
  }

  get mogamiAirdropKeypair(): Keypair {
    return this.config.get('mogamiAirdropKeypair')
  }

  get mogamiMainnet() {
    return this.config.get('mogamiMainnet')
  }

  get mogamiMintDecimals() {
    return this.config.get('mogamiMintDecimals')
  }

  get mogamiMintPublicKey() {
    return this.config.get('mogamiMintPublicKey')
  }

  get port() {
    return this.config.get('port')
  }

  get prefix() {
    return 'api'
  }

  get solanaRpcEndpoint() {
    return this.config.get('solanaRpcEndpoint')
  }

  configSummary() {
    return {
      environment: this.environment,
      port: this.port,
      solanaRpcEndpoint: this.solanaRpcEndpoint,
    }
  }

  configureSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Mogami')
      .setDescription('The Mogami API description')
      .setVersion('1.0')
      .addTag('mogami')
      .addServer('https://devnet.mogami.io')
      .addServer('https://mainnet.mogami.io')
      .addServer('http://localhost:3000')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    if (this.environment === 'development') {
      fs.writeFileSync('./api-swagger.json', JSON.stringify(document, null, 2))
    }
    SwaggerModule.setup(this.prefix, app, document)
  }
}
