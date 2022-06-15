import { KineticSdkEndpoint } from '../interfaces'

/**
 * This method accepts one of the existing hosts (mainnet | devnet ) or the URL of a Kinetic API.
 * @param {KineticSdkEndpoint} endpoint
 * @returns {string}
 */
export function parseKineticSdkEndpoint(endpoint: KineticSdkEndpoint): string {
  switch (endpoint) {
    case 'devnet':
      return 'https://devnet.kinetic.kin.org'
    case 'mainnet':
      return 'https://mainnet.kinetic.kin.org'
    default:
      if (endpoint.startsWith('http')) {
        return endpoint
      }
      throw new Error('Unknown http or https endpoint')
  }
}
