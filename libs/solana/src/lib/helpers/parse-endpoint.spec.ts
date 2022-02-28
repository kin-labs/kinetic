import { parseEndpoint } from './parse-endpoint'

const localnet = 'http://localhost:8899'

describe('parseEndpoint', () => {
  it('should return a url starting with http', () => {
    const endpoint = parseEndpoint(localnet)
    expect(endpoint).toEqual(localnet)
  })

  it('should return devnet', () => {
    expect(parseEndpoint('devnet')).toEqual('https://api.devnet.solana.com')
  })

  it('should return mainnet-beta', () => {
    expect(parseEndpoint('mainnet-beta')).toEqual('https://api.mainnet-beta.solana.com/')
  })

  it('should return testnet', () => {
    expect(parseEndpoint('testnet')).toEqual('https://api.testnet.solana.com')
  })

  it('should not return some-unknown-net', () => {
    const cluster = 'some-unknown-net'
    try {
      parseEndpoint(cluster)
    } catch (e) {
      expect(e.message).toEqual(`Unknown https cluster: ${cluster}`)
    }
  })
})
