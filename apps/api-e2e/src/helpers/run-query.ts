import { INestApplication } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { ASTNode } from 'graphql'
import { print } from 'graphql/language/printer'
import * as request from 'supertest'
import { Login, LoginInput } from '../generated/api-sdk'
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

export function runLoginQuery(app: INestApplication, email: string, role: UserRole) {
  const input: LoginInput = { password: ADMIN_PASSWORD, email }
  return runGraphQLQuery(app, Login, { input }).expect(200)
}
