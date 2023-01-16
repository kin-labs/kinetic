import { ApiCoreDataAccessService } from '@kin-kinetic/api/core/data-access'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ApiKineticService {
  constructor(private readonly data: ApiCoreDataAccessService) {}
}
