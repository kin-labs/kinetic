import { Cluster, clusterApiUrl } from '@solana/web3.js'

/**
 * This method accepts one of the existing clusters (mainnet-beta | devnet | testnet) or the URL of a Solana RPC provider.
 * @param {string} endpoint
 * @returns {string}
 */
export function parseEndpoint(endpoint: string): string {
  return endpoint.startsWith('http') ? endpoint : clusterApiUrl(endpoint as Cluster)
}
