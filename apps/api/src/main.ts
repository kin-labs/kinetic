import { ApiConfigDataAccessService } from '@kin-kinetic/api/config/data-access'
import { OpenTelemetrySdk } from '@kin-kinetic/api/core/util'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { OgmaService } from '@ogma/nestjs-module'
import { exec } from 'child_process'
import cookieParser from 'cookie-parser'
import { json } from 'express'
import redirectSSL from 'redirect-ssl'
import { AppModule } from './app/app.module'

process.on('unhandledRejection', (reason, promise) => {
  console.log('UNHANDLED REJECTION at:', promise, 'reason:', reason)
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const config = app.get(ApiConfigDataAccessService)
  const logger = app.get<OgmaService>(OgmaService)
  app.useLogger(logger)
  await OpenTelemetrySdk.start(config.metricsConfig)
  app.setGlobalPrefix(config.prefix)
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false, transform: true }))
  app.enableCors(config.cors)
  app.use(redirectSSL.create({ enabled: config.isProduction }))
  config.configureSwagger(app)
  app.use(cookieParser())
  // TODO: Make this limit configurable
  app.use(json({ limit: '10mb' }))
  const host = `http://${config.host}:${config.port}`
  try {
    await app.listen(config.port, config.host)
    Logger.log(`🚀 API is listening on ${host}/${config.prefix}.`)
    Logger.log(`🚀 Admin API is listening on ${host}/graphql.`)
    Logger.log(`🔋 API_URL: ${config.apiUrl}`)
    Logger.log(`🔋 WEB_URL: ${config.webUrl}`)
    Logger.log(`🔋 COOKIE_DOMAINS: ${config.cookieDomains.join(', ')}`)
    Logger.log(
      `🔋 CORS: ${
        config.corsBypass
          ? 'Bypassed'
          : config?.corsOrigins
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
