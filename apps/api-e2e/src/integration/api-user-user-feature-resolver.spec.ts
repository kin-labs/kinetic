import { INestApplication } from '@nestjs/common'
import { Response } from 'supertest'
import { UserRole, UserSearchUserInput, UserSearchUsers } from '../generated/api-sdk'
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

describe('User (e2e)', () => {
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
    it('should search for users with a provided string', async () => {
      const input: UserSearchUserInput = {
        query: `alice`,
      }

      return runGraphQLQueryAdmin(app, token, UserSearchUsers, { input })
        .expect(200)
        .expect((res) => {
          expect(res).toHaveProperty('body.data')
          const data = res.body.data?.items

          expect(data.length).toEqual(1)
          expect(data[0].name).toBe('alice')
        })
    })
  })

  describe('Unauthenticated Access', () => {
    it('should not search for users with a provided string', async () => {
      const input: UserSearchUserInput = {
        query: `alice`,
      }

      return runGraphQLQuery(app, UserSearchUsers, { input })
        .expect(200)
        .expect((res) => expectUnauthorized(res))
    })
  })
})
