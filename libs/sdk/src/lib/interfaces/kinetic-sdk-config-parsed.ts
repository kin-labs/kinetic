import { KineticSdkConfig } from './kinetic-sdk-config'
import { KineticSdkEndpoint } from './kinetic-sdk-endpoint'

export interface KineticSdkConfigParsed extends KineticSdkConfig {
  endpoint: KineticSdkEndpoint
}
