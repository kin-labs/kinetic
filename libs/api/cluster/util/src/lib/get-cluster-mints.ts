import { MintType, Prisma } from '@prisma/client'
import { getProvisionedMints, ProvisionedClusterIds } from './get-provisioned-mints'

export function getClusterMints(clusterId: ProvisionedClusterIds): Prisma.MintCreateInput[] {
  // Get provisioned mints
  const provisioned = getProvisionedMints(clusterId, Object.keys(process.env))

  // Define default mints
  const clusterMints: Record<ProvisionedClusterIds, Prisma.MintCreateInput[]> = {
    'solana-devnet': [],
    'solana-local': [],
    'solana-mainnet': [],
  }

  // Add any provisioned mints to the cluster mints
  provisioned?.forEach(
    ({
      addMemo,
      airdropAmount,
      airdropMax,
      airdropSecretKey,
      decimals,
      defaultMint,
      logoUrl,
      name,
      publicKey,
      symbol,
    }) => {
      clusterMints[clusterId].push({
        addMemo,
        address: publicKey,
        airdropAmount,
        airdropMax,
        airdropSecretKey,
        cluster: { connect: { id: clusterId } },
        decimals,
        default: defaultMint,
        id: `${clusterId}-${symbol.toLowerCase()}`,
        logoUrl: logoUrl || `https://avatar.tobi.sh/${publicKey}`,
        name,
        order: clusterMints[clusterId].length + 1,
        symbol,
        type: MintType.SplToken,
      })
    },
  )

  switch (clusterId) {
    case 'solana-devnet':
      return [...clusterMints['solana-devnet']]
    case 'solana-local':
      return [...clusterMints['solana-local']]
    case 'solana-mainnet':
      return [...clusterMints['solana-mainnet']]
  }
  return []
}
