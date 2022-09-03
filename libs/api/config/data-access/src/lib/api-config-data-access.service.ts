import { createMintKin, createMintSol, createMintUsdc } from '@kin-kinetic/api/cluster/util'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { INestApplication, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ClusterStatus, ClusterType, Prisma } from '@prisma/client'
import { CookieOptions } from 'express-serve-static-core'
import * as fs from 'fs'
import { join } from 'path'
import { ProvisionedApp } from './entities/provisioned-app.entity'
import { getProvisionedApps } from './helpers/get-provisioned-apps'

@Injectable()
export class ApiConfigDataAccessService {
  private readonly logger = new Logger(ApiConfigDataAccessService.name)
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

  get apiUrl(): string {
    return this.config.get('api.url')
  }

  get cookieDomains(): string[] {
    return this.config.get('cookie.domains')
  }

  get cookieName(): string {
    return this.config.get('cookie.name')
  }

  cookieOptions(hostname: string): CookieOptions {
    const found = this.cookieDomains.find((domain) => hostname.endsWith(domain))
    if (!found) {
      this.logger.warn(`Not configured to set cookies for ${hostname}`)
    }
    return {
      httpOnly: true,
      secure: true,
      domain: found || this.cookieDomains[0],
      sameSite: this.cookieDomains?.length > 1 ? 'none' : 'strict',
    }
  }

  get cors() {
    return {
      credentials: true,
      origin: (origin: string, cb) => {
        if (
          this.corsOrigins.find((allowed) => {
            if (allowed === '*') {
              return true
            }
            if (allowed?.includes('*')) {
              const [start, end] = allowed.split('*')
              const { hostname } = new URL(origin)

              return origin.startsWith(start) && hostname.endsWith(end)
            }
            return false
          })
        ) {
          return cb(null, origin)
        }
        return cb(new Error(`The CORS policy does not allow access from ${origin}.`), false)
      },
    }
  }

  get corsOrigins(): string[] {
    return this.config.get('cors.origins')
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

  get metricsConfig(): { enabled: boolean; port: number } {
    return {
      enabled: this.metricsEnabled,
      port: this.metricsPort,
    }
  }

  get metricsEnabled(): boolean {
    return this.config.get('metrics.enabled')
  }

  get metricsEndpointEnabled(): boolean {
    return this.config.get('metrics.endpointEnabled')
  }

  get metricsPort(): number {
    return this.config.get('metrics.port')
  }

  get isProduction(): boolean {
    return this.environment === 'production'
  }

  get host() {
    return this.config.get('host')
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
