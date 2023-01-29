import { hashPassword } from '@kin-kinetic/api/auth/util'
import { ApiCoreService } from '@kin-kinetic/api/core/data-access'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { AdminUserCreateInput } from './dto/admin-user-create.input'
import { AdminUserUpdateInput } from './dto/admin-user-update.input'
import { UserRole } from './entities/user-role.enum'

@Injectable()
export class ApiUserAdminDataAccessService {
  constructor(private readonly core: ApiCoreService) {}

  async adminCreateUser(adminId: string, input: AdminUserCreateInput) {
    await this.core.ensureAdminUser(adminId)
    const { email: inputEmail, ...data } = input
    const email = inputEmail.trim()
    const role = data.role || UserRole.User
    const password = hashPassword(data.password)
    const username = data.username || email

    const [existingEmail, existingUsername] = await Promise.all([
      this.core.getUserByEmail(input.email),
      this.core.getUserByUsername(username),
    ])

    if (existingEmail) {
      throw new BadRequestException(`User with email ${email} already exists`)
    }
    if (existingUsername) {
      throw new BadRequestException(`User with username ${username} already exists`)
    }

    return this.core.user.create({
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

  async adminDeleteUser(adminId: string, userId: string) {
    await this.ensureUserById(adminId, userId)
    if (adminId === userId) {
      throw new BadRequestException(`Can't delete your own user.`)
    }
    const count = await this.core.user.count()
    if (count === 1) {
      throw new BadRequestException(`Can't delete the last user.`)
    }
    await this.core.appUser.deleteMany({ where: { userId } })
    await this.core.userEmail.deleteMany({ where: { ownerId: userId } })
    return this.core.user.delete({ where: { id: userId } })
  }

  async adminUsers(adminId: string) {
    await this.core.ensureAdminUser(adminId)
    return this.core.user.findMany({ include: { emails: true } })
  }

  async adminUser(adminId: string, userId: string) {
    return this.ensureUserById(adminId, userId)
  }

  async updateUser(adminId: string, userId: string, data: AdminUserUpdateInput) {
    await this.ensureUserById(adminId, userId)
    return this.core.user.update({ where: { id: userId }, data })
  }

  private async ensureUserById(adminId: string, userId: string) {
    await this.core.ensureAdminUser(adminId)
    const user = await this.core.user.findUnique({
      where: { id: userId },
      include: { emails: true, apps: { include: { app: true } } },
    })
    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist.`)
    }
    return user
  }
}
