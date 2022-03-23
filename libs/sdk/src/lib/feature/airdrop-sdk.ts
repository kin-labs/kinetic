import { AirdropApi, AirdropRequest, Configuration } from '../../generated'

export class AirdropSdk {
  private api: AirdropApi

  constructor(apiConfig: Configuration) {
    this.api = new AirdropApi(apiConfig)
  }

  request(request: AirdropRequest) {
    return this.api.apiAirdropFeatureControllerRequest(request)
  }
}
