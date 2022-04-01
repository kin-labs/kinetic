import { INestApplication } from '@nestjs/common'
import { Response } from 'supertest'
import {
  CreateUser,
  DeleteUser,
  UpdateUser,
  User,
  UserCreateInput,
  UserRole,
  Users,
  UserUpdateInput,
} from '../generated/api-sdk'
import { ADMIN_EMAIL, initializeE2eApp, runGraphQLQuery, runGraphQLQueryAdmin, runLoginQuery } from '../helpers'
import { uniq } from '../helpers/uniq'

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
    const res = await runLoginQuery(app, ADMIN_EMAIL, UserRole.Admin)
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
        const input: UserCreateInput = {
          email: `${name}@example.com`,
          password: 'password',
          username,
          name,
        }

        return runGraphQLQueryAdmin(app, token, CreateUser, { input })
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
        const input: UserUpdateInput = {
          name: `User ${username} edited`,
          role: UserRole.Admin,
          avatarUrl: 'test-avatar',
        }

        return runGraphQLQueryAdmin(app, token, UpdateUser, { userId, input })
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
        return runGraphQLQueryAdmin(app, token, User, { userId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.item

            expect(data.id).toEqual(userId)
            expect(data.username).toEqual(username)
          })
      })

      it('should find a list of users', async () => {
        return runGraphQLQueryAdmin(app, token, Users)
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('body.data')
            const data = res.body.data?.items

            expect(data.length).toBeGreaterThan(1)
            expect(data.find((user) => user.username === username)).toBeDefined()
          })
      })

      it('should delete a user', async () => {
        return runGraphQLQueryAdmin(app, token, DeleteUser, { userId })
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
        const input: UserCreateInput = {
          username,
          password: 'password',
          email: uniq('email-'),
          name: `User ${username}`,
        }

        // Run once
        await runGraphQLQueryAdmin(app, token, CreateUser, { input })
        // Try to add again
        return runGraphQLQueryAdmin(app, token, CreateUser, { input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`User with email ${input.email} already exists`)
          })
      })

      it('should not create a user with existing username', async () => {
        const username = randomUsername()
        const input: UserCreateInput = {
          username,
          password: 'password',
          email: uniq('email-'),
          name: `User ${username}`,
        }

        // Run once
        await runGraphQLQueryAdmin(app, token, CreateUser, { input })
        // Try to add again
        return runGraphQLQueryAdmin(app, token, CreateUser, { input: { ...input, email: uniq('email-') } })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`User with username ${input.username} already exists`)
          })
      })

      it('should not update a user that does not exist', async () => {
        const userId = uniq('user-')
        const input: UserUpdateInput = { name: `User ${userId}` }

        return runGraphQLQueryAdmin(app, token, UpdateUser, { userId, input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`User with id ${userId} does not exist.`)
          })
      })

      it('should not find a user that does not exist', async () => {
        const userId = uniq('user-')
        return runGraphQLQueryAdmin(app, token, User, { userId })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual(`User with id ${userId} does not exist.`)
          })
      })

      it('should not delete a user that does not exist', async () => {
        const userId = uniq('user-')
        return runGraphQLQueryAdmin(app, token, DeleteUser, { userId })
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
        const input: UserCreateInput = { username: undefined, email: undefined, password: undefined }

        return runGraphQLQuery(app, CreateUser, { input })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not update a user', async () => {
        const input: UserUpdateInput = { name: undefined }

        return runGraphQLQuery(app, UpdateUser, { userId: undefined, input })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not find a user', async () => {
        return runGraphQLQuery(app, User, { userId: undefined })
          .expect(400)
          .expect((res) => {
            expect(res).toHaveProperty('error')
            const errors = JSON.parse(res.text).errors
            expect(errors).toMatchSnapshot()
          })
      })

      it('should not delete a user', async () => {
        return runGraphQLQuery(app, DeleteUser, { userId: undefined })
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
        const input: UserCreateInput = { username: username, password: 'password', email: uniq('email-') }

        return runGraphQLQuery(app, CreateUser, { input })
          .expect(200)
          .expect((res) => {
            expect(res).toHaveProperty('text')
            const errors = JSON.parse(res.text).errors
            expect(errors[0].message).toEqual('Unauthorized')
          })
      })

      it('should not update a user', async () => {
        const input: UserUpdateInput = { name: `User ${username} edited` }

        return runGraphQLQuery(app, UpdateUser, { userId, input })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not find a user', async () => {
        return runGraphQLQuery(app, User, { userId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not find a list of users', async () => {
        return runGraphQLQuery(app, Users)
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })

      it('should not delete a user', async () => {
        return runGraphQLQuery(app, DeleteUser, { userId })
          .expect(200)
          .expect((res) => expectUnauthorized(res))
      })
    })
  })
})
