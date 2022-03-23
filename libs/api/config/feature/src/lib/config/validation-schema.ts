import * as Joi from 'joi'

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  MOGAMI_AIRDROP_DEFAULT: Joi.number().default(1),
  MOGAMI_AIRDROP_MAX: Joi.number().default(50000),
  MOGAMI_AIRDROP_SECRET_KEY: Joi.string().optional(),
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
