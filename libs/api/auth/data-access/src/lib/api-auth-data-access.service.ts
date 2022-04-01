import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { UserRole } from '@mogami/api/user/data-access'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { compareSync, hashSync } from 'bcrypt'
import { Response } from 'express'
import { LoginInput } from './dto/login.input'

export function validatePassword(password: string, hashedPassword: string): boolean {
  return compareSync(password, hashedPassword)
}

export function hashPassword(password: string): string {
  return hashSync(password, 10)
}

@Injectable()
export class ApiAuthDataAccessService {
  private readonly logger = new Logger(ApiAuthDataAccessService.name)
  private readonly cookieOptions = {
    httpOnly: true,
    secure: false,
    domain: process.env.COOKIE_DOMAIN,
  }
  private readonly jwtOptions: JwtSignOptions = {}

  constructor(private readonly data: ApiCoreDataAccessService, private readonly jwt: JwtService) {
    this.ensureAdmin()
  }

  resetCookie(res: Response) {
    return res.clearCookie(process.env.COOKIE_NAME, this.cookieOptions)
  }

  setCookie(res: Response, token: string) {
    return res?.cookie(process.env.COOKIE_NAME, token, this.cookieOptions)
  }

  sign(payload: { id: string; username: string }): string {
    return this.jwt.sign(payload, this.jwtOptions)
  }

  private async ensureAdmin() {
    const email = this.data.config.adminEmail
    const password = this.data.config.adminPassword
    const existing = await this.data.user.count({ where: { role: UserRole.Admin } })
    if (existing < 1) {
      await this.data.user.create({
        data: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/82999948?v=4',
          name: 'Mogami Admin',
          password: hashPassword(password),
          role: UserRole.Admin,
          username: email,
          emails: {
            create: { email },
          },
        },
      })
      this.logger.verbose(`Created new Admin with email ${email} and password ${password}`)
      return
    }
    this.logger.verbose(`Log in as Admin with email ${email} and password ${password}`)
  }

  async validateUser({ email, password }: { password: string; email: string }) {
    const user = await this.data.getUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException(`User not found.`)
    }

    if (!validatePassword(password, user.password)) {
      throw new UnauthorizedException(`Password incorrect.`)
    }

    user.password = undefined
    return user
  }

  async login(res: Response, input: LoginInput) {
    const user = await this.validateUser(input)
    const token = this.sign({ username: user.username, id: user.id })
    this.setCookie(res, token)
    return { token }
  }
}
