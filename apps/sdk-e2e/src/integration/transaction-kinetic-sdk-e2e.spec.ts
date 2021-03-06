import { KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { aliceKeypair, bobKeypair, charlieKeypair, daveKeypair } from './fixtures'
import { Destination } from '@kin-kinetic/solana'
import { AppTransactionStatus } from '@prisma/client'

describe('KineticSdk (e2e)', () => {
  let sdk: KineticSdk
  const defaultMint = process.env.DEFAULT_MINT_PUBLIC_KEY

  beforeEach(async () => {
    sdk = await KineticSdk.setup({ index: 1, endpoint: 'http://localhost:3000', environment: 'devnet' })
  })

  it('should make a transfer', async () => {
    const tx = await sdk.makeTransfer({ amount: '43', destination: bobKeypair.publicKey, owner: aliceKeypair })
    expect(tx).not.toBeNull()
    expect(tx.mint).toBe(defaultMint)
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
    expect(tx.mint).toBe(defaultMint)
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
    expect(res.status).toBe(AppTransactionStatus.Failed)
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
    expect(res.status).toBe(AppTransactionStatus.Failed)
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
    const tx = await sdk.makeTransfer({
      amount: '43',
      destination: destination.publicKey,
      owner: aliceKeypair,
      senderCreate: false,
    })
    expect(tx.signature).toBeNull()
    expect(Number(tx.amount)).toBe(4300000)
    expect(tx.errors.length).toBeGreaterThan(0)
    expect(tx.status).toBe(AppTransactionStatus.Failed)
    expect(tx.errors[0].message).toContain(`Error: Insufficient funds.`) // Destination account doesn't exist.
  })
})
