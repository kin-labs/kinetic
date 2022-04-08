import { hashPassword } from '@mogami/api/auth/util'
import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { UserCreateInput } from './dto/user-create.input'
import { UserUpdateInput } from './dto/user-update.input'
import { UserRole } from './entities/user-role.enum'

@Injectable()
export class ApiUserDataAccessService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async createUser(adminId: string, input: UserCreateInput) {
    await this.data.ensureAdminUser(adminId)
    const { email: inputEmail, ...data } = input
    const email = inputEmail.trim()
    const role = data.role || UserRole.User
    const password = hashPassword(data.password)
    const username = data.username || email

    const [existingEmail, existingUsername] = await Promise.all([
      this.data.getUserByEmail(input.email),
      this.data.getUserByUsername(username),
    ])

    if (existingEmail) {
      throw new BadRequestException(`User with email ${email} already exists`)
    }
    if (existingUsername) {
      throw new BadRequestException(`User with username ${username} already exists`)
    }

    return this.data.user.create({
      data: {
        ...data,
        emails: { create: { email } },
        password,
        role,
        username,
      },
      include: { emails: true },
    })
  }

  async deleteUser(adminId: string, userId: string) {
    await this.ensureUserById(adminId, userId)
    await this.data.userEmail.deleteMany({ where: { ownerId: userId } })
    return this.data.user.delete({ where: { id: userId } })
  }

  async users(adminId: string) {
    await this.data.ensureAdminUser(adminId)
    return this.data.user.findMany({ include: { emails: true } })
  }

  async user(adminId: string, userId: string) {
    return this.ensureUserById(adminId, userId)
  }

  async updateUser(adminId: string, userId: string, data: UserUpdateInput) {
    await this.ensureUserById(adminId, userId)
    return this.data.user.update({ where: { id: userId }, data })
  }

  private async ensureUserById(adminId: string, userId: string) {
    await this.data.ensureAdminUser(adminId)
    const user = await this.data.user.findUnique({
      where: { id: userId },
      include: { emails: true, apps: { include: { app: true } } },
    })
    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist.`)
    }
    return user
  }
}
