import { getSolanaRpcEndpoint } from './get-solana-rpc-endpoint'

describe('getSolanaRpcEndpoint', () => {
  it('should return devnet', () => {
    expect(getSolanaRpcEndpoint('devnet')).toEqual('devnet')
  })

  it('should return mainnet', () => {
    expect(getSolanaRpcEndpoint('mainnet')).toEqual('mainnet-beta')
  })

  it('should return mainnet-beta', () => {
    expect(getSolanaRpcEndpoint('mainnet-beta')).toEqual('mainnet-beta')
  })

  it('should return a url starting with http', () => {
    const local = 'http://local.kinetic.host'
    const endpoint = getSolanaRpcEndpoint(local)
    expect(endpoint).toEqual(local)
  })

  it('should return a url starting with https', () => {
    const local = 'https://local.kinetic.host'
    const endpoint = getSolanaRpcEndpoint(local)
    expect(endpoint).toEqual(local)
  })

  it('should not return some-unknown-net', () => {
    const cluster = 'some-unknown-net'
    try {
      const endpoint = getSolanaRpcEndpoint(cluster)
      expect(endpoint).not.toBeDefined()
    } catch (e) {
      expect(e.message).toEqual(`Unknown http or https endpoint`)
    }
  })
})
