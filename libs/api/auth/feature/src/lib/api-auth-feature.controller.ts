import {
  ApiAuthDataAccessService,
  ApiAuthDiscordGuard,
  ApiAuthGithubGuard,
  ApiAuthGoogleGuard,
  AuthRequest,
} from '@kin-kinetic/api/auth/data-access'
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'
import { Response } from 'express'

@Controller('auth')
export class ApiAuthFeatureController {
  constructor(private readonly service: ApiAuthDataAccessService) {}

  @Get('discord')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthDiscordGuard)
  discord() {
    return
  }

  @Get('discord/callback')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthDiscordGuard)
  async discordAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    return this.service.signOauthUser(req, res)
  }

  @Get('github')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthGithubGuard)
  github() {
    return
  }

  @Get('github/callback')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthGithubGuard)
  async githubAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    return this.service.signOauthUser(req, res)
  }

  @Get('google')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthGoogleGuard)
  google() {
    return
  }

  @Get('google/callback')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthGoogleGuard)
  async googleAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    return this.service.signOauthUser(req, res)
  }
}
