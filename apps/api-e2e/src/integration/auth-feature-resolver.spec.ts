import { INestApplication } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { Me } from '../generated/api-sdk'
import { ADMIN_USERNAME, initializeE2eApp, runGraphQLQueryAdmin, runLoginQuery } from '../helpers'

describe('Auth (e2e)', () => {
  let app: INestApplication
  let token: string | undefined

  beforeAll(async () => {
    app = await initializeE2eApp()
  })
  afterAll(async () => {
    return app.close()
  })

  describe('log in ', () => {
    it('should login with sample user: alice', async () => {
      const res = await runLoginQuery(app, ADMIN_USERNAME)
      expect(res.body.data.login.token).toBeDefined()
      token = res.body.data.login.token
    })
  })

  describe('retrieve data of logged in user', () => {
    it('should retrieve data of user: alice', () => {
      return runGraphQLQueryAdmin(app, token, Me)
        .expect(200)
        .expect((res) => {
          expect(res).toHaveProperty('body.data')
          const data = res.body.data

          expect(data).toHaveProperty('me.id')

          expect(data.me.role).toEqual(UserRole.Admin)
          expect(data.me.name).toEqual('Alice')
          expect(data.me.username).toEqual('alice')
        })
    })
  })
})
