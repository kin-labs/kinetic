import { ApiCoreDataAccessModule } from '@mogami/api/core/data-access'
import { JwtModule } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { ApiAuthDataAccessService } from './api-auth-data-access.service'

describe('ApiAuthDataAccessService', () => {
  let service: ApiAuthDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiCoreDataAccessModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
      providers: [ApiAuthDataAccessService],
    }).compile()

    service = module.get(ApiAuthDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
