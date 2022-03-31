import { ApiConfigDataAccessService } from '@mogami/api/config/data-access'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import redirectSSL from 'redirect-ssl'
import cookieParser from 'cookie-parser'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ApiConfigDataAccessService)
  app.setGlobalPrefix(config.prefix)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors({ origin: config.corsOrigins })
  app.use(redirectSSL.create({ enabled: config.environment === 'production' }))
  config.configureSwagger(app)
  app.use(cookieParser())
  await app.listen(config.port)
  Logger.log(
    `🚀 API is running on http://localhost:${config.port}/${config.prefix} with CORS ${
      config.corsOrigins ? `enabled for ${config.corsOrigins}` : 'disabled'
    }.`,
  )
  Logger.log(`🚀 Admin API is running on http://localhost:${config.port}/graphql.`)
}

bootstrap()
