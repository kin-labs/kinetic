import * as Joi from 'joi'

export const validationSchema = Joi.object({
  ADMIN_PASSWORD: Joi.string().required().error(new Error(`ADMIN_PASSWORD is required.`)),
  ADMIN_USERNAME: Joi.string().required().error(new Error(`ADMIN_USERNAME is required.`)),
  COOKIE_DOMAIN: Joi.string().required(),
  COOKIE_NAME: Joi.string().default('__session'),
  DATABASE_URL: Joi.string().required(),
  DEFAULT_MINT_AIRDROP_AMOUNT: Joi.number().default(1000),
  DEFAULT_MINT_AIRDROP_MAX: Joi.number().default(50000),
  DEFAULT_MINT_AIRDROP_SECRET_KEY: Joi.string().optional(),
  DEFAULT_MINT_DECIMALS: Joi.number().required(),
  DEFAULT_MINT_PUBLIC_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  METRICS_ENABLED: Joi.boolean().default(false),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  SOLANA_DEVNET_RPC_ENDPOINT: Joi.string().default('devnet'),
  SOLANA_MAINNET_RPC_ENDPOINT: Joi.string().default('mainnet-beta'),
})
