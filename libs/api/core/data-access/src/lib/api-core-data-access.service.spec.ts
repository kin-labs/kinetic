import { Test } from '@nestjs/testing';
import { ApiCoreDataAccessService } from './api-core-data-access.service';

describe('ApiCoreDataAccessService', () => {
  let service: ApiCoreDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiCoreDataAccessService],
    }).compile();

    service = module.get(ApiCoreDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
