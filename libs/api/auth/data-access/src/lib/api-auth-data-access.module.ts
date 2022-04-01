import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ApiAuthDataAccessService } from './api-auth-data-access.service'
import { ApiAuthGraphqlGuard } from './guards/api-auth-graphql.guard'
import { ApiAuthJwtStrategy } from './strategies/api-auth-jwt.strategy'

@Module({
  providers: [ApiAuthDataAccessService, ApiAuthGraphqlGuard, ApiAuthJwtStrategy],
  exports: [ApiAuthDataAccessService],
  imports: [ApiCoreDataAccessModule, PassportModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
})
export class ApiAuthDataAccessModule {}
