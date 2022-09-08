import { KineticSdkConfig } from '../interfaces'
import { parseKineticSdkConfig } from './parse-kinetic-sdk-config'

const baseConfig: KineticSdkConfig = {
  environment: 'devnet',
  endpoint: 'http://localhost:3000',
  index: 1,
}

describe('parseKineticSdkConfig', () => {
  it('should return a default devnet endpoint', () => {
    const parsed = parseKineticSdkConfig(baseConfig)
    expect(parsed.index).toEqual(1)
    expect(parsed.environment).toEqual('devnet')
    expect(parsed.endpoint).toEqual('devnet')
  })

  it('should return a default mainnet endpoint', () => {
    const parsed = parseKineticSdkConfig({ ...baseConfig, environment: 'mainnet' })
    expect(parsed.index).toEqual(1)
    expect(parsed.environment).toEqual('mainnet')
    expect(parsed.endpoint).toEqual('mainnet')
  })

  it('should return a custom endpoint', () => {
    const parsed = parseKineticSdkConfig({ ...baseConfig, endpoint: 'http://localhost:3000' })
    expect(parsed.index).toEqual(1)
    expect(parsed.environment).toEqual('devnet')
    expect(parsed.endpoint).toEqual('http://localhost:3000')
  })

  it('should remove trailing slashes from endpoint', () => {
    const parsed = parseKineticSdkConfig({ ...baseConfig, endpoint: 'http://localhost:3000/////' })
    expect(parsed.index).toEqual(1)
    expect(parsed.environment).toEqual('devnet')
    expect(parsed.endpoint).toEqual('http://localhost:3000')
  })
})
