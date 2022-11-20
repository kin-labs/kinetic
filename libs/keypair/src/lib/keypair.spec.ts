import { Keypair } from './keypair'
import {
  TEST_MNEMONIC_12,
  TEST_MNEMONIC_12_KEYPAIR,
  TEST_MNEMONIC_12_SET,
  TEST_MNEMONIC_24,
  TEST_MNEMONIC_24_KEYPAIR,
  TEST_MNEMONIC_24_SET,
  TEST_PUBLIC_KEY,
  TEST_SECRET_BYTEARRAY,
  TEST_SECRET_KEY,
} from './keypair.fixture'

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

  it('should create and import keypair fromSecret (byte array, mnemonic, secretKey)', () => {
    const kp1 = Keypair.random()

    const fromByteArray = Keypair.fromSecret(`[${kp1.solanaSecretKey.join(',')}]`)

    expect(fromByteArray.publicKey).toEqual(kp1.publicKey)
    expect(fromByteArray.secretKey).toEqual(kp1.secretKey)
    expect(fromByteArray.mnemonic).toEqual(undefined)

    const fromMnemonic = Keypair.fromSecret(kp1.mnemonic)
    expect(fromMnemonic.publicKey).toEqual(kp1.publicKey)
    expect(fromMnemonic.secretKey).toEqual(kp1.secretKey)
    expect(fromMnemonic.mnemonic).toEqual(kp1.mnemonic)

    const fromSecretKey = Keypair.fromSecret(kp1.secretKey)
    expect(fromSecretKey.publicKey).toEqual(kp1.publicKey)
    expect(fromSecretKey.secretKey).toEqual(kp1.secretKey)
    expect(fromSecretKey.mnemonic).toEqual(undefined)
  })

  it('should create and import keypair', () => {
    const kp1 = Keypair.random()
    const kp2 = Keypair.fromSecretKey(kp1.secretKey)
    const kpSecret = Keypair.fromSecret(kp1.secretKey)

    expect(kp1.secretKey).toEqual(kp2.secretKey)
    expect(kp1.publicKey).toEqual(kp2.publicKey)
    expect(kpSecret.publicKey).toEqual(kp2.publicKey)
  })

  it('should import from a bytearray', () => {
    const kp = Keypair.fromByteArray(TEST_SECRET_BYTEARRAY)
    const kpSecret = Keypair.fromSecret(`[${TEST_SECRET_BYTEARRAY}]`)

    expect(kp.publicKey).toEqual(TEST_PUBLIC_KEY)
    expect(kpSecret.publicKey).toEqual(TEST_PUBLIC_KEY)
  })

  it('should import and existing secret', () => {
    const kp = Keypair.fromSecretKey(TEST_SECRET_KEY)
    const kpSecret = Keypair.fromSecret(TEST_SECRET_KEY)

    expect(kp.publicKey).toEqual(TEST_PUBLIC_KEY)
    expect(kpSecret.publicKey).toEqual(TEST_PUBLIC_KEY)
  })

  it('should import a mnemonic (12 chars) and get 1 keypair', () => {
    const kp = Keypair.fromMnemonic(TEST_MNEMONIC_12)
    const kpSecret = Keypair.fromSecret(TEST_MNEMONIC_12)

    expect(kp.mnemonic).toEqual(TEST_MNEMONIC_12_KEYPAIR.mnemonic)
    expect(kpSecret.mnemonic).toEqual(TEST_MNEMONIC_12_KEYPAIR.mnemonic)
    expect(kp.publicKey).toEqual(TEST_MNEMONIC_12_KEYPAIR.publicKey)
    expect(kpSecret.publicKey).toEqual(TEST_MNEMONIC_12_KEYPAIR.publicKey)
    expect(kp.secretKey).toEqual(TEST_MNEMONIC_12_KEYPAIR.secretKey)
    expect(kpSecret.secretKey).toEqual(TEST_MNEMONIC_12_KEYPAIR.secretKey)
  })

  it('should import a mnemonic (24 chars) and get 1 keypair', () => {
    const kp = Keypair.fromMnemonic(TEST_MNEMONIC_24)
    const kpSecret = Keypair.fromSecret(TEST_MNEMONIC_24)

    expect(kp.mnemonic).toEqual(TEST_MNEMONIC_24_KEYPAIR.mnemonic)
    expect(kpSecret.mnemonic).toEqual(TEST_MNEMONIC_24_KEYPAIR.mnemonic)
    expect(kp.publicKey).toEqual(TEST_MNEMONIC_24_KEYPAIR.publicKey)
    expect(kpSecret.publicKey).toEqual(TEST_MNEMONIC_24_KEYPAIR.publicKey)
    expect(kp.secretKey).toEqual(TEST_MNEMONIC_24_KEYPAIR.secretKey)
    expect(kpSecret.secretKey).toEqual(TEST_MNEMONIC_24_KEYPAIR.secretKey)
  })

  it(`should create at least one keypair, even if the 'from' and 'to' params are not properly used`, () => {
    const res = Keypair.fromMnemonicSet(TEST_MNEMONIC_12, 10, 1)
    expect(res.length).toBe(1)
  })

  it('should import multiple from a mnemonic (12 chars)', () => {
    const set = Keypair.fromMnemonicSet(TEST_MNEMONIC_12, 0, 10)
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
    const set = Keypair.fromMnemonicSet(TEST_MNEMONIC_24, 0, 10)
    const keys = set.map(({ mnemonic, secretKey, publicKey }) => ({
      mnemonic,
      secretKey,
      publicKey,
    }))

    expect(keys.map(({ mnemonic, publicKey, secretKey }) => ({ mnemonic, publicKey, secretKey }))).toEqual(
      TEST_MNEMONIC_24_SET,
    )
  })

  it('should throw an error when we put in unexpected values', () => {
    expect(() => new Keypair('123')).toThrow()
    expect(() => Keypair.fromMnemonic('')).toThrow()
    expect(() => Keypair.fromSecret('')).toThrow()
    expect(() => Keypair.fromByteArray([])).toThrow()
  })
})
