import { KineticSdkLogger } from './kinetic-sdk-logger'

export interface KineticSdkConfig {
  endpoint: string
  environment: string
  headers?: Record<string, string>
  index: number
  logger?: KineticSdkLogger
  solanaRpcEndpoint?: string
}
