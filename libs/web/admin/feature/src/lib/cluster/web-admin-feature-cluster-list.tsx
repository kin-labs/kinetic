import { Button, useToast } from '@chakra-ui/react'
import { WebAdminUiClusterTable } from '@kin-kinetic/web/admin/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { useAdminClustersQuery, useAdminDeleteClusterMutation } from '@kin-kinetic/web/util/sdk'
import { Link } from 'react-router-dom'

export function WebAdminFeatureClusterList() {
  const toast = useToast()
  const [{ data, fetching }] = useAdminClustersQuery()
  const [, deleteClusterMutation] = useAdminDeleteClusterMutation()

  const deleteCluster = (clusterId: string) => {
    const found = data?.items?.find((item) => item.id === clusterId)
    if (found) {
      if (found?.envs && found?.envs?.length > 0) {
        toast({
          title: 'Cluster has environments',
          description: `Please delete these environments before deleting the cluster:${found.envs
            .map((e) => e.key)
            .join(', ')}`,
          status: 'error',
        })
      } else {
        deleteClusterMutation({ clusterId }).then((res) => {
          if (res.error) {
            toast({
              title: 'Error deleting cluster',
              description: res.error.message,
              status: 'error',
            })
          } else {
            toast({
              title: 'Cluster deleted',
              description: `Cluster ${found.name} was deleted successfully`,
              status: 'success',
            })
          }
        })
      }
    }
  }
  return (
    <WebUiPage
      title={'Clusters'}
      actionRight={
        <Button as={Link} to={'add'}>
          Add Cluster
        </Button>
      }
    >
      <WebUiCard p={'0'}>
        {fetching ? (
          <WebUiLoader />
        ) : (
          <WebAdminUiClusterTable clusters={data?.items || []} deleteCluster={deleteCluster} />
        )}
      </WebUiCard>
    </WebUiPage>
  )
}
