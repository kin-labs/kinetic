import { KineticSdkConfig } from '../interfaces'
import { validateKineticSdkConfig } from './validate-kinetic-sdk-config'

const baseConfig: KineticSdkConfig = {
  environment: 'devnet',
  endpoint: 'http://localhost:3000',
  index: 1,
}

describe('validateKineticSdkConfig', () => {
  it('should throw an error when endpoint is not valid', () => {
    try {
      validateKineticSdkConfig({ ...baseConfig, endpoint: 'x' })
    } catch (error) {
      expect(error.toString()).toBe('Error: validateKineticSdkConfig: the endpoint should start with http or https.')
    }
  })

  it('should throw an error when endpoint is not configured', () => {
    try {
      validateKineticSdkConfig(JSON.parse(JSON.stringify({ environment: 'devnet', index: 1 })))
    } catch (error) {
      expect(error.toString()).toBe('Error: validateKineticSdkConfig: no endpoint configured.')
    }
  })

  it('should throw an error when index is not configured', () => {
    try {
      validateKineticSdkConfig(JSON.parse(JSON.stringify({ environment: 'devnet', endpoint: 'http://localhost:3000' })))
    } catch (error) {
      expect(error.toString()).toBe('Error: validateKineticSdkConfig: no index configured.')
    }
  })

  it('should throw an error when environment is not configured', () => {
    try {
      validateKineticSdkConfig(JSON.parse(JSON.stringify({ endpoint: 'http://localhost:3000', index: 1 })))
    } catch (error) {
      expect(error.toString()).toBe('Error: validateKineticSdkConfig: no environment configured.')
    }
  })

  it('should throw an error when index is not valid', () => {
    try {
      validateKineticSdkConfig(JSON.parse(JSON.stringify({ ...baseConfig, index: '1' })))
    } catch (error) {
      expect(error.toString()).toBe('Error: validateKineticSdkConfig: index should be an integer.')
    }
  })
})
