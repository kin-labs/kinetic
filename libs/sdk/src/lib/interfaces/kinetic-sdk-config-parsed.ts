import { KineticSdkConfig } from './kinetic-sdk-config'

export interface KineticSdkConfigParsed extends KineticSdkConfig {
  endpoint: string
}
