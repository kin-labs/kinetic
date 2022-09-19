import { getMintLogoUrl } from './get-mint-logo-url'

export type ProvisionedClusterIds = 'solana-devnet' | 'solana-local' | 'solana-mainnet'

interface ProvisionedMint {
  addMemo?: boolean
  airdropAmount?: number
  airdropMax?: number
  airdropSecretKey?: string
  decimals: number
  defaultMint: boolean
  logoUrl: string
  name: string
  publicKey: string
  symbol: string
}

export function getProvisionedMints(id: ProvisionedClusterIds, envVars: string[]): ProvisionedMint[] {
  // Convert solana-devnet => SOLANA_DEVNET_MINT_ to match env vars
  const prefix = `${id.toUpperCase().replace('-', '_')}_MINT_`

  // Filter env vars that start with the prefix
  const filtered = envVars.sort().filter((item) => item.startsWith(prefix))

  const symbols = filtered
    // Get the 'USD' part from `MINT_SOLANA_DEVNET_USD_xyz
    .map((item) => item.replace(prefix, '').split('_')[0])
    // Show distinct values
    .filter((v, i, a) => a.indexOf(v) === i)

  return symbols.map((symbol) => {
    const key = `${prefix}${symbol}`
    const val = process.env[key]
    if (!val) return undefined
    const [publicKey, decimals, name] = val.split(',')
    if (!publicKey || !decimals || !name) return undefined

    const airdropSecretKey = process.env[key + '_AIRDROP_SECRET_KEY']
    const airdropAmount = Number(process.env[key + '_AIRDROP_AMOUNT']) || 1000
    const airdropMax = Number(process.env[key + '_AIRDROP_MAX']) || 50000

    return {
      addMemo: symbol.trim().toUpperCase() === 'KIN',
      airdropAmount: airdropSecretKey ? airdropAmount : undefined,
      airdropMax: airdropSecretKey ? airdropMax : undefined,
      airdropSecretKey,
      decimals: Number(decimals.trim()),
      defaultMint: publicKey.trim().startsWith('*'),
      logoUrl: getMintLogoUrl(symbol),
      name: name.trim(),
      publicKey: publicKey.trim().replace('*', ''),
      symbol: symbol.trim(),
    }
  })
}
