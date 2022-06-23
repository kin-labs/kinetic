import { ApiProperty } from '@nestjs/swagger'
import { AppConfigCluster } from './app-config-cluster.entity'

export class AppConfigEnvironment {
  @ApiProperty()
  name: string
  @ApiProperty()
  explorer: string
  @ApiProperty()
  cluster: AppConfigCluster
}
