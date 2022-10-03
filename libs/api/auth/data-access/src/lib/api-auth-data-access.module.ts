import { ApiAppDataAccessModule } from '@kin-kinetic/api/app/data-access'
import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ApiAuthDataAccessService } from './api-auth-data-access.service'
import { ApiAuthDiscordGuard } from './guards/api-auth-discord.guard'
import { ApiAuthGithubGuard } from './guards/api-auth-github.guard'
import { ApiAuthGraphqlGuard } from './guards/api-auth-graphql.guard'
import { ApiAuthDiscordStrategy } from './strategies/api-auth-discord.strategy'
import { ApiAuthGithubStrategy } from './strategies/api-auth-github.strategy'
import { ApiAuthJwtStrategy } from './strategies/api-auth-jwt.strategy'

@Module({
  providers: [
    ApiAuthDataAccessService,
    ApiAuthDiscordGuard,
    ApiAuthDiscordStrategy,
    ApiAuthGithubGuard,
    ApiAuthGithubStrategy,
    ApiAuthGraphqlGuard,
    ApiAuthJwtStrategy,
  ],
  exports: [ApiAuthDataAccessService],
  imports: [
    ApiAppDataAccessModule,
    ApiCoreDataAccessModule,
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
})
export class ApiAuthDataAccessModule {}
