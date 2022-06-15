import { Keypair } from '@kin-kinetic/keypair'
import { Commitment } from '@kin-kinetic/solana'
import { parseKineticSdkConfig } from './helpers/parse-kinetic-sdk-config'
import { KineticSdkConfig } from './interfaces'
import { KineticSdk } from './kinetic-sdk'

const DEFAULT_APP_INDEX = 1
const DEFAULT_APP_ENVIRONMENT = 'devnet'
const DEFAULT_APP_ENDPOINT = 'http://localhost:3000'
const SOLANA_RPC_NAME = 'mainnet-beta'
const SOLANA_RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com/'

function expectConfiguredSdk(sdk: KineticSdk) {
  expect(sdk.solana.endpoint).toEqual(SOLANA_RPC_ENDPOINT)
  expect(sdk.solana.connection).toBeDefined()
  expect(sdk.solanaRpcEndpoint).toEqual(SOLANA_RPC_NAME)
}

describe('sdk', () => {
  let sdk: KineticSdk

  beforeEach(async () => {
    sdk = new KineticSdk({
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
        const config: KineticSdkConfig = {
          environment: DEFAULT_APP_ENVIRONMENT,
          endpoint: DEFAULT_APP_ENDPOINT,
          index: DEFAULT_APP_INDEX,
          logger: console,
        }
        sdk = new KineticSdk(parseKineticSdkConfig(config))
        expect(sdk.sdkConfig.logger).toBeDefined()
      })

      it('should configure the SDK with a custom Solana RPC endpoint', async () => {
        const config: KineticSdkConfig = {
          environment: DEFAULT_APP_ENVIRONMENT,
          endpoint: DEFAULT_APP_ENDPOINT,
          index: DEFAULT_APP_INDEX,
          logger: console,
          solanaRpcEndpoint: SOLANA_RPC_NAME,
        }
        sdk = new KineticSdk(parseKineticSdkConfig(config))
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
