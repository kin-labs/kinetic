import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiCoreDataAccessService {
  uptime() {
    return process.uptime()
  }
}

