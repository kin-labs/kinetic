import { INestApplication } from '@nestjs/common'
import { ASTNode } from 'graphql'
import { print } from 'graphql/language/printer'
import * as request from 'supertest'
import { Login, UserLoginInput } from '../generated/api-sdk'
import { ADMIN_PASSWORD } from './api-e2e.constants'

export function runGraphQLQuery(
  app: INestApplication,
  query: ASTNode,
  variables?: Record<string, unknown>,
  { token }: { token?: string } = {},
) {
  return request(app.getHttpServer())
    .post('/graphql')
    .set('Authorization', token ? `Bearer ${token}` : null)
    .send({ query: print(query), variables: variables })
}

export function runGraphQLQueryAdmin(
  app: INestApplication,
  token: string,
  query: ASTNode,
  variables?: Record<string, unknown>,
) {
  return runGraphQLQuery(app, query, variables, { token })
}

export function runLoginQuery(app: INestApplication, username: string, password = ADMIN_PASSWORD) {
  const input: UserLoginInput = { password, username }
  return runGraphQLQuery(app, Login, { input }).expect(200)
}
