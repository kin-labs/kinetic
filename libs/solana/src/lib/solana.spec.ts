import { Solana } from './solana'

describe('solana', () => {
  it('should work', () => {
    const endpoint = 'http://localhost:8899'
    const solana = new Solana(endpoint)
    expect(solana.endpoint).toEqual('http://localhost:8899')
  })

  it('should get balances for a valid account', async () => {
    const endpoint = 'http://localhost:8899'
    const solana = new Solana(endpoint)
    const balance = await solana.getBalance(
      'ALisrzsaVqciCxy8r6g7MUrPoRo3CpGxPhwBbZzqZ9bA',
      process.env.MOGAMI_MINT_PUBLIC_KEY,
    )
    expect(balance.toString()).toEqual('9895100000')
  })

  it('should throw "No Kin token accounts found"', async () => {
    const endpoint = 'http://localhost:8899'
    const solana = new Solana(endpoint)
    try {
      await solana.getBalance(
        'ALisrzsaVqciCxy8r6g7MUrPoRo3CpGxPhwBbZzqZ9bA',
        '4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa',
      )
    } catch (error) {
      expect(error.message).toBe('No Kin token accounts found')
    }
  })
})
