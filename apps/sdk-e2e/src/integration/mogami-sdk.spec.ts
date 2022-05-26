import { MogamiSdk } from '@mogami/sdk'
import { logger } from 'nx/src/utils/logger'

describe('Mogami Sdk (e2e)', () => {
  let sdk: MogamiSdk

  beforeEach(async () => {
    sdk = await MogamiSdk.setup({ index: 1, endpoint: 'devnet' })
    logger.info('beforeEach')
  })

  it('should initialize SDK', () => {
    expect(sdk.config().app.index).toEqual(1)
    expect(sdk.config().app.name).toEqual('App 1')
    expect(true).toBeTruthy()
  })
})
