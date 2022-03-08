import { Http } from './helpers/http'
import { SdkConfig } from './interfaces/sdk-config'
import { Sdk } from './sdk'

const API_URL = 'http://localhost:3000'

describe('sdk', () => {
  describe('initializing', () => {
    describe('expected behavior', () => {
      it('should connect to a server endpoint', async () => {
        const config: SdkConfig = { endpoint: API_URL }
        const sdk: Sdk = await Sdk.setup(config)

        expect(sdk.endpoint).toEqual(API_URL)
        expect(sdk.serverConfig.environment).toEqual('development')
        expect(sdk.serverConfig.port).toEqual(3000)
      })

      it('should connect with custom http instance', async () => {
        const config: SdkConfig = { http: new Http(API_URL) }
        const sdk: Sdk = await Sdk.setup(config)

        expect(sdk.endpoint).toEqual(API_URL)
        expect(sdk.serverConfig.environment).toEqual('development')
        expect(sdk.serverConfig.port).toEqual(3000)
      })

      it('should connect with a logger configured', async () => {
        const config: SdkConfig = { endpoint: API_URL, logger: console }
        const sdk: Sdk = await Sdk.setup(config)

        expect(sdk.endpoint).toEqual(API_URL)
        expect(sdk.serverConfig.environment).toEqual('development')
        expect(sdk.serverConfig.port).toEqual(3000)
      })
    })

    describe('unexpected behavior', () => {
      it('should fail with no parameters', async () => {
        const config: SdkConfig = {}

        await expect(Sdk.setup(config)).rejects.toThrow(`Provide either and 'endpoint' or 'http' parameter.`)
      })

      it('should fail with an non-existing endpoint', async () => {
        const config: SdkConfig = { endpoint: 'http://not-found:3000' }

        await expect(Sdk.setup(config)).rejects.toThrow('Error setting up SDK')
      })

      it('should fail with an http client with non-existing endpoint', async () => {
        const config: SdkConfig = { http: new Http('http://not-found:3000') }

        await expect(Sdk.setup(config)).rejects.toThrow('Error setting up SDK')
      })
    })
  })
})
