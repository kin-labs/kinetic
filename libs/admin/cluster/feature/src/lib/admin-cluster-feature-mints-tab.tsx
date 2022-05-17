import { Stack } from '@chakra-ui/react'
import { AdminClusterUiMintModal, AdminClusterUiMints } from '@mogami/admin/cluster/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useClusterQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AdminClusterFeatureMintsTab({ clusterId }: { clusterId: string }) {
  const [{ data, fetching }] = useClusterQuery({ variables: { clusterId } })
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
