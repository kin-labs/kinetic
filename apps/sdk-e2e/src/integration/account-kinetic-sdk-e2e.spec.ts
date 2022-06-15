import { KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { daveKeypair, aliceKeypair } from './fixtures'
import { AppTransactionStatus } from '@prisma/client'

describe('KineticSdk (e2e) - Account', () => {
  let sdk: KineticSdk
  const defaultMint = process.env.DEFAULT_MINT_PUBLIC_KEY

  beforeEach(async () => {
    sdk = await KineticSdk.setup({ index: 1, endpoint: 'http://localhost:3000', environment: 'devnet' })
  })

  it('should get account balance', async () => {
    const res = await sdk.getBalance({ account: aliceKeypair.publicKey })
    const balance = Number(res.balance)
    expect(isNaN(balance)).toBeFalsy()
    expect(balance).toBeGreaterThan(0)
  })

  it('should create an account', async () => {
    const owner = Keypair.random()
    const tx = await sdk.createAccount({ owner })
    expect(tx).not.toBeNull()
    expect(tx.mint).toBe(defaultMint)
    const { signature, errors } = tx
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
  })

  it('should get the account history', async () => {
    const accountHistory = await sdk.getHistory({ account: aliceKeypair.publicKey })
    expect(accountHistory.data.length).toBeGreaterThan(0)
    expect(accountHistory.data[0].account).toBe('Ebq6K7xVh6PYQ8DrTQnD9fC91uQiyBMPGSV6JCG6GPdD')
  })

  it('should get the tokenAccounts', async () => {
    const tokenAccounts = await sdk.tokenAccounts(aliceKeypair.publicKey)
    expect(tokenAccounts.data[0]).toBe('Ebq6K7xVh6PYQ8DrTQnD9fC91uQiyBMPGSV6JCG6GPdD')
  })

  it('should throw an error when publicKey does not exits or is incorrect', async () => {
    try {
      await sdk.getBalance({ account: 'xx' })
    } catch (error) {
      expect(error.response.data.statusCode).toBe(400)
      expect(error.response.data.error).toBe('BadRequestException: accountId must be a valid PublicKey')
    }
  })

  it('should throw when try to create an account that already exists', async () => {
    const res = await sdk.createAccount({ owner: daveKeypair })
    expect(res.signature).toBeNull()
    expect(res.amount).toBeNull()
    expect(res.errors.length).toBeGreaterThan(0)
    expect(res.status).toBe(AppTransactionStatus.Failed)
    expect(res.errors[0].message).toContain('Error: failed to send transaction') // TODO: Account already exists
  })
})
