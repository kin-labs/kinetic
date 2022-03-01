import * as Joi from 'joi'

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().default(3000),
  SOLANA_RPC_ENDPOINT: Joi.string()
    .required()
    .error(
      new Error(`SOLANA_RPC_ENDPOINT is required. Provide 'mainnet-beta' | 'devnet' | 'testnet' or a Solana RPC URL`),
    ),
})
