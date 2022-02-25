import { Test } from '@nestjs/testing'
import { ApiAccountFeatureController } from './api-account-feature.controller'

describe('ApiAccountFeatureController', () => {
  let controller: ApiAccountFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiAccountFeatureController],
    }).compile()

    controller = module.get(ApiAccountFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
