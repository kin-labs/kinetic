import { Solana } from './solana'

describe('solana', () => {
  it('should work', () => {
    const endpoint = 'http://localhost:8899'
    const solana = new Solana(endpoint)
    expect(solana.endpoint).toEqual('http://localhost:8899')
  })

  it('should throw "No token accounts found for mint..."', async () => {
    const endpoint = 'http://localhost:8899'
    const solana = new Solana(endpoint)
    try {
      await solana.getBalance(
        'ALisrzsaVqciCxy8r6g7MUrPoRo3CpGxPhwBbZzqZ9bA',
        '4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa',
        ['4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa'],
      )
    } catch (error) {
      expect(error.message).toBe(`No token accounts found for mint 4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa`)
    }
  })
})
