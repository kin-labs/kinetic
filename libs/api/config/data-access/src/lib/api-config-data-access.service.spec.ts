import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { ApiConfigDataAccessService } from './api-config-data-access.service'

describe('ApiConfigDataAccessService', () => {
  let service: ApiConfigDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ApiConfigDataAccessService],
    }).compile()

    service = module.get(ApiConfigDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
