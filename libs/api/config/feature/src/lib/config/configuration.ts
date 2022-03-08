export default () => ({
  environment: process.env.NODE_ENV,
  minimumKinVersion: process.env.MINIMUM_KIN_VERSION,
  mogamiSubsidizerSecretKey: process.env.MOGAMI_SUBSIDIZER_SECRET_KEY,
  mogamiMintPubliKey: process.env.MOGAMI_MINT_PUBLIC_KEY,
  port: parseInt(process.env.PORT, 10),
  solanaRpcEndpoint: process.env.SOLANA_RPC_ENDPOINT,
})
