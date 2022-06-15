import { INestApplication } from '@nestjs/common'
import { Uptime } from '../generated/api-sdk'
import { ADMIN_USERNAME, runGraphQLQueryAdmin, runLoginQuery } from '../helpers'
import { initializeE2eApp } from '../helpers/'

describe('CoreFeatureResolver (e2e)', () => {
  let app: INestApplication
  let token: string | undefined

  beforeAll(async () => {
    app = await initializeE2eApp()
    const res = await runLoginQuery(app, ADMIN_USERNAME)
    token = res.body.data.login.token
  })
  afterAll(async () => {
    return app.close()
  })

  describe('get uptime ', () => {
    it('should get a value', async () => {
      const res = await runGraphQLQueryAdmin(app, token, Uptime)

      const parsed = JSON.parse(res.text)

      expect(parseInt(parsed.data.uptime) > 0).toBeTruthy()
    })
  })
})
