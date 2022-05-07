import { INestApplication } from '@nestjs/common'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Keypair } from '@solana/web3.js'
import { AppWebhookType } from '../generated/api-sdk'
import { getEndpoint, initializeE2eApp, postEndpoint } from '../helpers'

describe('AppFeatureController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await initializeE2eApp()
  })

  afterEach(async () => {
    return app.close()
  })

  it('/api/app/config/1 (GET)', () => {
    const feePayer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.APP_1_FEE_PAYER_BYTE_ARRAY)))
    return getEndpoint(app, '/api/app/config/1')
      .expect(200)
      .then((res) => {
        expect(res.body.app.index).toEqual(1)
        expect(res.body.app.name).toEqual('App 1')
        expect(res.body.mint.feePayer).toEqual(feePayer.publicKey.toBase58())
        expect(res.body.mint.programId).toEqual(TOKEN_PROGRAM_ID?.toBase58())
        expect(res.body.mint.publicKey).toEqual(process.env.MOGAMI_MINT_PUBLIC_KEY)
      })
  })

  it('Should receive Incoming App Event Webhooks ', () => {
    const payload = { foreignKey: 'some-foreign-key' }
    const headers = { authorization: 'Bearer Test' }
    return postEndpoint(app, '/api/app/1/webhook/event', payload, headers)
      .expect(200)
      .then((res) => {
        expect(res.body.type).toEqual(AppWebhookType.Event)
        expect(res.body.payload.foreignKey).toEqual(payload.foreignKey)
        expect(res.body.headers.authorization).toEqual(headers.authorization)
      })
  })

  it('Should receive Incoming App Verify Webhooks ', () => {
    const payload = { foreignKey: 'some-foreign-key' }
    const headers = { authorization: 'Bearer Test' }
    return postEndpoint(app, '/api/app/1/webhook/verify', payload, headers)
      .expect(200)
      .then((res) => {
        expect(res.body.type).toEqual(AppWebhookType.Verify)
        expect(res.body.payload.foreignKey).toEqual(payload.foreignKey)
        expect(res.body.headers.authorization).toEqual(headers.authorization)
      })
  })

  it('Should not receive unknown Incoming App Webhooks ', () => {
    return postEndpoint(app, '/api/app/1/webhook/unknown')
      .expect(400)
      .then((res) => {
        expect(res.body).toMatchSnapshot()
      })
  })
})
