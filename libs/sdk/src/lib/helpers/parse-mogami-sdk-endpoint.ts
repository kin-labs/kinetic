import { MogamiSdkEndpoint } from '../interfaces'

/**
 * This method accepts one of the existing hosts (mainnet | devnet ) or the URL of a Mogami API.
 * @param {MogamiSdkEndpoint} endpoint
 * @returns {string}
 */
export function parseMogamiSdkEndpoint(endpoint: MogamiSdkEndpoint): string {
  switch (endpoint) {
    case 'devnet':
      return 'https://devnet.mogami.io'
    case 'mainnet':
      return 'https://mainnet.mogami.io'
    default:
      if (endpoint.startsWith('http')) {
        return endpoint
      }
      throw new Error('Unknown http or https endpoint')
  }
}
