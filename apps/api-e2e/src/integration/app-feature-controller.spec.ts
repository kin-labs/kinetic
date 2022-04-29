import { INestApplication } from '@nestjs/common'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Keypair } from '@solana/web3.js'
import { getEndpoint, initializeE2eApp } from '../helpers'

describe('AppFeatureController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await initializeE2eApp()
  })

  afterEach(async () => {
    return app.close()
  })

  it('/api/app/config/1 (GET)', () => {
    const subsidizer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.APP_1_FEE_PAYER_BYTE_ARRAY)))
    return getEndpoint(app, '/api/app/config/1')
      .expect(200)
      .then((res) => {
        expect(res.body.app.index).toEqual(1)
        expect(res.body.app.name).toEqual('App 1')
        expect(res.body.mint.feePayer).toEqual(subsidizer.publicKey.toBase58())
        expect(res.body.mint.programId).toEqual(TOKEN_PROGRAM_ID?.toBase58())
        expect(res.body.mint.publicKey).toEqual(process.env.MOGAMI_MINT_PUBLIC_KEY)
      })
  })
})
