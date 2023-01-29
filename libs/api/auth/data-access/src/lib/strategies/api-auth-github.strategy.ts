import { ApiCoreService } from '@kin-kinetic/api/core/data-access'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserIdentityType } from '@prisma/client'
import fetch from 'node-fetch'
import { Profile, Strategy } from 'passport-github'
import { ApiAuthService } from '../api-auth.service'

@Injectable()
export class ApiAuthGithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private core: ApiCoreService, private service: ApiAuthService) {
    // TODO: We need to make sure to dynamically load ApiAuthGithubStrategy only when the
    //       environment variable is set.
    super({
      clientID: core.config.githubClientId ?? 'github-client-not-configured',
      clientSecret: core.config.githubClientSecret ?? 'github-client-not-configured',
      callbackURL: core.config.githubCallbackUrl ?? 'github-client-not-configured',
      scope: ['public_profile', 'user:email'],
      profilePath: 'https://api.github.com/user',
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = await this.getGithubEmail(accessToken)

    const user = await this.service.findOrCreateByIdentity(UserIdentityType.GitHub, {
      externalId: profile.id,
      email,
      username: profile.username,
      name: profile.displayName,
      avatarUrl: profile.photos.length ? profile.photos[0].value : undefined,
    })

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }

  private getGithubEmail(accessToken): Promise<string | undefined> {
    return fetch('https://api.github.com/user/emails', {
      headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json() as Promise<{ email: string; primary: boolean; verified: boolean }[]>)
      .then((res) => res.find((item) => item.primary === true && item.verified === true).email)
  }
}
