import { ClusterStatus, ClusterType, Prisma } from '@prisma/client'
import { getClusterMints } from './get-cluster-mints'

interface ProvisionedClusterOptions {
  isProduction: boolean
  solanaDevnetEnabled: boolean
  solanaDevnetRpcEndpoint: string
  solanaLocalEnabled: boolean
  solanaLocalRpcEndpoint: string
  solanaMainnetEnabled: boolean
  solanaMainnetRpcEndpoint: string
}

export type ProvisionedCluster = Prisma.ClusterCreateInput & { mints: Prisma.MintCreateInput[] }

export function getProvisionedClusters({
  solanaDevnetEnabled,
  solanaDevnetRpcEndpoint,
  solanaLocalEnabled,
  solanaLocalRpcEndpoint,
  solanaMainnetEnabled,
  solanaMainnetRpcEndpoint,
}: ProvisionedClusterOptions): ProvisionedCluster[] {
  return [
    {
      id: 'solana-local',
      name: 'Solana Local',
      endpointPrivate: solanaLocalRpcEndpoint,
      endpointPublic: solanaLocalRpcEndpoint,
      explorer: 'https://explorer.solana.com/{path}?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899',
      type: ClusterType.Custom,
      status: solanaLocalEnabled ? ClusterStatus.Active : ClusterStatus.Inactive,
      mints: getClusterMints('solana-local'),
    },
    {
      id: 'solana-devnet',
      name: 'Solana Devnet',
      endpointPrivate: solanaDevnetRpcEndpoint,
      endpointPublic: solanaDevnetRpcEndpoint,
      explorer: 'https://explorer.solana.com/{path}?cluster=devnet',
      type: ClusterType.SolanaDevnet,
      status: solanaDevnetEnabled ? ClusterStatus.Active : ClusterStatus.Inactive,
      mints: getClusterMints('solana-devnet'),
    },
    {
      id: 'solana-mainnet',
      name: 'Solana Mainnet',
      endpointPrivate: solanaMainnetRpcEndpoint,
      endpointPublic: solanaMainnetRpcEndpoint,
      explorer: 'https://explorer.solana.com/{path}',
      type: ClusterType.SolanaMainnet,
      status: solanaMainnetEnabled ? ClusterStatus.Active : ClusterStatus.Inactive,
      mints: getClusterMints('solana-mainnet'),
    },
  ]
}
