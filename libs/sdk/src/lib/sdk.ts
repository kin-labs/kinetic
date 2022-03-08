import { Solana } from '@mogami/solana'
import { Http } from './helpers/http'
import { SdkConfig } from './interfaces/sdk-config'

interface ServerConfig {
  environment: string
  port: number
  solanaRpcEndpoint: string
}

export class Sdk {
  http: Http
  serverConfig: ServerConfig
  solana: Solana

  constructor(readonly sdkConfig: SdkConfig) {
    if (!sdkConfig.endpoint && !sdkConfig.http) {
      throw new Error(`Provide either and 'endpoint' or 'http' parameter.`)
    }
    this.http = sdkConfig.http || new Http(sdkConfig.endpoint)
  }

  get endpoint() {
    return this.sdkConfig?.endpoint || this.sdkConfig?.http?.endpoint
  }

  async init() {
    try {
      this.serverConfig = await this.http.get('/api/config')
      this.sdkConfig?.logger?.log(`Initializing Server: `, this.serverConfig)
      this.solana = new Solana(this.sdkConfig?.solanaRpcEndpoint || this.serverConfig.solanaRpcEndpoint, {
        logger: this.sdkConfig?.logger,
      })
    } catch (e) {
      this.sdkConfig?.logger?.error(`Error initializing Server.`)
      throw new Error(`Error initializing Server.`)
    }
  }

  static async setup(config: SdkConfig): Promise<Sdk> {
    const sdk = new Sdk(config)
    try {
      await sdk.init().then(() => config.logger?.log(`SDK Setup done.`))
      return sdk
    } catch (e) {
      config.logger?.error(`Error setting up SDK.`)
      throw new Error(`Error setting up SDK.`)
    }
  }
}
