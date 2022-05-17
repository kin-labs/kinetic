import { useToast } from '@chakra-ui/react'
import { AdminClusterUiForm } from '@mogami/admin/cluster/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { ClusterUpdateInput, useClusterQuery, useUpdateClusterMutation } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AdminClusterFeatureSettingsTab({ clusterId }: { clusterId: string }) {
  const toast = useToast()
  const [{ data, fetching }] = useClusterQuery({ variables: { clusterId } })
  const [{ fetching: updateFetching }, updateCluster] = useUpdateClusterMutation()
  const update = async (input: ClusterUpdateInput) => {
    try {
      await updateCluster({ clusterId, input })
      toast({
        status: 'success',
        title: 'Cluster updated',
      })
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
