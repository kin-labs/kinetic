import { INestApplication } from '@nestjs/common'
import { Response } from 'supertest'
import {
  AdminApp,
  AdminAppCreateInput,
  AdminApps,
  AdminAppUpdateInput,
  AdminCreateApp,
  AdminCreateUser,
  AdminDeleteApp,
  AppEnv,
  AppUserRole,
  ClusterType,
  UserAppEnvAddAllowedIp,
  UserAppEnvAddAllowedUa,
  UserAppEnvAddBlockedIp,
  UserAppEnvAddBlockedUa,
  UserAppEnvRemoveAllowedIp,
  UserAppEnvRemoveAllowedUa,
  UserAppEnvRemoveBlockedIp,
  UserAppEnvRemoveBlockedUa,
  UserAppEnvUpdateInput,
  UserAppEnvWalletRemove,
  UserAppUserAdd,
  UserAppUserAddInput,
  UserAppUserRemove,
  UserAppUserRemoveInput,
  UserAppUserUpdateRole,
  UserAppUserUpdateRoleInput,
  UserGenerateWallet,
  UserUpdateApp,
  UserUpdateAppEnv,
} from '../generated/api-sdk'
import { ADMIN_USERNAME, initializeE2eApp, runGraphQLQuery, runGraphQLQueryAdmin, runLoginQuery } from '../helpers'
import { randomIndex, uniq, uniqInt } from '../helpers/uniq'

function expectUnauthorized(res: Response) {
  expect(res).toHaveProperty('text')
  const errors = JSON.parse(res.text).errors
  expect(errors[0].message).toEqual('Unauthorized')
}

