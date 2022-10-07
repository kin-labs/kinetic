import { HDKey } from 'micro-ed25519-hdkey'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import { Keypair as SolanaKeypair, PublicKey as SolanaPublicKey } from '@solana/web3.js'
import * as bs58 from 'bs58'

export { SolanaKeypair, SolanaPublicKey }

export class Keypair {
  private readonly solanaKeypair: SolanaKeypair
  mnemonic?: string
  secretKey?: string
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

  static fromMnemonicSeed(mnemonic: string): Keypair {
    const seed = bip39.mnemonicToSeedSync(mnemonic, '')

    return this.fromSeed(Buffer.from(seed).slice(0, 32))
  }

  static fromMnemonic(mnemonic: string): Keypair {
    return this.fromMnemonicSet(mnemonic)[0]
  }

  static fromMnemonicSet(mnemonic: string, from = 0, to = 10): Keypair[] {
    // Always start with zero as minimum
    from = from < 0 ? 0 : from
    // Always generate at least 1
    to = to <= from ? from + 1 : to

    const seed = bip39.mnemonicToSeedSync(mnemonic, '')
    const keys: Keypair[] = []

    for (let i = from; i < to; i++) {
      const path = `m/44'/501'/${i}'/0'`
      const kp = this.derive(Buffer.from(seed), path)
      kp.mnemonic = mnemonic
      keys.push(kp)
    }
    return keys
  }

  static derive(seed: Buffer, path: string): Keypair {
    const hd = HDKey.fromMasterSeed(seed.toString('hex'))
    return Keypair.fromSeed(Buffer.from(hd.derive(path).privateKey))
  }

  static fromSeed(seed: Buffer): Keypair {
    return this.fromSecretKey(bs58.encode(SolanaKeypair.fromSeed(seed).secretKey))
  }

  static fromSecretKey(secretKey: string): Keypair {
    return new Keypair(secretKey)
  }

  static random(): Keypair {
    const mnemonic = this.generateMnemonic()

    return this.fromMnemonic(mnemonic)
  }

  static generateMnemonic(strength: 128 | 256 = 128): string {
    return bip39.generateMnemonic(wordlist, strength)
  }
}
