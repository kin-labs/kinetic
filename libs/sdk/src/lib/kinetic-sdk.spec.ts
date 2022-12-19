import { Keypair } from '@kin-kinetic/keypair'
import { clusterApiUrl } from '@solana/web3.js'
import { Commitment } from '../generated'
import { validateKineticSdkConfig } from './helpers/validate-kinetic-sdk-config'
import { KineticSdkConfig } from './interfaces'
import { KineticSdk } from './kinetic-sdk'

const TEST_APP_INDEX = 1
const TEST_APP_ENVIRONMENT = 'devnet'
const TEST_APP_ENDPOINT = 'http://localhost:3000'
const TEST_SOLANA_RPC_NAME = 'mainnet-beta'
const TEST_SOLANA_RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com/'

describe('sdk', () => {
  let sdk: KineticSdk

  beforeEach(async () => {
    sdk = new KineticSdk({
      environment: TEST_APP_ENVIRONMENT,
      endpoint: TEST_APP_ENDPOINT,
      index: TEST_APP_INDEX,
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
          environment: TEST_APP_ENVIRONMENT,
          endpoint: TEST_APP_ENDPOINT,
          index: TEST_APP_INDEX,
          logger: console,
        }
        sdk = new KineticSdk(validateKineticSdkConfig(config))
        expect(sdk.sdkConfig.logger).toBeDefined()
      })

      it('should configure the SDK with a default Solana RPC endpoint', async () => {
        const config: KineticSdkConfig = {
          environment: TEST_APP_ENVIRONMENT,
          endpoint: TEST_APP_ENDPOINT,
          index: TEST_APP_INDEX,
          logger: console,
          solanaRpcEndpoint: clusterApiUrl(TEST_SOLANA_RPC_NAME),
        }
        sdk = new KineticSdk(validateKineticSdkConfig(config))
        expect(sdk.sdkConfig.solanaRpcEndpoint).toEqual(TEST_SOLANA_RPC_ENDPOINT)
        expect(sdk.sdkConfig.logger).toBeDefined()
      })

      it('should configure the SDK with a custom Solana RPC endpoint', async () => {
        const config: KineticSdkConfig = {
          environment: TEST_APP_ENVIRONMENT,
          endpoint: TEST_APP_ENDPOINT,
          index: TEST_APP_INDEX,
          logger: console,
          solanaRpcEndpoint: 'http://localhost:8899',
        }
        sdk = new KineticSdk(validateKineticSdkConfig(config))
        expect(sdk.sdkConfig.solanaRpcEndpoint).toEqual('http://localhost:8899')
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
