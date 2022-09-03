import { Stack } from '@chakra-ui/react'
import { AdminClusterUiMints } from '@kin-kinetic/admin/cluster/ui'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { useAdminClusterQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminClusterFeatureMintsTab({ clusterId }: { clusterId: string }) {
  const [{ data, fetching }] = useAdminClusterQuery({ variables: { clusterId } })
  if (!data || fetching) {
    return <AdminUiLoader />
  }
  return (
    <Stack spacing={6}>
      <AdminClusterUiMints clusterId={clusterId} mints={data?.item?.mints} />
    </Stack>
  )
}
