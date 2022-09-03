import { KineticSdkEndpoint } from './kinetic-sdk-endpoint'
import { KineticSdkEnvironment } from './kinetic-sdk-environment'
import { KineticSdkLogger } from './kinetic-sdk-logger'

export interface KineticSdkConfig {
  endpoint?: KineticSdkEndpoint
  environment: KineticSdkEnvironment
  headers?: Record<string, string>
  index: number
  logger?: KineticSdkLogger
  solanaRpcEndpoint?: string
}
