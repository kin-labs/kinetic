import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '@kin-kinetic/api-app-module'

export async function initializeE2eApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication()
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false, transform: true }))
  app.setGlobalPrefix('api')
  await app.init()
  return app
}
