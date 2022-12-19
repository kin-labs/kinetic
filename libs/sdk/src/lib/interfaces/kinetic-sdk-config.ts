import { Commitment } from '@kin-kinetic/solana'
import { KineticSdkLogger } from './kinetic-sdk-logger'

export interface KineticSdkConfig {
  commitment?: Commitment
  endpoint: string
  environment: string
  headers?: Record<string, string>
  index: number
  logger?: KineticSdkLogger
  solanaRpcEndpoint?: string
}
