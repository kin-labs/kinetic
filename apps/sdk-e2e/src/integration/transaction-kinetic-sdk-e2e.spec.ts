import { Keypair } from '@kin-kinetic/keypair'
import { KineticSdk } from '@kin-kinetic/sdk'
import { aliceKeypair, bobKeypair, charlieKeypair, daveKeypair, usdMint } from './fixtures'
import { Destination } from '@kin-kinetic/solana'
import { TransactionStatus } from '@prisma/client'
import { DEFAULT_MINT } from './helpers'

describe('KineticSdk (e2e)', () => {
  let sdk: KineticSdk

  beforeEach(async () => {
    sdk = await KineticSdk.setup({ index: 1, endpoint: 'http://localhost:3000', environment: 'devnet' })
  })

  it('should make a transfer', async () => {
    const tx = await sdk.makeTransfer({ amount: '43', destination: bobKeypair.publicKey, owner: aliceKeypair })
    expect(tx).not.toBeNull()
    expect(DEFAULT_MINT).toContain(tx.mint)
    const { signature, errors, amount, source } = tx
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
    expect(Number(amount)).toBe(4300000)
    expect(source).toBe(aliceKeypair.publicKey)
  })

  it('should make a transfer in batch', async () => {
    const destinations: Destination[] = [
      { destination: bobKeypair.publicKey, amount: '51' },
      { destination: charlieKeypair.publicKey, amount: '72' },
      { destination: daveKeypair.publicKey, amount: '87' },
    ]

    const tx = await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })
    expect(tx).not.toBeNull()
    expect(DEFAULT_MINT).toContain(tx.mint)
    const { signature, errors, amount, source } = tx
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
    expect(Number(amount)).toBe(5100000)
    expect(source).toBe(aliceKeypair.publicKey)
  }, 60000)

  it('should throw an error when there are less than 1 transactions in a batch', async () => {
    try {
      const destinations: Destination[] = []
      await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })
    } catch (error) {
      expect(error.toString()).toContain('Error: At least 1 destination required')
    }
  })

  it('should throw an error when there are more than 15 transactions in a batch', async () => {
    try {
      const destinations: Destination[] = []
      const destination = { destination: bobKeypair.publicKey, amount: '15' }
      for (let i = 0; i <= 15; i++) {
        destinations.push(destination)
      }
      await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })
    } catch (error) {
      expect(error.toString()).toContain('Error: Maximum number of destinations exceeded')
    }
  })

  it('should fail when one account does not exist in batch transfer', async () => {
    try {
      const destinations: Destination[] = []
      destinations.push({ destination: bobKeypair.publicKey, amount: '15' })
      const kp = Keypair.random()
      destinations.push({ destination: kp.publicKey, amount: '12' })
      await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })
    } catch (error) {
      const errorData = error.response.data.error
      expect(errorData).toContain("type: 'InvalidAccount'")
      expect(errorData).toContain("instruction: '2")
    }
  })

  it('should throw when insufficient funds in a transaction', async () => {
    const res = await sdk.makeTransfer({
      amount: '99999999999999',
      destination: bobKeypair.publicKey,
      owner: aliceKeypair,
    })
    expect(res.signature).toBeNull()
    expect(res.amount).toEqual('9999999999999900000')
    expect(res.errors.length).toBeGreaterThan(0)
    expect(res.status).toBe(TransactionStatus.Failed)
    expect(res.errors[0].message).toContain('Error: Insufficient funds.')
  })

  it('should throw when insufficient funds in a batch transaction', async () => {
    const destinations: Destination[] = []
    destinations.push({ destination: bobKeypair.publicKey, amount: '15' })
    const kp = Keypair.random()
    destinations.push({ destination: kp.publicKey, amount: '99999999999999' })
    const res = await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })
    expect(Number(res.amount)).toBe(1500000)
    expect(res.signature).toBeNull()
    expect(res.errors.length).toBeGreaterThan(0)
    expect(res.status).toBe(TransactionStatus.Failed)
    expect(res.errors[0].message).toContain('Error: Insufficient funds.')
  })

  it('should allow the sender to create an account', async () => {
    const destination = Keypair.random()
    const tx = await sdk.makeTransfer({
      amount: '43',
      destination: destination.publicKey,
      owner: aliceKeypair,
      senderCreate: true,
    })
    expect(tx).not.toBeNull()
    const { signature, errors, amount, source } = tx
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
    expect(Number(amount)).toBe(4300000)
    expect(source).toBe(aliceKeypair.publicKey)
  })

  it('should not allow the sender to create an account when senderCreate params is false or undefined', async () => {
    const destination = Keypair.random()
    try {
      await sdk.makeTransfer({
        amount: '43',
        destination: destination.publicKey,
        owner: aliceKeypair,
        senderCreate: false,
      })
    } catch (e) {
      expect(e.message).toBe(`Destination account doesn't exist.`)
    }
  })

  it('should not allow transfers to a mint', async () => {
    const kinMint = 'MoGaMuJnB3k8zXjBYBnHxHG47vWcW3nyb7bFYvdVzek'
    try {
      await sdk.makeTransfer({
        amount: '43',
        destination: kinMint,
        owner: aliceKeypair,
        senderCreate: false,
      })
    } catch (e) {
      expect(e.message).toBe(`Transfers to a mint are not allowed.`)
    }
  })

  it('should not allow transfers to a mint in batch transfer', async () => {
    try {
      const kinMint = 'MoGaMuJnB3k8zXjBYBnHxHG47vWcW3nyb7bFYvdVzek'
      const destinations: Destination[] = []
      destinations.push({ destination: bobKeypair.publicKey, amount: '15' })
      destinations.push({ destination: kinMint, amount: '12' })
      await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })
    } catch (e) {
      expect(e.message).toBe(`Transfers to a mint are not allowed.`)
    }
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

  it('should make a transfer using a mint', async () => {
    const tx = await sdk.makeTransfer({
      amount: '1',
      destination: bobKeypair.publicKey,
      owner: aliceKeypair,
      mint: usdMint,
    })
    expect(tx).not.toBeNull()
    expect(tx.mint).toBe(usdMint)
    const { signature, errors, amount, source } = tx
    expect(typeof signature).toBe('string')
    expect(errors).toEqual([])
    expect(Number(amount)).toBe(1)
    expect(source).toBe(aliceKeypair.publicKey)
  })

  it('should request an airdrop using a mint', async () => {
    const tx = await sdk.requestAirdrop({ account: aliceKeypair.publicKey, amount: '20', mint: usdMint })
    expect(tx).not.toBeNull()
    expect(typeof tx.signature).toBe('string')
  }, 30000)
})
