import { useToast } from '@chakra-ui/react'
import { AdminClusterUiForm } from '@kin-kinetic/admin/cluster/ui'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import {
  AdminClusterUpdateInput,
  useAdminClusterQuery,
  useAdminUpdateClusterMutation,
} from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminClusterFeatureSettingsTab({ clusterId }: { clusterId: string }) {
  const toast = useToast()
  const [{ data, fetching }] = useAdminClusterQuery({ variables: { clusterId } })
  const [{ fetching: updateFetching }, updateCluster] = useAdminUpdateClusterMutation()
  const update = async (input: AdminClusterUpdateInput) => {
    try {
      await updateCluster({
        clusterId,
        input: {
          name: input.name,
          endpointPublic: input?.endpointPublic,
          endpointPrivate: input?.endpointPrivate,
          explorer: input?.explorer,
          status: input?.status,
        },
      })
      toast({
        status: 'success',
        title: 'Cluster updated',
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'Something went wrong :(',
        description: error?.toString(),
      })
    }
  }
  if (!data || fetching || updateFetching) {
    return <AdminUiLoader />
  }
  return <AdminClusterUiForm onSubmit={update} cluster={data.item} />
}
