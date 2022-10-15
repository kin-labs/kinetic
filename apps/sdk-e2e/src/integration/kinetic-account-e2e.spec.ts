import { Keypair } from '@kin-kinetic/keypair'
import { KineticAccount } from '@kin-kinetic/sdk'
import { DEFAULT_MINT } from './helpers'

describe('KineticSdk (e2e)', () => {
  let account: KineticAccount

  beforeEach(async () => {
    const owner = Keypair.fromMnemonic(
      'pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter',
    )
    account = await KineticAccount.setup({ index: 1, endpoint: 'http://localhost:3000', environment: 'devnet', owner })
  })

  it('should get App Config', () => {
    const res = account.sdk.config

    expect(res.app.index).toEqual(1)
    expect(res.app.name).toEqual('App 1')
    expect(res.environment.name).toEqual('devnet')
    expect(res.environment.cluster.id).toEqual('solana-devnet')
    expect(res.environment.cluster.name).toEqual('Solana Devnet')
    expect(res.environment.cluster.type).toEqual('SolanaDevnet')
    expect(res.environment.cluster.endpoint).toEqual('http://localhost:8899')
    expect(res.mint.symbol).toEqual('KIN')
    expect(res.mint.publicKey).toEqual(DEFAULT_MINT)
    expect(res.mints.length).toEqual(2)
    expect(res.mints[0].symbol).toEqual('KIN')
    expect(res.mints[0].publicKey).toEqual(DEFAULT_MINT)
  })

  it('should use the RPC public endpoint', () => {
    expect(account.sdk?.solana?.connection.rpcEndpoint).toEqual('http://localhost:8899')
  })

  it('should give access to the owner keypair', () => {
    expect(account.owner.publicKey).toEqual('5F86TNSTre3CYwZd1wELsGQGhqG2HkN3d8zxhbyBSnzm')
  })
})
