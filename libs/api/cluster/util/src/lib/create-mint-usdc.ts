import { createMint } from './create-mint'

export function createMintUsdc(clusterId: string, order: number, address: string, decimals: number) {
  let airdropAmount, airdropMax, airdropSecretKey
  if (clusterId === 'solana-devnet' || clusterId === 'local') {
    airdropAmount = parseInt(process.env['DEFAULT_MINT_AIRDROP_AMOUNT'])
    airdropMax = parseInt(process.env['DEFAULT_MINT_AIRDROP_MAX'])
    airdropSecretKey = process.env['DEFAULT_MINT_AIRDROP_SECRET_KEY']
  }
  const coingeckoId = 'usdc'
  const defaultMint = false
  const logoUrl =
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU/logo.png'
  const name = 'USDC'
  const symbol = 'USDC'

  return createMint(
    clusterId,
    order,
    address,
    decimals,
    name,
    symbol,
    defaultMint,
    logoUrl,
    coingeckoId,
    airdropAmount,
    airdropMax,
    airdropSecretKey,
  )
}
