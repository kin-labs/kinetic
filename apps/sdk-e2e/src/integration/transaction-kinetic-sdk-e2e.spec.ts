import { Keypair } from '@kin-kinetic/keypair'
import { KineticSdk } from '@kin-kinetic/sdk'
import { Commitment, Destination } from '@kin-kinetic/solana'
import { TransactionStatus } from '@prisma/client'
import { uniqueId } from 'lodash'
import { aliceKeypair, bobKeypair, charlieKeypair, daveKeypair, usdcMint } from './fixtures'
import { DEFAULT_MINT } from './helpers'

describe('KineticSdk (e2e)', () => {
  let sdk: KineticSdk

  beforeEach(async () => {
    sdk = await KineticSdk.setup({ index: 1, endpoint: 'http://127.0.0.1:3000', environment: 'local' })
  })

  it('should make a transfer', async () => {
    const tx = await sdk.makeTransfer({ amount: '43', destination: bobKeypair.publicKey, owner: aliceKeypair })
    expect(tx).not.toBeNull()
    expect(tx.mint).toEqual(DEFAULT_MINT)
    const { signature, errors, amount, decimals, source } = tx
    expect(errors).toEqual([])
    expect(typeof signature).toBe('string')
    expect(amount).toBe('43')
    expect(decimals).toBe(5)
    expect(source).toBe(aliceKeypair.publicKey)
  })

  it('should make a transfer with decimals', async () => {
    const tx = await sdk.makeTransfer({ amount: '43.12345', destination: bobKeypair.publicKey, owner: aliceKeypair })
    expect(tx).not.toBeNull()
    expect(tx.mint).toEqual(DEFAULT_MINT)
    const { signature, errors, amount, decimals, source } = tx
    expect(errors).toEqual([])
    expect(typeof signature).toBe('string')
    expect(amount).toBe('43.12345')
    expect(decimals).toBe(5)
    expect(source).toBe(aliceKeypair.publicKey)
  })

  it('should make a transfer with references', async () => {
    const myReference = uniqueId()
    const tx = await sdk.makeTransfer({
      amount: '1',
      destination: bobKeypair.publicKey,
      owner: aliceKeypair,
      reference: myReference,
    })
    expect(tx).not.toBeNull()
    expect(tx.mint).toEqual(DEFAULT_MINT)
    const { id, signature, errors, reference } = tx
    expect(errors).toEqual([])
    expect(typeof signature).toBe('string')
    expect(reference).toBe(myReference)
    const found = await sdk.getKineticTransaction({
      reference,
    })

    expect(found.length).toBe(1)
    expect(found[0].id).toBe(id)
  })

  it('should fail to make a transfer with a new account', async () => {
    const kp = Keypair.random()

    await expect(
      async () => await sdk.makeTransfer({ amount: '43.12345', destination: bobKeypair.publicKey, owner: kp }),
    ).rejects.toThrow(`Owner account doesn't exist for mint ${DEFAULT_MINT}`)
  })

  it('should make a transfer in batch', async () => {
    const destinations: Destination[] = [
      { destination: bobKeypair.publicKey, amount: '51' },
      { destination: charlieKeypair.publicKey, amount: '72' },
      { destination: daveKeypair.publicKey, amount: '87' },
    ]

    const tx = await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })
    expect(tx).not.toBeNull()
    expect(tx.mint).toEqual(DEFAULT_MINT)
    const { signature, errors, amount, decimals, source } = tx
    expect(errors).toEqual([])
    expect(typeof signature).toBe('string')
    expect(amount).toBe('51')
    expect(decimals).toBe(5)
    expect(source).toBe(aliceKeypair.publicKey)
  }, 60000)

  it('should throw an error when there are less than 1 transaction in a batch', async () => {
    const destinations: Destination[] = []

    await expect(async () => await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })).rejects.toThrow(
      'At least 1 destination required',
    )
  })

  it('should throw an error when there are more than 15 transactions in a batch', async () => {
    const destinations: Destination[] = []
    const destination = { destination: bobKeypair.publicKey, amount: '15' }
    for (let i = 0; i <= 15; i++) {
      destinations.push(destination)
    }

    await expect(async () => await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })).rejects.toThrow(
      'Maximum number of destinations exceeded',
    )
  })

  it('should fail when one account does not exist in batch transfer', async () => {
    const kp = Keypair.random()
    const kp2 = Keypair.random()
    const destinations: Destination[] = []
    destinations.push({ destination: bobKeypair.publicKey, amount: '15' })
    destinations.push({ destination: kp.publicKey, amount: '12' })
    destinations.push({ destination: kp2.publicKey, amount: '12' })

    await expect(async () => await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })).rejects.toThrow(
      `Destination accounts ${[kp.publicKey, kp2.publicKey]
        .sort()
        .join(', ')} have no token account for mint ${DEFAULT_MINT}.`,
    )
  })

  it('should throw when insufficient funds in a transaction', async () => {
    const res = await sdk.makeTransfer({
      amount: '9999999999.99999',
      destination: bobKeypair.publicKey,
      owner: aliceKeypair,
    })
    expect(res.signature).toBeNull()
    expect(res.amount).toEqual('9999999999.99999')
    expect(res.errors.length).toBeGreaterThan(0)
    expect(res.status).toBe(TransactionStatus.Failed)
    expect(res.errors[0].message).toContain('Error: Insufficient funds.')
  })

  it('should throw when insufficient funds in a batch transaction', async () => {
    const destinations: Destination[] = []
    destinations.push({ destination: bobKeypair.publicKey, amount: '15' })
    destinations.push({ destination: daveKeypair.publicKey, amount: '99999999999999' })
    const res = await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })
    expect(res.amount).toBe('15')
    expect(res.decimals).toBe(5)
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
    const { signature, errors, amount, decimals, source } = tx
    expect(errors).toEqual([])
    expect(typeof signature).toBe('string')
    expect(amount).toBe('43')
    expect(decimals).toBe(5)
    expect(source).toBe(aliceKeypair.publicKey)
  })

  it('should not allow the sender to create an account when senderCreate params is false or undefined', async () => {
    const destination = Keypair.random()
    await expect(
      async () =>
        await sdk.makeTransfer({
          amount: '43',
          destination: destination.publicKey,
          owner: aliceKeypair,
          senderCreate: false,
        }),
    ).rejects.toThrow(`Destination account doesn't exist for mint ${DEFAULT_MINT}.`)
  })

  it('should not allow transfers to a mint', async () => {
    const kinMint = 'MoGaMuJnB3k8zXjBYBnHxHG47vWcW3nyb7bFYvdVzek'
    await expect(
      async () =>
        await sdk.makeTransfer({
          amount: '43',
          destination: kinMint,
          owner: aliceKeypair,
          senderCreate: false,
        }),
    ).rejects.toThrow('Account is a mint account.')
  })

  it('should not allow transfers to a mint in batch transfer', async () => {
    const kinMint = 'MoGaMuJnB3k8zXjBYBnHxHG47vWcW3nyb7bFYvdVzek'
    const destinations: Destination[] = []
    destinations.push({ destination: bobKeypair.publicKey, amount: '15' })
    destinations.push({ destination: kinMint, amount: '12' })

    await expect(async () => await sdk.makeTransferBatch({ destinations, owner: aliceKeypair })).rejects.toThrow(
      `Account is a mint account.`,
    )
  })

  it('should make a transfer with a provided mint', async () => {
    const tx = await sdk.makeTransfer({
      amount: '1.75',
      destination: bobKeypair.publicKey,
      owner: aliceKeypair,
      mint: usdcMint,
      senderCreate: true,
    })
    expect(tx).not.toBeNull()
    expect(tx.mint).toBe(usdcMint)
    const { signature, errors, amount, decimals, source } = tx
    expect(errors).toEqual([])
    expect(typeof signature).toBe('string')
    expect(amount).toBe('1.75')
    expect(decimals).toBe(2)
    expect(source).toBe(aliceKeypair.publicKey)
  })

  it('should make a batch transfer with a provided mint', async () => {
    const owner = Keypair.random()
    await sdk.createAccount({ commitment: Commitment.Finalized, owner: owner, mint: usdcMint })
    const destinations: Destination[] = [{ destination: owner.publicKey, amount: '2.22' }]

    const tx = await sdk.makeTransferBatch({ destinations, owner: aliceKeypair, mint: usdcMint })
    expect(tx).not.toBeNull()
    expect(usdcMint).toContain(tx.mint)
    const { signature, errors, amount, decimals, source } = tx
    expect(errors).toEqual([])
    expect(typeof signature).toBe('string')
    expect(amount).toBe('2.22')
    expect(decimals).toBe(2)
    expect(source).toBe(aliceKeypair.publicKey)
  }, 60000)
})
