import { INestApplication, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Keypair, PublicKey } from '@solana/web3.js'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

@Injectable()
export class ApiConfigDataAccessService {
  constructor(private readonly config: ConfigService) {}

  get environment() {
    return this.config.get('environment')
  }

  get mogamiMintPublicKey() {
    return this.config.get('mogamiMintPublicKey')
  }

  get mogamiSubsidizerKeypair(): Keypair {
    return this.config.get('mogamiSubsidizerKeypair')
  }

  get mogamiSubsidizerPublicKey(): PublicKey {
    return this.mogamiSubsidizerKeypair.publicKey
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
      solanaRpcEndpoint: this.solanaRpcEndpoint,
    }
  }

  configureSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Mogami')
      .setDescription('The Mogami API description')
      .setVersion('1.0')
      .addTag('mogami')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup(this.prefix, app, document)
  }

  getServiceConfig() {
    return {
      mint: this.mogamiMintPublicKey,
      subsidizer: this.mogamiSubsidizerPublicKey.toBase58(),
      tokenProgram: TOKEN_PROGRAM_ID.toBase58(),
    }
  }
}
