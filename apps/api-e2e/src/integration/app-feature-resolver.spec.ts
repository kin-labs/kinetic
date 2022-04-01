import { INestApplication } from '@nestjs/common'
import { Response } from 'supertest'
import {
  App,
  AppCreateInput,
  Apps,
  AppUpdateInput,
  AppUserAdd,
  AppUserAddInput,
  AppUserRemove,
  AppUserRemoveInput,
  AppUserRole,
  AppUserUpdateRole,
  AppUserUpdateRoleInput,
  AppWalletAdd,
  AppWalletRemove,
  CreateApp,
  CreateUser,
  DeleteApp,
  GenerateWallet,
  UpdateApp,
} from '../generated/api-sdk'
import {
  ADMIN_EMAIL,
  getRandomInt,
  initializeE2eApp,
  runGraphQLQuery,
  runGraphQLQueryAdmin,
  runLoginQuery,
} from '../helpers'
import { uniq } from '../helpers/uniq'

function expectUnauthorized(res: Response) {
  expect(res).toHaveProperty('text')
  const errors = JSON.parse(res.text).errors
  expect(errors[0].message).toEqual('Unauthorized')
}

function randomAppIndex(): number {
  return getRandomInt(1_000, 1_000_000)
}

describe('App (e2e)', () => {
  let app: INestApplication
  let appId: string | undefined
  let appIndex: number | undefined
  let token: string | undefined

  beforeAll(async () => {
    app = await initializeE2eApp()
    const res = await runLoginQuery(app, ADMIN_EMAIL)
    token = res.body.data.login.token
    appIndex = randomAppIndex()
  })

  afterAll(async () => {
    appId = undefined
    appIndex = undefined
    return app.close()
  })

  describe('Expected usage', () => {
    describe('CRUD', () => {
      it('should create an app', async () => {
        const input: AppCreateInput = { index: appIndex, name: `App ${appIndex}` }

        return runGraphQLQueryAdmin(app, token, CreateApp, { input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.created
            appId = data.id
            expect(data.index).toEqual(input.index)
            expect(data.name).toEqual(input.name)
            expect(data.users.length).toEqual(1)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
            expect(data.wallet).toBeDefined()
            expect(data.wallet.publicKey).toBeDefined()
          })
      })

      it('should update an app', async () => {
        const input: AppUpdateInput = { name: `App ${appIndex} edited` }

        return runGraphQLQueryAdmin(app, token, UpdateApp, { appId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.updated

            expect(data.index).toEqual(appIndex)
            expect(data.name).toEqual(input.name)
            expect(data.users.length).toEqual(1)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
            expect(data.wallet).toBeDefined()
            expect(data.wallet.publicKey).toBeDefined()
          })
      })

      it('should find an app', async () => {
        return runGraphQLQueryAdmin(app, token, App, { appId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item

            expect(data.id).toEqual(appId)
            expect(data.index).toEqual(appIndex)
            expect(data.users.length).toEqual(1)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
            expect(data.wallet).toBeDefined()
            expect(data.wallet.publicKey).toBeDefined()
          })
      })

      it('should find a list of apps', async () => {
        return runGraphQLQueryAdmin(app, token, Apps)
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.items

            expect(data.length).toBeGreaterThan(0)
            expect(data.find((app) => app.index === appIndex)).toBeDefined()
          })
      })

      it('should delete an app', async () => {
        return runGraphQLQueryAdmin(app, token, DeleteApp, { appId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.deleted

            expect(data.id).toEqual(appId)
            expect(data.index).toEqual(appIndex)
          })
      })
    })

    describe('AppUsers', () => {
      let appId: string | undefined
      let userId: string | undefined

      it('should add a user to an app', async () => {
        const email = uniq('email-')

        // Create App
        const createdApp = await runGraphQLQueryAdmin(app, token, CreateApp, {
          input: { index: randomAppIndex(), name: `test-${email}` },
        })
        appId = createdApp.body.data.created.id

        // Create user
        const createdUser = await runGraphQLQueryAdmin(app, token, CreateUser, {
          input: { password: 'password', email },
        })
        userId = createdUser.body.data.created.id

        const input: AppUserAddInput = {
          role: AppUserRole.Member,
          userId,
        }

        await runGraphQLQueryAdmin(app, token, AppUserAdd, { appId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item
            expect(data.users.length).toEqual(2)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
            expect(data.users[1].role).toEqual(AppUserRole.Member)
          })
      })

      it('should change a user role in an app', async () => {
        const input: AppUserUpdateRoleInput = {
          role: AppUserRole.Owner,
          userId,
        }

        await runGraphQLQueryAdmin(app, token, AppUserUpdateRole, { appId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item
            expect(data.users.length).toEqual(2)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
            expect(data.users[1].role).toEqual(AppUserRole.Owner)
          })
      })

      it('should remove a user fom an app', async () => {
        const input: AppUserRemoveInput = { userId }
        await runGraphQLQueryAdmin(app, token, AppUserRemove, { appId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item
            expect(data.users.length).toEqual(1)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
          })
      })
    })

    describe('Wallets', () => {
      let appId: string | undefined
      let walletId: string | undefined
      let walletPublicKey: string | undefined

      it('should add a wallet to an app', async () => {
        const name = uniq('app-')

        // Create App - but skip automatic wallet generation
        const createdApp = await runGraphQLQueryAdmin(app, token, CreateApp, {
          input: { index: randomAppIndex(), name, skipWalletCreation: true },
        })
        appId = createdApp.body.data.created.id

        // Generate wallet
        const createdWallet = await runGraphQLQueryAdmin(app, token, GenerateWallet)
        walletId = createdWallet.body.data.generated?.id
        walletPublicKey = createdWallet.body.data.generated?.publicKey

        await runGraphQLQueryAdmin(app, token, AppWalletAdd, { appId, walletId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item
            expect(data.wallet).toBeDefined()
            expect(data.wallet.id).toEqual(walletId)
            expect(data.wallet.publicKey).toEqual(walletPublicKey)
          })
      })

      it('should remove a wallet fom an app', async () => {
        await runGraphQLQueryAdmin(app, token, AppWalletRemove, { appId, walletId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item
            expect(data.wallet).toBeFalsy()
          })
      })
    })
  })

  describe('Unexpected usage', () => {
    describe('CRUD Constraints', () => {
      it('should not create an app with existing index', async () => {
        const index = randomAppIndex()
        const input: AppCreateInput = { index, name: `App ${index}` }

        // Run once
        await runGraphQLQueryAdmin(app, token, CreateApp, { input })
        // Try to add again
        return runGraphQLQueryAdmin(app, token, CreateApp, { input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`App with index ${index} already exists`)
          })
      })

      it('should not update an app that does not exist', async () => {
        const testAppId = uniq('app-')
        const input: AppUpdateInput = { name: `App ${testAppId}` }

        return runGraphQLQueryAdmin(app, token, UpdateApp, { appId: testAppId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`App with id ${testAppId} does not exist.`)
          })
      })

      it('should not find an app that does not exist', async () => {
        const testAppId = uniq('app-')
        return runGraphQLQueryAdmin(app, token, App, { appId: testAppId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`App with id ${testAppId} does not exist.`)
          })
      })

      it('should not delete an app that does not exist', async () => {
        const testAppId = uniq('app-')
        return runGraphQLQueryAdmin(app, token, DeleteApp, { appId: testAppId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`App with id ${testAppId} does not exist.`)
          })
      })
    })

    describe('Mall-formed Input', () => {
      it('should not create an app', async () => {
        const input: AppCreateInput = { index: undefined, name: undefined }

        return runGraphQLQuery(app, CreateApp, { input })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not update an app', async () => {
        const input: AppUpdateInput = { name: undefined }

        return runGraphQLQuery(app, UpdateApp, { appId: undefined, input })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not find an app', async () => {
        return runGraphQLQuery(app, App, { appId: undefined })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not delete an app', async () => {
        return runGraphQLQuery(app, DeleteApp, { appId: undefined })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })
    })

    describe('Unauthenticated Access', () => {
      it('should not create an app', async () => {
        const input: AppCreateInput = { index: appIndex, name: `App ${appIndex}` }

        return runGraphQLQuery(app, CreateApp, { input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('text')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual('Unauthorized')
          })
      })

      it('should not update an app', async () => {
        const input: AppUpdateInput = { name: `App ${appIndex} edited` }

        return runGraphQLQuery(app, UpdateApp, { appId, input })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not find an app', async () => {
        return runGraphQLQuery(app, App, { appId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not find a list of apps', async () => {
        return runGraphQLQuery(app, Apps)
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not delete an app', async () => {
        return runGraphQLQuery(app, DeleteApp, { appId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })
    })
  })
})
