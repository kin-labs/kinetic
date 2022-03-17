import { PublicKey } from '@solana/web3.js'
import { PublicKeyString } from '../interfaces'

export function getPublicKey(account: PublicKeyString): PublicKey {
  if (typeof account === 'string') {
    return new PublicKey(account)
  }
  return account
}
