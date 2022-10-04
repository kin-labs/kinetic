import { ApiConfigDataAccessService } from '@kin-kinetic/api/config/data-access'
import { OpenTelemetrySdk } from '@kin-kinetic/api/core/util'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { OgmaService } from '@ogma/nestjs-module'
import { exec } from 'child_process'
import cookieParser from 'cookie-parser'
import redirectSSL from 'redirect-ssl'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const config = app.get(ApiConfigDataAccessService)
  const logger = app.get<OgmaService>(OgmaService)
  app.useLogger(logger)
  await OpenTelemetrySdk.start(config.metricsConfig)
  app.setGlobalPrefix(config.prefix)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors(config.cors)
  app.use(redirectSSL.create({ enabled: config.isProduction }))
  config.configureSwagger(app)
  app.use(cookieParser())
  try {
    await app.listen(config.port, config.host)
    Logger.log(`🚀 API is running on http://${config.host}:${config.port}/${config.prefix}.`)
    Logger.log(`🚀 Admin API is running on http://localhost:${config.port}/graphql.`)
    Logger.log(`🔋 ADMIN_URL: ${config.adminUrl}`)
    Logger.log(`🔋 API_URL: ${config.apiUrl}`)
    Logger.log(`🔋 COOKIE_DOMAINS: ${config.cookieDomains.join(', ')}`)
    Logger.log(
      `🔋 CORS: ${
        config?.corsOrigins
          ? `enabled for: ${Array.isArray(config?.corsOrigins) ? config?.corsOrigins?.join(', ') : config?.corsOrigins}`
          : 'disabled'
      }`,
    )

    Logger.log(`🔐 Password Authentication ${config.authPasswordEnabled ? `ENABLED` : `DISABLED`}`)
    Logger.log(
      `🔐 Discord Authentication ${
        config.discordEnabled ? `ENABLED. Callback ${config.discordCallbackUrl}` : 'DISABLED'
      }`,
    )
    Logger.log(
      `🔐 GitHub Authentication ${config.githubEnabled ? `ENABLED. Callback ${config.githubCallbackUrl}` : 'DISABLED'}`,
    )
    Logger.log(
      `🔐 Google Authentication ${config.googleEnabled ? `ENABLED. Callback ${config.googleCallbackUrl}` : 'DISABLED'}`,
    )

    if (config.isDevelopment) {
      exec('prettier --write ./api-schema.graphql ./api-swagger.json', { cwd: process.cwd() })
    }
  } catch (e) {
    Logger.error(e)
    console.log(e)
  }
}

bootstrap()
