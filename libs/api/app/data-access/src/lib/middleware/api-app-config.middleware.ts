import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ApiAppDataAccessService } from '../api-app-data-access.service'
import { formatEnvironment } from '../helpers/format.environment'

@Injectable()
export class ApiAppConfigMiddleware {
  private readonly logger = new Logger(ApiAppConfigMiddleware.name)

  constructor(private readonly data: ApiCoreDataAccessService, private readonly service: ApiAppDataAccessService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { hostname } = req
    res.setHeader('mogami-vhost-hostname', hostname)

    // Check cache
    let config = this.service.getConfig(hostname)

    if (!config) {
      // Check database
      const app = await this.service.findAppByDomain(hostname)

      // No such hostname
      if (!app) {
        res.setHeader('mogami-vhost-status', 'not-found')
        this.logger.warn(`vhost: ${req.hostname} (not-found)`)
        return next()
      }

      config = formatEnvironment(
        hostname,
        app.env,
        this.data.config.mogamiMintPublicKey,
        this.data.config.mogamiSubsidizerPublicKey,
      )

      res.setHeader('mogami-vhost-status', 'found')
      this.logger.verbose(`vhost: ${req.hostname} (found)`)
      this.service.setConfig(hostname, config)
    } else {
      res.setHeader('mogami-vhost-status', 'cached')
      this.logger.verbose(`vhost: ${req.hostname} (cached)`)
    }

    res.setHeader('mogami-vhost-app-index', config.app.index)
    res.setHeader('mogami-vhost-app-name', config.app.name)
    return next()
  }
}
