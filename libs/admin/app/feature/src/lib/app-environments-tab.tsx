import { AdminAppUiEnvironments } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AppEnvironmentsTab({ appId }: { appId: string }) {
  const [{ data, fetching }] = useAppQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiEnvironments appId={appId} environments={data?.item?.envs} />
}
