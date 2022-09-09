import { KineticSdkConfig } from '../interfaces'

function removeTrailingSlash(str: string) {
  return str.replace(/\/+$/, '')
}

/**
 * This method accepts a Kinetic Sdk Config and will fill in any missing defaults
 * @param {KineticSdkConfig} config
 * @returns {string}
 */
export function parseKineticSdkConfig(config: KineticSdkConfig): KineticSdkConfig {
  if (!config.environment) {
    throw new Error(`parseKineticSdkConfig: no environment configured.`)
  }
  const endpoint = config.endpoint || config.environment

  return {
    ...config,
    endpoint: removeTrailingSlash(endpoint),
  }
}
