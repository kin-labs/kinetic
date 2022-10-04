import { Keypair } from '@kin-kinetic/keypair'
import { KineticSdk } from '@kin-kinetic/sdk'
import { aliceKeypair, daveKeypair, usdcMint } from './fixtures'
import { DEFAULT_MINT } from './helpers'

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
    expect(tx.mint).toEqual(DEFAULT_MINT)
    const { signature, errors } = tx
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
  })

  it('should create an account using a mint', async () => {
    const account = Keypair.random()
    const tx = await sdk.createAccount({ owner: account, mint: usdcMint })
    expect(tx).not.toBeNull()
    expect(tx.mint).toBe(usdcMint)
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
    try {
      await sdk.createAccount({ owner: daveKeypair })
    } catch (e) {
      expect(e.message).toEqual(`Owner ${daveKeypair.publicKey} already has an account for mint ${DEFAULT_MINT}.`)
    }
  })

  it('should get the account history with a provided mint', async () => {
    const accountHistory = await sdk.getHistory({ account: aliceKeypair.publicKey, mint: usdcMint })
    expect(accountHistory.length).toBeGreaterThan(0)
    expect(accountHistory[0].account).toBe('JBdTmhBdwP5Hs4cYg123mn849FmVEHb1u1KGx998hMN7')
  })

  it('should get the token account with a provided mint', async () => {
    const tokenAccounts = await sdk.getTokenAccounts({ account: aliceKeypair.publicKey, mint: usdcMint })
    expect(tokenAccounts[0]).toBe('JBdTmhBdwP5Hs4cYg123mn849FmVEHb1u1KGx998hMN7')
  })
})
