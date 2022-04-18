import { AirdropConfig } from '@mogami/airdrop'
import { INestApplication, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { exec } from 'child_process'
import * as fs from 'fs'

@Injectable()
export class ApiConfigDataAccessService {
  constructor(private readonly config: ConfigService) {}

  get adminEmail(): string {
    return this.config.get('admin.email')
  }

  get adminPassword(): string {
    return this.config.get('admin.password')
  }

  get corsOrigins(): string[] {
    return this.config.get('cors.origin')
  }

  get environment() {
    return this.config.get('environment')
  }

  get jwtSecret(): string {
    return this.config.get('jwt.secret')
  }

  mogamiAirdropConfig(connection: Connection): AirdropConfig | null {
    return this.mogamiAirdropKeypair
      ? {
          airdropDefault: this.mogamiAirdropDefault,
          airdropMax: this.mogamiAirdropMax,
          connection,
          decimals: this.mogamiMintDecimals,
          feePayer: this.mogamiAirdropKeypair,
          mint: this.mogamiMintPublicKey,
        }
      : null
  }

  get mogamiAirdropDefault(): number {
    return this.config.get('mogamiAirdropDefault')
  }

  get mogamiAirdropMax(): number {
    return this.config.get('mogamiAirdropMax')
  }

  get mogamiAirdropKeypair(): Keypair {
    return this.config.get('mogamiAirdropKeypair')
  }

  get mogamiMainnet() {
    return this.config.get('mogamiMainnet')
  }

  get mogamiMintDecimals() {
    return this.config.get('mogamiMintDecimals')
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
      .addServer('https://devnet.mogami.io')
      .addServer('https://mainnet.mogami.io')
      .addServer('http://localhost:3000')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    if (this.environment === 'development') {
      fs.writeFileSync('./api-swagger.json', JSON.stringify(document, null, 2))
      exec('prettier --write ./api-swagger.json', { cwd: process.cwd() })
    }
    SwaggerModule.setup(this.prefix, app, document)
  }

  getServiceConfig() {
    return {
      mainnet: this.mogamiMainnet,
      mint: this.mogamiMintPublicKey,
      subsidizer: this.mogamiSubsidizerPublicKey.toBase58(),
      tokenProgram: TOKEN_PROGRAM_ID.toBase58(),
    }
  }
}
