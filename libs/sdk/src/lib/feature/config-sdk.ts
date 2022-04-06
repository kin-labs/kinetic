import { ConfigApi, Configuration } from '../../generated'

export class ConfigSdk {
  private api: ConfigApi
  constructor(apiConfig: Configuration) {
    this.api = new ConfigApi(apiConfig)
  }

  config() {
    return this.api.config()
  }
}
