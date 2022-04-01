import { INestApplication } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { Me } from '../generated/api-sdk'
import { runGraphQLQueryAdmin, runLoginQuery } from '../helpers'
import { initializeE2eApp } from '../helpers/'
import { ADMIN_EMAIL } from '../helpers/api-e2e.constants'

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
    it('should login with sample user: admin', async () => {
      const res = await runLoginQuery(app, ADMIN_EMAIL, UserRole.Admin)
      expect(res.body.data.login.token).toBeDefined()
      token = res.body.data.login.token
    })
  })

  describe('retrieve data of logged in user', () => {
    it('should retrieve data of user: admin', () => {
      return runGraphQLQueryAdmin(app, token, Me)
        .expect(200)
        .expect((res) => {
          expect(res).toHaveProperty('body.data')
          const data = res.body.data

          expect(data).toHaveProperty('me.id')

          // Remove any property that might change each run, snapshot it
          data.me.id = undefined
          data.me.createdAt = undefined
          data.me.updatedAt = undefined
          expect(data.me).toMatchSnapshot()

          // Pick properties specifically and test value.
          expect(data.me.role).toEqual(UserRole.Admin)
          expect(data.me.name).toEqual('Mogami Admin')
          expect(data.me.username).toEqual(ADMIN_EMAIL)
        })
    })
  })
})
