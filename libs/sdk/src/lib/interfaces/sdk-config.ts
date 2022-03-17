import { SdkLogger } from './sdk-logger'

export interface SdkConfig {
  logger?: SdkLogger
  solanaRpcEndpoint?: string
}
