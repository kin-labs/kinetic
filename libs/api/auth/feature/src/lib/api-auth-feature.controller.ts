import { ApiAuthDataAccessService, ApiAuthGithubGuard } from '@kin-kinetic/api/auth/data-access'
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'
import { Request, Response } from 'express'

@Controller('auth')
export class ApiAuthFeatureController {
  constructor(private readonly service: ApiAuthDataAccessService) {}

  @Get('github')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthGithubGuard)
  github() {
    return {
      message: 'Welcome to api-auth-feature!',
    }
  }

  @Get('github/callback')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthGithubGuard)
  async githubAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as unknown as { id: string; username: string; password?: string }
    delete user.password

    const token = this.service.sign({ username: user.username, id: user.id })
    this.service.setCookie(req, res, token)

    // Redirect to admin url
    return res.redirect(this.service.data.config.adminUrl)
  }
}
