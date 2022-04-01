import { ApiUserDataAccessModule } from '@mogami/api/user/data-access'
import { Test } from '@nestjs/testing'
import { ApiUserFeatureController } from './api-user-feature.controller'

describe('ApiUserFeatureController', () => {
  let controller: ApiUserFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ApiUserFeatureController],
      imports: [ApiUserDataAccessModule],
    }).compile()

    controller = module.get(ApiUserFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
