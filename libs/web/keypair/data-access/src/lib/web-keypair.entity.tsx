export interface WebKeypairEntity {
  id?: number
  isDefault?: boolean
  name?: string
  publicKey: string
  secretKey?: string
  mnemonic?: string
}
