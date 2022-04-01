import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

export function getEndpoint(app: INestApplication, endpoint: string) {
  return request(app.getHttpServer()).get(endpoint)
}
