export default () => ({
  environment: process.env.NODE_ENV,
  mogamiMintPublicKey: process.env.MOGAMI_MINT_PUBLIC_KEY,
  mogamiSubsidizerSecretKey: process.env.MOGAMI_SUBSIDIZER_SECRET_KEY,
  port: parseInt(process.env.PORT, 10),
  solanaRpcEndpoint: process.env.SOLANA_RPC_ENDPOINT,
})
