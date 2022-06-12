import { AdminAppUiEnvironments } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useUserAppQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUserEnvironmentsTab({ appId }: { appId: string }) {
  const [{ data, fetching }] = useUserAppQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiEnvironments appId={appId} environments={data?.item?.envs} />
}
