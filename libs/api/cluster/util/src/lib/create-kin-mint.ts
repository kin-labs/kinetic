import { createMint } from './create-mint'

export function createMintKin(clusterId: string, order: number, address: string, decimals: number) {
  let airdropAmount, airdropMax, airdropSecretKey
  if (clusterId === 'solana-devnet' || clusterId === 'local') {
    airdropAmount = parseInt(process.env['DEFAULT_MINT_AIRDROP_AMOUNT'])
    airdropMax = parseInt(process.env['DEFAULT_MINT_AIRDROP_MAX'])
    airdropSecretKey = process.env['DEFAULT_MINT_AIRDROP_SECRET_KEY']
  }
  const addMemo = true
  const coinGeckoId = 'kin'
  const defaultMint = true
  const logoUrl =
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6/logo.png'
  const name = 'Kin'
  const symbol = 'KIN'

  return createMint(
    clusterId,
    order,
    addMemo,
    address,
    decimals,
    name,
    symbol,
    defaultMint,
    logoUrl,
    coinGeckoId,
    airdropAmount,
    airdropMax,
    airdropSecretKey,
  )
}
