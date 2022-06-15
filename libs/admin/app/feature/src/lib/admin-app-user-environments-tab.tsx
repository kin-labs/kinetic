import { AdminAppUiEnvironments } from '@kin-kinetic/admin/app/ui'
import { AdminUiLoader } from '@kin-kinetic/admin/ui/loader'
import { useUserAppQuery } from '@kin-kinetic/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUserEnvironmentsTab({ appId }: { appId: string }) {
  const [{ data, fetching }] = useUserAppQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiEnvironments appId={appId} environments={data?.item?.envs} />
}
