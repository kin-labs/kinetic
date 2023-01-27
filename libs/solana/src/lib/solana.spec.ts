import { Commitment, MintAccounts } from './interfaces'
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
    const mintAccounts: MintAccounts[] = [
      {
        mint: {
          publicKey: '4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa',
          decimals: 5,
        },
        accounts: ['ALisrzsaVqciCxy8r6g7MUrPoRo3CpGxPhwBbZzqZ9bA'],
      },
    ]

    try {
      await solana.getMintAccountBalance(mintAccounts, Commitment.Confirmed)
    } catch (error) {
      expect(error.message).toBe(`No token accounts found for mint 4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa`)
    }
  })

  it('should throw "No token accounts found for mints..."', async () => {
    const endpoint = 'http://localhost:8899'
    const solana = new Solana(endpoint)
    const mintAccounts: MintAccounts[] = [
      {
        mint: { publicKey: '4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa', decimals: 5 },
        accounts: ['ALisrzsaVqciCxy8r6g7MUrPoRo3CpGxPhwBbZzqZ9bA'],
      },
      {
        mint: { publicKey: '4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPB', decimals: 5 },
        accounts: [],
      },
    ]

    try {
      await solana.getMintAccountBalance(mintAccounts, Commitment.Confirmed)
    } catch (error) {
      expect(error.message).toBe(
        `No token accounts found for mints 4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPa, 4hUG2bJHubNDddLVsHjXBVTcuRskg7BSPuriudsbTCPB`,
      )
    }
  })
})
