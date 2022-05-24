import { MogamiSdk } from '@mogami/sdk'
import { Keypair } from '@mogami/keypair'
import * as keys from './fixtures'
import { Payment } from '@mogami/solana'

describe('MogamiSdk (e2e)', () => {
  let sdk: MogamiSdk
  const mogamiMint = process.env.MOGAMI_MINT_PUBLIC_KEY

  beforeEach(async () => {
    sdk = await MogamiSdk.setup({ index: 1, endpoint: 'http://localhost:3000' })
  })

  it('should get App Config', () => {
    const res = sdk.config()

    expect(res.app.index).toEqual(1)
  })

  it('should get account balance', async () => {
    const aliceKey = Keypair.fromByteArray(keys.ALICE_KEY)
    const tx = await sdk.balance(aliceKey.publicKey)
    const balance = Number(tx.data.value)
    expect(isNaN(balance)).toBeFalsy()
    expect(balance).toBeGreaterThan(0)
  })

  it('should make a transfer', async () => {
    const aliceKey = Keypair.fromByteArray(keys.ALICE_KEY)
    const bobKey = Keypair.fromByteArray(keys.BOB_KEY)
    const tx = await sdk.makeTransfer({ amount: '43', destination: bobKey.publicKey, owner: aliceKey })
    expect(tx).not.toBeNull()
    expect(tx.mint).toBe(mogamiMint)
    const { signature, errors, amount, source } = tx.res.data
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
    expect(Number(amount)).toBe(4300000)
    expect(source).toBe(aliceKey.publicKey)
  })

  it('should make a banch in batch', async () => {
    const { ALICE_KEY, BOB_KEY, CHARLIE_KEY, DAVE_KEY } = keys
    const aliceKey = Keypair.fromByteArray(ALICE_KEY)
    const bobKey = Keypair.fromByteArray(BOB_KEY)
    const charlieKey = Keypair.fromByteArray(CHARLIE_KEY)
    const daveKey = Keypair.fromByteArray(DAVE_KEY)

    const payments: Payment[] = [
      { destination: bobKey.publicKey, amount: '51' },
      { destination: charlieKey.publicKey, amount: '72' },
      { destination: daveKey.publicKey, amount: '87' },
    ]

    const tx = await sdk.makeTransferBatch({ payments, owner: aliceKey })
    expect(tx).not.toBeNull()
    expect(tx.mint).toBe(mogamiMint)
    const { signature, errors, amount, source } = tx.res.data
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
    expect(Number(amount)).toBe(5100000)
    expect(source).toBe(aliceKey.publicKey)
  })

  it('should create an account', async () => {
    const tx = await sdk.createAccount(Keypair.generate())
    expect(tx).not.toBeNull()
    expect(tx.mint).toBe(mogamiMint)
    const { signature, errors } = tx.res.data
    console.log(signature)
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
  })

  it('should get the account history', async () => {
    const aliceKey = Keypair.fromByteArray(keys.ALICE_KEY)
    const accountHistory = await sdk.getHistory(aliceKey.publicKey)
    expect(accountHistory.data.length).toBeGreaterThan(0)
    expect(accountHistory.data[0].account).toBe('Ebq6K7xVh6PYQ8DrTQnD9fC91uQiyBMPGSV6JCG6GPdD')
  })

  it('should get the tokenAccounts', async () => {
    const aliceKey = Keypair.fromByteArray(keys.ALICE_KEY)
    const tokenAccounts = await sdk.tokenAccounts(aliceKey.publicKey)
    expect(tokenAccounts.data[0]).toBe('Ebq6K7xVh6PYQ8DrTQnD9fC91uQiyBMPGSV6JCG6GPdD')
  })

  it('should throw an error when publicKey does not exits or is incorrect', async () => {
    try {
      await sdk.balance('xx')
    } catch (error) {
      expect(error.response.data.statusCode).toBe(400)
      expect(error.response.data.error).toBe('BadRequestException: accountId must be a valid PublicKey')
    }
  })

  it('should throw an error when there are more than 15 transactions in a batch', async () => {
    try {
      const aliceKey = Keypair.fromByteArray(keys.ALICE_KEY)
      const payments: Payment[] = []
      const payment = { destination: Keypair.fromByteArray(keys.BOB_KEY).publicKey, amount: '15' }
      for (let i = 0; i <= 15; i++) {
        payments.push(payment)
      }
      await sdk.makeTransferBatch({ payments, owner: aliceKey })
    } catch (error) {
      expect(error.toString()).toContain('Error: Maximum number of payments exceeded')
    }
  })

  it('empty', () => {
    expect(true).toBeTruthy()
  })
})
