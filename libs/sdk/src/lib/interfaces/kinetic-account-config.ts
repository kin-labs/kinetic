import { Keypair } from '@kin-kinetic/keypair'
import { KineticSdkConfig } from './kinetic-sdk-config'

export interface KineticAccountConfig extends KineticSdkConfig {
  owner: Keypair
}
