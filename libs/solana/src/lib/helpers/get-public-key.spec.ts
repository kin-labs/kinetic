import { PublicKey } from '@solana/web3.js'
import { getPublicKey } from './get-public-key'

const DEMO_KEY = 'Don8L4DTVrUrRAcVTsFoCRqei5Mokde3CV3K9Ut4nAGZ'

describe('getPublicKey', () => {
  it('should accept a string', () => {
    const publicKey = getPublicKey(DEMO_KEY)

    expect(publicKey.toBase58()).toEqual(DEMO_KEY)
  })

  it('should accept a PublicKey', () => {
    const publicKey = getPublicKey(new PublicKey(DEMO_KEY))

    expect(publicKey.toBase58()).toEqual(DEMO_KEY)
  })
})
