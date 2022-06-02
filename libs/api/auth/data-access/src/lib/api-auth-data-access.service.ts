import { ApiAppDataAccessService } from '@mogami/api/app/data-access'
import { validatePassword } from '@mogami/api/auth/util'
import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { Response } from 'express'
import { LoginInput } from './dto/login.input'
import { AuthToken } from './entities/auth-token.entity'

@Injectable()
export class ApiAuthDataAccessService {
  private readonly logger = new Logger(ApiAuthDataAccessService.name)
  private readonly cookieOptions = {
    httpOnly: true,
    secure: false,
    domain: process.env.COOKIE_DOMAIN,
  }
  private readonly jwtOptions: JwtSignOptions = {}

  constructor(
    private readonly apps: ApiAppDataAccessService,
    private readonly data: ApiCoreDataAccessService,
    private readonly jwt: JwtService,
  ) {}

  resetCookie(res: Response) {
    return res.clearCookie(process.env.COOKIE_NAME, this.cookieOptions)
  }

  setCookie(res: Response, token: string) {
    return res?.cookie(process.env.COOKIE_NAME, token, this.cookieOptions)
  }

  sign(payload: { id: string; username: string }): string {
    return this.jwt.sign(payload, this.jwtOptions)
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

  async login(res: Response, input: LoginInput): Promise<AuthToken> {
    const user = await this.validateUser(input)
    const token = this.sign({ username: user.username, id: user.id })
    this.setCookie(res, token)
    return { token, user }
  }
}
