import { AdminAppUiWebhooks } from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppWebhooksQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AppWebhooksTab({ appId, envId }: { appId: string; envId: string }) {
  const [{ data, fetching }] = useAppWebhooksQuery({ variables: { appId } })
  if (fetching) {
    return <AdminUiLoader />
  }
  return <AdminAppUiWebhooks appId={appId} envId={envId} webhooks={data?.items} />
}
