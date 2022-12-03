import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'

@Injectable()
export class ApiQueueDataAccessService {
  constructor(private readonly data: ApiCoreDataAccessService) {}
}
