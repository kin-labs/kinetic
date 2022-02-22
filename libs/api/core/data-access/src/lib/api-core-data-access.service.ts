import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ApiCoreDataAccessService extends PrismaClient implements OnModuleInit {
  uptime() {
    return process.uptime()
  }

  async onModuleInit() {
    await this.$connect();
  }
}

