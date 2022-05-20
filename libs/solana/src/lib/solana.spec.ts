import { Solana } from './solana'

describe('solana', () => {
  it('should work', () => {
    const endpoint = 'http://localhost:8899'
    const solana = new Solana(endpoint)
    expect(solana.endpoint).toEqual('http://localhost:8899')
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
