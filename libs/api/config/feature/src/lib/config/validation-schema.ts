import * as Joi from 'joi'

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  MINIMUM_KIN_VERSION: Joi.number().default(5),
  MOGAMI_SUBSIDIZER_SECRET_KEY: Joi.string(),
  MOGAMI_MINT_PUBLIC_KEY: Joi.string(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  SOLANA_RPC_ENDPOINT: Joi.string()
    .required()
    .error(
      new Error(`SOLANA_RPC_ENDPOINT is required. Provide 'mainnet-beta' | 'devnet' | 'testnet' or a Solana RPC URL`),
    ),
})
