import { MogamiSdkConfig } from './mogami-sdk-config'
import { MogamiSdkEndpoint } from './mogami-sdk-endpoint'

export interface MogamiSdkConfigParsed extends MogamiSdkConfig {
  endpoint: MogamiSdkEndpoint
}
