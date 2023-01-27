import { NAME, VERSION } from '@kin-kinetic/api/core/data-access'

// Remove trailing slashes from the URLs to avoid double slashes
const API_URL = getUrl('API_URL')
// Infer the WEB URL from the API_URL if it's not set
const WEB_URL = getUrl('WEB_URL') ?? API_URL?.replace('/api', '')

const domains: string[] = getCookieDomains()

// Infer the cookie domain from the API_URL if it's not set
if (!domains.length) {
  const { hostname } = new URL(API_URL)
  domains.push(hostname)
}

const origins: string[] = getCorsOrigins()

export default () => ({
  api: {
    log: {
      color: process.env.LOG_COLOR?.toLowerCase() !== 'false',
      json: process.env.LOG_JSON?.toLowerCase() !== 'false',
      level: process.env.LOG_LEVEL,
    },
    name: NAME,
    url: API_URL,
    version: VERSION,
  },
  auth: {
    passwordEnabled: process.env.AUTH_PASSWORD_ENABLED?.toLowerCase() !== 'false',
    users: process.env.AUTH_USERS || '',
  },
  cache: {
    solana: {
      getLatestBlockhash: {
        ttl: process.env.CACHE_SOLANA_GET_LATEST_BLOCKHASH_TTL,
      },
      getTokenAccounts: {
        ttl: process.env.CACHE_SOLANA_GET_TOKEN_ACCOUNTS_TTL,
      },
    },
  },
  cors: {
    bypass: !origins.length,
    origins,
  },
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
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    enabled: process.env.GOOGLE_ENABLED?.toLowerCase() !== 'false',
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
  queue: {
    closeAccount: {
      concurrency: Number(process.env.QUEUE_CLOSE_ACCOUNT_CONCURRENCY ?? '1'),
      start: process.env.QUEUE_CLOSE_ACCOUNT_START?.toLowerCase() !== 'false',
    },
  },
  redis: {
    url: process.env.REDIS_URL,
  },
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
  web: {
    url: WEB_URL,
  },
})

// Get the cookie domains from the ENV
function getCookieDomains() {
  return getFromEnvironment('COOKIE_DOMAINS').filter(Boolean)
}

// Get the origins from the ENV
function getCorsOrigins() {
  return getFromEnvironment('CORS_ORIGINS').filter(Boolean)
}

// Get the values from the ENV
function getFromEnvironment(key: string) {
  return process.env[key]?.includes(',') ? process.env[key]?.split(',') : [process.env[key]]
}

function getUrl(key: string) {
  return process.env[key]?.replace(/\/$/, '')
}
