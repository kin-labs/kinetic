import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ApiConfigDataAccessService {
  constructor(private readonly config: ConfigService) {}

  get environment() {
    return this.config.get('environment')
  }

  get port() {
    return this.config.get('port')
  }

  get prefix() {
    return 'api'
  }

  configSummary() {
    return {
      environment: this.environment,
      port: this.port,
    }
  }
}
