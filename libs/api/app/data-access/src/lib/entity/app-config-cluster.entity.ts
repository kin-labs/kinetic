import { ClusterType } from '@mogami/api/cluster/data-access'
import { ApiProperty } from '@nestjs/swagger'

export class AppConfigCluster {
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty()
  type: ClusterType
}
