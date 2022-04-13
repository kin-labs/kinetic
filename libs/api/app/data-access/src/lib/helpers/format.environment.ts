import { App, AppEnv } from '@prisma/client'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AppConfig } from '../entity/app-config.entity'

export function formatEnvironment(
  hostname,
  env: AppEnv & {
    app: App
  },
  feePayer,
  publicKey,
): AppConfig {
  return {
    hostname,
    env: env?.name,
    app: {
      index: env?.app?.index,
      name: env?.app?.name,
    },
    mint: {
      feePayer,
      publicKey,
      programId: TOKEN_PROGRAM_ID?.toBase58(),
    },
  }
}
