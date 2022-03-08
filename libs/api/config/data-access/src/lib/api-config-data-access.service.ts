import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PublicKey } from '@solana/web3.js'

// TODO Figure out why this import breaks the build
// Related issue: https://github.com/kin-labs/mogami/issues/26
// import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')

@Injectable()
export class ApiConfigDataAccessService {
  constructor(private readonly config: ConfigService) {}

  get environment() {
    return this.config.get('environment')
  }

  get mogamiMintPublicKey() {
    return this.config.get('mogamiMintPublicKey')
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

  configSummary() {
    return {
      environment: this.environment,
      port: this.port,
    }
  }

  getServiceConfig() {
    return {
      subsidizer: this.config.get('mogamiSubsidizerSecretKey'),
      token: this.mogamiMintPublicKey,
      tokenProgram: TOKEN_PROGRAM_ID.toBase58(),
    }
  }
}
