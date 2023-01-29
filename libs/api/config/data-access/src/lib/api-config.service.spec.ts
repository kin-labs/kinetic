import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { ApiConfigService } from './api-config.service'

describe('ApiConfigService', () => {
  let service: ApiConfigService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ApiConfigService],
    }).compile()

    service = module.get(ApiConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
