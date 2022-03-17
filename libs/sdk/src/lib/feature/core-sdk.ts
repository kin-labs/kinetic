import { Configuration, DefaultApi } from '../../generated'

export class CoreSdk {
  private api: DefaultApi
  constructor(apiConfig: Configuration) {
    this.api = new DefaultApi(apiConfig)
  }

  uptime() {
    return this.api.apiCoreFeatureControllerUptime()
  }
}
