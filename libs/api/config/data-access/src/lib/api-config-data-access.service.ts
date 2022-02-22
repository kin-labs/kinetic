import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiConfigDataAccessService {
  config() {
    return {
      env: process.env.NODE_ENV
    }
  }
}
