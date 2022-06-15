import { ApiConfigDataAccessModule } from '@kin-kinetic/api/config/data-access'
import { Test } from '@nestjs/testing'
import { ApiConfigFeatureController } from './api-config-feature.controller'

describe('ApiConfigFeatureController', () => {
  let controller: ApiConfigFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      imports: [ApiConfigDataAccessModule],
      controllers: [ApiConfigFeatureController],
    }).compile()

    controller = module.get(ApiConfigFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
