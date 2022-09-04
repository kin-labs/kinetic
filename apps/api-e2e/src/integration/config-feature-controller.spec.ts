import { INestApplication } from '@nestjs/common'
import { getEndpoint, initializeE2eApp } from '../helpers'

describe('ConfigFeatureController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await initializeE2eApp()
  })

  afterEach(async () => {
    return app.close()
  })

  it('/api/config (GET)', () => {
    return getEndpoint(app, '/api/config')
      .expect(200)
      .then((res) => {
        expect(res.body.environment).toEqual('test')
        expect(res.body.name).toContain('@kin-kinetic/api')
        expect(res.body.version).toBeDefined()
      })
  })
})
