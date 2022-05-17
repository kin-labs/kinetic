import { MintType, Prisma } from '@prisma/client'

export function createMintKin(clusterId: string, address: string): Prisma.MintCreateInput {
  return {
    id: `${clusterId}-kin`,
    cluster: { connect: { id: clusterId } },
    address,
    coingeckoId: 'kin',
    decimals: 5,
    logoUrl:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6/logo.png',
    name: 'Kin',
    symbol: 'KIN',
    type: MintType.SplToken,
  }
}
