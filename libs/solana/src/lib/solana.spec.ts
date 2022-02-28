import { Solana } from './solana'

describe('solana', () => {
  it('should work', () => {
    const endpoint = process.env.SOLANA_RPC_ENDPOINT
    const solana = new Solana(endpoint)
    expect(solana.endpoint).toEqual('https://api.mainnet-beta.solana.com/')
  })
})
