// Get the origins from the ENV
const originsEnv: string[] = process.env.CORS_ORIGINS?.includes(',')
  ? process.env.CORS_ORIGINS?.split(',')
  : [process.env.CORS_ORIGINS]

// Get the cookie domains from the ENV
const domains: string[] = process.env.COOKIE_DOMAINS?.includes(',')
  ? process.env.COOKIE_DOMAINS?.split(',')
  : [process.env.COOKIE_DOMAINS]

// Allow configuring wildcard origin
const origin = originsEnv.length && originsEnv[0] === '*' ? '*' : originsEnv

export default () => ({
  admin: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  },
  api: {
    url: process.env.API_URL,
  },
  cors: { origin },
  cookie: {
    domains,
    name: process.env.COOKIE_NAME,
  },
  environment: process.env.NODE_ENV,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  defaultMintDecimals: Number(process.env.DEFAULT_MINT_DECIMALS),
  defaultMintPublicKey: process.env.DEFAULT_MINT_PUBLIC_KEY,
  defaultMintAirdropAmount: process.env.DEFAULT_MINT_AIRDROP_AMOUNT,
  defaultMintAirdropMax: process.env.DEFAULT_MINT_AIRDROP_MAX,
  host: process.env.HOST,
  metricsEnabled: process.env.METRICS_ENABLED?.toLowerCase() !== 'false',
  port: parseInt(process.env.PORT, 10),
  solanaDevnetRpcEndpoint: process.env.SOLANA_DEVNET_RPC_ENDPOINT,
  solanaMainnetRpcEndpoint: process.env.SOLANA_MAINNET_RPC_ENDPOINT,
})
