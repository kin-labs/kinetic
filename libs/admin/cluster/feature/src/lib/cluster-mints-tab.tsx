import { AdminClusterUiMints } from '@mogami/admin/cluster/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useClusterQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function ClusterMintsTab({ clusterId }: { clusterId: string }) {
  const [{ data, fetching }] = useClusterQuery({ variables: { clusterId } })
  if (!data || fetching) {
    return <AdminUiLoader />
  }
  return <AdminClusterUiMints clusterId={clusterId} mints={data?.item?.mints} />
}
