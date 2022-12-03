import { Test } from '@nestjs/testing'
import { ApiQueueDataAccessService } from './api-queue-data-access.service'

describe('ApiQueueDataAccessService', () => {
  let service: ApiQueueDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiQueueDataAccessService],
    }).compile()

    service = module.get(ApiQueueDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
