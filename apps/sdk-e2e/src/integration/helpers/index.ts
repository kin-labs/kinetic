export const [DEFAULT_MINT] = process.env.SOLANA_LOCAL_MINT_KIN
  // Remove the asterisk from the start of the mint it is present
  .replace('*', '')
  .split(',')
