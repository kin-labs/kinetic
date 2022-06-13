import {
  TEST_MNEMONIC_12,
  TEST_MNEMONIC_12_SET,
  TEST_MNEMONIC_24,
  TEST_MNEMONIC_24_PUBLIC_KEY,
  TEST_MNEMONIC_24_SECRET_KEY,
  TEST_MNEMONIC_24_SET,
  TEST_MNEMONIC_24_SECRET_BYTEARRAY,
  TEST_PUBLIC_KEY,
  TEST_SECRET_BYTEARRAY,
  TEST_SECRET_KEY,
} from './keypair.fixture'
import { Keypair } from './keypair'

describe('Keypair', () => {
  it('should generate a KeyPair', () => {
    const kp = Keypair.random()

    expect(kp.mnemonic).toBeDefined()
    expect(kp.secretKey).toBeDefined()
    expect(kp.publicKey).toBeDefined()
  })

  it('should return generate a KeyPair from mnemonic', () => {
    const kp = Keypair.random()
    const restored = Keypair.fromMnemonic(kp.mnemonic)

    expect(restored.mnemonic).toEqual(kp.mnemonic)
    expect(restored.secretKey).toEqual(kp.secretKey)
    expect(restored.publicKey).toEqual(kp.publicKey)
  })

  it('should generate a Mnemonic phrase (12 chars)', () => {
    const mnemonic = Keypair.generateMnemonic(128)

    expect(mnemonic.split(' ').length).toEqual(12)
  })

  it('should generate a Mnemonic phrase (24 chars)', () => {
    const mnemonic = Keypair.generateMnemonic(256)

    expect(mnemonic.split(' ').length).toEqual(24)
  })

  it('should create and import keypair', () => {
    const kp1 = Keypair.random()
    const kp2 = Keypair.fromSecretKey(kp1.secretKey)
    expect(kp1.secretKey).toEqual(kp2.secretKey)
    expect(kp1.publicKey).toEqual(kp2.publicKey)
  })

  it('should import from a bytearray', () => {
    const kp = Keypair.fromByteArray(TEST_SECRET_BYTEARRAY)

    expect(kp.publicKey).toEqual(TEST_PUBLIC_KEY)
  })

  it('should import and existing secret', () => {
    const kp = Keypair.fromSecretKey(TEST_SECRET_KEY)
    expect(kp.publicKey).toEqual(TEST_PUBLIC_KEY)
  })

  it('should import from a mnemonic (12)', () => {
    const keypair = Keypair.fromMnemonicSeed(TEST_MNEMONIC_12)
    expect(keypair.secretKey).toEqual(TEST_SECRET_KEY)
    expect(keypair.solanaSecretKey.toString()).toEqual(TEST_SECRET_BYTEARRAY.toString())
    expect(keypair.solanaPublicKey.toBase58()).toEqual(TEST_PUBLIC_KEY)
    expect(keypair.publicKey).toEqual(TEST_PUBLIC_KEY)
  })

  it('should import from a mnemonic (24)', () => {
    const keypair = Keypair.fromMnemonicSeed(TEST_MNEMONIC_24)
    expect(keypair.secretKey).toEqual(TEST_MNEMONIC_24_SECRET_KEY)
    expect(keypair.solanaSecretKey.toString()).toEqual(TEST_MNEMONIC_24_SECRET_BYTEARRAY.toString())
    expect(keypair.solanaPublicKey.toBase58()).toEqual(TEST_MNEMONIC_24_PUBLIC_KEY)
    expect(keypair.publicKey).toEqual(TEST_MNEMONIC_24_PUBLIC_KEY)
  })

  it('should import multiple from a mnemonic (12 chars)', () => {
    const set = Keypair.fromMnemonicSet(TEST_MNEMONIC_12)
    const keys = set.map(({ mnemonic, secretKey, publicKey }) => ({
      mnemonic,
      secretKey,
      publicKey,
    }))

    expect(keys.map(({ mnemonic, publicKey, secretKey }) => ({ mnemonic, publicKey, secretKey }))).toEqual(
      TEST_MNEMONIC_12_SET,
    )
  })

  it('should import multiple from a mnemonic (24 chars)', () => {
    const set = Keypair.fromMnemonicSet(TEST_MNEMONIC_24)
    const keys = set.map(({ mnemonic, secretKey, publicKey }) => ({
      mnemonic,
      secretKey,
      publicKey,
    }))

    expect(keys.map(({ mnemonic, publicKey, secretKey }) => ({ mnemonic, publicKey, secretKey }))).toEqual(
      TEST_MNEMONIC_24_SET,
    )
  })
})
