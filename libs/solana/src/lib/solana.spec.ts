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
      await solana.getBalance('ALisrzsaVqciCxy8r6g7MUrPoRo3CpGxPhwBbZzqZ9bA', {
        publicKey: '4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa',
        decimals: 5,
      })
    } catch (error) {
      expect(error.message).toBe(`No token accounts found for mint 4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa`)
    }
  })

  it('should throw "No token accounts found for mints..."', async () => {
    const endpoint = 'http://localhost:8899'
    const solana = new Solana(endpoint)
    try {
      await solana.getBalance('ALisrzsaVqciCxy8r6g7MUrPoRo3CpGxPhwBbZzqZ9bA', [
        { publicKey: '4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa', decimals: 5 },
        { publicKey: '4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPB', decimals: 5 },
      ])
    } catch (error) {
      expect(error.message).toBe(
        `No token accounts found for mints 4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa, 4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPB`,
      )
    }
  })
})
