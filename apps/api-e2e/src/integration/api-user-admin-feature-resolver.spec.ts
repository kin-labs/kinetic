import { INestApplication } from '@nestjs/common'
import { Response } from 'supertest'
import {
  AdminCreateUser,
  AdminDeleteUser,
  AdminUpdateUser,
  AdminUser,
  AdminUserCreateInput,
  AdminUsers,
  AdminUserUpdateInput,
  UserRole,
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
    describe('CRUD', () => {
      it('should create a user', async () => {
        const name = uniq('user')
        const input: AdminUserCreateInput = {
          email: `${name}@example.com`,
          password: 'password',
          username,
          name,
        }

        return runGraphQLQueryAdmin(app, token, AdminCreateUser, { input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.created
            userId = data.id
            expect(data.username).toEqual(username)
            expect(data.email).toEqual(input.email)
            expect(data.name).toEqual(input.name)
            expect(data.role).toEqual(UserRole.User)
          })
      })

      it('should update a user', async () => {
        const input: AdminUserUpdateInput = {
          name: `User ${username} edited`,
          role: UserRole.Admin,
          avatarUrl: 'test-avatar',
        }

        return runGraphQLQueryAdmin(app, token, AdminUpdateUser, { userId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.updated

            expect(data.avatarUrl).toEqual('test-avatar')
            expect(data.username).toEqual(username)
            expect(data.name).toEqual(input.name)
            expect(data.role).toEqual(UserRole.Admin)
          })
      })

      it('should find a user', async () => {
        return runGraphQLQueryAdmin(app, token, AdminUser, { userId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item

            expect(data.id).toEqual(userId)
            expect(data.username).toEqual(username)
          })
      })

      it('should find a list of users', async () => {
        return runGraphQLQueryAdmin(app, token, AdminUsers)
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.items

            expect(data.length).toBeGreaterThan(1)
            expect(data.find((user) => user.username === username)).toBeDefined()
          })
      })

      it('should delete a user', async () => {
        return runGraphQLQueryAdmin(app, token, AdminDeleteUser, { userId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.deleted

            expect(data.id).toEqual(userId)
            expect(data.username).toEqual(username)
          })
      })
    })
  })

  describe('Unexpected usage', () => {
    describe('CRUD Constraints', () => {
      it('should not create a user with existing email', async () => {
        const username = randomUsername()
        const input: AdminUserCreateInput = {
          username,
          password: 'password',
          email: uniq('email-'),
          name: `User ${username}`,
        }

        // Run once
        await runGraphQLQueryAdmin(app, token, AdminCreateUser, { input })
        // Try to add again
        return runGraphQLQueryAdmin(app, token, AdminCreateUser, { input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`User with email ${input.email} already exists`)
          })
      })

      it('should not create a user with existing username', async () => {
        const username = randomUsername()
        const input: AdminUserCreateInput = {
          username,
          password: 'password',
          email: uniq('email-'),
          name: `User ${username}`,
        }

        // Run once
        await runGraphQLQueryAdmin(app, token, AdminCreateUser, { input })
        // Try to add again
        return runGraphQLQueryAdmin(app, token, AdminCreateUser, { input: { ...input, email: uniq('email-') } })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`User with username ${input.username} already exists`)
          })
      })

      it('should not update a user that does not exist', async () => {
        const userId = uniq('user-')
        const input: AdminUserUpdateInput = { name: `User ${userId}` }

        return runGraphQLQueryAdmin(app, token, AdminUpdateUser, { userId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`User with id ${userId} does not exist.`)
          })
      })

      it('should not find a user that does not exist', async () => {
        const userId = uniq('user-')
        return runGraphQLQueryAdmin(app, token, AdminUser, { userId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`User with id ${userId} does not exist.`)
          })
      })

      it('should not delete a user that does not exist', async () => {
        const userId = uniq('user-')
        return runGraphQLQueryAdmin(app, token, AdminDeleteUser, { userId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`User with id ${userId} does not exist.`)
          })
      })
    })

    describe('Mall-formed Input', () => {
      it('should not create a user', async () => {
        const input: AdminUserCreateInput = { username: undefined, email: undefined, password: undefined }

        return runGraphQLQuery(app, AdminCreateUser, { input })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not update a user', async () => {
        const input: AdminUserUpdateInput = { name: undefined }

        return runGraphQLQuery(app, AdminUpdateUser, { userId: undefined, input })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not find a user', async () => {
        return runGraphQLQuery(app, AdminUser, { userId: undefined })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not delete a user', async () => {
        return runGraphQLQuery(app, AdminDeleteUser, { userId: undefined })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })
    })

    describe('Unauthenticated Access', () => {
      it('should not create a user', async () => {
        const input: AdminUserCreateInput = { username: username, password: 'password', email: uniq('email-') }

        return runGraphQLQuery(app, AdminCreateUser, { input })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not update a user', async () => {
        const input: AdminUserUpdateInput = { name: `User ${username} edited` }

        return runGraphQLQuery(app, AdminUpdateUser, { userId, input })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not find a user', async () => {
        return runGraphQLQuery(app, AdminUser, { userId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not find a list of users', async () => {
        return runGraphQLQuery(app, AdminUsers)
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not delete a user', async () => {
        return runGraphQLQuery(app, AdminDeleteUser, { userId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })
    })
  })
})
