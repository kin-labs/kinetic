import { ApiConfigDataAccessModule, ApiConfigDataAccessService } from '@kin-kinetic/api/config/data-access'
import { CacheModule, Module } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'

import { ApiCoreCacheService } from './api-core-cache.service'

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ApiConfigDataAccessModule],
      inject: [ApiConfigDataAccessService],
      isGlobal: false,
      useFactory: (cfg: ApiConfigDataAccessService) => ({
        store: redisStore,
        url: cfg.redisUrl,
        ttl: 5,
      }),
    }),
  ],
  providers: [ApiCoreCacheService],
  exports: [ApiCoreCacheService],
})
export class ApiCoreCacheModule {}
