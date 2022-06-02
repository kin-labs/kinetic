import { MogamiSdkConfig } from './interfaces'
import { MogamiSdk } from './mogami-sdk'

const MOGAMI_APP_INDEX = 1
const MOGAMI_SDK_ENVIRONMENT = 'devnet'
const MOGAMI_SDK_ENDPOINT = 'http://localhost:3000'
const SOLANA_RPC_NAME = 'mainnet-beta'
const SOLANA_RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com/'

function expectConfiguredSdk(sdk: MogamiSdk) {
  expect(sdk.solana.endpoint).toEqual(SOLANA_RPC_ENDPOINT)
  expect(sdk.solana.connection).toBeDefined()
  expect(sdk.solanaRpcEndpoint).toEqual(SOLANA_RPC_NAME)
}

xdescribe('sdk', () => {
  let sdk: MogamiSdk

  beforeEach(async () => {
    sdk = await MogamiSdk.setup({
      environment: MOGAMI_SDK_ENVIRONMENT,
      endpoint: MOGAMI_SDK_ENDPOINT,
      index: MOGAMI_APP_INDEX,
    })
  })

  describe('initializing', () => {
    describe('expected behavior', () => {
      it('should connect to a server endpoint', async () => {
        expectConfiguredSdk(sdk)
        expect(sdk.sdkConfig.logger).not.toBeDefined()
      })

      it('should connect with a logger configured', async () => {
        const config: MogamiSdkConfig = {
          environment: MOGAMI_SDK_ENVIRONMENT,
          endpoint: MOGAMI_SDK_ENDPOINT,
          index: MOGAMI_APP_INDEX,
          logger: console,
        }
        sdk = await MogamiSdk.setup(config)

        expectConfiguredSdk(sdk)
        expect(sdk.sdkConfig.logger).toBeDefined()
      })
    })
  })
})
