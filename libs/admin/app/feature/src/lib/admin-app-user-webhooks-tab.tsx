import { AdminAppUiWebhooks } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useUserAppWebhooksQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUserWebhooksTab({ appId, appEnvId }: { appId: string; appEnvId: string }) {
  const [{ data, fetching }] = useUserAppWebhooksQuery({ variables: { appId, appEnvId: appEnvId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiWebhooks appId={appId} appEnvId={appEnvId} webhooks={data?.items} />
}
