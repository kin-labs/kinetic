export interface AppConfig {
  hostname: string
  env: string
  app: {
    index: number
    name: string
  }
  mint: {
    feePayer: string
    programId: string
    publicKey: string
  }
}
