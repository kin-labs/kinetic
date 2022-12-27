import { AppConfig, AppConfigMint } from '../../generated'

export function getAppMint(appConfig: AppConfig, mint?: string): AppConfigMint {
  mint = mint || appConfig.mint.publicKey
  const found = appConfig.mints.find((item) => item.publicKey === mint)
  if (!found) {
    throw new Error(`Mint not found`)
  }
  return found
}
