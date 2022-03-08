import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

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

  get solanaRpcEndpoint() {
    return this.config.get('solanaRpcEndpoint')
  }

  get minimumKinVersion() {
    return this.config.get('minimumKinVersion')
  }

  configSummary() {
    return {
      environment: this.environment,
      port: this.port,
      minimumKinVersion: this.minimumKinVersion,
    }
  }

  getServiceConfig() {
    return {
      subsidizer: this.config.get('mogamiSubsidizerSecretKey'),
      token: this.config.get('mogamiMintPubliKey'),
      tokenProgram: TOKEN_PROGRAM_ID.toBase58(),
    }
  }
}
