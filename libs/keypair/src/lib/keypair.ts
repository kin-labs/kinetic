import { Keypair as SolanaKeypair, PublicKey as SolanaPublicKey } from '@solana/web3.js'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import * as bs58 from 'bs58'
import { derivePath } from 'ed25519-hd-key'

export { SolanaKeypair, SolanaPublicKey }

export class Keypair {
  private readonly solanaKeypair: SolanaKeypair
  secretKey: string
  publicKey: string

  constructor(secretKey: string) {
    this.solanaKeypair = SolanaKeypair.fromSecretKey(bs58.decode(secretKey))
    this.publicKey = this.solanaKeypair.publicKey.toBase58()
    this.secretKey = bs58.encode(this.solanaKeypair.secretKey)
  }

  get solana(): SolanaKeypair {
    return this.solanaKeypair
  }

  get solanaPublicKey(): SolanaPublicKey {
    return this.solanaKeypair.publicKey
  }

  get solanaSecretKey(): Uint8Array {
    return this.solanaKeypair.secretKey
  }

  static fromByteArray(byteArray: number[]): Keypair {
    return this.fromSecretKey(bs58.encode(Uint8Array.from(byteArray)))
  }

  static fromMnemonic(mnemonic: string): Keypair {
    const seed = bip39.mnemonicToSeedSync(mnemonic, '')

    return this.fromSeed(Buffer.from(seed).slice(0, 32))
  }

  static fromMnemonicSet(mnemonic: string, from = 0, to = 10): Keypair[] {
    // Always start with zero as minimum
    from = from < 0 ? 0 : from
    // Always generate at least 1
    to = to <= from ? 1 : to

    const seed = bip39.mnemonicToSeedSync(mnemonic, '')
    const keys: Keypair[] = []

    for (let i = from; i < to; i++) {
      const path = `m/44'/501'/${i}'/0'`
      keys.push(this.derive(Buffer.from(seed), path))
    }
    return keys
  }

  static derive(seed: Buffer, path: string) {
    return Keypair.fromSeed(derivePath(path, seed.toString('hex')).key)
  }

  static fromSeed(seed: Buffer): Keypair {
    return this.fromSecretKey(bs58.encode(SolanaKeypair.fromSeed(seed).secretKey))
  }

  static fromSecretKey(secretKey: string): Keypair {
    return new Keypair(secretKey)
  }

  static generate(): Keypair {
    return this.fromSecretKey(bs58.encode(SolanaKeypair.generate().secretKey))
  }

  static generateMnemonic(strength: 128 | 256 = 128): string {
    return bip39.generateMnemonic(wordlist, strength)
  }
}
