import { MintType, Prisma } from '@prisma/client'

export function createMint(
  clusterId: string,
  order: number,
  address: string,
  decimals: number,
  name: string,
  symbol: string,
  defaultMint?: boolean,
  logoUrl?: string,
  coinGeckoId?: string,
  airdropAmount?: number,
  airdropMax?: number,
  airdropSecretKey?: string,
): Prisma.MintCreateInput {
  return {
    id: `${clusterId}-${symbol.toLowerCase()}`,
    cluster: { connect: { id: clusterId } },
    address,
    coinGeckoId,
    decimals,
    default: defaultMint,
    logoUrl: logoUrl || `https://avatar.tobi.sh/${address}`,
    name,
    order,
    symbol,
    type: MintType.SplToken,
    airdropAmount,
    airdropMax,
    airdropSecretKey,
  }
}
