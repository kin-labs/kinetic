import { NAME, VERSION } from '@kin-kinetic/api/core/data-access'

// Get the origins from the ENV
const origins: string[] = process.env.CORS_ORIGINS?.includes(',')
  ? process.env.CORS_ORIGINS?.split(',')
  : [process.env.CORS_ORIGINS]

// Get the cookie domains from the ENV
const domains: string[] = process.env.COOKIE_DOMAINS?.includes(',')
  ? process.env.COOKIE_DOMAINS?.split(',')
  : [process.env.COOKIE_DOMAINS]

export default () => ({
  admin: {
    url: process.env.ADMIN_URL,
  },
  api: {
    log: {
      color: process.env.LOG_COLOR?.toLowerCase() !== 'false',
      json: process.env.LOG_JSON?.toLowerCase() !== 'false',
      level: process.env.LOG_LEVEL,
    },
    name: NAME,
    url: process.env.API_URL,
    version: VERSION,
  },
  auth: {
    passwordEnabled: process.env.AUTH_PASSWORD_ENABLED?.toLowerCase() !== 'false',
    users: process.env.AUTH_USERS || '',
  },
  cors: { origins },
  cookie: {
    domains,
    name: process.env.COOKIE_NAME,
  },
  discord: {
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    enabled: process.env.DISCORD_ENABLED?.toLowerCase() !== 'false',
  },
  environment: process.env.NODE_ENV,
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    enabled: process.env.GITHUB_ENABLED?.toLowerCase() !== 'false',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  host: process.env.HOST,
  metrics: {
    enabled: process.env.METRICS_ENABLED?.toLowerCase() !== 'false',
    endpointEnabled: process.env.METRICS_ENDPOINT_ENABLED?.toLowerCase() !== 'false',
    port: parseInt(process.env.METRICS_PORT, 10),
  },
  port: parseInt(process.env.PORT, 10),
  solana: {
    devnet: {
      enabled: process.env.SOLANA_DEVNET_ENABLED?.toLowerCase() !== 'false',
      rpcEndpoint: process.env.SOLANA_DEVNET_RPC_ENDPOINT,
    },
    local: {
      enabled: process.env.SOLANA_LOCAL_ENABLED?.toLowerCase() !== 'false',
      rpcEndpoint: process.env.SOLANA_LOCAL_RPC_ENDPOINT,
    },
    mainnet: {
      enabled: process.env.SOLANA_MAINNET_ENABLED?.toLowerCase() !== 'false',
      rpcEndpoint: process.env.SOLANA_MAINNET_RPC_ENDPOINT,
    },
  },
})
