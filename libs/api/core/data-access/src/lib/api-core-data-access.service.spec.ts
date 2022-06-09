import { ApiConfigDataAccessModule } from '@mogami/api/config/data-access'
import { Test } from '@nestjs/testing'
import { OpenTelemetryCoreModule } from 'nestjs-otel/lib/opentelemetry-core.module'
import { ApiCoreDataAccessService } from './api-core-data-access.service'

describe('ApiCoreDataAccessService', () => {
  let service: ApiCoreDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiConfigDataAccessModule, OpenTelemetryCoreModule.forRoot()],
      providers: [ApiCoreDataAccessService],
    }).compile()

    service = module.get(ApiCoreDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
