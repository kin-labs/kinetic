import { INestApplication } from '@nestjs/common'
import { Response } from 'supertest'
import { AdminCreateApp, UserDeleteWallet, UserGenerateWallet, UserWallet, UserWallets } from '../generated/api-sdk'
import { ADMIN_USERNAME, initializeE2eApp, runGraphQLQuery, runGraphQLQueryAdmin, runLoginQuery } from '../helpers'
import { randomAppIndex, uniq, uniqInt } from '../helpers/uniq'

function expectUnauthorized(res: Response) {
  expect(res).toHaveProperty('text')
  const errors = JSON.parse(res.text).errors
  expect(errors[0].message).toEqual('Unauthorized')
}

describe('Wallet (e2e)', () => {
  let app: INestApplication
  let appEnvId: string | undefined
  let walletId: string | undefined
  let publicKey: string | undefined
  let token: string | undefined

  beforeAll(async () => {
    app = await initializeE2eApp()
    const res = await runLoginQuery(app, ADMIN_USERNAME)
    token = res.body.data.login.token
  })

  afterAll(async () => {
    walletId = undefined
    publicKey = undefined
    return app.close()
  })

  describe('Expected usage', () => {
    describe('CRUD', () => {
      it('should create a wallet', async () => {
        const name = uniq('app-')

        // Create App - but skip automatic wallet generation
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index: randomAppIndex(), name, skipWalletCreation: true },
        })
        appEnvId = createdApp.body.data.created.envs[0].id

        return runGraphQLQueryAdmin(app, token, UserGenerateWallet, { appEnvId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.generated
            walletId = data.id
            publicKey = data.publicKey
            expect(data.publicKey).toEqual(publicKey)
          })
      })

      it('should find a wallet', async () => {
        return runGraphQLQueryAdmin(app, token, UserWallet, { appEnvId, walletId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item

            expect(data.id).toEqual(walletId)
            expect(data.publicKey).toEqual(publicKey)
          })
      })

      it('should find a list of wallets', async () => {
        return runGraphQLQueryAdmin(app, token, UserWallets, { appEnvId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.items

            expect(data.length).toBeGreaterThanOrEqual(1)
            expect(data.find((wallet) => wallet.publicKey === publicKey)).toBeDefined()
          })
      })

      it('should not delete a wallet with an environment', async () => {
        return runGraphQLQueryAdmin(app, token, UserDeleteWallet, { appEnvId, walletId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toMatchSnapshot()
          })
      })
    })
  })

  describe('Unexpected usage', () => {
    describe('CRUD Constraints', () => {
      it('should not find a wallet that does not exist', async () => {
        const testWalletId = uniq('some-random-wallet-')
        return runGraphQLQueryAdmin(app, token, UserWallet, { walletId: testWalletId, appEnvId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`Wallet with id ${testWalletId} does not exist.`)
          })
      })

      it('should not delete a wallet that does not exist', async () => {
        const testWalletId = uniq('some-random-wallet-')
        return runGraphQLQueryAdmin(app, token, UserDeleteWallet, { walletId: testWalletId, appEnvId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`Wallet with id ${testWalletId} does not exist.`)
          })
      })
    })

    describe('Mall-formed Input', () => {
      it('should not find a wallet', async () => {
        return runGraphQLQuery(app, UserWallet, { walletId: undefined, appEnvId: undefined })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not delete a wallet', async () => {
        return runGraphQLQuery(app, UserDeleteWallet, { walletId: undefined, appEnvId: undefined })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })
    })

    describe('Unauthenticated Access', () => {
      it('should not create a wallet', async () => {
        const index = uniqInt()
        return runGraphQLQuery(app, UserGenerateWallet, { appEnvId: `app-${index}` })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('text')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual('Unauthorized')
          })
      })

      it('should not find a wallet', () => {
        return runGraphQLQuery(app, UserWallet, { walletId, appEnvId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not find a list of wallets', () => {
        return runGraphQLQuery(app, UserWallets, { appEnvId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not delete a wallet', () => {
        return runGraphQLQuery(app, UserDeleteWallet, { walletId, appEnvId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })
    })
  })
})
