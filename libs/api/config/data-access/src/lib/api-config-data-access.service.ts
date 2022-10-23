import { getProvisionedClusters, ProvisionedCluster } from '@kin-kinetic/api/cluster/util'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { INestApplication, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'
import { CookieOptions } from 'express-serve-static-core'
import * as fs from 'fs'
import { join } from 'path'
import { AdminConfig } from './entity/admin-config.entity'
import { ProvisionedApp } from './entity/provisioned-app.entity'
import { getAuthUsers } from './helpers/get-auth-users'
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

  adminConfig(): AdminConfig {
    return {
      discordEnabled: this.discordEnabled,
      githubEnabled: this.githubEnabled,
      googleEnabled: this.googleEnabled,
      passwordEnabled: this.authPasswordEnabled,
    }
  }

  get adminUrl(): string {
    return this.config.get('admin.url')
  }

  get authPasswordEnabled(): boolean {
    return this.config.get('auth.passwordEnabled')
  }

  get authUsers(): { username: string; password: string; role: UserRole; email?: string; avatarUrl?: string }[] {
    const users = this.config.get('auth.users')

    if (users.length < 1) {
      this.logger.warn('No users configured for auth')
      return []
    }

    return getAuthUsers(users)
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

  get cookieSecure(): boolean {
    return this.config.get('cookie.secure')
  }

  cookieOptions(hostname: string): CookieOptions {
    const found = this.cookieDomains.find((domain) => hostname.endsWith(domain))
    if (!found) {
      this.logger.warn(`Not configured to set cookies for ${hostname}`)
    }
    return {
      httpOnly: true,
      secure: this.cookieSecure,
      domain: found || this.cookieDomains[0],
      sameSite: this.cookieDomains?.length > 1 ? 'none' : 'strict',
    }
  }

  get cors() {
    return {
      credentials: true,
      origin: this.corsOrigins,
    }
  }

  get corsOrigins(): string[] {
    return this.config.get('cors.origins')
  }

  get discordCallbackUrl() {
    return this.apiUrl + '/auth/discord/callback'
  }

  get discordClientId(): string {
    return this.config.get('discord.clientId')
  }

  get discordClientSecret(): string {
    return this.config.get('discord.clientSecret')
  }

  get discordEnabled(): boolean {
    return this.config.get('discord.enabled') && !!this.discordClientId && !!this.discordClientSecret
  }

  get environment() {
    return this.config.get('environment')
  }

  get githubCallbackUrl() {
    return this.apiUrl + '/auth/github/callback'
  }

  get githubClientId(): string {
    return this.config.get('github.clientId')
  }

  get githubClientSecret(): string {
    return this.config.get('github.clientSecret')
  }

  get githubEnabled(): boolean {
    return this.config.get('github.enabled') && !!this.githubClientId && !!this.githubClientSecret
  }

  get googleCallbackUrl() {
    return this.apiUrl + '/auth/google/callback'
  }

  get googleClientId(): string {
    return this.config.get('google.clientId')
  }

  get googleClientSecret(): string {
    return this.config.get('google.clientSecret')
  }

  get googleEnabled(): boolean {
    return this.config.get('google.enabled') && !!this.googleClientId && !!this.googleClientSecret
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
