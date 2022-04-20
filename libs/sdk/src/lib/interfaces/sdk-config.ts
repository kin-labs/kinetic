import { SdkLogger } from './sdk-logger'

export interface SdkConfig {
  index: number
  endpoint: string
  logger?: SdkLogger
  solanaRpcEndpoint?: string
}
