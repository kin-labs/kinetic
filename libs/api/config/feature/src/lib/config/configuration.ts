import { Keypair } from '@solana/web3.js'

// Get the origins from the ENV
const originsEnv: string[] = process.env.CORS_ORIGINS?.includes(',')
  ? process.env.CORS_ORIGINS?.split(',')
  : [process.env.CORS_ORIGINS]

// Allow configuring wildcard origin
const origin = originsEnv.length && originsEnv[0] === '*' ? '*' : originsEnv

export default () => ({
  cors: { origin },
  environment: process.env.NODE_ENV,
  mogamiMintPublicKey: process.env.MOGAMI_MINT_PUBLIC_KEY,
  mogamiSubsidizerKeypair: Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.MOGAMI_SUBSIDIZER_SECRET_KEY))),
  port: parseInt(process.env.PORT, 10),
  solanaRpcEndpoint: process.env.SOLANA_RPC_ENDPOINT,
})
