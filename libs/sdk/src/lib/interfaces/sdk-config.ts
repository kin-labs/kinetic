import { SdkLogger } from './sdk-logger'

export interface SdkConfig {
  endpoint: string
  logger?: SdkLogger
  solanaRpcEndpoint?: string
}
