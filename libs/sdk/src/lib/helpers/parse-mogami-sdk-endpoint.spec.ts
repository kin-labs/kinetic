import { parseMogamiSdkEndpoint } from './parse-mogami-sdk-endpoint'

describe('parseMogamiSdkEndpoint', () => {
  it('should return devnet', () => {
    expect(parseMogamiSdkEndpoint('devnet')).toEqual('https://devnet.mogami.io')
  })

  it('should return mainnet', () => {
    expect(parseMogamiSdkEndpoint('mainnet')).toEqual('https://mainnet.mogami.io')
  })

  it('should return a url starting with http', () => {
    const local = 'http://local.mogami.io'
    const endpoint = parseMogamiSdkEndpoint(local)
    expect(endpoint).toEqual(local)
  })

  it('should return a url starting with https', () => {
    const local = 'https://local.mogami.io'
    const endpoint = parseMogamiSdkEndpoint(local)
    expect(endpoint).toEqual(local)
  })

  it('should not return some-unknown-net', () => {
    const cluster = 'some-unknown-net'
    try {
      const endpoint = parseMogamiSdkEndpoint(cluster)
      expect(endpoint).not.toBeDefined()
    } catch (e) {
      expect(e.message).toEqual(`Unknown http or https endpoint`)
    }
  })
})
