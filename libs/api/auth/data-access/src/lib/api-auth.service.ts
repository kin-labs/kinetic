import { ApiAppService } from '@kin-kinetic/api/app/data-access'
import { validatePassword } from '@kin-kinetic/api/auth/util'
import { ApiCoreService } from '@kin-kinetic/api/core/data-access'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { UserIdentityType, UserRole } from '@prisma/client'
import { Response } from 'express'
import { AuthRequest } from './entities/auth-request.entity'
import { UserLoginInput } from './dto/user-login.input'
import { AuthToken } from './entities/auth-token.entity'

@Injectable()
export class ApiAuthService {
  private readonly jwtOptions: JwtSignOptions = {}

  constructor(
    private readonly apps: ApiAppService,
    private readonly core: ApiCoreService,
    private readonly jwt: JwtService,
  ) {}

  resetCookie(req: AuthRequest, res: Response) {
    return res.clearCookie(this.core.config.cookieName, this.core.config.cookieOptions(req.hostname))
  }

  setCookie(req: AuthRequest, res: Response, token: string) {
    return res?.cookie(this.core.config.cookieName, token, this.core.config.cookieOptions(req.hostname))
  }

  sign(payload: { id: string; username: string }): string {
    return this.jwt.sign(payload, this.jwtOptions)
  }

  async findOrCreateByIdentity(
    type: UserIdentityType,
    profile: {
      externalId?: string
      email?: string
      username?: string
      name?: string
      avatarUrl?: string
    },
  ) {
    const foundIdentity = await this.core.getUserByIdentity(type, profile.externalId)

    if (foundIdentity) {
      return foundIdentity
    }

    const foundEmail = await this.core.getUserByEmail(profile.email)

    if (foundEmail) {
      // Add this identity to the user
      return this.core.user.update({
        where: { id: foundEmail.id },
        data: {
          avatarUrl: foundEmail.avatarUrl || profile.avatarUrl,
          name: foundEmail.name || profile.name,
          identities: {
            create: {
              type,
              externalId: profile.externalId,
              profile,
            },
          },
        },
      })
    }

    let username = profile.username
    const foundUsername = await this.core.getUserByUsername(profile.username)
    if (foundUsername) {
      // suffix username with random number
      username = `${profile.username}-${Math.floor(Math.random() * 1000)}`
    }

    // Create new user
    return this.core.user.create({
      data: {
        avatarUrl: profile.avatarUrl,
        name: profile.name,
        username,
        role: UserRole.User,
        emails: {
          create: {
            email: profile.email,
          },
        },
        identities: {
          create: {
            type,
            externalId: profile.externalId,
            profile,
          },
        },
      },
      include: { emails: true, identities: true },
    })
  }

  signOauthUser(req: AuthRequest, res: Response) {
    const user = req?.user as unknown as { id: string; username: string; password?: string }
    delete user.password

    const token = this.sign({ username: user.username, id: user.id })
    this.setCookie(req, res, token)

    return res.redirect(this.core.config.webUrl)
  }

  async validateUser({ username, password }: { password: string; username: string }) {
    const user = await this.core.getUserByUsername(username)

    if (!user) {
      throw new UnauthorizedException(`User not found.`)
    }

    if (!user.password) {
      throw new UnauthorizedException(`Login with username and password is not allowed.`)
    }

    if (!validatePassword(password, user.password)) {
      throw new UnauthorizedException(`Password incorrect.`)
    }

    user.password = undefined
    return user
  }

  async login(req: AuthRequest, res: Response, input: UserLoginInput): Promise<AuthToken> {
    if (!this.core.config.authPasswordEnabled) {
      throw new UnauthorizedException(`Login with username and password is not allowed.`)
    }
    if (input?.password.length < 8) {
      throw new UnauthorizedException(`Password must be at least 8 characters.`)
    }
    const user = await this.validateUser(input)
    const token = this.sign({ username: user.username, id: user.id })
    this.setCookie(req, res, token)
    return { token, user }
  }
}
