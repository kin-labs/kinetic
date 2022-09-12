import { Cluster } from '@solana/web3.js'

/**
 * This method accepts one of the existing clusterApiUrls of the URL of a Solana RPC Node.
 * @param {string} endpoint
 * @returns {string}
 */
export function getSolanaRpcEndpoint(endpoint: string): Cluster | string {
  switch (endpoint) {
    case 'devnet':
      return 'devnet'
    case 'mainnet':
    case 'mainnet-beta':
      return 'mainnet-beta'
    default:
      if (endpoint?.startsWith('http')) {
        return endpoint
      }
      throw new Error('Unknown http or https endpoint')
  }
}
