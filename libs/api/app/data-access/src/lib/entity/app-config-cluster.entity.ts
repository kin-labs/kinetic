import { ClusterType } from '@kin-kinetic/api/cluster/data-access'
import { ApiProperty } from '@nestjs/swagger'

export class AppConfigCluster {
  @ApiProperty()
  endpoint: string
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty({ enum: ClusterType })
  type: ClusterType
}
