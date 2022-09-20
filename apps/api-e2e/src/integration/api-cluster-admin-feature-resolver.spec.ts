import { INestApplication } from '@nestjs/common'
import { Response } from 'supertest'
import { AdminClusters, AdminCreateApp, AdminMintCreate, AdminMintCreateInput } from '../generated/api-sdk'
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

describe('Cluster Admin (e2e)', () => {
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
      it('should find a list of Admin Clusters', async () => {
        return runGraphQLQueryAdmin(app, token, AdminClusters)
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.items

            expect(data.length).toBeGreaterThan(1)
          })
      })

      it('should create an App Mint', async () => {
        const name = uniq('app-')
        const index = uniqInt()
        await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index, name },
        })
        const clusterId = 'solana-devnet'
        const input: AdminMintCreateInput = {
          address: '3SaUThdYFoUX2FYUi9ZPf2TKTu3UYKhNHhXb2Y6najRg',
          clusterId,
          decimals: 9,
          name: 'Hello Token',
          symbol: 'HIT',
        }

        return runGraphQLQueryAdmin(app, token, AdminMintCreate, { input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const mint = res.body.data?.adminMintCreate.mints.filter((mint) => mint.address === input.address)[0]

            expect(mint.address).toBe(input.address)
            expect(mint.decimals).toBe(input.decimals)
            expect(mint.name).toBe(input.name)
            expect(mint.symbol).toBe(input.symbol)
          })
      })
    })
  })

  describe('Unexpected usage', () => {
    describe('Unauthenticated Access', () => {
      it('should not find a list of Admin Clusters', async () => {
        return runGraphQLQuery(app, AdminClusters)
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })
    })
  })
})
