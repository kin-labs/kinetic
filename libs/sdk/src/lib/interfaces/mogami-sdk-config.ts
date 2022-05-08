import { MogamiSdkLogger } from './mogami-sdk-logger'

export interface MogamiSdkConfig {
  index: number
  endpoint: string
  logger?: MogamiSdkLogger
  solanaRpcEndpoint?: string
}
