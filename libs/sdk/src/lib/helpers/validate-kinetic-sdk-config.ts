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
  if (!config.endpoint.startsWith('http')) {
    throw new Error(`validateKineticSdkConfig: the endpoint should start with http or https.`)
  }
  return {
    ...config,
    endpoint: removeTrailingSlash(config.endpoint),
  }
}