describe('App (e2e)', () => {
  let app: INestApplication
  let appId: string | undefined
  let index: number | undefined
  let token: string | undefined

  beforeAll(async () => {
    app = await initializeE2eApp()
    const res = await runLoginQuery(app, ADMIN_USERNAME)
    token = res.body.data.login.token
    index = randomIndex()
  })

  afterAll(async () => {
    appId = undefined
    index = undefined
    return app.close()
  })

  describe('Expected usage', () => {
    describe('CRUD', () => {
      it('should create an app', async () => {
        const input: AdminAppCreateInput = { index, name: `App ${index}` }

        return runGraphQLQueryAdmin(app, token, AdminCreateApp, { input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.created
            appId = data.id

            expect(data.index).toEqual(input.index)
            expect(data.name).toEqual(input.name)
            expect(data.envs.length).toEqual(2)
            expect(data.envs[0].name).toEqual('devnet')
            expect(data.envs[0].cluster.name).toEqual('Solana Devnet')
            expect(data.envs[0].cluster.type).toEqual(ClusterType.SolanaDevnet)
            expect(data.envs[0].mints[0].mint.symbol).toEqual('KIN')
            expect(data.envs[0].mints[0].wallet.publicKey).toBeDefined()
            expect(data.envs[0].wallets).toBeDefined()
            expect(data.envs[0].wallets[0].publicKey).toBeDefined()
            expect(data.envs[1].name).toEqual('local')
            expect(data.envs[1].cluster.name).toEqual('Solana Local')
            expect(data.envs[1].cluster.type).toEqual(ClusterType.Custom)
            expect(data.envs[1].mints[0].mint.symbol).toEqual('KIN')
            expect(data.envs[1].mints[0].wallet.publicKey).toBeDefined()
            expect(data.envs[1].wallets).toBeDefined()
            expect(data.envs[1].wallets[0].publicKey).toBeDefined()
            expect(data.users.length).toEqual(1)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
          })
      })

      it('should update an app', async () => {
        const input: AdminAppUpdateInput = {
          name: `App ${index} edited`,
        }

        return runGraphQLQueryAdmin(app, token, UserUpdateApp, { appId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.updated

            expect(data.index).toEqual(index)
            expect(data.name).toEqual(input.name)
            expect(data.envs.length).toEqual(2)
            expect(data.envs[0].cluster.type).toEqual(ClusterType.SolanaDevnet)
            expect(data.envs[1].cluster.type).toEqual(ClusterType.Custom)
            expect(data.envs[0].mints[0].mint.symbol).toEqual('KIN')
            expect(data.envs[0].mints[0].wallet.publicKey).toBeDefined()
            expect(data.envs[0].name).toEqual('devnet')
            expect(data.envs[1].name).toEqual('local')
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
            expect(data.index).toEqual(index)
            expect(data.envs.length).toEqual(2)
            expect(data.envs[0].cluster.type).toEqual(ClusterType.SolanaDevnet)
            expect(data.envs[1].cluster.type).toEqual(ClusterType.Custom)
            expect(data.envs[0].mints[0].mint.symbol).toEqual('KIN')
            expect(data.envs[0].mints[0].wallet.publicKey).toBeDefined()
            expect(data.envs[0].wallets).toBeDefined()
            expect(data.envs[0].name).toEqual('devnet')
            expect(data.envs[1].name).toEqual('local')
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
            expect(data.find((app) => app.index === index)).toBeDefined()
          })
      }, 10_000)

      it('should delete an app', async () => {
        return runGraphQLQueryAdmin(app, token, AdminDeleteApp, { appId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.deleted

            expect(data.id).toEqual(appId)
            expect(data.index).toEqual(index)
          })
      })

      it('should create and delete the same app multiple times', async () => {
        const index = randomIndex()
        const input: AdminAppCreateInput = { index, name: `App ${index}` }

        // Create First
        const created1 = await runGraphQLQueryAdmin(app, token, AdminCreateApp, { input })

        // Delete First
        await runGraphQLQueryAdmin(app, token, AdminDeleteApp, { appId: created1.body?.data?.created?.id })

        // Create Second
        const created2 = await runGraphQLQueryAdmin(app, token, AdminCreateApp, { input })

        // Delete Second
        await runGraphQLQueryAdmin(app, token, AdminDeleteApp, { appId: created2.body?.data?.created?.id })
      }, 10_000)
    })

    describe('AppUsers', () => {
      let appId: string | undefined
      let userId: string | undefined

      it('should add a user to an app', async () => {
        const email = uniq('email-')

        // Create App
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index: randomIndex(), name: `test-${email}` },
        })
        appId = createdApp.body.data.created.id

        // Create user
        const createdUser = await runGraphQLQueryAdmin(app, token, AdminCreateUser, {
          input: { password: 'password', email },
        })
        userId = createdUser.body.data.created.id

        const input: UserAppUserAddInput = {
          role: AppUserRole.Member,
          userId,
        }

        await runGraphQLQueryAdmin(app, token, UserAppUserAdd, { appId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item
            expect(data.users.length).toEqual(2)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
            expect(data.users[1].role).toEqual(AppUserRole.Member)
          })
      }, 15000)

      it('should change a user role in an app', async () => {
        const input: UserAppUserUpdateRoleInput = {
          role: AppUserRole.Owner,
          userId,
        }

        await runGraphQLQueryAdmin(app, token, UserAppUserUpdateRole, { appId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item
            expect(data.users.length).toEqual(2)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
            expect(data.users[1].role).toEqual(AppUserRole.Owner)
          })
      }, 15000)

      it('should remove a user fom an app', async () => {
        const input: UserAppUserRemoveInput = { userId }
        await runGraphQLQueryAdmin(app, token, UserAppUserRemove, { appId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item
            expect(data.users.length).toEqual(1)
            expect(data.users[0].role).toEqual(AppUserRole.Owner)
          })
      }, 15000)
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

        const input: UserAppEnvUpdateInput = {
          webhookSecret: 'WebHookSecret',
          webhookBalanceEnabled: true,
          webhookBalanceUrl: 'http://local.kinetic.host/api/app/devnet/1/hooks/balance',
          webhookBalanceThreshold: '10',
          webhookDebugging: true,
          webhookEventEnabled: true,
          webhookEventUrl: 'http://local.kinetic.host/api/app/devnet/1/hooks/event',
          webhookVerifyEnabled: true,
          webhookVerifyUrl: 'http://local.kinetic.host/api/app/devnet/1/hooks/verify',
        }

        return runGraphQLQueryAdmin(app, token, UserUpdateAppEnv, { appId, appEnvId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.updated

            expect(data.webhookBalanceEnabled).toEqual(input.webhookBalanceEnabled)
            expect(data.webhookBalanceUrl).toEqual(input.webhookBalanceUrl)
            expect(data.webhookBalanceThreshold).toEqual(input.webhookBalanceThreshold)
            expect(data.webhookDebugging).toEqual(input.webhookDebugging)
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
      }, 15000)
    })

    describe('Wallets', () => {
      let appId: string | undefined
      let appEnvId: string | undefined
      let walletId: string | undefined

      it('should add a wallet to an app Env', async () => {
        const name = uniq('app-')

        // Create App - but skip automatic wallet generation
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index: randomIndex(), name, skipWalletCreation: true },
        })
        appId = createdApp.body.data.created.id
        appEnvId = createdApp.body.data.created.envs[0].id
        // Generate wallet and attach it to the App Env
        await runGraphQLQueryAdmin(app, token, UserGenerateWallet, { appEnvId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')

            const data = res.body.data?.generated
            walletId = res.body.data?.generated?.id
            expect(data.appEnvs).toBeDefined()
            expect(data.appEnvs.length).toEqual(1)
          })
      }, 10_000)

      it('should remove a wallet fom an app', async () => {
        await runGraphQLQueryAdmin(app, token, UserAppEnvWalletRemove, { appId, appEnvId, walletId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item
            expect(data.wallets?.find((item) => item.id === walletId)).toEqual(undefined)
          })
      }, 10_000)
    })
  })

  describe('Unexpected usage', () => {
    describe('CRUD Constraints', () => {
      it('should not create an app with existing index', async () => {
        const index = randomIndex()
        const input: AdminAppCreateInput = { index, name: `App ${index}` }

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
        const input: AdminAppUpdateInput = { name: `App ${testAppId}` }

        return runGraphQLQueryAdmin(app, token, UserUpdateApp, { appId: testAppId, input })
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

        const input: UserAppEnvUpdateInput = { webhookVerifyUrl: 'test', webhookEventUrl: 'test' }

        return runGraphQLQueryAdmin(app, token, UserUpdateAppEnv, {
          appId: createdAppId,
          appEnvId: createdAppEnvId,
          input,
        })
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
        const input: AdminAppCreateInput = { index: undefined, name: undefined }

        return runGraphQLQuery(app, AdminCreateApp, { input })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not update an app', async () => {
        const input: AdminAppUpdateInput = { name: undefined }

        return runGraphQLQuery(app, UserUpdateApp, { appId: undefined, input })
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
        const input: AdminAppCreateInput = { index, name: `App ${index}` }

        return runGraphQLQuery(app, AdminCreateApp, { input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('text')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual('Unauthorized')
          })
      })

      it('should not update an app', async () => {
        const input: AdminAppUpdateInput = { name: `App ${index} edited` }

        return runGraphQLQuery(app, UserUpdateApp, { appId, input })
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

    describe('IP Allowing', () => {
      let appEnv: AppEnv

      beforeEach(async () => {
        const name = uniq('app-')
        const index = uniqInt()
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index, name },
        })
        appEnv = createdApp.body.data.created.envs[0]
      })
      it('should allow an IP', async () => {
        const ip = '23.56.89.15'
        await runGraphQLQueryAdmin(app, token, UserAppEnvAddAllowedIp, {
          appEnvId: appEnv.id,
          ip,
        })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const ipsAllowed: string[] = res.body.data?.item?.ipsAllowed
            expect(ipsAllowed.includes(ip)).toBeTruthy()
          })
      })

      it('should remove an IP from the allowed list', async () => {
        const ip = '23.56.89.16'
        await runGraphQLQueryAdmin(app, token, UserAppEnvAddAllowedIp, {
          appEnvId: appEnv.id,
          ip,
        })
        await runGraphQLQueryAdmin(app, token, UserAppEnvRemoveAllowedIp, {
          appEnvId: appEnv.id,
          ip,
        })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const ipsAllowed: string[] = res.body.data?.item?.ipsAllowed
            expect(ipsAllowed.includes(ip)).toBeFalsy()
          })
      })

      it('should fail to allow an IP when admin is not logged in', async () => {
        const ip = '23.56.89.15'
        await runGraphQLQuery(app, UserAppEnvAddAllowedIp, {
          appEnvId: appEnv.id,
          ip,
        })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should fail to remove an IP from the allowed list when admin is not logged in', async () => {
        const ip = '23.56.89.16'
        await runGraphQLQueryAdmin(app, token, UserAppEnvAddAllowedIp, {
          appEnvId: appEnv.id,
          ip,
        })
        await runGraphQLQuery(app, UserAppEnvRemoveAllowedIp, {
          appEnvId: appEnv.id,
          ip,
        })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })
    })

    describe('IP Blocking', () => {
      let appEnv: AppEnv

      beforeEach(async () => {
        const name = uniq('app-')
        const index = uniqInt()
        const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
          input: { index, name },
        })
        appEnv = createdApp.body.data.created.envs[0]
      })

      it('should block an IP', async () => {
        const ip = '23.56.89.15'
        await runGraphQLQueryAdmin(app, token, UserAppEnvAddBlockedIp, {
          appEnvId: appEnv.id,
          ip,
        })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const ipsBlocked: string[] = res.body.data?.item?.ipsBlocked
            expect(ipsBlocked.includes(ip)).toBeTruthy()
          })
      })

      it('should unblock an IP', async () => {
        const ip = '23.56.89.16'
        await runGraphQLQueryAdmin(app, token, UserAppEnvAddBlockedIp, {
          appEnvId: appEnv.id,
          ip,
        })
        await runGraphQLQueryAdmin(app, token, UserAppEnvRemoveBlockedIp, {
          appEnvId: appEnv.id,
          ip,
        })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const ipsBlocked: string[] = res.body.data?.item?.ipsBlocked
            expect(ipsBlocked.includes(ip)).toBeFalsy()
          })
      })

      it('should fail to block an IP when admin is not logged in', async () => {
        const ip = '23.56.89.15'
        await runGraphQLQuery(app, UserAppEnvAddBlockedIp, {
          appEnvId: appEnv.id,
          ip,
        })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should fail to unblock an IP when admin is not logged in', async () => {
        const ip = '23.56.89.16'
        await runGraphQLQueryAdmin(app, token, UserAppEnvAddBlockedIp, {
          appEnvId: appEnv.id,
          ip,
        })
        await runGraphQLQuery(app, UserAppEnvRemoveBlockedIp, {
          appEnvId: appEnv.id,
          ip,
        })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })
    })
  })

  describe('User Agent Allowing', () => {
    let appEnv: AppEnv

    beforeEach(async () => {
      const name = uniq('app-')
      const index = uniqInt()
      const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
        input: { index, name },
      })
      appEnv = createdApp.body.data.created.envs[0]
    })

    it('should allow an User Agent', async () => {
      const ua = 'node/1.0.0'
      await runGraphQLQueryAdmin(app, token, UserAppEnvAddAllowedUa, {
        appEnvId: appEnv.id,
        ua,
      })
        .expect(200)
        .expect((res) => {
          expect(res).toHaveProperty('body.data')
          const uasAllowed: string[] = res.body.data?.item?.uasAllowed
          expect(uasAllowed.includes(ua)).toBeTruthy()
        })
    })

    it('should remove an User Agent from the allowed list', async () => {
      const ua = 'node/1.0.1'
      await runGraphQLQueryAdmin(app, token, UserAppEnvAddAllowedUa, {
        appEnvId: appEnv.id,
        ua,
      })
      await runGraphQLQueryAdmin(app, token, UserAppEnvRemoveAllowedUa, {
        appEnvId: appEnv.id,
        ua,
      })
        .expect(200)
        .expect((res) => {
          expect(res).toHaveProperty('body.data')
          const uasAllowed: string[] = res.body.data?.item?.ipsAllowed
          expect(uasAllowed.includes(ua)).toBeFalsy()
        })
    })

    it('should fail to allow an User Agent when admin is not logged in', async () => {
      const ua = 'node/1.0.0'
      await runGraphQLQuery(app, UserAppEnvAddAllowedUa, {
        appEnvId: appEnv.id,
        ua,
      })
        .expect(200)
        .expect((res) => expectUnauthorized(res))
    })

    it('should fail to remove an User Agent from the allowed list when admin is not logged in', async () => {
      const ua = 'node/1.0.1'
      await runGraphQLQueryAdmin(app, token, UserAppEnvAddAllowedUa, {
        appEnvId: appEnv.id,
        ua,
      })
      await runGraphQLQuery(app, UserAppEnvRemoveAllowedUa, {
        appEnvId: appEnv.id,
        ua,
      })
        .expect(200)
        .expect((res) => expectUnauthorized(res))
    })
  })

  describe('User Agent Blocking', () => {
    let appEnv: AppEnv

    beforeEach(async () => {
      const name = uniq('app-')
      const index = uniqInt()
      const createdApp = await runGraphQLQueryAdmin(app, token, AdminCreateApp, {
        input: { index, name },
      })
      appEnv = createdApp.body.data.created.envs[0]
    })

    it('should block an User Agent', async () => {
      const ua = 'node/1.0.0'
      await runGraphQLQueryAdmin(app, token, UserAppEnvAddBlockedUa, {
        appEnvId: appEnv.id,
        ua,
      })
        .expect(200)
        .expect((res) => {
          expect(res).toHaveProperty('body.data')
          const uasBlocked: string[] = res.body.data?.item?.uasBlocked
          expect(uasBlocked.includes(ua)).toBeTruthy()
        })
    })

    it('should unblock an User Agent', async () => {
      const ua = 'node/1.0.1'
      await runGraphQLQueryAdmin(app, token, UserAppEnvAddBlockedUa, {
        appEnvId: appEnv.id,
        ua,
      })
      await runGraphQLQueryAdmin(app, token, UserAppEnvRemoveBlockedUa, {
        appEnvId: appEnv.id,
        ua,
      })
        .expect(200)
        .expect((res) => {
          expect(res).toHaveProperty('body.data')
          const uasBlocked: string[] = res.body.data?.item?.uasBlocked
          expect(uasBlocked.includes(ua)).toBeFalsy()
        })
    })

    it('should fail to block an User Agent when admin is not logged in', async () => {
      const ua = 'node/1.0.1'
      await runGraphQLQuery(app, UserAppEnvAddBlockedUa, {
        appEnvId: appEnv.id,
        ua,
      })
        .expect(200)
        .expect((res) => expectUnauthorized(res))
    })

    it('should fail to unblock an User Agent when admin is not logged in', async () => {
      const ua = 'node/1.0.1'
      await runGraphQLQueryAdmin(app, token, UserAppEnvAddBlockedUa, {
        appEnvId: appEnv.id,
        ua,
      })
      await runGraphQLQuery(app, UserAppEnvRemoveBlockedUa, {
        appEnvId: appEnv.id,
        ua,
      })
        .expect(200)
        .expect((res) => expectUnauthorized(res))
    })
  })
})
