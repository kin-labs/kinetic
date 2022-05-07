import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

export function getEndpoint(app: INestApplication, endpoint: string) {
  return request(app.getHttpServer()).get(endpoint)
}

export function postEndpoint(app: INestApplication, endpoint: string, data: object = {}, headers: object = {}) {
  return request(app.getHttpServer()).post(endpoint).set(headers).send(data)
}
