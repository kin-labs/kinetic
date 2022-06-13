import { MogamiSdk } from '@mogami/sdk'
import { Keypair } from '@mogami/keypair'
import * as keys from './fixtures'
import { Destination } from '@mogami/solana'

describe('MogamiSdk (e2e)', () => {
  let sdk: MogamiSdk
  const defaultMint = process.env.DEFAULT_MINT_PUBLIC_KEY

  beforeEach(async () => {
    sdk = await MogamiSdk.setup({ index: 1, endpoint: 'http://localhost:3000', environment: 'devnet' })
  })

  it('should get App Config', () => {
    const res = sdk.config()

    expect(res.app.index).toEqual(1)
    expect(res.app.name).toEqual('App 1')
    expect(res.environment.name).toEqual('devnet')
    expect(res.environment.cluster.id).toEqual('solana-devnet')
    expect(res.environment.cluster.name).toEqual('Solana Devnet')
    expect(res.environment.cluster.type).toEqual('SolanaDevnet')
    expect(res.mint.symbol).toEqual('KIN')
    expect(res.mint.publicKey).toEqual(defaultMint)
    expect(res.mints.length).toEqual(1)
    expect(res.mints[0].symbol).toEqual('KIN')
    expect(res.mints[0].publicKey).toEqual(defaultMint)
  })

  it('should get account balance', async () => {
    const aliceKey = Keypair.fromByteArray(keys.ALICE_KEY)
    const res = await sdk.getBalance({ account: aliceKey.publicKey })
    const balance = Number(res.value)
    expect(isNaN(balance)).toBeFalsy()
    expect(balance).toBeGreaterThan(0)
  })

  it('should make a transfer', async () => {
    const aliceKey = Keypair.fromByteArray(keys.ALICE_KEY)
    const bobKey = Keypair.fromByteArray(keys.BOB_KEY)
    const tx = await sdk.makeTransfer({ amount: '43', destination: bobKey.publicKey, owner: aliceKey })
    expect(tx).not.toBeNull()
    expect(tx.mint).toBe(defaultMint)
    const { signature, errors, amount, source } = tx
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
    expect(Number(amount)).toBe(4300000)
    expect(source).toBe(aliceKey.publicKey)
  })

  it('should make a transfer in batch', async () => {
    const { ALICE_KEY, BOB_KEY, CHARLIE_KEY, DAVE_KEY } = keys
    const aliceKey = Keypair.fromByteArray(ALICE_KEY)
    const bobKey = Keypair.fromByteArray(BOB_KEY)
    const charlieKey = Keypair.fromByteArray(CHARLIE_KEY)
    const daveKey = Keypair.fromByteArray(DAVE_KEY)

    const destinations: Destination[] = [
      { destination: bobKey.publicKey, amount: '51' },
      { destination: charlieKey.publicKey, amount: '72' },
      { destination: daveKey.publicKey, amount: '87' },
    ]

    const tx = await sdk.makeTransferBatch({ destinations, owner: aliceKey })
    expect(tx).not.toBeNull()
    expect(tx.mint).toBe(defaultMint)
    const { signature, errors, amount, source } = tx
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
    expect(Number(amount)).toBe(5100000)
    expect(source).toBe(aliceKey.publicKey)
  }, 60000)

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
    const aliceKey = Keypair.fromByteArray(keys.ALICE_KEY)
    const accountHistory = await sdk.getHistory({ account: aliceKey.publicKey })
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
      await sdk.getBalance({ account: 'xx' })
    } catch (error) {
      expect(error.response.data.statusCode).toBe(400)
      expect(error.response.data.error).toBe('BadRequestException: accountId must be a valid PublicKey')
    }
  })

  it('should throw an error when there are less than 1 transactions in a batch', async () => {
    try {
      const aliceKey = Keypair.fromByteArray(keys.ALICE_KEY)
      const destinations: Destination[] = []
      await sdk.makeTransferBatch({ destinations, owner: aliceKey })
    } catch (error) {
      expect(error.toString()).toContain('Error: At least 1 destination required')
    }
  })

  it('should throw an error when there are more than 15 transactions in a batch', async () => {
    try {
      const aliceKey = Keypair.fromByteArray(keys.ALICE_KEY)
      const destinations: Destination[] = []
      const destination = { destination: Keypair.fromByteArray(keys.BOB_KEY).publicKey, amount: '15' }
      for (let i = 0; i <= 15; i++) {
        destinations.push(destination)
      }
      await sdk.makeTransferBatch({ destinations, owner: aliceKey })
    } catch (error) {
      expect(error.toString()).toContain('Error: Maximum number of destinations exceeded')
    }
  })

  it('should fail when one account does not exist in batch transfer', async () => {
    try {
      const aliceKey = Keypair.fromByteArray(keys.ALICE_KEY)
      const destinations: Destination[] = []
      destinations.push({ destination: Keypair.fromByteArray(keys.BOB_KEY).publicKey, amount: '15' })
      const kp = Keypair.random()
      destinations.push({ destination: kp.publicKey, amount: '12' })
      await sdk.makeTransferBatch({ destinations, owner: aliceKey })
    } catch (error) {
      const errorData = error.response.data.error
      expect(errorData).toContain("type: 'InvalidAccount'")
      expect(errorData).toContain("instruction: '2")
    }
  })

  it('should request for an airdrop', async () => {
    const daveKey = Keypair.fromByteArray(keys.DAVE_KEY)
    const airdrop = await sdk.requestAirdrop({ account: daveKey.publicKey, amount: '1000' })
    expect(airdrop.data.signature).not.toBeNull()
    expect(typeof airdrop.data.signature).toBe('string')
    const { account, amount } = JSON.parse(airdrop.config.data)
    expect(account).toBe(daveKey.publicKey)
    expect(amount).toBe('1000')
  }, 30000)

  it('should fail not funds for an airdrop', async () => {
    try {
      const daveKey = Keypair.fromByteArray(keys.DAVE_KEY)
      await sdk.requestAirdrop({ account: daveKey.publicKey, amount: '50001' })
    } catch (error) {
      expect(error.response.data.error).toBe('BadRequestException: Try requesting 50000 or less.')
    }
  })
})
