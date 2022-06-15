import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

function headerAndCookieExtractor(req: Request) {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
  if (!token) {
    return cookieExtractor(req)
  }
  return token
}

function cookieExtractor(req: Request) {
  const name = process.env.COOKIE_NAME
  return req?.cookies?.[name] ? req.cookies[name] : undefined
}

@Injectable()
export class ApiAuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly data: ApiCoreDataAccessService) {
    super({
      jwtFromRequest: headerAndCookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload) {
    if (!payload.id) {
      throw new UnauthorizedException()
    }
    const user = await this.data.getUserById(payload.id)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
