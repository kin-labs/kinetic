import { MogamiSdkConfig } from '../interfaces'
import { MogamiSdkConfigParsed } from '../interfaces/mogami-sdk-config-parsed'

/**
 * This method accepts a Mogami Sdk Config and will fill in any missing defaults
 * @param {MogamiSdkConfig} config
 * @returns {string}
 */
export function parseMogamiSdkConfig(config: MogamiSdkConfig): MogamiSdkConfigParsed {
  if (!config.environment) {
    throw new Error(`parseMogamiSdkConfig: no environment configured.`)
  }
  const endpoint = config.endpoint || config.environment

  return {
    ...config,
    endpoint,
  }
}
