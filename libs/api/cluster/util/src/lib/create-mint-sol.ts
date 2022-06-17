import { Prisma } from '@prisma/client'
import { createMint } from './create-mint'

export function createMintSol(clusterId: string, order: number): Prisma.MintCreateInput {
  const address = 'So11111111111111111111111111111111111111112'
  const coingeckoId = 'solana'
  const decimals = 9
  const defaultMint = false
  const logoUrl =
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  const name = 'Wrapped SOL'
  const symbol = 'SOL'

  return createMint(clusterId, order, address, decimals, name, symbol, defaultMint, logoUrl, coingeckoId)
}
