import { MintType, Prisma } from '@prisma/client'

export function createMintSol(clusterId: string, order: number): Prisma.MintCreateInput {
  const address = 'So11111111111111111111111111111111111111112'
  const decimals = 9
  return {
    id: `${clusterId}-sol`,
    cluster: { connect: { id: clusterId } },
    address,
    coingeckoId: 'solana',
    decimals,
    default: false,
    logoUrl:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    name: 'Wrapped SOL',
    order,
    symbol: 'SOL',
    type: MintType.SplToken,
  }
}
