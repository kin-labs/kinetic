import { ApiCoreDataAccessModule } from '@kin-kinetic/api/core/data-access'
import { HttpModule } from '@nestjs/axios'
import { Test } from '@nestjs/testing'
import { ApiWebhookService } from './api-webhook.service'

describe('ApiWebhookService', () => {
  let service: ApiWebhookService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, HttpModule],
      providers: [ApiWebhookService],
    }).compile()

    service = module.get(ApiWebhookService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
