import { ApiTransactionDataAccessModule } from '@mogami/api/transaction/data-access'
import { Test } from '@nestjs/testing'
import { OpenTelemetryModule } from 'nestjs-otel'
import { ApiTransactionFeatureController } from './api-transaction-feature.controller'

describe('ApiTransactionFeatureController', () => {
  let controller: ApiTransactionFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      imports: [
        ApiTransactionDataAccessModule,
        OpenTelemetryModule.forRoot({
          metrics: {
            apiMetrics: {
              enable: false,
            },
          },
        }),
      ],
      controllers: [ApiTransactionFeatureController],
    }).compile()

    controller = module.get(ApiTransactionFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
