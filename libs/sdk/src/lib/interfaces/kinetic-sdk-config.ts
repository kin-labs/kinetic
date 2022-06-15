import { KineticSdkEndpoint } from './kinetic-sdk-endpoint'
import { KineticSdkEnvironment } from './kinetic-sdk-environment'
import { KineticSdkLogger } from './kinetic-sdk-logger'

export interface KineticSdkConfig {
  index: number
  endpoint?: KineticSdkEndpoint
  environment: KineticSdkEnvironment
  logger?: KineticSdkLogger
  solanaRpcEndpoint?: string
}
