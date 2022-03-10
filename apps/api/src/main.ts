import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ApiConfigDataAccessService } from '@mogami/api/config/data-access'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ApiConfigDataAccessService)
  app.setGlobalPrefix(config.prefix)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  config.configureSwagger(app)
  await app.listen(config.port)
  Logger.log(`🚀 Application is running on: http://localhost:${config.port}/${config.prefix}`)
}

bootstrap()
