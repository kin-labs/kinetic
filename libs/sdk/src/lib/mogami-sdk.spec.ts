import { MogamiSdkConfig } from './interfaces'
import { MogamiSdk } from './mogami-sdk'

const DEFAULT_APP_INDEX = 1
const DEFAULT_APP_ENVIRONMENT = 'devnet'
const DEFAULT_APP_ENDPOINT = 'http://localhost:3000'
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
      environment: DEFAULT_APP_ENVIRONMENT,
      endpoint: DEFAULT_APP_ENDPOINT,
      index: DEFAULT_APP_INDEX,
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
          environment: DEFAULT_APP_ENVIRONMENT,
          endpoint: DEFAULT_APP_ENDPOINT,
          index: DEFAULT_APP_INDEX,
          logger: console,
        }
        sdk = await MogamiSdk.setup(config)

        expectConfiguredSdk(sdk)
        expect(sdk.sdkConfig.logger).toBeDefined()
      })
    })
  })
})
