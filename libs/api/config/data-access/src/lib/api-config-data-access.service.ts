import { getProvisionedClusters, ProvisionedCluster } from '@kin-kinetic/api/cluster/util'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { INestApplication, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { CookieOptions } from 'express-serve-static-core'
import * as fs from 'fs'
import { join } from 'path'
import { ProvisionedApp } from './entities/provisioned-app.entity'
import { getProvisionedApps } from './helpers/get-provisioned-apps'

@Injectable()
export class ApiConfigDataAccessService {
  private readonly logger = new Logger(ApiConfigDataAccessService.name)
  readonly provisionedApps: ProvisionedApp[] = getProvisionedApps(Object.keys(process.env))
  readonly provisionedClusters: ProvisionedCluster[] = getProvisionedClusters({
    isProduction: this.isProduction,
    solanaDevnetEnabled: this.solanaDevnetEnabled,
    solanaDevnetRpcEndpoint: this.solanaDevnetRpcEndpoint,
    solanaLocalEnabled: this.solanaLocalEnabled,
    solanaLocalRpcEndpoint: this.solanaLocalRpcEndpoint,
    solanaMainnetEnabled: this.solanaMainnetEnabled,
    solanaMainnetRpcEndpoint: this.solanaMainnetRpcEndpoint,
  })

  constructor(private readonly config: ConfigService) {}

  get adminUsername(): string {
    return this.config.get('admin.username')
  }

  get adminPassword(): string {
    return this.config.get('admin.password')
  }

  get apiLogColor() {
    return this.config.get('api.log.color')
  }

  get apiLogJson() {
    return this.config.get('api.log.json')
  }

  get apiLogLevel() {
    return this.config.get('api.log.level')
  }

  get apiName(): string {
    return this.config.get('api.name')
  }

  get apiUrl(): string {
    return this.config.get('api.url')
  }

  get apiVersion(): string {
    return this.config.get('api.version')
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
              try {
                const { hostname } = new URL(origin)

                return origin.startsWith(start) && hostname.endsWith(end)
              } catch (e) {
                return false
              }
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

  get solanaDevnetEnabled(): boolean {
    return this.config.get('solana.devnet.enabled')
  }
  get solanaDevnetRpcEndpoint() {
    return this.config.get('solana.devnet.rpcEndpoint')
  }

  get solanaLocalEnabled(): boolean {
    return this.config.get('solana.local.enabled')
  }

  get solanaLocalRpcEndpoint() {
    return this.config.get('solana.local.rpcEndpoint')
  }

  get solanaMainnetEnabled(): boolean {
    return this.config.get('solana.mainnet.enabled')
  }

  get solanaMainnetRpcEndpoint() {
    return this.config.get('solana.mainnet.rpcEndpoint')
  }

  configSummary() {
    return {
      environment: this.environment,
      name: this.config.get('api.name'),
      version: this.config.get('api.version'),
    }
  }

  configureSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .addServer('http://localhost:3000')
      .addServer('https://sandbox.kinetic.host')
      .addTag('kinetic')
      .setDescription('The OpenAPI definition of the Kinetic API')
      .setTitle(this.apiName)
      .setVersion(this.apiVersion)
      .build()
    const document = SwaggerModule.createDocument(app, config)
    if (this.isDevelopment) {
      fs.writeFileSync('./api-swagger.json', JSON.stringify(document, null, 2))
    }
    SwaggerModule.setup(this.prefix, app, document)
  }
}
