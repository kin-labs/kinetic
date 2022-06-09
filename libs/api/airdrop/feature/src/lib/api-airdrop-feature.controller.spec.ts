import { ApiAirdropDataAccessModule } from '@mogami/api/airdrop/data-access'
import { Test } from '@nestjs/testing'
import { OpenTelemetryModule } from 'nestjs-otel'
import { ApiAirdropFeatureController } from './api-airdrop-feature.controller'

describe('ApiAirdropFeatureController', () => {
  let controller: ApiAirdropFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      imports: [
        ApiAirdropDataAccessModule,
        OpenTelemetryModule.forRoot({
          metrics: {
            apiMetrics: {
              enable: false,
            },
          },
        }),
      ],
      controllers: [ApiAirdropFeatureController],
    }).compile()

    controller = module.get(ApiAirdropFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
