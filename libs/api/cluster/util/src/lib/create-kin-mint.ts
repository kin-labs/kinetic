import { MintType, Prisma } from '@prisma/client'

export function createMintKin(
  clusterId: string,
  order: number,
  address: string,
  decimals: number,
): Prisma.MintCreateInput {
  let airdropAmount, airdropMax, airdropSecretKey
  if (clusterId === 'solana-devnet') {
    airdropAmount = parseInt(process.env['DEFAULT_MINT_AIRDROP_AMOUNT'])
    airdropMax = parseInt(process.env['DEFAULT_MINT_AIRDROP_MAX'])
    airdropSecretKey = process.env['DEFAULT_MINT_AIRDROP_SECRET_KEY']
  }
  return {
    id: `${clusterId}-kin`,
    cluster: { connect: { id: clusterId } },
    address,
    coingeckoId: 'kin',
    decimals,
    default: true,
    logoUrl:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6/logo.png',
    name: 'Kin',
    order,
    symbol: 'KIN',
    type: MintType.SplToken,
    airdropAmount,
    airdropMax,
    airdropSecretKey,
  }
}
