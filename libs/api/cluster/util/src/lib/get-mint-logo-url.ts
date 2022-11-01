export function getMintLogoUrl(mint: string) {
  switch (mint.trim().toUpperCase()) {
    case 'KIN':
      return 'https://assets.coingecko.com/coins/images/959/large/kin-logo-social.png'
    case 'SOL':
      return 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
    case 'USDC':
      return 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png'
    default:
      return ''
  }
}
