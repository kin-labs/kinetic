import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { HttpModule } from '@nestjs/axios'
import { Test } from '@nestjs/testing'
import { ApiWebhookDataAccessService } from './api-webhook-data-access.service'

describe('ApiWebhookDataAccessService', () => {
  let service: ApiWebhookDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, HttpModule],
      providers: [ApiWebhookDataAccessService],
    }).compile()

    service = module.get(ApiWebhookDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
