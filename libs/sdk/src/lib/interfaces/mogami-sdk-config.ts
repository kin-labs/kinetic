import { MogamiSdkEndpoint } from './mogami-sdk-endpoint'
import { MogamiSdkEnvironment } from './mogami-sdk-environment'
import { MogamiSdkLogger } from './mogami-sdk-logger'

export interface MogamiSdkConfig {
  index: number
  endpoint?: MogamiSdkEndpoint
  environment: MogamiSdkEnvironment
  logger?: MogamiSdkLogger
  solanaRpcEndpoint?: string
}
