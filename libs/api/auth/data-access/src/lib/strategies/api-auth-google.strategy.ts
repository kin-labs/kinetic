import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserIdentityType } from '@prisma/client'
import { Profile, Strategy } from 'passport-google-oauth20'
import { ApiAuthDataAccessService } from '../api-auth-data-access.service'

@Injectable()
export class ApiAuthGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private data: ApiCoreDataAccessService, private service: ApiAuthDataAccessService) {
    // TODO: We need to make sure to dynamically load ApiAuthGoogleStrategy only when the
    //       environment variable is set.
    super({
      clientID: data.config.googleClientId ?? 'google-client-not-configured',
      clientSecret: data.config.googleClientSecret ?? 'google-client-not-configured',
      callbackURL: data.config.googleCallbackUrl ?? 'google-client-not-configured',
      scope: ['profile', 'email'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // Get the first email address from the profile.
    const email = profile.emails?.length ? profile.emails[0].value : undefined
    // Google does not support username, so we use the first part of the email address as the username.
    const username = email?.split('@')[0]

    const user = await this.service.findOrCreateByIdentity(UserIdentityType.Google, {
      externalId: profile.id,
      email,
      username,
      name: profile.displayName,
      avatarUrl: profile.photos.length ? profile.photos[0].value : undefined,
    })

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
