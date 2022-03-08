import { INestApplication } from '@nestjs/common'
import { getEndpoint, initializeE2eApp } from './helpers'

describe('CoreFeatureController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await initializeE2eApp()
  })

  afterEach(async () => {
    return app.close()
  })

  it('/api/core (GET)', () => {
    return getEndpoint(app, '/api/core')
      .expect(404)
      .then((res) => {
        expect(res.body.message).toEqual('Cannot GET /api/core')
      })
  })

  it('/api/uptime (GET)', () => {
    return getEndpoint(app, '/api/uptime')
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text) > 0).toBeTruthy()
        expect(res.text.length > 3).toBeTruthy()
      })
  })
})
