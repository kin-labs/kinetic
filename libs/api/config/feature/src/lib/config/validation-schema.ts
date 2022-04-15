import * as Joi from 'joi'

export const validationSchema = Joi.object({
  ADMIN_EMAIL: Joi.string().required().error(new Error(`ADMIN_EMAIL is required.`)),
  ADMIN_PASSWORD: Joi.string().required().error(new Error(`ADMIN_PASSWORD is required.`)),
  COOKIE_DOMAIN: Joi.string().required(),
  COOKIE_NAME: Joi.string().required().default('__session'),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  MOGAMI_AIRDROP_DEFAULT: Joi.number().default(1),
  MOGAMI_AIRDROP_MAX: Joi.number().default(50000),
  MOGAMI_AIRDROP_SECRET_KEY: Joi.string().optional(),
  MOGAMI_DOMAIN: Joi.string().default('local.mogami.io'),
  MOGAMI_MAINNET: Joi.boolean().default(false),
  MOGAMI_MINT_DECIMALS: Joi.number().required(),
  MOGAMI_MINT_PUBLIC_KEY: Joi.string().required(),
  MOGAMI_SUBSIDIZER_SECRET_KEY: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  SOLANA_RPC_ENDPOINT: Joi.string()
    .required()
    .error(
      new Error(`SOLANA_RPC_ENDPOINT is required. Provide 'mainnet-beta' | 'devnet' | 'testnet' or a Solana RPC URL`),
    ),
})
