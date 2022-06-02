import { Keypair } from '@solana/web3.js'

// Get the origins from the ENV
const originsEnv: string[] = process.env.CORS_ORIGINS?.includes(',')
  ? process.env.CORS_ORIGINS?.split(',')
  : [process.env.CORS_ORIGINS]

// Allow configuring wildcard origin
const origin = originsEnv.length && originsEnv[0] === '*' ? '*' : originsEnv

export default () => ({
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  cors: { origin },
  environment: process.env.NODE_ENV,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  defaultMintDecimals: Number(process.env.DEFAULT_MINT_DECIMALS),
  defaultMintPublicKey: process.env.DEFAULT_MINT_PUBLIC_KEY,
  defaultMintAirdropAmount: process.env.DEFAULT_MINT_AIRDROP_AMOUNT,
  defaultMintAirdropMax: process.env.DEFAULT_MINT_AIRDROP_MAX,
  defaultMintAirdropKeypair: process.env.DEFAULT_MINT_AIRDROP_SECRET_KEY
    ? Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.DEFAULT_MINT_AIRDROP_SECRET_KEY)))
    : null,
  port: parseInt(process.env.PORT, 10),
  solanaRpcEndpoint: process.env.SOLANA_DEVNET_RPC_ENDPOINT,
  solanaDevnetRpcEndpoint: process.env.SOLANA_DEVNET_RPC_ENDPOINT,
  solanaMainnetRpcEndpoint: process.env.SOLANA_MAINNET_RPC_ENDPOINT,
})
