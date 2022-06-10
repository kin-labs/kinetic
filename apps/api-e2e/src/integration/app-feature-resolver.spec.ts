import { INestApplication } from '@nestjs/common'
import { Response } from 'supertest'
import {
  AdminApp,
  AppCreateInput,
  AppEnvUpdateInput,
  AdminApps,
  AppUpdateInput,
  AppUserAdd,
  AppUserAddInput,
  AppUserRemove,
  AppUserRemoveInput,
  AppUserRole,
  AppUserUpdateRole,
  AppUserUpdateRoleInput,
  AppEnvWalletAdd,
  AppEnvWalletRemove,
  ClusterType,
  AdminCreateApp,
  CreateUser,
  AdminDeleteApp,
  GenerateWallet,
  UpdateApp,
  UpdateAppEnv,
} from '../generated/api-sdk'
import {
  ADMIN_EMAIL,
  getRandomInt,
  initializeE2eApp,
  runGraphQLQuery,
  runGraphQLQueryAdmin,
  runLoginQuery,
} from '../helpers'
import { uniq, uniqInt } from '../helpers/uniq'

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

        return runGraphQLQueryAdmin(app, token, AdminCreateApp, { input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.created
            appId = data.id

            expect(data.index).toEqual(input.index)
            expect(data.name).toEqual(input.name)
            expect(data.envs.length).toEqual(1)
            expect(data.envs[0].cluster.type).toEqual(ClusterType.SolanaDevnet)
            expect(data.envs[0].mints[0].mint.symbol).toEqual('KIN')
            expect(data.envs[0].mints[0].wallet.publicKey).toBeDefined()
            expect(data.envs[0].wallets).toBeDefined()
            expect(data.envs[0].wallets[0].publicKey).toBeDefined()
            expect(data.users.length).toEqual(1)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
          })
      })

      it('should update an app', async () => {
        const input: AppUpdateInput = {
          name: `App ${appIndex} edited`,
        }

        return runGraphQLQueryAdmin(app, token, UpdateApp, { appId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.updated

            expect(data.index).toEqual(appIndex)
            expect(data.name).toEqual(input.name)
            expect(data.envs.length).toEqual(1)
            expect(data.envs[0].cluster.type).toEqual(ClusterType.SolanaDevnet)
            expect(data.envs[0].mints[0].mint.symbol).toEqual('KIN')
            expect(data.envs[0].mints[0].wallet.publicKey).toBeDefined()
            expect(data.envs[0].name).toEqual('devnet')
            expect(data.envs[0].wallets).toBeDefined()
            expect(data.envs[0].wallets[0].publicKey).toBeDefined()
            expect(data.users.length).toEqual(1)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
          })
      })

      it('should find an app', async () => {
        return runGraphQLQueryAdmin(app, token, AdminApp, { appId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item

            expect(data.id).toEqual(appId)
            expect(data.index).toEqual(appIndex)
            expect(data.envs.length).toEqual(1)
            expect(data.envs[0].cluster.type).toEqual(ClusterType.SolanaDevnet)
            expect(data.envs[0].mints[0].mint.symbol).toEqual('KIN')
            expect(data.envs[0].mints[0].wallet.publicKey).toBeDefined()
            expect(data.envs[0].wallets).toBeDefined()
            expect(data.envs[0].wallets[0].publicKey).toBeDefined()
            expect(data.users.length).toEqual(1)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
          })
      })

      it('should find a list of apps', async () => {
        return runGraphQLQueryAdmin(app, token, AdminApps)
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.items

            expect(data.length).toBeGreaterThan(0)
            expect(data.find((app) => app.index === appIndex)).toBeDefined()
          })
      })

      it('should delete an app', async () => {
        return runGraphQLQueryAdmin(app, token, AdminDeleteApp, { appId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.deleted

            expect(data.id).toEqual(appId)
            expect(data.index).toEqual(appIndex)
          })
      })

      it('should create and delete the same app multiple times', async () => {
        const index = randomAppIndex()
        const input: AppCreateInput = { index, name: `App ${index}` }

        // Create First
        const created1 = await runGraphQLQueryAdmin(app, token, AdminCreateApp, { input })

        // Delete First
        await runGraphQLQueryAdmin(app, token, AdminDeleteApp, { appId: created1.body?.data?.created?.id })

        // Create Second
        const created2 = await runGraphQLQueryAdmin(app, token, AdminCreateApp, { input })

        // Delete Second
        await runGraphQLQueryAdmin(app, token, AdminDeleteApp, { appId: created2.body?.data?.created?.id })
      })
    })

    describe('AppUsers', () => {
      let appId: string | undefined
      let userId: string | undefined

      it('should add a user to an app', async () => {
        const email = uniq('email-')

        // Create App
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
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

    describe('AppEnvs', () => {
      it('should update an app environment', async () => {
        const name = uniq('app-')
        const index = uniqInt()
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index, name },
        })
        const appId = createdApp.body.data.created.id
        const appEnvId = createdApp.body.data.created.envs[0].id

        const input: AppEnvUpdateInput = {
          webhookSecret: 'WebHookSecret',
          webhookAcceptIncoming: true,
          webhookEventEnabled: true,
          webhookEventUrl: 'http://local.mogami.io/api/app/devnet/1/hooks/event',
          webhookVerifyEnabled: true,
          webhookVerifyUrl: 'http://local.mogami.io/api/app/devnet/1/hooks/verify',
        }

        return runGraphQLQueryAdmin(app, token, UpdateAppEnv, { appId, appEnvId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.updated

            expect(data.webhookAcceptIncoming).toEqual(input.webhookAcceptIncoming)
            expect(data.webhookSecret).toEqual(input.webhookSecret)
            expect(data.webhookEventEnabled).toEqual(input.webhookEventEnabled)
            expect(data.webhookEventUrl).toEqual(input.webhookEventUrl)
            expect(data.webhookVerifyEnabled).toEqual(input.webhookVerifyEnabled)
            expect(data.webhookVerifyUrl).toEqual(input.webhookVerifyUrl)
            expect(data.mints.length).toEqual(1)
            expect(data.mints[0].mint.symbol).toEqual('KIN')
            expect(data.mints[0].wallet.publicKey).toBeDefined()
            expect(data.wallets).toBeDefined()
            expect(data.wallets[0].publicKey).toBeDefined()
          })
      })
    })

    describe('Wallets', () => {
      let appId: string | undefined
      let appEnvId: string | undefined
      let walletId: string | undefined
      let walletPublicKey: string | undefined

      it('should add a wallet to an app', async () => {
        const name = uniq('app-')
        const index = uniqInt()

        // Create App - but skip automatic wallet generation
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index: randomAppIndex(), name, skipWalletCreation: true },
        })
        appId = createdApp.body.data.created.id
        appEnvId = createdApp.body.data.created.envs[0].id

        // Generate wallet
        const createdWallet = await runGraphQLQueryAdmin(app, token, GenerateWallet, { index })
        walletId = createdWallet.body.data.generated?.id
        walletPublicKey = createdWallet.body.data.generated?.publicKey

        await runGraphQLQueryAdmin(app, token, AppEnvWalletAdd, { appId, appEnvId, walletId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item
            expect(data.wallets).toBeDefined()
            expect(data.wallets[0].id).toEqual(walletId)
            expect(data.wallets[0].publicKey).toEqual(walletPublicKey)
          })
      })

      it('should remove a wallet fom an app', async () => {
        await runGraphQLQueryAdmin(app, token, AppEnvWalletRemove, { appId, appEnvId, walletId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item
            expect(data.wallets).toEqual([])
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
        await runGraphQLQueryAdmin(app, token, AdminCreateApp, { input })
        // Try to add again
        return runGraphQLQueryAdmin(app, token, AdminCreateApp, { input })
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

      it('should not update an app env with invalid webhook urls', async () => {
        const name = uniq('app-')
        const index = uniqInt()
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index, name },
        })
        const createdAppId = createdApp.body.data.created.id
        const createdAppEnvId = createdApp.body.data.created.envs[0].id

        const input: AppEnvUpdateInput = { webhookVerifyUrl: 'test', webhookEventUrl: 'test' }

        return runGraphQLQueryAdmin(app, token, UpdateAppEnv, { appId: createdAppId, appEnvId: createdAppEnvId, input })
          .expect(200)
          .expect((res) => {
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not find an app that does not exist', async () => {
        const testAppId = uniq('app-')
        return runGraphQLQueryAdmin(app, token, AdminApp, { appId: testAppId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`App with id ${testAppId} does not exist.`)
          })
      })

      it('should not delete an app that does not exist', async () => {
        const testAppId = uniq('app-')
        return runGraphQLQueryAdmin(app, token, AdminDeleteApp, { appId: testAppId })
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

        return runGraphQLQuery(app, AdminCreateApp, { input })
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
        return runGraphQLQuery(app, AdminApp, { appId: undefined })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not delete an app', async () => {
        return runGraphQLQuery(app, AdminDeleteApp, { appId: undefined })
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

        return runGraphQLQuery(app, AdminCreateApp, { input })
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
        return runGraphQLQuery(app, AdminApp, { appId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not find a list of apps', async () => {
        return runGraphQLQuery(app, AdminApps)
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not delete an app', async () => {
        return runGraphQLQuery(app, AdminDeleteApp, { appId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })
    })
  })
})
