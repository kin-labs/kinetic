import { Commitment } from '../../generated'
import { KineticSdkConfig } from '../interfaces'

function removeTrailingSlash(str: string) {
  return str.replace(/\/+$/, '')
}

/**
 * This method accepts a Kinetic Sdk Config and will fill in any missing defaults
 * @param {KineticSdkConfig} config
 * @returns {KineticSdkConfig}
 */
export function validateKineticSdkConfig(config: KineticSdkConfig): KineticSdkConfig {
  if (!config.endpoint) {
    throw new Error(`validateKineticSdkConfig: no endpoint configured.`)
  }
  if (!config.endpoint.startsWith('http')) {
    throw new Error(`validateKineticSdkConfig: the endpoint should start with http or https.`)
  }
  if (!config.environment) {
    throw new Error(`validateKineticSdkConfig: no environment configured.`)
  }
  if (!config.index) {
    throw new Error(`validateKineticSdkConfig: no index configured.`)
  }
  if (!Number.isInteger(config.index)) {
    throw new Error(`validateKineticSdkConfig: index should be an integer.`)
  }
  return {
    ...config,
    commitment: config.commitment || Commitment.Confirmed,
    endpoint: removeTrailingSlash(config.endpoint),
  }
}
