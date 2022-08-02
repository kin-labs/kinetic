import { ApiAppDataAccessService } from '@kin-kinetic/api/app/data-access'
import { validatePassword } from '@kin-kinetic/api/auth/util'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { LoginInput } from './dto/login.input'
import { AuthToken } from './entities/auth-token.entity'

@Injectable()
export class ApiAuthDataAccessService {
  private readonly jwtOptions: JwtSignOptions = {}

  constructor(
    private readonly apps: ApiAppDataAccessService,
    private readonly data: ApiCoreDataAccessService,
    private readonly jwt: JwtService,
  ) {}

  resetCookie(req: Request, res: Response) {
    return res.clearCookie(this.data.config.cookieName, this.data.config.cookieOptions(req.hostname))
  }

  setCookie(req: Request, res: Response, token: string) {
    return res?.cookie(this.data.config.cookieName, token, this.data.config.cookieOptions(req.hostname))
  }

  sign(payload: { id: string; username: string }): string {
    return this.jwt.sign(payload, this.jwtOptions)
  }

  async validateUser({ username, password }: { password: string; username: string }) {
    const user = await this.data.getUserByUsername(username)

    if (!user) {
      throw new UnauthorizedException(`User not found.`)
    }

    if (!validatePassword(password, user.password)) {
      throw new UnauthorizedException(`Password incorrect.`)
    }

    user.password = undefined
    return user
  }

  async login(req: Request, res: Response, input: LoginInput): Promise<AuthToken> {
    const user = await this.validateUser(input)
    const token = this.sign({ username: user.username, id: user.id })
    this.setCookie(req, res, token)
    return { token, user }
  }
}
