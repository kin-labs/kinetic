import { useToast } from '@chakra-ui/react'
import { WebAdminUiClusterUpdateForm } from '@kin-kinetic/web/admin/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { Cluster, AdminClusterUpdateInput, useAdminUpdateClusterMutation } from '@kin-kinetic/web/util/sdk'

export function WebAdminFeatureClusterSettingsTab({ cluster }: { cluster: Cluster }) {
  const toast = useToast()
  const [, updateCluster] = useAdminUpdateClusterMutation()
  const submit = async (input: AdminClusterUpdateInput) => {
    if (!cluster.id) return
    console.log({ input })
    updateCluster({ input, clusterId: cluster.id })
      .then(() => toast({ status: 'success', title: 'Cluster settings saved.' }))
      .catch((error) =>
        toast({
          status: 'error',
          title: 'Something went wrong',
          description: `${error}`,
        }),
      )
  }

  if (!cluster) {
    return <WebUiAlert message={'Cluster not found'} />
  }

  return <WebAdminUiClusterUpdateForm cluster={cluster} onSubmit={submit} />
}
