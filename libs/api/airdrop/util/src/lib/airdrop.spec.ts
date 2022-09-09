import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js'
import { Airdrop } from './airdrop'

describe('airdrop', () => {
  const feePayer = Keypair.generate()
  const mint = Keypair.generate()
  it('should work', () => {
    const airdrop = new Airdrop({
      airdropAmount: 1,
      airdropMax: 100,
      connection: new Connection(clusterApiUrl('devnet')),
      decimals: 5,
      feePayer,
      mint: mint.publicKey,
    })
    expect(airdrop).toBeDefined()
  })
})
