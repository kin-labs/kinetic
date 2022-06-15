import { Keypair } from '@kin-kinetic/keypair'
import { Commitment } from '@kin-kinetic/solana'
import { parseMogamiSdkConfig } from './helpers/parse-mogami-sdk-config'
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

describe('sdk', () => {
  let sdk: MogamiSdk

  beforeEach(async () => {
    sdk = new MogamiSdk({
      environment: DEFAULT_APP_ENVIRONMENT,
      endpoint: DEFAULT_APP_ENDPOINT,
      index: DEFAULT_APP_INDEX,
    })
  })

  describe('initializing', () => {
    describe('expected behavior', () => {
      it('should configure the SDK without a logger configured', async () => {
        expect(sdk.solana).not.toBeDefined()
        expect(sdk.solana?.connection).not.toBeDefined()
        expect(sdk.sdkConfig.logger).not.toBeDefined()
      })

      it('should configure the SDK with a logger configured', async () => {
        const config: MogamiSdkConfig = {
          environment: DEFAULT_APP_ENVIRONMENT,
          endpoint: DEFAULT_APP_ENDPOINT,
          index: DEFAULT_APP_INDEX,
          logger: console,
        }
        sdk = new MogamiSdk(parseMogamiSdkConfig(config))
        expect(sdk.sdkConfig.logger).toBeDefined()
      })

      it('should configure the SDK with a custom Solana RPC endpoint', async () => {
        const config: MogamiSdkConfig = {
          environment: DEFAULT_APP_ENVIRONMENT,
          endpoint: DEFAULT_APP_ENDPOINT,
          index: DEFAULT_APP_INDEX,
          logger: console,
          solanaRpcEndpoint: SOLANA_RPC_NAME,
        }
        sdk = new MogamiSdk(parseMogamiSdkConfig(config))
        expect(sdk.sdkConfig.solanaRpcEndpoint).toEqual(SOLANA_RPC_ENDPOINT)
        expect(sdk.sdkConfig.logger).toBeDefined()
      })

      it('should adhere createAccountOptions to RFC signature', () => {
        const createAccountOptions = {
          owner: Keypair.random(),
          commitment: Commitment.Confirmed,
        }
        expect(createAccountOptions.owner.secretKey).toBeDefined()
        expect(createAccountOptions.owner.secretKey).toBeDefined()
      })
    })
  })
})
