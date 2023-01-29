import { ApiConfigDataAccessModule } from '@kin-kinetic/api/config/data-access'
import { Test } from '@nestjs/testing'
import { OpenTelemetryCoreModule } from 'nestjs-otel/lib/opentelemetry-core.module'
import { ApiCoreService } from './api-core.service'
import { ApiCoreCacheModule } from './cache/api-core-cache.module'

describe('ApiCoreService', () => {
  let service: ApiCoreService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreCacheModule, ApiConfigDataAccessModule, OpenTelemetryCoreModule.forRoot()],
      providers: [ApiCoreService],
    }).compile()

    service = module.get(ApiCoreService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
