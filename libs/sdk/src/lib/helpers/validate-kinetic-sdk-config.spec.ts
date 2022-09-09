import { KineticSdkConfig } from '../interfaces'
import { validateKineticSdkConfig } from './validate-kinetic-sdk-config'

const baseConfig: KineticSdkConfig = {
  environment: 'devnet',
  endpoint: 'http://localhost:3000',
  index: 1,
}

describe('validateKineticSdkConfig', () => {
  it('should return a default devnet endpoint', () => {
    const validated = validateKineticSdkConfig(baseConfig)
    expect(validated.index).toEqual(1)
    expect(validated.environment).toEqual('devnet')
    expect(validated.endpoint).toEqual('http://localhost:3000')
  })

  it('should return a default mainnet endpoint', () => {
    const validated = validateKineticSdkConfig({ ...baseConfig, environment: 'mainnet' })
    expect(validated.index).toEqual(1)
    expect(validated.environment).toEqual('mainnet')
    expect(validated.endpoint).toEqual('mainnet')
  })

  it('should return a custom endpoint', () => {
    const validated = validateKineticSdkConfig({ ...baseConfig, endpoint: 'http://localhost:3000' })
    expect(validated.index).toEqual(1)
    expect(validated.environment).toEqual('http://localhost:3000')
    expect(validated.endpoint).toEqual('http://localhost:3000')
  })

  it('should remove trailing slashes from endpoint', () => {
    const validated = validateKineticSdkConfig({ ...baseConfig, endpoint: 'http://localhost:3000/////' })
    expect(validated.index).toEqual(1)
    expect(validated.environment).toEqual('http://localhost:3000')
    expect(validated.endpoint).toEqual('http://localhost:3000')
  })
})
