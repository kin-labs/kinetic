import { Http } from './helpers/http'
import { SdkConfig } from './interfaces/sdk-config'

interface ServerConfig {
  environment: string
  port: number
}

export class Sdk {
  http: Http
  serverConfig: ServerConfig
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
