import { MogamiSdk } from '@mogami/sdk'

describe('MogamiSdk (e2e)', () => {
  let sdk: MogamiSdk

  beforeEach(async () => {
    sdk = await MogamiSdk.setup({ index: 1, endpoint: 'http://localhost:3000' })
  })

  it('should get App Config', () => {
    const res = sdk.config()

    expect(res.app.index).toEqual(1)
  })
})
