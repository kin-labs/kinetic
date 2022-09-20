import { INestApplication } from '@nestjs/common'
import { Response } from 'supertest'
import {
  AdminCreateApp,
  UserApp,
  UserAppEnv,
  UserAppEnvCreateInput,
  UserApps,
  UserCreateAppEnv,
} from '../generated/api-sdk'
import { ADMIN_USERNAME, initializeE2eApp, runGraphQLQuery, runGraphQLQueryAdmin, runLoginQuery } from '../helpers'
import { uniq, uniqInt } from '../helpers/uniq'

function expectUnauthorized(res: Response) {
  expect(res).toHaveProperty('text')
  const errors = JSON.parse(res.text).errors
  expect(errors[0].message).toEqual('Unauthorized')
}

function randomUsername(): string {
  return uniq('user-')
}

describe('App User (e2e)', () => {
  let app: INestApplication
  let userId: string | undefined
  let username: string | undefined
  let token: string | undefined

  beforeAll(async () => {
    app = await initializeE2eApp()
    const res = await runLoginQuery(app, ADMIN_USERNAME)
    token = res.body.data.login.token
    username = randomUsername()
  })

  afterAll(async () => {
    userId = undefined
    username = undefined
    return app.close()
  })

  describe('Expected usage', () => {
    describe('CRUD', () => {
      it('should find a list of Apps', async () => {
        return runGraphQLQueryAdmin(app, token, UserApps)
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.items

            expect(data.length).toBeGreaterThan(1)
          })
      })

      it('should search an AppEnv by appEnvId', async () => {
        const name = uniq('app-')
        const index = uniqInt()
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index, name },
        })
        const appId = createdApp.body.data.created.id
        const appEnvId = createdApp.body.data.created.envs[0].id

        return runGraphQLQueryAdmin(app, token, UserAppEnv, { appId, appEnvId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item

            expect(data.app.id).toBe(appId)
          })
      })

      it('should search an App by appId', async () => {
        const name = uniq('app-')
        const index = uniqInt()
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index, name },
        })
        const appId = createdApp.body.data.created.id

        return runGraphQLQueryAdmin(app, token, UserApp, { appId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item

            expect(data.id).toBe(appId)
          })
      })

      it('should create an App Env', async () => {
        const name = uniq('app-')
        const index = uniqInt()
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index, name },
        })
        const appId = createdApp.body.data.created.id
        const clusterId = 'solana-devnet'
        const input: UserAppEnvCreateInput = {
          name: 'Solana Devnet',
        }

        return runGraphQLQueryAdmin(app, token, UserCreateAppEnv, { appId, clusterId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.created

            expect(data.app.id).toBe(appId)
            expect(data.cluster.id).toBe(clusterId)
            expect(data.cluster.name).toBe(input.name)
          })
      })
    })
  })

  describe('Unexpected usage', () => {
    describe('Unauthenticated Access', () => {
      it('should not find a list of Apps', async () => {
        return runGraphQLQuery(app, UserApps)
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not search an AppEnv by appEnvId', async () => {
        const name = uniq('app-')
        const index = uniqInt()
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index, name },
        })
        const appId = createdApp.body.data.created.id
        const appEnvId = createdApp.body.data.created.envs[0].id

        return runGraphQLQuery(app, UserAppEnv, { appId, appEnvId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not search an App by appId', async () => {
        const name = uniq('app-')
        const index = uniqInt()
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index, name },
        })
        const appId = createdApp.body.data.created.id

        return runGraphQLQuery(app, UserApp, { appId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })
    })
  })
})
