import { KineticSdk } from '@kin-kinetic/sdk'
import { DEFAULT_MINT } from './helpers'

describe('KineticSdk (e2e)', () => {
  let sdk: KineticSdk

  beforeEach(async () => {
    sdk = await KineticSdk.setup({ index: 1, endpoint: 'http://127.0.0.1:3000', environment: 'local' })
  })

  it('should get App Config', () => {
    const res = sdk.config

    expect(res.app.index).toEqual(1)
    expect(res.app.name).toEqual('App 1')
    expect(res.environment.name).toEqual('local')
    expect(res.environment.cluster.id).toEqual('solana-local')
    expect(res.environment.cluster.name).toEqual('Solana Local')
    expect(res.environment.cluster.type).toEqual('Custom')
    expect(res.environment.cluster.endpoint).toEqual('http://127.0.0.1:8899')
    expect(res.mint.symbol).toEqual('KIN')
    expect(res.mint.publicKey).toEqual(DEFAULT_MINT)
    expect(res.mints.length).toEqual(2)
    expect(res.mints[0].symbol).toEqual('KIN')
    expect(res.mints[0].publicKey).toEqual(DEFAULT_MINT)
  })

  it('should use the RPC public endpoint', () => {
    expect(sdk?.solana?.connection.rpcEndpoint).toEqual('http://127.0.0.1:8899')
  })
})
