import { Box, Stack, useToast } from '@chakra-ui/react'
import { AdminClusterUiTable } from '@kin-kinetic/admin/cluster/ui'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { Cluster, useAdminClustersQuery, useAdminDeleteClusterMutation } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export default function AdminClusterFeatureList() {
  const toast = useToast()
  const [{ data, fetching }, refresh] = useAdminClustersQuery()
  const [, deleteCluster] = useAdminDeleteClusterMutation()

  const handleDelete = async (cluster: Cluster) => {
    if (!cluster?.id) return
    if (!window.confirm(`Are you sure?`)) return
    const res = await deleteCluster({ clusterId: cluster.id })
    if (res.data?.deleted) {
      toast({
        title: 'Cluster deleted',
        description: `Cluster name: ${res.data.deleted.name}`,
      })
    }
    await refresh()
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          Clusters
        </Box>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        {fetching && !data?.items?.length ? (
          <AdminUiLoader />
        ) : (
          <div>
            <AdminClusterUiTable clusters={data?.items} deleteCluster={handleDelete} />
          </div>
        )}
      </Box>
    </Stack>
  )
}
