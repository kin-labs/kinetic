import { Keypair } from '@kin-kinetic/keypair'
import { KineticSdk } from '@kin-kinetic/sdk'
import { Commitment } from '@kin-kinetic/solana'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { aliceKeypair, aliceTokenAccount, daveKeypair, usdcMint } from './fixtures'
import { DEFAULT_MINT } from './helpers'

describe('KineticSdk (e2e) - Account', () => {
  let sdk: KineticSdk

  beforeEach(async () => {
    sdk = await KineticSdk.setup({ index: 1, endpoint: 'http://127.0.0.1:3000', environment: 'local' })
  })

  it('should get account balance', async () => {
    const res = await sdk.getBalance({ account: aliceKeypair.publicKey })
    const balance = Number(res.balance)
    expect(isNaN(balance)).toBeFalsy()
    expect(balance).toBeGreaterThan(0)
  })

  describe('getAccountInfo', () => {
    it('should get account info', async () => {
      const res = await sdk.getAccountInfo({ account: aliceKeypair.publicKey })

      expect(res.account).toEqual(aliceKeypair.publicKey)
      expect(res.isMint).toBeFalsy()
      expect(res.isOwner).toBeTruthy()
      expect(res.isTokenAccount).toBeFalsy()
      expect(res.tokens.length).toEqual(1)
      expect(res.tokens[0].account).toEqual(aliceTokenAccount)
      expect(res.tokens[0].mint).toEqual(DEFAULT_MINT)
      expect(res.tokens[0].decimals).toEqual(5)
      expect(res.tokens[0].owner).toEqual(aliceKeypair.publicKey)
    })

    it('should get account info of a token account', async () => {
      const res = await sdk.getAccountInfo({ account: aliceTokenAccount })

      expect(res.account).toEqual(aliceTokenAccount)
      expect(res.isMint).toBeFalsy()
      expect(res.isOwner).toBeFalsy()
      expect(res.isTokenAccount).toBeTruthy()
      expect(res.owner).toEqual(aliceKeypair.publicKey)
      expect(res.program).toEqual(TOKEN_PROGRAM_ID.toString())
      expect(res.tokens).toBeNull()
    })

    it('should get account info of a mint', async () => {
      const res = await sdk.getAccountInfo({ account: DEFAULT_MINT })

      expect(res.account).toEqual(DEFAULT_MINT)
      expect(res.isMint).toBeTruthy()
      expect(res.isOwner).toBeFalsy()
      expect(res.isTokenAccount).toBeFalsy()
      expect(res.owner).toBeNull()
      expect(res.program).toEqual(TOKEN_PROGRAM_ID.toString())
      expect(res.tokens).toBeNull()
    })

    it('should get account info of a non-existing account', async () => {
      const keypair = Keypair.random()
      const res = await sdk.getAccountInfo({ account: keypair.publicKey })

      expect(res.account).toEqual(keypair.publicKey)
      expect(res.isMint).toBeFalsy()
      expect(res.isOwner).toBeFalsy()
      expect(res.isTokenAccount).toBeFalsy()
      expect(res.tokens.length).toEqual(0)
    })
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

  it('should throw an error when publicKey does not exit or is incorrect', async () => {
    await expect(async () => await sdk.getBalance({ account: 'xx' })).rejects.toThrow(
      'accountId must be a valid PublicKey',
    )
  })

  it('should throw when try to create an account that already exists', async () => {
    await expect(async () => await sdk.createAccount({ owner: daveKeypair })).rejects.toThrow(
      `Owner ${daveKeypair.publicKey} already has an account for mint ${DEFAULT_MINT}.`,
    )
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

  describe('closeAccount', () => {
    it('should close an account', async () => {
      // Create new account
      const keypair = Keypair.random()
      const tx = await sdk.createAccount({ owner: keypair, commitment: Commitment.Finalized })
      expect(tx).not.toBeNull()
      expect(tx.mint).toEqual(DEFAULT_MINT)
      const { signature, errors } = tx
      expect(typeof signature).toBe('string')
      expect(errors).toEqual([])
      // Close account
      const closeTx = await sdk.closeAccount({ account: keypair.publicKey })
      expect(closeTx).not.toBeNull()
      const { signature: closeSignature, errors: closeErrors } = closeTx
      expect(typeof closeSignature).toBe('string')
      expect(closeErrors).toEqual([])
    }, 30000)

    it('should not close a token account', async () => {
      await expect(async () => await sdk.closeAccount({ account: aliceTokenAccount })).rejects.toThrow(
        'Cannot close a token account',
      )
    })

    it('should not close a mint', async () => {
      await expect(async () => await sdk.closeAccount({ account: DEFAULT_MINT })).rejects.toThrow('Cannot close a mint')
    })

    it('should not close a non-existing account', async () => {
      await expect(async () => await sdk.closeAccount({ account: Keypair.random().publicKey })).rejects.toThrow(
        'Account has no tokens',
      )
    })

    it('should not close a non-existing mint', async () => {
      await expect(
        async () => await sdk.closeAccount({ account: aliceKeypair.publicKey, mint: Keypair.random().publicKey }),
      ).rejects.toThrow('Mint not found')
    })

    it('should not close with non-existing tokens for a mint', async () => {
      await expect(
        async () => await sdk.closeAccount({ account: daveKeypair.publicKey, mint: usdcMint }),
      ).rejects.toThrow('Account has no tokens for the specified mint')
    })

    it('should not close when close authority is not set', async () => {
      await expect(async () => await sdk.closeAccount({ account: aliceKeypair.publicKey })).rejects.toThrow(
        'Token account has no close authority',
      )
    })

    it('should not close an account with a balance', async () => {
      // Create new account
      const keypair = Keypair.random()
      const tx = await sdk.createAccount({ owner: keypair, commitment: Commitment.Finalized })
      expect(tx).not.toBeNull()
      expect(tx.mint).toEqual(DEFAULT_MINT)
      const { signature, errors } = tx
      expect(typeof signature).toBe('string')
      expect(errors).toEqual([])

      const airdrop = await sdk.requestAirdrop({
        account: keypair.publicKey,
        amount: '1',
        commitment: Commitment.Finalized,
      })
      expect(airdrop).not.toBeNull()
      const { signature: airdropSignature } = airdrop
      expect(typeof airdropSignature).toBe('string')

      await expect(async () => await sdk.closeAccount({ account: keypair.publicKey })).rejects.toThrow(
        'Cannot close an account with a balance',
      )
    }, 45000)
  })
})
