import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { Test } from '@nestjs/testing'
import { OpenTelemetryModule } from 'nestjs-otel'
import { ApiAirdropDataAccessService } from './api-airdrop-data-access.service'

describe('ApiAirdropDataAccessService', () => {
  let service: ApiAirdropDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ApiCoreDataAccessModule,
        OpenTelemetryModule.forRoot({
          metrics: {
            apiMetrics: {
              enable: false,
            },
          },
        }),
      ],
      providers: [ApiAirdropDataAccessService],
    }).compile()

    service = module.get(ApiAirdropDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
