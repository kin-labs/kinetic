import { ApiAuthGraphqlGuard, CtxUser } from '@kin-kinetic/api/auth/data-access'
import {
  AdminClusterCreateInput,
  AdminClusterUpdateInput,
  AdminMintCreateInput,
  ApiClusterAdminService,
  Cluster,
  Mint,
} from '@kin-kinetic/api/cluster/data-access'
import { User } from '@kin-kinetic/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiClusterAdminFeatureResolver {
  constructor(private readonly service: ApiClusterAdminService) {}

  @Mutation(() => Cluster, { nullable: true })
  adminMintCreate(@CtxUser() user: User, @Args('input') input: AdminMintCreateInput) {
    return this.service.adminMintCreate(user.id, input)
  }

  @Mutation(() => Mint, { nullable: true })
  adminDeleteMint(@CtxUser() user: User, @Args('mintId') mintId: string) {
    return this.service.adminDeleteMint(user.id, mintId)
  }

  @Mutation(() => Mint, { nullable: true })
  adminMintImportWallet(@CtxUser() user: User, @Args('mintId') mintId: string, @Args('secret') secret: string) {
    return this.service.adminMintImportWallet(user.id, mintId, secret)
  }

  @Mutation(() => Cluster, { nullable: true })
  adminCreateCluster(@CtxUser() user: User, @Args('input') input: AdminClusterCreateInput) {
    return this.service.adminCreateCluster(user.id, input)
  }

  @Mutation(() => Cluster, { nullable: true })
  adminDeleteCluster(@CtxUser() user: User, @Args('clusterId') clusterId: string) {
    return this.service.adminDeleteCluster(user.id, clusterId)
  }

  @Query(() => [Cluster], { nullable: true })
  adminClusters(@CtxUser() user: User) {
    return this.service.adminClusters(user.id)
  }

  @Query(() => Cluster, { nullable: true })
  adminCluster(@CtxUser() user: User, @Args('clusterId') clusterId: string) {
    return this.service.adminCluster(user.id, clusterId)
  }

  @Mutation(() => Cluster, { nullable: true })
  adminUpdateCluster(
    @CtxUser() user: User,
    @Args('clusterId') clusterId: string,
    @Args('input') input: AdminClusterUpdateInput,
  ) {
    return this.service.adminUpdateCluster(user.id, clusterId, input)
  }
}
