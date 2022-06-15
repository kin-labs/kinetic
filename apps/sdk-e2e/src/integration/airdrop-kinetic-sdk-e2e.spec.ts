import { KineticSdk } from '@kin-kinetic/sdk'
import { daveKeypair } from './fixtures'

describe('KineticSdk (e2e) - Airdrop', () => {
  let sdk: KineticSdk

  beforeEach(async () => {
    sdk = await KineticSdk.setup({ index: 1, endpoint: 'http://localhost:3000', environment: 'devnet' })
  })

  it('should request for an airdrop', async () => {
    const airdrop = await sdk.requestAirdrop({ account: daveKeypair.publicKey, amount: '1000' })
    expect(airdrop.data.signature).not.toBeNull()
    expect(typeof airdrop.data.signature).toBe('string')
    const { account, amount } = JSON.parse(airdrop.config.data)
    expect(account).toBe(daveKeypair.publicKey)
    expect(amount).toBe('1000')
  }, 30000)

  it('should fail when airdrop request exceeds maximum allowed', async () => {
    try {
      await sdk.requestAirdrop({ account: daveKeypair.publicKey, amount: '50001' })
    } catch (error) {
      expect(error.response.data.message).toBe('Error: Try requesting 50000 or less.')
    }
  })
})
