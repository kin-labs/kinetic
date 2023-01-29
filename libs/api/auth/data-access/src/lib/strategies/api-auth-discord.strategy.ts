import { ApiCoreService } from '@kin-kinetic/api/core/data-access'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserIdentityType } from '@prisma/client'
import { Profile, Strategy } from 'passport-discord'
import { ApiAuthDataAccessService } from '../api-auth-data-access.service'

@Injectable()
export class ApiAuthDiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private core: ApiCoreService, private service: ApiAuthDataAccessService) {
    // TODO: We need to make sure to dynamically load ApiAuthDiscordStrategy only when the
    //       environment variable is set.
    super({
      clientID: core.config.discordClientId ?? 'discord-client-not-configured',
      clientSecret: core.config.discordClientSecret ?? 'discord-client-not-configured',
      callbackURL: core.config.discordCallbackUrl ?? 'discord-client-not-configured',
      scope: ['identify', 'email'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const avatarUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
    const user = await this.service.findOrCreateByIdentity(UserIdentityType.Discord, {
      externalId: profile.id,
      email: profile.email,
      username: profile.username,
      name: profile.displayName,
      avatarUrl,
    })

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
