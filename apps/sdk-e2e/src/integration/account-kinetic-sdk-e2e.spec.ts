import { Keypair } from '@kin-kinetic/keypair'
import { KineticSdk } from '@kin-kinetic/sdk'
import { TransactionStatus } from '@prisma/client'
import { DEFAULT_MINT } from './helpers'
import { daveKeypair, aliceKeypair, usdMint } from './fixtures'

describe('KineticSdk (e2e) - Account', () => {
  let sdk: KineticSdk

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
    expect(DEFAULT_MINT).toContain(tx.mint)
    const { signature, errors } = tx
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
  })

  it('should create an account using a mint', async () => {
    const account = Keypair.random()
    const tx = await sdk.createAccount({ owner: account, mint: usdMint })
    expect(tx).not.toBeNull()
    expect(tx.mint).toBe(usdMint)
    const { signature, errors } = tx
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
  })

  it('should get the account history', async () => {
    const accountHistory = await sdk.getHistory({ account: aliceKeypair.publicKey })
    expect(accountHistory.length).toBeGreaterThan(0)
    expect(accountHistory[0].account).toBe('Ebq6K7xVh6PYQ8DrTQnD9fC91uQiyBMPGSV6JCG6GPdD')
  })

  it('should get the tokenAccounts', async () => {
    const tokenAccounts = await sdk.getTokenAccounts({ account: aliceKeypair.publicKey })
    expect(tokenAccounts[0]).toBe('Ebq6K7xVh6PYQ8DrTQnD9fC91uQiyBMPGSV6JCG6GPdD')
  })

  it('should throw an error when publicKey does not exits or is incorrect', async () => {
    try {
      await sdk.getBalance({ account: 'xx' })
    } catch (error) {
      expect(error.response.data.statusCode).toBe(400)
      expect(error.response.data.message).toBe('Error: accountId must be a valid PublicKey')
    }
  })

  it('should throw when try to create an account that already exists', async () => {
    const res = await sdk.createAccount({ owner: daveKeypair })
    expect(res.signature).toBeNull()
    expect(res.amount).toBeNull()
    expect(res.errors.length).toBeGreaterThan(0)
    expect(res.status).toBe(TransactionStatus.Failed)
    expect(res.errors[0].message).toContain('Error: Account already exists.')
  })
})
