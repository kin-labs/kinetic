import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
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
  const configSwagger = new DocumentBuilder()
    .setTitle('Mogami')
    .setDescription('The Mogami API description')
    .setVersion('1.0')
    .addTag('mogami')
    .build()
  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup(config.prefix, app, document)

  await app.listen(config.port)
  Logger.log(`🚀 Application is running on: http://localhost:${config.port}/${config.prefix}`)
}

bootstrap()
