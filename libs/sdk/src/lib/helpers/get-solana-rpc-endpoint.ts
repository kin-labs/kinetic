import { Cluster } from '@solana/web3.js'
import { MogamiSdkEndpoint } from '../interfaces'

/**
 * This method accepts one of the existing Mogami APIs (mainnet | devnet ) or the URL of a Solana RPC Node.
 * @param {MogamiSdkEndpoint} endpoint
 * @returns {string}
 */
export function getSolanaRpcEndpoint(endpoint: MogamiSdkEndpoint): Cluster | string {
  switch (endpoint) {
    case 'devnet':
      return 'devnet'
    case 'mainnet':
    case 'mainnet-beta':
      return 'mainnet-beta'
    default:
      if (endpoint.startsWith('http')) {
        return endpoint
      }
      throw new Error('Unknown http or https endpoint')
  }
}
