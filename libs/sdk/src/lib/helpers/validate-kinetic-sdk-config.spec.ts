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
})
