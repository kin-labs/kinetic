import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ApiAppDataAccessService } from '../api-app-data-access.service'

@Injectable()
export class ApiAppConfigGuard implements CanActivate {
  readonly logger = new Logger(ApiAppConfigGuard.name)
  constructor(private readonly service: ApiAppDataAccessService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const hostname = context.switchToHttp()?.getRequest()?.hostname
    const config = this.service.getConfig(hostname)

    if (!config) {
      this.logger.warn(`Hostname not found ${hostname}`)
      return false
    }
    return true
  }
}
