import { parseKineticSdkEndpoint } from './parse-kinetic-sdk-endpoint'

describe('parseKineticSdkEndpoint', () => {
  it('should return devnet', () => {
    expect(parseKineticSdkEndpoint('devnet')).toEqual('https://devnet.kinetic.kin.org')
  })

  it('should return mainnet', () => {
    expect(parseKineticSdkEndpoint('mainnet')).toEqual('https://mainnet.kinetic.kin.org')
  })

  it('should return a url starting with http', () => {
    const local = 'http://local.kinetic.kin.org'
    const endpoint = parseKineticSdkEndpoint(local)
    expect(endpoint).toEqual(local)
  })

  it('should return a url starting with https', () => {
    const local = 'https://local.kinetic.kin.org'
    const endpoint = parseKineticSdkEndpoint(local)
    expect(endpoint).toEqual(local)
  })

  it('should not return some-unknown-net', () => {
    const cluster = 'some-unknown-net'
    try {
      const endpoint = parseKineticSdkEndpoint(cluster)
      expect(endpoint).not.toBeDefined()
    } catch (e) {
      expect(e.message).toEqual(`Unknown http or https endpoint`)
    }
  })
})
