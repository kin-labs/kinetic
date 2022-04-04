import { INestApplication } from '@nestjs/common'
import { Response } from 'supertest'
import { DeleteWallet, GenerateWallet, Wallet, Wallets } from '../generated/api-sdk'
import { ADMIN_EMAIL, initializeE2eApp, runGraphQLQuery, runGraphQLQueryAdmin, runLoginQuery } from '../helpers'
import { uniq } from '../helpers/uniq'

function expectUnauthorized(res: Response) {
  expect(res).toHaveProperty('text')
  const errors = JSON.parse(res.text).errors
  expect(errors[0].message).toEqual('Unauthorized')
}

describe('Wallet (e2e)', () => {
  let app: INestApplication
  let walletId: string | undefined
  let publicKey: string | undefined
  let token: string | undefined

  beforeAll(async () => {
    app = await initializeE2eApp()
    const res = await runLoginQuery(app, ADMIN_EMAIL)
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
        return runGraphQLQueryAdmin(app, token, GenerateWallet)
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
        return runGraphQLQueryAdmin(app, token, Wallet, { walletId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item

            expect(data.id).toEqual(walletId)
            expect(data.publicKey).toEqual(publicKey)
          })
      })

      it('should find a list of wallets', async () => {
        return runGraphQLQueryAdmin(app, token, Wallets)
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.items

            expect(data.length).toBeGreaterThan(1)
            expect(data.find((wallet) => wallet.publicKey === publicKey)).toBeDefined()
          })
      })

      it('should delete a wallet', async () => {
        return runGraphQLQueryAdmin(app, token, DeleteWallet, { walletId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.deleted

            expect(data.id).toEqual(walletId)
            expect(data.publicKey).toEqual(publicKey)
          })
      })
    })
  })

  describe('Unexpected usage', () => {
    describe('CRUD Constraints', () => {
      it('should not find a wallet that does not exist', async () => {
        const testWalletId = uniq('some-random-wallet-')
        return runGraphQLQueryAdmin(app, token, Wallet, { walletId: testWalletId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`Wallet with id ${testWalletId} does not exist.`)
          })
      })

      it('should not delete a wallet that does not exist', async () => {
        const testWalletId = uniq('some-random-wallet-')
        return runGraphQLQueryAdmin(app, token, DeleteWallet, { walletId: testWalletId })
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
        return runGraphQLQuery(app, Wallet, { walletId: undefined })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not delete a wallet', async () => {
        return runGraphQLQuery(app, DeleteWallet, { walletId: undefined })
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
        return runGraphQLQuery(app, GenerateWallet)
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('text')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual('Unauthorized')
          })
      })

      it('should not find a wallet', () => {
        return runGraphQLQuery(app, Wallet, { walletId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not find a list of wallets', () => {
        return runGraphQLQuery(app, Wallets)
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not delete a wallet', () => {
        return runGraphQLQuery(app, DeleteWallet, { walletId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })
    })
  })
})
