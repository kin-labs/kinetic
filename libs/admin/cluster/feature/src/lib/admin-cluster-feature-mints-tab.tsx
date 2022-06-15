import { Stack } from '@chakra-ui/react'
import { AdminClusterUiMintModal, AdminClusterUiMints } from '@kin-kinetic/admin/cluster/ui'
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
      {data?.item && <AdminClusterUiMintModal cluster={data.item} />}
      <AdminClusterUiMints clusterId={clusterId} mints={data?.item?.mints} />
    </Stack>
  )
}
